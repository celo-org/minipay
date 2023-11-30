const { getContract, formatEther } = require("viem");
const StableToken = require("@celo/abis/StableToken.json");
const { STABLE_TOKEN_ADDRESS } = require("../constants");

async function checkCUSDBalance(publicClient, address) {
    let StableTokenContract = getContract({
        abi: StableToken.abi,
        address: STABLE_TOKEN_ADDRESS,
        publicClient,
    });

    let balanceInBigNumber = await StableTokenContract.read.balanceOf([
        address,
    ]);

    let balanceInWei = balanceInBigNumber.toString();

    let balanceInEthers = formatEther(balanceInWei);

    return balanceInEthers;
}

module.exports = {
    checkCUSDBalance,
};
