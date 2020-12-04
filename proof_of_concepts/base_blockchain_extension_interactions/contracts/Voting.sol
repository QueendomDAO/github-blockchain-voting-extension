pragma solidity >=0.4.22 <0.8.0;

contract Voting {
    struct Poll {
        uint256 rpId;
        uint256 pqId;
        string pqLink;
        string pqTitle;
        uint256 proVotes;
        uint256 contraVotes;
        string time;
    }

    Poll[] public polls;

    constructor() public {
        polls.push(
            Poll({
                rpId: 70107786,
                pqId: 19815,
                pqLink: "https://github.com/vercel/next.js/pull/19815",
                pqTitle: "fix: webpack 5 invalid config error",
                proVotes: 0,
                contraVotes: 0,
                time: "174515122020"
            })
        );
        polls.push(
            Poll({
                rpId: 70107786,
                pqId: 19808,
                pqLink: "https://github.com/vercel/next.js/pull/19808",
                pqTitle: "Unify installation scripts for example apps",
                proVotes: 0,
                contraVotes: 0,
                time: "124516122020"
            })
        );
        polls.push(
            Poll({
                rpId: 70107786,
                pqId: 19807,
                pqLink: "https://github.com/vercel/next.js/pull/19807",
                pqTitle: "with-facebook-pixel: remove package and update readme",
                proVotes: 0,
                contraVotes: 0,
                time: "144516122020"
            })
        );
    }

    function addNewPoll(
        uint256 _rpId,
        uint256 _pqId,
        string memory _pqLink,
        string memory _pqTitle
    ) public {
        require(bytes(_pqLink).length > 0, "The link needs to be provided.");
        require(bytes(_pqTitle).length > 0, "The title needs to be provided.");

        polls.push(
            Poll({
                rpId: _rpId,
                pqId: _pqId,
                pqLink: _pqLink,
                pqTitle: _pqTitle,
                proVotes: 0,
                contraVotes: 0,
                time: "144516122020"
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
