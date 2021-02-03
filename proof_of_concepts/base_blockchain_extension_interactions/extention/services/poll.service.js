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