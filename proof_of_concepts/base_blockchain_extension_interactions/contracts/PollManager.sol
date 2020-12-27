pragma solidity >=0.4.22 <0.8.0;

contract PollManager {
    struct Poll {
        uint256 id;
        string poll_contract_address;
        bool open;
    }



    Poll[] public polls;


    constructor() public {
        polls.push(
            Poll({
                id: 0,
                poll_contract_address: "0x0",
                open: false
            })
        );
    }

    function getPollsLength() public view returns (uint256) {
        return polls.length;
    }

    function helloWorld() public pure returns (string memory) {
        return "VOTE: Hallo Nico";
    }
}
