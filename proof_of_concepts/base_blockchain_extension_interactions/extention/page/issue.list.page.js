async function initIssueList(repository) {
    showLoader();
    openNewView(document.getElementById("issuesCard"));

    while (issuesList.firstChild) {
        issuesList.removeChild(issuesList.lastChild);
    }

    const issues = await getIssues(repository);
    console.log(issues);
    issues.forEach(issue => {
        generateIssueComponent(issue, repository);
    });
    hideLoader();
}
