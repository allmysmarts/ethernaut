const { expect } = require("chai");
const {ethers} = require("hardhat");

async function main() {
    /// @dev it is process to get public k
    const firstTxHash = `0xabc467bedd1d17462fcc7942d0af7874d6f8bdefee2b299c9168a216d3ff0edb`;
    const firstTx = await ethers.provider.getTransaction(firstTxHash);
    console.log(`firstTx: `, JSON.stringify(firstTx, null, 4));

    // Get original message of r,s,v being included in firstTxHash
    const txData = {
        gasPrice: firstTx.gasPrice,
        gasLimit: firstTx.gasLimit,
        value: firstTx.value,
        nonce: firstTx.nonce,
        data: firstTx.data,
        to: firstTx.to,
        chainId: firstTx.chainId,
    };
    const signingData = ethers.utils.serializeTransaction(txData);
    console.log(`Serialized Data: `, signingData)
    const msgHash = ethers.utils.keccak256(signingData);
    console.log(`Message Hash: `, msgHash)

    // recover public key by ecrecover with original message, and signature
    const signature = { r: firstTx.r, s: firstTx.s, v: firstTx.v };
    let rawPublicKey = ethers.utils.recoverPublicKey(msgHash, signature);

    const compressedPublicKey = ethers.utils.computePublicKey(rawPublicKey, true);
    console.log(`     raw  public key: `, rawPublicKey)
    console.log(`     comp public key: `, compressedPublicKey)
    // need to strip of the 0x04 prefix indicating that it's a raw public key
    expect(rawPublicKey.slice(2, 4), "not a raw public key").to.equal(`04`);
    rawPublicKey = `0x${rawPublicKey.slice(4)}`;
    console.log(`Recovered public key:  ${rawPublicKey}`);

    challengeContract = await ethers.getContractAt(
      "IPublicKeyChallenge",
      "0xC1F5155BEB285ab9D67954Be3c91F27659d7c6Bf"  // your challege contract address
    );
    await challengeContract.authenticate(rawPublicKey)
    console.log("Done.")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
