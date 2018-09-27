pragma solidity ^0.4.23;

contract EtherLogin {

    mapping (address=>bool) private registered;

    function register() public {
        registered[msg.sender] = true;
    }

    function unregister() public {
        registered[msg.sender] = false;
    }

    function valify(bytes sig, bytes data) public view returns (bool) {
        bytes32 dataHash = keccak256(data);
        bytes32 prefixedHash = keccak256("\x19Ethereum Signed Message:\n32", dataHash);

        address recovered = getRecoveredAddress(sig, prefixedHash);
        return registered[recovered];
    }    

    function getRecoveredAddress(bytes sig, bytes32 dataHash)
        public
        view
        returns (address addr)
    {
        bytes32 ra;
        bytes32 sa;
        uint8 va;

        // Check the signature length
        if (sig.length != 65) {
            return (0);
        }

        // Divide the signature in r, s and v variables
        assembly {
            ra := mload(add(sig, 32))
            sa := mload(add(sig, 64))
            va := byte(0, mload(add(sig, 96)))
        }

        if (va < 27) {
            va += 27;
        }

        address recoveredAddress = ecrecover(dataHash, va, ra, sa);

        return (recoveredAddress);
    }

}