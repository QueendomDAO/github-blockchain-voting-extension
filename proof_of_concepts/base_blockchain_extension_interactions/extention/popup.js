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
            chrome.storage.sync.set({ "acc": acc },function(){
                chrome.storage.sync.get('acc', function (data) {
                    console.log(data);
                    document.getElementById("tempAccOutput").innerHTML="adress: "+ data.acc.address;
                    document.getElementById("tempKeyOutput").innerHTML="key:    "+ data.acc.privateKey;
                });
            });
            // chrome.storage.sync.set({ "key": keystore},function(){
            //     chrome.storage.sync.get('key', function (data) {
            //         document.getElementById("tempKeyOutput").innerHTML=""+data.private_key;
            //     });
            // });
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
/* -------------------------------------------------------------------------------------------
        *                                   check existing values on load
        ------------------------------------------------------------------------------------------- */
        window.addEventListener("load",function(){
            try{
                chrome.storage.sync.get('acc', function (data) {
                    console.log(data);
                    document.getElementById("tempAccOutput").innerHTML="adress: "+ data.acc.address;
                    document.getElementById("tempKeyOutput").innerHTML="key:    "+ data.acc.privateKey;
                }); 
                chrome.storage.sync.get('token', function (data) {
                    document.getElementById("tokenOutput").innerHTML="token: "+ data.token;
                });
            }catch(e){
                console.log(e);
            }
        });
        document.getElementById("tokenBtn").addEventListener("click", () => {
            var tokenInput = document.getElementById("tokenInput").value;
            chrome.storage.sync.set({ token: tokenInput },function(){
                chrome.storage.sync.get('token', function (data) {
                    document.getElementById("tokenOutput").innerHTML="token: "+ data.token;
                });
            });
        });
    
/* -------------------------------------------------------------------------------------------
        *                                   Menu Navigation
        ------------------------------------------------------------------------------------------- */
        var cardArray=[
        document.getElementById("menuCard"),
        document.getElementById("pollsCard"),
        document.getElementById("repoCard"),
        document.getElementById("pullCard"),
        document.getElementById("walletCard")
        ]
        document.getElementById("gotoRepoBtn").addEventListener("click",function(){gotoCard(2)});
        document.getElementById("gotoWalletBtn").addEventListener("click",function(){gotoCard(4)});
        document.getElementById("gotoPollsBtn").addEventListener("click",function(){gotoCard(1)});
        document.getElementById("gotoPullBtn").addEventListener("click",function(){gotoCard(3)});
        var backBtns = document.getElementsByClassName("backBtn");
        for (let i = 0; i < backBtns.length; i++) {
            backBtns[i].addEventListener("click",function(){gotoCard(0)});
        }
        
        function gotoCard(index){
            console.log("change card");
            cardArray.forEach(element => {
                element.style.display="none";
            });
            cardArray[index].style.display="block";
        }
        //add to repository list
        var pollsList = document.getElementById("repoList");
        function addRepo(name, pullCount,url){
            var repoEntry = document.createElement("div");
            repoEntry.classList.add("repoEntry");
            repoEntry.innerHTML=name +"["+pullCount+"]";
            repoEntry.addEventListener("click",function(){window.location = url;});
            console.log(repoEntry);
            console.log(repoList);
            pollsList.appendChild(repoEntry);
        }
        //TEMP BUTTON
        document.getElementById("tempAddPoll").addEventListener("click", function(){getRepos();});//addRepo("test",2)});

        async function getRepos(){
            // const headers ={
            //     "Authorization":
            // }

            const url = "https://api.github.com/users/LeviiOnGit/repos";
            const response = await fetch(url);
            const result = await response.json();
            console.log(result[0].full_name);
            result.forEach(i=>{addRepo(i.full_name,4,i.html_url)});
            //await addRepo(result.name,4,result.html_url);
        }
