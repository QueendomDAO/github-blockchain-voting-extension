function getPolls(repository) {
    return new Promise(async (resolve) => {
        let polls = [];
        let polls_blockchain = [];
        const issues_github = await getRequest('https://api.github.com/repos/' + repository['owner']['login'] + '/' + repository['name'] + '/issues');
        const polls_length = await manager_contract.methods.getPollsLength().call();

        for (let i = 0; i < polls_length; i++) {
            await manager_contract.methods.polls(i).call().then(poll => {
                console.log(poll);
                if (poll['state'] == 2) {
                    polls_blockchain.push(poll);
                }
            });
        }

        for (let i = 0; i < issues_github.length; i++) {
            if (issues_github[i]['state']) {
                if (polls_blockchain.some((poll) => poll['issueId'] == issues_github[i]['id'])) {
                    const poll = polls_blockchain.find((issue) => issue['issueId'] == issues_github[i]['id']);
                    //constructor(id, issueId, pullId, deliverTimestamp, votingTimestamp, contract, title, url) {

                    polls.push(new Poll(poll['id'], poll['issueId'], poll['pqId'], poll['deliverTimestamp'], poll['votingTimestamp'],
                        poll['poll_contract_address'], issues_github[i]['title'], issues_github[i]['url']));
                }
            }
        }

        console.log(polls);
        resolve(polls);
    });
}

function setPollStateInManager(index, state) {
    return new Promise((resolve, reject) => {
        manager_contract.methods.updatePoll(index, state).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: manager_contract_address,
                contractAddress: manager_contract_address,
                gas: gas,
                data: manager_contract.methods.updatePoll(index, state).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then(async (signedTx) => {
                const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

                console.log(sentTx);
                console.log('yooo4');
                resolve(sentTx);

                /* sentTx.on("receipt", receipt => {
                    console.log("Updated the poll with the id " + index + " to the state " + state);
                    resolve(receipt);
                });
                sentTx.on("error", err => {
                    console.log("Could not update the poll with the id " + index + " to the state " + state);
                    reject(err);
                }); */
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}