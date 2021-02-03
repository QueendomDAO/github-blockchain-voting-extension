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
        generateSubmitRequestModal();
        document.getElementById("cancel-request-modal-btn").addEventListener("click", function() {
            document.getElementById("request-modal").remove();
        });

        document.getElementById("request-modal-id").value = poll.getPullId();

        document.getElementById("submit-request-modal-btn").addEventListener("click", async function() {
            let id = document.getElementById("request-modal-id").value;
            if(id > 0) {
                showLoader();
                await submitPullRequest(poll.getId(), id);
                document.getElementById("request-modal").remove();
                hideLoader();
            } else {
                alert("Please insert a valid pull request id!")
            }
        });
    });

    document.getElementById('votePullRequestBtn').addEventListener("click", async function() {
        generateVotingModal();

        document.getElementById("cancel-voting-modal-btn").addEventListener("click", function() {
            document.getElementById("voting-modal").remove();
        });

        document.getElementById("submit-voting-modal-btn").addEventListener("click", async function() {
            let stake = document.getElementById("voting-modal-staking-amount").value;
            let comment = document.getElementById("voting-modal-comment").value;
            let checked = document.getElementById("voting-checkbox").checked;

            if(stake > 0 && comment) {
                showLoader();
                await addVote(poll.getContract(), stake * 100000000, checked);
                await createIssueComment("https://api.github.com/repos/SerQuicky/Example-Cryptosystem/issues/5/comments", comment);
                document.getElementById("voting-modal").remove();
                hideLoader();
            } else {
                alert("The stake amount has to be higher than zero and a comment has to be set!")
            }
        });
    });
}
