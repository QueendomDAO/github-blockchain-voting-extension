async function initRepositorySettings(repository, index) {
    showLoader();
    
    gotoCard(index);
    document.getElementById("pollsHeader").innerHTML = "Polls of " + formateName(repository.name);
    const response = await getRequest('https://api.github.com/repos/' + repository['owner']['login'] + '/' + repository['name'] + '/collaborators');

    user.setAdmin(
        response.some(entry => entry['login'] == username) ?
        response.find(entry => entry['login'] == username)['permissions']['admin']
        : false
    );

    console.log(user);
    let showIssuesBtn = document.getElementById("showIssuesBtn");
    showIssuesBtn.addEventListener("click", async function () {
        initIssueList(repository);
    });

    let showPullsBtn = document.getElementById("showPullsBtn");
    showPullsBtn.addEventListener("click", function () {
        gotoCard(3);
        UIappendPollable(pollables, repository);
    });

    hideLoader();
}