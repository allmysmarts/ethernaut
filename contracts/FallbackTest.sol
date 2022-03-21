//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Fallback {
    event Log1(uint256 gas);
    event Log2(uint256 gas);

    fallback() external payable {
        uint _gasLeft = gasleft();
        console.log("gasleft() in fallback: ", _gasLeft);
        emit Log1(_gasLeft);
    }

    function existingMethod() external payable {
        uint _gasLeft = gasleft();
        console.log("gasleft() in existingMethod: ", _gasLeft);
        emit Log2(_gasLeft);
    }
}

interface INotExistingContract {
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
        INotExistingContract _dest = INotExistingContract(dest);
        _dest.transferFrom{value: 0.01 ether}();
    }

    function test2() external payable {
        uint _gasLeft = gasleft();
        console.log("before test2()", _gasLeft);

        payable(dest).transfer(0.01 ether);

        _gasLeft = gasleft();
        console.log("after test2()", _gasLeft);
    }

    function test3() external payable{
        IFallback _dest = IFallback(dest);
        _dest.existingMethod{value: 0.01 ether}();
    }
}
