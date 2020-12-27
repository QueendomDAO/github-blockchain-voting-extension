pragma solidity >=0.4.22 <0.8.0;

contract Poll {

    struct Vote {
        uint256 id;
        bool decision;
        address delegate;
        uint256 weight;
    }

    Vote[] public votes;
    string timestamp;

    constructor(string memory _timestamp) public {
        timestamp = _timestamp;

        votes.push(
            Vote({
                id: 0,
                decision: true,
                delegate: 0x22A5206a65Aaf639C4d446F29586F0c00e0F7Fa9,
                weight: 0
            })
        );
    }

    function vote(bool desc, uint256 value, address addr) public payable {
        votes.push(
            Vote({
                id: votes.length,
                decision: desc,
                delegate: addr,
                weight: value
            })
        );
    }

    function getVotesLength() public view returns (uint256) {
        return votes.length;
    }
}
