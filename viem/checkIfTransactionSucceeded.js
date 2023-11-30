async function checkIfTransactionSucceeded(publicClient, transactionHash) {
    let receipt = await publicClient.getTransactionReceipt({
        hash: transactionHash,
    });

    return receipt.status === "success";
}

module.exports = {
    checkIfTransactionSucceeded,
};
