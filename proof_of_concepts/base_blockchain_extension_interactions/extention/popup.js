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
//var contract_address = '0x5C033433987134017A9b7a42673F6A62d673Df3b';
var contract_address = '0xaa857387aca2a3EE8DA8A7bab79D6f5abD83E548';
var github_token = '885e5ef4f0e52acc01114965406666af8897921b';

var contract_polls = [];
var starred_repos = [];
var pull_requests = [];
var pollable_pqs = [];
var username = "SerQuicky";

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
                "internalType": "uint256",
                "name": "rpId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pqId",
                "type": "uint256"
            },
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
            },
            {
                "internalType": "string",
                "name": "time",
                "type": "string"
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
                "internalType": "uint256",
                "name": "_rpId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_pqId",
                "type": "uint256"
            },
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

// #1 - Aufruf hole alle Smart Contract polls
getContractPolls();

// #2 - Aufruf hole alle gefolgten Repositories
getRequest('https://api.github.com/users/LeviiOnGit/starred')
    .then(data => starred_repos = data)
    .catch(error => console.error(error));

// #4 - Aufruf hole Pull Requests des ausgewählten Repos
getRequest('https://api.github.com/repos/LeviiOnGit/ubuu/pulls')
    .then(data => pull_requests = data)
    .catch(error => console.error(error));

setTimeout(() => {
    console.log(pull_requests);

    // #3 - Aufruf kombiniere Polls und Repositories
    combinePollsAndRepos();

    // #5 - Aufruf überprüfe ob Pull Requests bereits als Poll liefen/laufen
    getPollableRequests();


    console.log("polls", contract_polls);
    console.log("repos", starred_repos);
    console.log("pollable requests", pollable_pqs);
    starred_repos.forEach(e => {
        addRepo(e.name,e.openPolls.length,e.url);
    });
    pollable_pqs.forEach(e => {
        addpull(e.pq.title,e.pq.url);
    });
}, 2000)

/* -------------------------------------------------------------------------------------------
*                                   Github calls
------------------------------------------------------------------------------------------- */
// const headers = {
//     "Authorization": "Token "+github_token
// }

function getPollableRequests() {
    for (let i = 0; i < pull_requests.length; i++) {
        let was_found = false;
        let contract_index = 0;

        for (let j = 0; j < contract_polls.length; j++) {
            if (pull_requests[i]['id'] == contract_polls[j][1]) {
                was_found = true
                contract_index = j;
            }
        }

        if (!was_found && pull_requests[i]['state'] == "open") {
            pollable_pqs.push({ pq: pull_requests[i], poll: contract_polls[contract_index] });
        }
    }
}

function combinePollsAndRepos() {
    for (let i = 0; i < starred_repos.length; i++) {
        starred_repos[i]['openPolls'] = [];

        for (let j = 0; j < contract_polls.length; j++) {
            if (starred_repos[i]['id'] == contract_polls[j][0]) {
                starred_repos[i]['openPolls'].push(contract_polls[j]);
                
            }
        }
    }
}


function getRequest(url) {
    return fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: new Headers({
            'User-agent': 'Mozilla/4.0 Custom User Agent',
            "Authorization": "Bearer " + github_token,
        }),
    })
        .then(response => response.json()) //Converting the response to a JSON object
}


function getContractPolls() {
    contract.methods.getPollsLength().call().then(async (res) => {
        console.log(res);

        for (let i = 0; i < res; i++) {
            await contract.methods.polls(i).call().then(poll => {
                contract_polls.push(poll);
                console.log(poll);
                addVote(poll.time,poll.pqTitle,poll.pqLink);
            });
        }

    }).catch(err => console.log(err));
}

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
    addPoll(10, 10, "PQ-Test-URL", "PQ-Test-Name");
});

document.getElementById("btn-gen-keys").addEventListener("click", () => {
    genKeys();
})


/* -------------------------------------------------------------------------------------------
*                                   make a transaction
------------------------------------------------------------------------------------------- */

