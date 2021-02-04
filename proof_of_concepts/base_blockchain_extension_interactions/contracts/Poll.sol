pragma solidity >=0.4.22 <0.8.0;

contract Poll {
    struct Claimer {
        address payable claimer;
        string username;
        uint256 weight;
    }

    struct Vote {
        uint256 id;
        bool decision;
        address payable delegate;
        uint256 weight;
    }

    struct Bounty {
        address payable staker;
        uint256 weight;
    }

    Claimer public claimer;
    Vote[] public votes;
    Bounty[] public bounties;

    constructor() public {
        bounties.push(
            Bounty({
                staker: 0x28CfbA097FF9bb9D904471c493b032Df45B9f953,
                weight: 0
            })
        );

        votes.push(
            Vote({
                id: 0,
                decision: true,
                delegate: 0x28CfbA097FF9bb9D904471c493b032Df45B9f953,
                weight: 0
            })
        );
    }

    function vote(
        bool desc,
        uint256 value,
        address payable addr
    ) public payable {
        votes.push(
            Vote({
                id: votes.length,
                decision: desc,
                delegate: addr,
                weight: value
            })
        );
    }

    function transferStakes(uint256 index, uint256 stake) public payable {
        votes[index].delegate.transfer(stake);
    }

    function addBounty(address payable addr, uint256 value) public payable {
        bounties.push(Bounty({staker: addr, weight: value}));
    }

    function claimIssue(address payable addr, string memory name, uint256 value) public payable {
        claimer = Claimer({claimer: addr, username: name, weight: value});
    }

    function getVotesLength() public view returns (uint256) {
        return votes.length;
    }

    function getBountiesLength() public view returns (uint256) {
        return bounties.length;
    }
}
