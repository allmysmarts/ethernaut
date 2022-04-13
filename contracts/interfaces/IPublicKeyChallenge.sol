//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IPublicKeyChallenge {
    function authenticate(bytes calldata publicKey) external;
}