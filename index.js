const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL));
const uniswapTwapPriceOracleRootAbi = require(__dirname + '/abi/UniswapTwapPriceOracleRoot.json');
var rootPriceOracleContract = new web3.eth.Contract(uniswapTwapPriceOracleRootAbi, process.env.ROOT_PRICE_ORACLE_CONTRACT_ADDRESS);
var supportedPairs = process.env.SUPPORTED_PAIRS.split(',');

setInterval(tryUpdateCumulativePrices, process.env.TWAP_UPDATE_ATTEMPT_INTERVAL_SECONDS * 1000);
tryUpdateCumulativePrices();

async function tryUpdateCumulativePrices() {
    var pairs = [];
    var minPeriods = [];
    var deviationThresholds = [];

    for (var i = 0; i < supportedPairs.length; i++) {
        var parts = supportedPairs[i].split("|");
        pairs[i] = parts[0];
        minPeriods[i] = parts[1] !== undefined ? parts[1] : process.env.DEFAULT_MIN_PERIOD;
        deviationThresholds[i] = Web3.utils.toBN(Math.trunc((parts[2] !== undefined ? parts[2] : process.env.DEFAULT_DEVIATION_THRESHOLD) * 1e18));
    }

    var workable = await rootPriceOracleContract.methods.workable(pairs, minPeriods, deviationThresholds).call();
    var workablePairs = [];
    for (var i = 0; i < supportedPairs.length; i++) if (workable[i]) workablePairs.push(supportedPairs[i]);

    return await updateCumulativePrices(workablePairs);
}

async function updateCumulativePrices(pairs) {
    // Input validation
    if (pairs.length <= 0) return;

    // Create update transaction
    var data = pairs.length > 1 ? rootPriceOracleContract.methods["update(address[])"](pairs).encodeABI() : rootPriceOracleContract.methods["update(address)"](pairs[0]).encodeABI();

    // Build transaction
    var tx = {
        from: process.env.ETHEREUM_ADMIN_ACCOUNT,
        to: process.env.ROOT_PRICE_ORACLE_CONTRACT_ADDRESS,
        value: 0,
        data: data,
        nonce: await web3.eth.getTransactionCount(process.env.ETHEREUM_ADMIN_ACCOUNT)
    };

    if (process.env.NODE_ENV !== "production") console.log("Signing and sending update transaction:", tx);

    // Estimate gas for transaction
    try {
        tx["gas"] = await web3.eth.estimateGas(tx);
    } catch (error) {
        throw "Failed to estimate gas before signing and sending update transaction: " + error;
    }
    
    // Sign transaction
    try {
        var signedTx = await web3.eth.accounts.signTransaction(tx, process.env.ETHEREUM_ADMIN_PRIVATE_KEY);
    } catch (error) {
        throw "Error signing update transaction: " + error;
    }

    // Send transaction
    try {
        var sentTx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    } catch (error) {
        throw "Error sending update transaction: " + error;
    }
    
    console.log("Successfully sent update transaction:", sentTx);
    return sentTx;
}
