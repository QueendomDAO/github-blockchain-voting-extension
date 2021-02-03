async function initPollAction(poll, repository) { 
    gotoCard(10);

    let single_poll_contract = new web3.eth.Contract(poll_contract_abi, poll.getContract());
    let claimer = await single_poll_contract.methods.claimer().call();
    console.log(claimer);
    console.log(claimer['username']);

    document.getElementById('submitPullRequestBtn').style.display = "none";
    document.getElementById('votePullRequestBtn').style.display = "none";

    if(claimer['username'] == user.getUsername()) {
        document.getElementById('submitPullRequestBtn').style.display = "block";
    }

    if(poll.getPullId() > 0) {
        document.getElementById('votePullRequestBtn').style.display = "block";
    }

    document.getElementById('submitPullRequestBtn').addEventListener("click", async function() {
        showLoader();
        await stakeOnBounty(issue, 10000000000);
        hideLoader();
    });
}
