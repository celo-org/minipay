async function estimateGas(provider, transaction, feeCurrency = "") {
    return await provider.send("eth_estimateGas", [
        feeCurrency ? { ...transaction, feeCurrency } : transaction,
    ]);
}

module.exports = {
    estimateGas,
};
