async function initIssueAction(issue, repository) { 
    if(issue.getSaveable()) {
        document.getElementById('createBountyBtn').style.display = "block";
        document.getElementById('stakeBountyBtn').style.display = "none";
        document.getElementById('claimIssueBtn').style.display = "none";
    } else {
        document.getElementById('createBountyBtn').style.display = "none";
        document.getElementById('stakeBountyBtn').style.display = "block";
        document.getElementById('claimIssueBtn').style.display = "block";
    }

    gotoCard(10);

    document.getElementById('createBountyBtn').addEventListener("click", async function() {
        showLoader();
        const published_contract = await createIssueContract();
        await appendIssueContract(published_contract, issue, repository, "5", "6");
        hideLoader();
    });
}
