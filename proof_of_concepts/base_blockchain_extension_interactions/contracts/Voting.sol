pragma solidity >=0.4.22 <0.8.0;

contract Voting {

    struct Poll {
        string pqLink;
        string pqTitle;
        uint256 proVotes;
        uint256 contraVotes;
    }

    Poll[] public polls;

    constructor() public {
        polls.push(Poll({pqLink: "", pqTitle: "", proVotes: 0, contraVotes: 0}));
    }

    function addNewPoll(string memory _pqLink, string memory _pqTitle) public {
        require(bytes(_pqLink).length > 0, "The link needs to be provided.");
        require(bytes(_pqTitle).length > 0, "The title needs to be provided.");

        polls.push(Poll({pqLink: _pqLink, pqTitle: _pqTitle, proVotes: 0, contraVotes: 0}));
    }

    function getPollsLength() view public returns (uint){
        return polls.length;
    }

    function helloWorld() public pure returns (string memory) {
        return "VOTE: Hallo Nico";
    }
}
