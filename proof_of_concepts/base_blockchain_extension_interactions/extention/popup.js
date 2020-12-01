// var web3 = new Web3("https://sokol.poa.network");
// console.log(web3);

// web3.eth.getBlock(3150).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log("error");
// });
//document.getElementById("output").html=web3;
// var changeColor = document.getElementById('changeColor');

//     chrome.storage.sync.get('color', function (data) {
//         changeColor.style.backgroundColor = data.color;
//         changeColor.setAttribute('value', data.color);
//     });
//     changeColor.onclick = function(element) {
//         var myResult;
//         web3.eth.getBlock(3150).then((result) => {
//             changeColor.innerHTML=result.author;
//         }).catch((err) => {
//             console.log("error");
//         });
        
//         let color = element.target.value;
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//           chrome.tabs.executeScript(
//               tabs[0].id,
//               {code: 'document.body.innerHTML = "' + myResult + '";'});
//         });
//       };
/* -------------------------------------------------------------------------------------------
        *                                   env settings
        ------------------------------------------------------------------------------------------- */
        var public_address = '0x28CfbA097FF9bb9D904471c493b032Df45B9f953';
        var private_key = 'f1d57d756f7a47c3e70b740acf95b38611a26b81c7a0cff7de872ab306ae35d0';
        var provider = 'https://sokol.poa.network';
        var contract_address = '0x5C033433987134017A9b7a42673F6A62d673Df3b';
        var contract_abi = [
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "polls",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "pqLink",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "pqTitle",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "proVotes",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "contraVotes",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_pqLink",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_pqTitle",
                        "type": "string"
                    }
                ],
                "name": "addNewPoll",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getPollsLength",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "helloWorld",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            }
        ];

        /* -------------------------------------------------------------------------------------------
        *                                   init web3js
        ------------------------------------------------------------------------------------------- */

        web3 = new Web3(provider);
        contract = new this.web3.eth.Contract(contract_abi, contract_address);
        account = web3.eth.accounts.privateKeyToAccount(private_key);
        web3.eth.getAccounts().then(res => {
            console.log(res);
        });


        getPollNumbers();
        /* -------------------------------------------------------------------------------------------
        *                                   make calls
        ------------------------------------------------------------------------------------------- */

        function getNormalText() {
            contract.methods.helloWorld().call().then(res => {
                console.log(res);
            }).catch(err => console.log(err));
        }

        function getPollNumbers() {
            contract.methods.getPollsLength().call().then(res => {
                document.getElementById("text").innerText = "Number of polls: " + res;
            }).catch(err => console.log(err));
        }

        function genKeys() {
            let acc = web3.eth.accounts.create(web3.utils.randomHex(32));
            let wallet = web3.eth.accounts.wallet.add(acc);
            let keystore = wallet.encrypt(web3.utils.randomHex(32));

            // save adress and private key in the persistant storage
            console.log(acc);
        }

        document.getElementById("btn-add-poll").addEventListener("click", () => {
            addPoll("PQ-Test-URL", "PQ-Test-Name");
        });

        document.getElementById("btn-gen-keys").addEventListener("click", () => {
            genKeys();
        })


        /* -------------------------------------------------------------------------------------------
        *                                   make a transaction
        ------------------------------------------------------------------------------------------- */

        function addPoll(pqLink, pqTitle) {
            contract.methods.addNewPoll(pqLink, pqTitle).estimateGas({ from: public_address }).then(gas => {

                const tx = {
                    from: public_address,
                    to: contract_address,
                    gas: gas,
                    data: contract.methods.addNewPoll(pqLink, pqTitle).encodeABI()
                };

                const signPromise = web3.eth.accounts.signTransaction(tx, private_key);

                signPromise.then((signedTx) => {
                    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                    sentTx.on("receipt", receipt => {
                        console.log(receipt);
                        getPollNumbers()
                    });
                    sentTx.on("error", err => {
                        console.log(err);
                    });
                }).catch(error => console.log(error));
            }).catch(error => console.log(error));
        }


        function sendTest() {
            const tx = {
                from: public_address,
                to: '0xA9126c7dAa5431D2379dEA9e9C3eFc37f35e58AB',
                gas: 1287794,
                value: '1000000000'
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, private_key);

            signPromise.then((signedTx) => {
                const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                sentTx.on("receipt", receipt => {
                    console.log(receipt);
                    getCounter()
                });
                sentTx.on("error", err => {
                    console.log(err);
                });
            }).catch(error => console.log(error));
        }
