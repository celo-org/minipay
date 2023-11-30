const { createPublicClient, http } = require("viem");
const { celo } = require("viem/chains");
const {
    checkIfTransactionSucceeded,
} = require("./checkIfTransactionSucceeded");

const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

async function main() {
    // return await checkIfTransactionSucceeded(
    //     publicClient,
    //     "0x715628c23b1f010a6dba4e178f3eb990b4bdc26a8da85e1ca8ef862e9ba698a5"
    // );
}

main()
    .then((result) => console.log(result))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
