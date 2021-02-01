function getIssues(repository) {
    return new Promise(async (resolve) => {
        let issues = [];
        let issues_blockchain = [];
        const issues_github = await getRequest('https://api.github.com/repos/' + repository['owner']['login'] + '/' + repository['name'] + '/issues');
        console.log(issues_github);
        const issue_length = await manager_contract.methods.getPollsLength().call();
        console.log(issue_length);

        for (let i = 0; i < issue_length; i++) {
            await manager_contract.methods.polls(i).call().then(poll => {
                console.log(poll);
                console.log(poll['id']);
                issues_blockchain.push(poll);
            });
        }


        for (let i = 0; i < issues_github.length; i++) {
            if (issues_github[i]['state']) {
                if (!issues_blockchain.some((issue) => issue['issueId'] == issues_github[i]['id'])) {
                    issues.push(new Issue(issues_github[i]['id'], issues_github[i]['title'], issues_github[i]['url'], true, ""));
                } else {
                    const issue = issues_blockchain.find((issue) => issue['issueId'] == issues_github[i]['id']);

                    if (issue['state'] == 1) {
                        issues.push(new Issue(issue['issueId'], issues_github[i]['title'], issues_github[i]['url'], false, issues_blockchain[i]['poll_contract_address']));
                    }
                }
            }
        }

        console.log(issues);

        resolve(issues);
    });
}

function createIssueContract() {
    return new Promise(async (resolve, reject) => {
        let deploy_contract = new web3.eth.Contract(JSON.parse(JSON.stringify(poll_contract_abi)));

        let contractTx = deploy_contract.deploy({
            data: bytecode
        });

        const createTransaction = await web3.eth.accounts.signTransaction(
            {
                from: getPublicKey(),
                gas: web3.utils.toHex(12475588),
                gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
                data: await contractTx.encodeABI()
            },
            getPrivateKey()
        );

        const createReceipt = await web3.eth.sendSignedTransaction(
            createTransaction.rawTransaction
        );

        console.log("Poll contract deployed: ", "Contract address " + createReceipt.contractAddress)
        resolve(createReceipt.contractAddress);
    });
}

function appendIssueContract(address, issue, repository, deliveryTime, votingTime) {
    return new Promise((resolve, reject) => {
        manager_contract.methods.addPoll(1, issue.getId(), 1, address, "123", "234").estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: manager_contract_address,
                contractAddress: manager_contract_address,
                gas: gas,
                data: manager_contract.methods.addPoll(1, issue.getId(), 1, address, "123", "234").encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then((signedTx) => {
                const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                sentTx.on("receipt", receipt => {
                    console.log("Poll registered: ", "Registered Poll " + receipt.contractAddress + " under the contract " + manager_contract_address);
                    resolve(receipt);
                });
                sentTx.on("error", err => {
                    console.log("Poll could not be registered: ", receipt.contractAddress + " could not be registered under " + manager_contract_address);
                    reject(err);
                });
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}

/* function addContract(address, issue, repository, deliveryTime, votingTime) {
    return new Promise((resolve, reject) => {
        manager_contract.methods.addPoll(data["rpId"], data["pqId"], address, data["time"]).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: manager_contract_address,
                contractAddress: manager_contract_address,
                gas: gas,
                data: manager_contract.methods.addPoll(data["rpId"], data["pqId"], address, data["time"]).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then((signedTx) => {
                const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                sentTx.on("receipt", receipt => {
                    console.log("Poll registered: ", "Registered Poll " + receipt.contractAddress + " under the contract " + manager_contract_address);
                    resolve(receipt);
                });
                sentTx.on("error", err => {
                    console.log("Poll could not be registered: ", receipt.contractAddress + " could not be registered under " + manager_contract_address);
                    reject(err);
                });
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
} */