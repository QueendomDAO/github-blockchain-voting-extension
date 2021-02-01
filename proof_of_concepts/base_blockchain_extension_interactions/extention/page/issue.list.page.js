async function initIssueList(repository) { 
    showLoader();
    gotoCard(9);

    issuesList.textContent = '';
    document.getElementById("issueHeader").textContent = "Open issues of " + formateName(repository.name);
    const issues = await getIssues(repository);
    issues.forEach(issue => {
        generateIssueComponent(issue, repository);
    });
    hideLoader();
}
