async function estimateGas(publicClient, transaction, feeCurrency = "") {
    return await publicClient.estimateGas({
        ...transaction,
        feeCurrency: feeCurrency ? feeCurrency : "",
    });
}

module.exports = {
    estimateGas,
};
