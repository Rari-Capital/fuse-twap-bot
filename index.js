const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL));
const preferredPriceOracleAbi = require(__dirname + '/abi/PreferredPriceOracle.json');
const uniswapViewAbi = require(__dirname + '/abi/UniswapView.json');
var priceOracleContract = new web3.eth.Contract(preferredPriceOracleAbi, process.env.PRICE_ORACLE_CONTRACT_ADDRESS);
var symbols = process.env.SUPPORTED_SYMBOLS.split(',');

(async function() {
    try {
        process.env.PRICE_ORACLE_CONTRACT_ADDRESS = await priceOracleContract.methods.secondaryOracle().call();
    } catch { }

    priceOracleContract = new web3.eth.Contract(uniswapViewAbi, process.env.PRICE_ORACLE_CONTRACT_ADDRESS);
    setInterval(computeAndPostTwaps, process.env.TWAP_POSTING_INTERVAL_SECONDS);
    computeAndPostTwaps();
})();

async function computeAndPostTwaps() {
    // Create swapExactETHForTokens transaction
    var data = priceOracleContract.methods.postPrices(symbols).encodeABI();

    // Build transaction
    var tx = {
        from: process.env.ETHEREUM_ADMIN_ACCOUNT,
        to: process.env.PRICE_ORACLE_CONTRACT_ADDRESS,
        value: 0,
        data: data,
        nonce: await web3.eth.getTransactionCount(process.env.ETHEREUM_ADMIN_ACCOUNT)
    };

    if (process.env.NODE_ENV !== "production") console.log("Signing and sending postPrices transaction:", tx);

    // Estimate gas for transaction
    try {
        tx["gas"] = await web3.eth.estimateGas(tx);
    } catch (error) {
        throw "Failed to estimate gas before signing and sending postPrices transaction: " + error;
    }
    
    // Sign transaction
    try {
        var signedTx = await web3.eth.accounts.signTransaction(tx, process.env.ETHEREUM_ADMIN_PRIVATE_KEY);
    } catch (error) {
        throw "Error signing postPrices transaction: " + error;
    }

    // Send transaction
    try {
        var sentTx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    } catch (error) {
        throw "Error sending postPrices transaction: " + error;
    }
    
    console.log("Successfully sent postPrices transaction:", sentTx);
    return sentTx;
}
