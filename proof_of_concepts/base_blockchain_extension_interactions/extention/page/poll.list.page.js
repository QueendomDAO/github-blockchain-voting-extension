async function initPollList(repository) {
    showLoader();
    openNewView(document.getElementById("pollsCard"));

    while (pollsList.firstChild) {
        pollsList.removeChild(pollsList.lastChild);
    }

    const polls = await getPolls(repository);
    console.log(polls);
    polls.forEach(poll => {
        generatePollComponent(poll, repository);
    });
    hideLoader();
}
