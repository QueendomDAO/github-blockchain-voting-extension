/* 1. Holle alle Polls aus dem Poll-Manager
2. Filtere nach Polls wo die Voting-Zeit < Jetzt ist
3. ForEach Poll
    1. Wurde eine PQ eingereicht?
        1. Nein
            1. Bounty wieder eröffnen
            2. Pfand des Developers in die Bounty packen
        2. Ja
            1. Alle votes auswerten
                1. Pros haben Mehrheit
                    1. Loser stakest an Developer und Pro Staker (20 / 80) verteilen
                    2. Bounty an Developer senden
                2. Contra haben „Mehrheit“
                    1. Loser stake geht (100) an die Contra Staker 
                    2. Bounty wieder eröffnen
                    3. Pfand des Developers in die Bounty */

function initAdvancedStart() {
    return new Promise(async (resolve) => {
        let polls = await filterPolls();

        for(let i = 0; i < polls.length; i++) {
            console.log(polls[i]);
            if(parseInt(polls[i]['pqId'])) {
                let eval = await evaluateVotes(polls[i]);
                console.log(eval);
                await resolvePoll(eval['result'], eval['winnerStake'], eval['allStakes'], polls[i]);
                await setPollStateInManager(polls[i]['id'], 0);
                console.log("The contract " + polls[i]['poll_contract_address'] + " was resolved!");
            } else {
                if(polls[i]['state'] == 2) {
                    await resetToBountyProcess(polls[i]);
                }
            }
        }
        resolve();
    });
}

function filterPolls() {
    return new Promise(async (resolve) => {
        let polls_blockchain = [];
        const poll_length = await manager_contract.methods.getPollsLength().call();

        for (let i = 0; i < poll_length; i++) {
            await manager_contract.methods.polls(i).call().then(poll => {
                console.log(getCurrentDate() + " vs " + poll['votingTimestamp']);
                if(poll['state'] != 0 && (getCurrentDate() > poll['votingTimestamp'])) {
                    polls_blockchain.push(poll);
                }
            });
        }

        console.log(polls_blockchain);
        resolve(polls_blockchain);
    });
}

function evaluateVotes(poll) {
    return new Promise(async (resolve) => {
        console.log(poll['poll_contract_address']);
        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, poll['poll_contract_address']);
        let votes_length = await single_poll_contract.methods.getVotesLength().call();

        let proWeight = 0;
        let contraWeight = 0;

        for (let i = 0; i < votes_length; i++) {
            await single_poll_contract.methods.votes(i).call().then(vote => {
                if(vote['decision']) {
                    proWeight += parseInt(vote['weight']);
                } else {
                    contraWeight += parseInt(vote['weight']);
                }
            });
        }

        resolve({"result": proWeight > contraWeight, 
                "allStakes": proWeight + contraWeight, 
                "winnerStake": proWeight > contraWeight ? proWeight : contraWeight });
    });
}

function resolvePoll(result, winnerStake, allStakes, poll) {
    return new Promise(async (resolve) => {
        console.log(result);
        console.log(winnerStake);
        console.log(allStakes);
        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, poll["poll_contract_address"]);
        let votes_length = await single_poll_contract.methods.getVotesLength().call();

        for(let i = 0; i < votes_length; i++) {
            await single_poll_contract.methods.votes(i).call().then(async vote => {
                if(vote['weight'] != 0) {
                    if(result == vote['decision']) {
                        const weight = Math.round(((parseInt(vote['weight']) / winnerStake) * allStakes));
                        await transferFunds(poll["poll_contract_address"], vote['id'], weight, vote['delegate']);
                    }
                }
            });
        }

        resolve();
    })
}

function resetToBountyProcess(poll) {
    return new Promise(async (resolve) => {
        await resetClaimer(poll['poll_contract_address']);
        await setPollStateInManager(poll['id'], 1);
        resolve();
    });
}

function resetClaimer(address) {
    return new Promise(async (resolve, reject) => {

        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, address);

        single_poll_contract.methods.resetClaim().estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: address,
                contractAddress: address,
                gas: gas,
                data: single_poll_contract.methods.resetClaim().encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then(async (signedTx) => {
                const sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

                console.log(sentTx);
                resolve(sentTx);
                
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}

function transferFunds(address, index, value, delegate) {
    return new Promise(async (resolve, reject) => {

        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, address);
        single_poll_contract.methods.transferStakes(index, value).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: address,
                contractAddress: address,
                gas: gas,
                data: single_poll_contract.methods.transferStakes(index, value).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then(async (signedTx) => {
                const sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                console.log("Stake was transfered: ", "The winnerstake of " + value + " was transfered to " + delegate);
                console.log(sentTx);
                resolve(sentTx);
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}