function generatePollComponent(poll, repository) {

    console.log(poll);

    let pollElement = document.createElement("div");
    let pollTitle = generateSpan(formateName(poll.getTitle()));
    
    pollElement.classList.add("poll-element");
    pollElement.addEventListener("click", function () {
        initPollAction(poll, repository);
        //initPollAction(poll, repository);
    });
    
    pollElement.appendChild(pollTitle);
    pollsList.appendChild(pollElement);
}