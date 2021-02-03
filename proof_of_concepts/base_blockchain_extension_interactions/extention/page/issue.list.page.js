async function initIssueList(repository) {
    showLoader();
    gotoCard(8);

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