function addPoll(rpId, pqId, pqLink, pqTitle) {
    contract.methods.addNewPoll(rpId, pqId, pqLink, pqTitle).estimateGas({ from: public_address }).then(gas => {

        const tx = {
            from: public_address,
            to: contract_address,
            gas: gas,
            data: contract.methods.addNewPoll(rpId, pqId, pqLink, pqTitle).encodeABI()
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
window.addEventListener("load", function () {
    try {
        chrome.storage.sync.get('acc', function (data) {
            console.log(data.acc);
            if (data.acc) {
                document.getElementById("tempAccOutput").innerHTML = "adress: " + data.acc.address;
                document.getElementById("tempKeyOutput").innerHTML = "key:    " + data.acc.privateKey;
            }
        });
        chrome.storage.sync.get('token', function (data) {
            document.getElementById("tokenOutput").innerHTML = "token: " + data.token;
        });
    } catch (e) {
        console.log(e);
    }
    gotoCard(5);
});
document.getElementById("tokenBtn").addEventListener("click", () => {
    var tokenInput = document.getElementById("tokenInput").value;
    chrome.storage.sync.set({ token: tokenInput }, function () {
        chrome.storage.sync.get('token', function (data) {
            document.getElementById("tokenOutput").innerHTML = "token: " + data.token;
        });
    });
});
document.getElementById("loginBtn").addEventListener("click", () => {
    username = document.getElementById("userInput").value;
    document.getElementById("username").innerHTML=" Logged in as: "+username;
    console.log(username);
    gotoCard(0);
});
document.getElementById("gotoLoginBtn").addEventListener("click", () => {
    gotoCard(5);
});

/* -------------------------------------------------------------------------------------------
        *                                   Menu Navigation
        ------------------------------------------------------------------------------------------- */
var cardArray = [
    document.getElementById("menuCard"),
    document.getElementById("pollsCard"),
    document.getElementById("repoCard"),
    document.getElementById("pullCard"),
    document.getElementById("walletCard"),
    document.getElementById("loginCard")
]
document.getElementById("gotoRepoBtn").addEventListener("click", function () { gotoCard(2) });
document.getElementById("gotoWalletBtn").addEventListener("click", function () { gotoCard(4) });
document.getElementById("gotoPollsBtn").addEventListener("click", function () { gotoCard(1) });
document.getElementById("gotoPullBtn").addEventListener("click", function () { gotoCard(3) });
var backBtns = document.getElementsByClassName("backBtn");
for (let i = 0; i < backBtns.length; i++) {
    backBtns[i].addEventListener("click", function () { gotoCard(0) });
}

function gotoCard(index) {
    console.log("change card");
    cardArray.forEach(element => {
        element.style.display = "none";
    });
    cardArray[index].style.display = "block";
    if(index==5){
        document.getElementById("loggedAsDiv").style.display="none";
    }else{
        document.getElementById("loggedAsDiv").style.display="block";
    }
}
//add to repository list
var reposList = document.getElementById("repoList");
var pollsList = document.getElementById("pollsList");
var pullList = document.getElementById("pullList");

function addRepo(name, pullCount, url) {
    console.log("ADDED REPO");
    var repoEntry = document.createElement("div");
    repoEntry.classList.add("repoEntry");
    repoEntry.innerHTML = name + "[" + pullCount + "]";
    repoEntry.addEventListener("click", function () { window.location = url; });
    console.log(repoEntry);
    console.log(repoList);
    repoList.appendChild(repoEntry);
}
function addVote(time, name, url) {
    var voteEntry = document.createElement("div");
    voteEntry.classList.add("voteEntry");
    var voteTime = document.createElement("div");
    voteTime.innerHTML = time;
    voteEntry.appendChild(voteTime);

    var voteBody = document.createElement("div");
    voteBody.innerHTML = name;
    var confirmBtn = document.createElement("BUTTON");
    confirmBtn.innerHTML = "YES";
    confirmBtn.addEventListener("click", function(){
        //TODO vote yes
    });
    var denyBtn = document.createElement("BUTTON");
    denyBtn.innerHTML = "NO";
    denyBtn.addEventListener("click", function(){
        //TODO vote no
    });
    var linkBtn = document.createElement("BUTTON");
    linkBtn.innerHTML = "GOTO";
    linkBtn.addEventListener("click", function(){
        //TODO goto url
        window.open(url,"_blank");
    });
    voteBody.appendChild(document.createElement("BR"));
    voteBody.appendChild(confirmBtn);
    voteBody.appendChild(denyBtn);
    voteBody.appendChild(linkBtn);
    voteEntry.appendChild(voteBody);
    pollsList.appendChild(voteEntry);
}

function addpull(name,url){
    var pullEntry = document.createElement("div");
    pullEntry.innerHTML=name;
    var linkBtn = document.createElement("BUTTON");
    pullEntry.appendChild(linkBtn);
    pullList.appendChild(pullEntry);
}



//TEMP BUTTON
document.getElementById("tempAddPoll").addEventListener("click", function () { getRepos(); });//addRepo("test",2)});

// async function getRepos() {
//     // const headers ={
//     //     "Authorization":
//     // }

//     // const url = "https://api.github.com/users/LeviiOnGit/repos";
//     // const url = "https://raw.githubusercontent.com/LeviiOnGit/ubuu/master/Eigene%20Version/index.html";
//     const url = "http://api.github.com/repos/LeviiOnGit/ubuu/git/branches/master/Eigene%20Version";
//     const response = await fetch(url);
//     const result = await response.json();
//     console.log(result);
//     // console.log(result[0].full_name);
//     // result.forEach(i=>{addRepo(i.full_name,4,i.html_url)});
//     //await addRepo(result.name,4,result.html_url);
// }
async function getRepos() {

    const url = "https://api.github.com/users/LeviiOnGit/repos";
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);

}

