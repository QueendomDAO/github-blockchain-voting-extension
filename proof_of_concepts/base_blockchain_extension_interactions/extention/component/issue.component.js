function generateIssueComponent(issue, repository) {
    let issueElement = document.createElement("div");
    let issueTitle = generateSpan(formateName(issue.getTitle()));
    
    issueElement.classList.add("issue-element");
    issueElement.addEventListener("click", function () {
        initIssueAction(issue, repository);
    });
    
    issueElement.appendChild(issueTitle);
    issuesList.appendChild(issueElement);
}