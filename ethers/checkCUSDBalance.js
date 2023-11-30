const ethers = require("ethers");
const StableToken = require("@celo/abis/StableToken.json");
const { STABLE_TOKEN_ADDRESS } = require("../constants");

const { Contract, utils } = ethers;
const { formatEther } = utils;

async function checkCUSDBalance(provider, address) {
    const StableTokenContract = new Contract(
        STABLE_TOKEN_ADDRESS,
        StableToken.abi,
        provider
    );

    let balanceInBigNumber = await StableTokenContract.balanceOf(address);

    let balanceInWei = balanceInBigNumber.toString();

    let balanceInEthers = formatEther(balanceInWei); // Ether is a unit = 10 ** 18 wei

    return balanceInEthers;
}

module.exports = {
    checkCUSDBalance,
};
