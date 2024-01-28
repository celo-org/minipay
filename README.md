# MiniPay Snippets

Snippets of code that can be used to implement flows inside MiniPay

## How to use

### Check cUSD Balance of an address (Using Ethers)

[Code](./ethers/checkCUSDBalance.js)

```js
const provider = new providers.JsonRpcProvider("https://forno.celo.org"); // Mainnet

let balance = await checkCUSDBalance(provider, address); // In Ether unit
```

### Check cUSD Balance of an address (Using Viem)

[Code](./viem/checkCUSDBalance.js)

```js
const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
}); // Mainnet

let balance = await checkCUSDBalance(publicClient, address); // In Ether unit
```

### Check If a transaction succeeded (Using Ethers)

[Code](./ethers/checkIfTransactionSucceeded.js)

```js
const provider = new providers.JsonRpcProvider("https://forno.celo.org"); // Mainnet

let transactionStatus = await checkIfTransactionSucceeded(
    provider,
    transactionHash
);
```

### Check If a transaction succeeded (Using Viem)

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

### Estimate Gas for a transaction (Using Ethers)

[Code](./ethers/estimateGas.js)

#### Estimate Gas in Celo (Using Ethers)

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

#### Estimate Gas in cUSD (Using Ethers)

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

### Estimate Gas for a transaction (Using Viem)

[Code](./viem/estimateGas.js)

#### Estimate Gas in Celo (Using Viem)

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

#### Estimate Gas in cUSD (Using Viem)

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

### Estimate Gas Price for a transaction (Using Ethers)

[Code](./ethers/estimateGasPrice.js)

#### Estimate Gas Price in Celo (Using Ethers)

```js
const provider = new providers.JsonRpcProvider("https://forno.celo.org"); // Mainnet

let gasPrice = await estimateGasPrice(provider);
```

#### Estimate Gas Price in cUSD (Using Ethers)

```js
const provider = new providers.JsonRpcProvider("https://forno.celo.org"); // Mainnet

const STABLE_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

let gasPrice = await estimateGasPrice(provider, STABLE_TOKEN_ADDRESS);
```

### Estimate Gas Price for a transaction (Using Viem)

[Code](./viem/estimateGasPrice.js)

#### Estimate Gas Price in Celo (Using Viem)

```js
const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

let gasPrice = await estimateGasPrice(publicClient);
```

#### Estimate Gas Price in cUSD (Using Viem)

```js
const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

const STABLE_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

let gasPrice = await estimateGasPrice(provider, STABLE_TOKEN_ADDRESS);
```

### Calculate cUSD to be spent for transaction fees (Using Ethers)

```js
const provider = new providers.JsonRpcProvider("https://forno.celo.org");

const STABLE_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

let gasPrice = await estimateGasPrice(provider, STABLE_TOKEN_ADDRESS);

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

let transactionFeesInCUSD = formatEther(
    BigNumber.from(gasLimit).mul(BigNumber.from(gasPrice)).toString()
);
```

#### Calculate cUSD to be spent for transaction fees (Using Viem)

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

let gasPrice = await estimateGasPrice(publicClient, STABLE_TOKEN_ADDRESS);

let transactionFeesInCUSD = formatEther(gasLimit * hexToBigInt(gasPrice));
```

#### Lookup phone number registered under MiniPay issuer (Using Ethers)

[Code](./ethers/SocialConnect/index.js)

```js
let wallet = new Wallet(process.env.ISSUER_PRIVATE_KEY, provider);

const issuer = new SocialConnectIssuer(wallet, {
    authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
    rawKey: process.env.DEK_PRIVATE_KEY,
});

await issuer.initialize();

const identifierType = IdentifierPrefix.PHONE_NUMBER;

/**
 * Any phone number you want to lookup
 *
 * The below phone number is registered on the testnet issuer mentioned below.
 */
const identifier = "+911234567890";

/**
 * You can lookup under multiple issuers in one request.
 *
 * Below is the MiniPay issuer address on Mainnet.
 *
 * Note: Remember to make your environment variable ENVIRONMENT=MAINNET
 */
let issuerAddresses = ["0x7888612486844Bb9BE598668081c59A9f7367FBc"];

// A testnet issuer we setup for you to lookup on testnet.
// let issuerAddresses = ["0xDF7d8B197EB130cF68809730b0D41999A830c4d7"];

