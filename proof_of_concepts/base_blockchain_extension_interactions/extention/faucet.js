function initWalletWithGas(web3, from, to, private_key) {
    const tx = {
        from: from,
        to: to,
        gas: 1287794,
        value: '10000000000000000'
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, private_key);

    signPromise.then((signedTx) => {
        const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
        sentTx.on("receipt", receipt => {
            console.log(receipt);
        });
        sentTx.on("error", err => {
            console.log(err);
        });
    }).catch(error => console.log(error));
}
