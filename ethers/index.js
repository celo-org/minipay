const ethers = require("ethers");
const { providers } = ethers;
const {
    checkIfTransactionSucceeded,
} = require("./checkIfTransactionSucceeded");

const provider = new providers.JsonRpcProvider("https://forno.celo.org");

async function main() {
    // return await checkIfTransactionSucceeded(
    //     provider,
    //     "0x715628c23b1f010a6dba4e178f3eb990b4bdc26a8da85e1ca8ef862e9ba698a5"
    // );
}

main()
    .then((result) => console.log(result))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
