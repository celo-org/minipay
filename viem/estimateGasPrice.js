async function estimateGasPrice(publicClient, feeCurrency = "") {
    return await publicClient.request({
        method: "eth_gasPrice",
        params: feeCurrency ? [feeCurrency] : [],
    });
}

module.exports = {
    estimateGasPrice,
};
