pragma solidity ^0.4.24;

contract EthereumLogin {

    mapping (address=>bool) private registered;

    function register() public {
        registered[msg.sender] = true;
    }

    function unregister() public {
        registered[msg.sender] = false;
    }

    function verify(address _address) public view returns (bool) {
        return registered[_address];
    }    

}