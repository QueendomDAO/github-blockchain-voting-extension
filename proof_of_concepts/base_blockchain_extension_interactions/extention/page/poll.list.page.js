async function initPollList(repository) {
    showLoader();
    gotoCard(1);

    while (pollsList.firstChild) {
        pollsList.removeChild(pollsList.lastChild);
    }

    document.getElementById("pollsHeader").innerHTML = "Polls of " + formateName(repository.name);

    const polls = await getPolls(repository);
    console.log(polls);
    polls.forEach(poll => {
        generatePollComponent(poll, repository);
    });
    hideLoader();
}
