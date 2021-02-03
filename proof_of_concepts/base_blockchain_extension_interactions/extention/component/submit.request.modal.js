async function generateSubmitRequestModal(pqId) {
    let modalWindow = generateDiv("modal", "request-modal");
    let requestModal = generateDiv("request-modal");

    let requestModalTitle = generateDiv("request-modal-title");
    let requestModalTitleH2 = generateH2("Submit Pull-Request");

    let requestModalBody = generateDiv("request-modal-body");
    let requestModalBodyInput = generateInput("", "request-modal-id", "number", "Pull-Request Id");

    let requestModalActions = generateDiv("modal-actions");
    let requestModalCancel = generateDiv("dark-btn", "cancel-request-modal-btn");
    let requestModalCancelText = generateSpan("Cancel", "");
    let requestModalSubmit = generateDiv("dark-btn", "submit-request-modal-btn");
    let requestModalSubmitText = generateSpan("Submit", "");

    requestModalTitle.appendChild(requestModalTitleH2);

    requestModalBody.appendChild(requestModalBodyInput);

    requestModalCancel.appendChild(requestModalCancelText);
    requestModalSubmit.appendChild(requestModalSubmitText);
    requestModalActions.appendChild(requestModalCancel);
    requestModalActions.appendChild(requestModalSubmit);

    requestModal.appendChild(requestModalTitle);
    requestModal.appendChild(requestModalBody);
    requestModal.appendChild(requestModalActions);

    modalWindow.appendChild(requestModal);
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