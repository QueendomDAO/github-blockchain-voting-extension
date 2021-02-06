async function initIssueAction(issue, repository) { 

    if(issue.getSaveable()) {
        document.getElementById('createBountyBtn').style.display = user.getAdmin() ? "block" : "none";
        document.getElementById('stakeBountyBtn').style.display = "none";
        document.getElementById('claimIssueBtn').style.display = "none";

        document.getElementById('issue-title-container').style.display = "none";
        document.getElementById('issue-stake-container').style.display = "none";

    } else {
        document.getElementById('createBountyBtn').style.display = "none";
        document.getElementById('stakeBountyBtn').style.display = "block";
        document.getElementById('claimIssueBtn').style.display = "block";

        document.getElementById('issue-title-container').style.display = "block";
        document.getElementById('issue-stake-container').style.display = "block";
        
        showLoader();
        const bountySum = await getBounty(issue);
        console.log(bountySum);
        document.getElementById('issue-title').textContent = issue.getTitle();
        document.getElementById('issue-stake').textContent = "Bounty: " + bountySum + " ETH";
        hideLoader();
    }


    openNewView(document.getElementById("issueActionCard"));
    
    document.getElementById('createBountyBtn').addEventListener("click", async function() {
        showLoader();
        const published_contract = await createIssueContract();
        await appendIssueContract(published_contract, issue, repository, generatePollEnd(2), generatePollEnd(6));
        openNewView(document.getElementById("menuCard"));
        hideLoader();
    });

    document.getElementById('stakeBountyBtn').addEventListener("click", async function() {

        generateBountyStakingModal();
        document.getElementById("cancel-bounty-modal-btn").addEventListener("click", function() {
            document.getElementById("bounty-modal").remove();
        });

        document.getElementById("submit-bounty-modal-btn").addEventListener("click", async function() {
            let stake = document.getElementById("bounty-modal-id").value;
            if(stake > 0) {
                showLoader();
                await stakeOnBounty(issue, stake * 1000000000);
                document.getElementById("bounty-modal").remove();
                openNewView(document.getElementById("menuCard"))
                hideLoader();
            } else {
                alert("Please insert a valid number!")
            }
        });


    });

    document.getElementById('claimIssueBtn').addEventListener("click", async function() {
        showLoader();
        await claimIssue(issue, user.getUsername(), 10000000000);
        await setPollStateInManager(issue.getPollId(), 2);
        openNewView(document.getElementById("menuCard"))
        hideLoader();
    });
}
