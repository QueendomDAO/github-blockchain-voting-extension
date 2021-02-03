async function initPollList(repository) {
    showLoader();
    gotoCard(1);

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
