async function checkIfTransactionSucceeded(provider, transactionHash) {
    let receipt = await provider.send("eth_getTransactionReceipt", [
        transactionHash,
    ]);

    return receipt.status === "0x1";
}

module.exports = {
    checkIfTransactionSucceeded,
};
