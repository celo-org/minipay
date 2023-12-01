# MiniPay Snippets

Snippets of code that can be used to implement flows inside MiniPay

## How to use

### Check cUSD Balance of an address

#### Using Ethers

[Code](./ethers/checkCUSDBalance.js)

```js
const provider = new providers.JsonRpcProvider("https://forno.celo.org"); // Mainnet

let balance = await checkCUSDBalance(provider, address); // In Ether unit
```

#### Using Viem

[Code](./viem/checkCUSDBalance.js)

```js
const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
}); // Mainnet

let balance = await checkCUSDBalance(publicClient, address); // In Ether unit
```

### Check If a transaction succeeded

#### Using Ethers

[Code](./ethers/checkIfTransactionSucceeded.js)

```js
const provider = new providers.JsonRpcProvider("https://forno.celo.org"); // Mainnet

let transactionStatus = await checkIfTransactionSucceeded(
    provider,
    transactionHash
);
```

#### Using Viem

[Code](./viem/checkIfTransactionSucceeded.js)

```js
const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
}); // Mainnet

let transactionStatus = await checkIfTransactionSucceeded(
    publicClient,
    address
); // In Ether unit
```

### Estimate Gas for a transaction

#### Using Ethers

[Code](./ethers/estimateGas.js)

##### Estimate Gas in Celo

```js
const provider = new providers.JsonRpcProvider("https://forno.celo.org"); // Mainnet

// Estimate gas for an example transaction
let gasLimit = await estimateGas(provider, {
    from: "0x8eb02597d85abc268bc4769e06a0d4cc603ab05f",
    to: "0x4f93fa058b03953c851efaa2e4fc5c34afdfab84",
    value: "0x1",
    data: "0x",
});
```

##### Estimate Gas in cUSD

```js
const provider = new providers.JsonRpcProvider("https://forno.celo.org"); // Mainnet

const STABLE_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

// Estimate gas for an example transaction
let gasLimit = await estimateGas(
    provider,
    {
        from: "0x8eb02597d85abc268bc4769e06a0d4cc603ab05f",
        to: "0x4f93fa058b03953c851efaa2e4fc5c34afdfab84",
        value: "0x1",
        data: "0x",
    },
    STABLE_TOKEN_ADDRESS
);
```

#### Using Viem

[Code](./viem/estimateGas.js)

##### Estimate Gas in Celo

```js
const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

let gasLimit = await estimateGas(publicClient, {
    account: "0x8eb02597d85abc268bc4769e06a0d4cc603ab05f",
    to: "0x4f93fa058b03953c851efaa2e4fc5c34afdfab84",
    value: "0x1",
    data: "0x",
});
```

##### Estimate Gas in cUSD

```js
const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

const STABLE_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

let gasLimit = await estimateGas(
    publicClient,
    {
        account: "0x8eb02597d85abc268bc4769e06a0d4cc603ab05f",
        to: "0x4f93fa058b03953c851efaa2e4fc5c34afdfab84",
        value: "0x1",
        data: "0x",
    },
    STABLE_TOKEN_ADDRESS
);
```

### Estimate Gas Price for a transaction

#### Using Ethers

[Code](./ethers/estimateGasPrice.js)

##### Estimate Gas Price in Celo

```js
const provider = new providers.JsonRpcProvider("https://forno.celo.org"); // Mainnet

let gasPrice = await estimateGasPrice(provider);
```

##### Estimate Gas Price in cUSD

```js
const provider = new providers.JsonRpcProvider("https://forno.celo.org"); // Mainnet

const STABLE_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

let gasPrice = await estimateGasPrice(provider, STABLE_TOKEN_ADDRESS);
```

#### Using Viem

##### Estimate Gas Price in Celo

```js
const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

let gasPrice = await estimateGasPrice(publicClient);
```

##### Estimate Gas Price in cUSD

```js
const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

const STABLE_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

let gasPrice = await estimateGasPrice(provider, STABLE_TOKEN_ADDRESS);
```

## Support

Please open issue on this repo.
