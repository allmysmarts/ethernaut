# Breaking test of {Solidity} language

This project aims to understand {Solidity} much better by examples.

Please check `contracts/` and `scripts/`.

## Basic Tests

- fallback

```
npx hardhat --network ropsten run scripts/fallback-tester.js
```

- overflow

```
npx hardhat --network ropsten run scripts/overflow-tester.js
```

## Challenges from CaptureTheEther.com
- https://capturetheether.com/challenges/accounts/fuzzy-identity/

```
npx hardhat --network ropsten run scripts/fuzzyIdentityAttack.js
```

- https://capturetheether.com/challenges/accounts/public-key/

```
npx hardhat --network ropsten run scripts/getPublicKey.js
```
