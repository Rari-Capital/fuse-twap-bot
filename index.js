const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL));
const uniswapTwapPriceOracleRootAbi = require(__dirname + '/abi/UniswapTwapPriceOracleRoot.json');
var rootPriceOracleContract = new web3.eth.Contract(uniswapTwapPriceOracleRootAbi, process.env.ROOT_PRICE_ORACLE_CONTRACT_ADDRESS);
var supportedPairs = process.env.SUPPORTED_PAIRS.split(',');
var lastTransactionHash = null;
var lastTransactionSent = null;

setInterval(tryUpdateCumulativePrices, process.env.TWAP_UPDATE_ATTEMPT_INTERVAL_SECONDS * 1000);
tryUpdateCumulativePrices();

async function tryUpdateCumulativePrices() {
    // Check if last TX sent is still pending; if so, wait until it has been 5 minutes since sending, after which we will overwrite it (i.e., same nonce)
    var useNonce = null;

    if (lastTransactionHash !== null) {
        try {
            var lastTransaction = await web3.eth.getTransactionByHash(lastTransactionHash);
        } catch { }

        if (lastTransaction && lastTransaction.blockNumber === null) {
            // Transaction found and block not yet mined
            if (lastTransactionSent < ((new Date()).getTime() / 1000) - parseInt(process.env.SPEED_UP_TRANSACTION_AFTER_SECONDS)) useNonce = lastTransaction.nonce;
            else return null;
        } else {
            // Transaction not found or block already mined => no more pending TX
            lastTransactionHash = null;
            lastTransactionSent = null;
        }
    }

    // Get pairs, min periods, and deviation thresholds
    var pairs = [];
    var minPeriods = [];
    var deviationThresholds = [];

    for (var i = 0; i < supportedPairs.length; i++) {
        var parts = supportedPairs[i].split("|");
        pairs[i] = parts[0];
        minPeriods[i] = parts[1] !== undefined ? parts[1] : process.env.DEFAULT_MIN_PERIOD;
        deviationThresholds[i] = Web3.utils.toBN(Math.trunc((parts[2] !== undefined ? parts[2] : process.env.DEFAULT_DEVIATION_THRESHOLD) * 1e18));
    }

    // Get workable pairs and validate
    var workable = await rootPriceOracleContract.methods.workable(pairs, minPeriods, deviationThresholds).call();

    if (parseInt(process.env.REDUNDANCY_DELAY_SECONDS) > 0) {
        var redundancyDelayPassed = false;

        for (var i = 0; i < workable.length; i++) {
            if (workable[i]) {
                var epochNow = (new Date()).getTime() / 1000;
                if (workableSince < epochNow - parseInt(process.env.REDUNDANCY_DELAY_SECONDS)) redundancyDelayPassed = true;
                else if (workableSince < 0) workableSince = epochNow;
            } else {
                workableSince = -1;
            }
        }

        if (!redundancyDelayPassed) return null;
    }

    var workablePairs = [];
    for (var i = 0; i < workable.length; i++) if (workable[i]) workablePairs.push(pairs[i]);
    if (workablePairs.length <= 0) return null;

    // Update cumulative prices and return TX
    var tx = await updateCumulativePrices(workablePairs, useNonce, function(hash) {
        lastTransactionHash = hash;
        lastTransactionSent = (new Date()).getTime() / 1000;
        console.log("Pending TX hash:", lastTransactionHash);
    });
    lastTransactionHash = null;
    lastTransactionSent = null;
    return tx;
}

async function updateCumulativePrices(pairs, useNonce, transactionHashCallback) {
    // Create update transaction
    var data = pairs.length > 1 ? rootPriceOracleContract.methods["update(address[])"](pairs).encodeABI() : rootPriceOracleContract.methods["update(address)"](pairs[0]).encodeABI();

    // Build transaction
    var tx = {
        from: process.env.ETHEREUM_ADMIN_ACCOUNT,
        to: process.env.ROOT_PRICE_ORACLE_CONTRACT_ADDRESS,
        value: 0,
        data: data,
        nonce: useNonce !== undefined && useNonce !== null ? useNonce : await web3.eth.getTransactionCount(process.env.ETHEREUM_ADMIN_ACCOUNT)
    };

    if (useNonce !== undefined && useNonce !== null) tx["gasPrice"] = Web3.utils.toBN(await web3.eth.getGasPrice()).mul(120).div(100).toString();
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
        var promise = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        if (transactionHashCallback !== undefined && transactionHashCallback != null) promise.on('transactionHash', transactionHashCallback);
        var sentTx = await promise;
    } catch (error) {
        throw "Error sending update transaction: " + error;
    }
    
    console.log("Successfully sent update transaction:", sentTx);
    return sentTx;
}
