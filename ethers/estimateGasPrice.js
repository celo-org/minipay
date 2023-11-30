async function estimateGasPrice(provider, feeCurrency = "") {
    let gasPriceinHex = await provider.send(
        "eth_gasPrice",
        feeCurrency ? [feeCurrency] : []
    );

    return gasPriceinHex;
}

module.exports = {
    estimateGasPrice,
};
