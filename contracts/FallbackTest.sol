//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/**
{fallback} has a 2300 gas limit when called by transfer or send.
 */
contract Fallback {
    event Log1(uint256 gas);
    event Log2(uint256 gas);

    fallback() external payable {
        uint _gasLeft = gasleft();
        console.log(">> gasleft() in fallback: ", _gasLeft);
        emit Log1(_gasLeft);
    }

    function existingMethod() external payable {
        uint _gasLeft = gasleft();
        console.log(">> gasleft() in existingMethod: ", _gasLeft);
        emit Log2(_gasLeft);
    }
}

interface IUndefinedMethods {
    function transferFrom() external payable;
}

interface IFallback {
    function existingMethod() external payable;
}

contract FallbackGasTester {
    address public immutable dest;

    constructor(address dest_) {
        dest = dest_;
    }

    receive() external payable {}

    function test1() external payable{
        console.log("\nCheck calling of undefined method");
        IUndefinedMethods _dest = IUndefinedMethods(dest);
        _dest.transferFrom{value: 0.01 ether}();
    }

    function test2() external payable {
        console.log("\nCheck .transfer()");
        uint _gasLeft = gasleft();
        console.log("gasLeft before .transfer", _gasLeft);

        payable(dest).transfer(0.01 ether);

        _gasLeft = gasleft();
        console.log("gasLeft after .transfer", _gasLeft);
    }

    function test3() external payable {
        console.log("\nCheck calling of defined method");
        IFallback _dest = IFallback(dest);
        _dest.existingMethod{value: 0.01 ether}();
    }

    function test4() external {
        console.log("\nCheck calling of defined method, with specifying gas");
        IFallback _dest = IFallback(dest);
        _dest.existingMethod{gas: 4000}();
    }
}
