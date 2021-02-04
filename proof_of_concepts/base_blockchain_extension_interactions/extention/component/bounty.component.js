async function generateBountyStakingModal() {
    let modalWindow = generateDiv("modal", "bounty-modal");
    let bountyModal = generateDiv("bounty-modal");

    let bountyModalTitle = generateDiv("bounty-modal-title");
    let bountyModalTitleH2 = generateH2("Add bounty");

    let bountyModalBody = generateDiv("bounty-modal-body");
    let bountyModalBodyInput = generateInput("", "bounty-modal-id", "number", "Staking amount (1 = 1e9)");

    let bountyModalActions = generateDiv("modal-actions");
    let bountyModalCancel = generateDiv("dark-btn", "cancel-bounty-modal-btn");
    let bountyModalCancelText = generateSpan("Cancel", "");
    let bountyModalSubmit = generateDiv("dark-btn", "submit-bounty-modal-btn");
    let bountyModalSubmitText = generateSpan("Submit", "");

    bountyModalTitle.appendChild(bountyModalTitleH2);

    bountyModalBody.appendChild(bountyModalBodyInput);

    bountyModalCancel.appendChild(bountyModalCancelText);
    bountyModalSubmit.appendChild(bountyModalSubmitText);
    bountyModalActions.appendChild(bountyModalCancel);
    bountyModalActions.appendChild(bountyModalSubmit);

    bountyModal.appendChild(bountyModalTitle);
    bountyModal.appendChild(bountyModalBody);
    bountyModal.appendChild(bountyModalActions);

    modalWindow.appendChild(bountyModal);
    document.getElementById("deVote-container").appendChild(modalWindow);

    /* <div class="modal-window overlay">
      <div class="voting-modal">
        <div class="voting-modal-title">
          <h2>Pull-Request Voting</h2>
        </div>
        <div class="voting-modal-body">
          <input type="number" placeholder="Staking amount">
          <input type="text" placeholder="Comment">
          <label class="container">For this pull request
            <input type="checkbox" checked="checked">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="modal-actions">
          <div id="cancel-voting-modal-btn" class="dark-btn">
            <span>Cancel</span>
          </div>
          <div id="submit-voting-modal-btn" class="dark-btn">
            <span>Submit</span>
          </div>
        </div>
      </div>
    </div>  */
}