let results = await issuer.lookup(identifier, identifierType, issuerAddresses);
```

#### Lookup phone number registered under MiniPay issuer (Using Viem)

[Code](./viem/SocialConnect/index.js)

```js
let account = privateKeyToAccount(process.env.ISSUER_PRIVATE_KEY);

let walletClient = createWalletClient({
    account,
    transport: http(),
    chain,
});

const issuer = new SocialConnectIssuer(walletClient, {
    authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
    rawKey: process.env.DEK_PRIVATE_KEY,
});

await issuer.initialize();

const identifierType = IdentifierPrefix.PHONE_NUMBER;

/**
 * Any phone number you want to lookup
 *
 * The below phone number is registered on the testnet issuer mentioned below.
 */
const identifier = "+911234567890";

/**
 * You can lookup under multiple issuers in one request.
 *
 * Below is the MiniPay issuer address on Mainnet.
 *
 * Note: Remember to make your environment variable ENVIRONMENT=MAINNET
 */
let issuerAddresses = ["0x7888612486844Bb9BE598668081c59A9f7367FBc"];

// A testnet issuer we setup for you to lookup on testnet.
// let issuerAddresses = ["0xDF7d8B197EB130cF68809730b0D41999A830c4d7"];

let results = await issuer.lookup(identifier, identifierType, issuerAddresses);
```

#### Registering phone number using your own issuer (Using Ethers)

[Code](./ethers/SocialConnect/index.js)

```js
let wallet = new Wallet(process.env.ISSUER_PRIVATE_KEY, provider);

const issuer = new SocialConnectIssuer(wallet, {
    authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
    rawKey: process.env.DEK_PRIVATE_KEY,
});

await issuer.initialize();

const identifierType = IdentifierPrefix.PHONE_NUMBER;

/**
 * Any phone number you want to register
 */
const identifier = "+911234567890";

let addressToRegister = "<USER_ADDRESS>";

let results = await issuer.registerOnChainIdentifier(
    identifier,
    identifierType,
    addressToRegister
);
```

#### Registering phone number using your own issuer (Using Viem)

[Code](./viem/SocialConnect/index.js)

```js
let account = privateKeyToAccount(process.env.ISSUER_PRIVATE_KEY);

let walletClient = createWalletClient({
    account,
    transport: http(),
    chain,
});

const issuer = new SocialConnectIssuer(walletClient, {
    authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
    rawKey: process.env.DEK_PRIVATE_KEY,
});

await issuer.initialize();

const identifierType = IdentifierPrefix.PHONE_NUMBER;

/**
 * Any phone number you want to register
 */
const identifier = "+911234567890";

let addressToRegister = "<USER_ADDRESS>";

let results = await issuer.registerOnChainIdentifier(
    identifier,
    identifierType,
    addressToRegister
);
```

#### De-Registering phone number registered under your own issuer (Using Ethers)

[Code](./ethers/SocialConnect/index.js)

```js
let wallet = new Wallet(process.env.ISSUER_PRIVATE_KEY, provider);

const issuer = new SocialConnectIssuer(wallet, {
    authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
    rawKey: process.env.DEK_PRIVATE_KEY,
});

await issuer.initialize();

const identifierType = IdentifierPrefix.PHONE_NUMBER;

/**
 * Any phone number you want to de-register
 */
const identifier = "+911234567890";

let addressToDeRegister = "<USER_ADDRESS>";

let results = await issuer.deregisterOnChainIdentifier(
    identifier,
    identifierType,
    addressToDeRegister
);
```

#### DeRegistering phone number registered under your own issuer (Using Viem)

[Code](./viem/SocialConnect/index.js)

```js
let account = privateKeyToAccount(process.env.ISSUER_PRIVATE_KEY);

let walletClient = createWalletClient({
    account,
    transport: http(),
    chain,
});

const issuer = new SocialConnectIssuer(walletClient, {
    authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
    rawKey: process.env.DEK_PRIVATE_KEY,
});

await issuer.initialize();

const identifierType = IdentifierPrefix.PHONE_NUMBER;

/**
 * Any phone number you want to de-register
 */
const identifier = "+911234567890";

let addressToDeRegister = "<USER_ADDRESS>";

let results = await issuer.deregisterOnChainIdentifier(
    identifier,
    identifierType,
    addressToDeRegister
);
```

## Support

Please open issue on this repo.
