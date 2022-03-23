//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/**
Prior to Solidity 0.8.0, arithmetic operations would always wrap in case of under- 
or overflow leading to widespread use of libraries that introduce additional checks.
Since Solidity 0.8.0, all arithmetic operations revert on over- and underflow by default, 
thus making the use of these libraries unnecessary.
To obtain the previous behaviour, an unchecked block can be used:
 */
contract OverflowTest {
    function checkedSub(uint256 a, uint256 b) external pure returns (uint256 c) {
        c = a - b;
    }

    function uncheckedSub(uint256 a, uint256 b) external pure returns (uint256 c) {
        unchecked {
            c = a - b;
        }
    }
}
