/* -------------------------------------------------------------------------------------------
*                                   env settings
------------------------------------------------------------------------------------------- */
var public_address = '0x28CfbA097FF9bb9D904471c493b032Df45B9f953';
var private_key = 'f1d57d756f7a47c3e70b740acf95b38611a26b81c7a0cff7de872ab306ae35d0';
var provider = 'https://sokol.poa.network';
var contract_address = '0x37b76Ac8E1ea91fc4b6742f2Bd442faf5BDdD645';
var manager_contract_address = '0x37b76Ac8E1ea91fc4b6742f2Bd442faf5BDdD645';
let bytecode = '608060405234801561001057600080fd5b50600460405180604001604052807328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff1681526020016000815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155505060036040518060800160405280600081526020016001151581526020017328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff168152602001600081525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600201555050610940806101d66000396000f3fe60806040526004361061007b5760003560e01c8063899a1e361161004e578063899a1e36146101b9578063d379be2314610207578063dc2f8744146102bb578063e8c35c72146103275761007b565b8063267e6529146100805780635ab77cb3146100ab5780635df81330146100e357806361ebccfd1461015f575b600080fd5b34801561008c57600080fd5b5061009561040c565b6040518082815260200191505060405180910390f35b6100e1600480360360408110156100c157600080fd5b810190808035906020019092919080359060200190929190505050610419565b005b3480156100ef57600080fd5b5061011c6004803603602081101561010657600080fd5b81019080803590602001909291905050506104a2565b6040518085815260200184151581526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b6101b76004803603606081101561017557600080fd5b8101908080351515906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061050c565b005b610205600480360360408110156101cf57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105f7565b005b34801561021357600080fd5b5061021c6106a4565b604051808473ffffffffffffffffffffffffffffffffffffffff16815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b8381101561027e578082015181840152602081019050610263565b50505050905090810190601f1680156102ab5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b3480156102c757600080fd5b506102f4600480360360208110156102de57600080fd5b8101908080359060200190929190505050610774565b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b61040a6004803603606081101561033d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561037a57600080fd5b82018360208201111561038c57600080fd5b803590602001918460018302840111640100000000831117156103ae57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001909291905050506107c5565b005b6000600380549050905090565b6003828154811061042657fe5b906000526020600020906003020160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561049d573d6000803e3d6000fd5b505050565b600381815481106104af57fe5b90600052602060002090600302016000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b60036040518060800160405280600380549050815260200185151581526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018481525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600201555050505050565b600460405180604001604052808473ffffffffffffffffffffffffffffffffffffffff16815260200183815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015550505050565b60008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107645780601f1061073957610100808354040283529160200191610764565b820191906000526020600020905b81548152906001019060200180831161074757829003601f168201915b5050505050908060020154905083565b6004818154811061078157fe5b90600052602060002090600202016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b60405180606001604052808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152506000808201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101908051906020019061085a92919061086d565b5060408201518160020155905050505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106108ae57805160ff19168380011785556108dc565b828001600101855582156108dc579182015b828111156108db5782518255916020019190600101906108c0565b5b5090506108e991906108ed565b5090565b5b808211156109065760008160009055506001016108ee565b509056fea264697066735822122097c2184639db00f656487a7a8db69d3ccfb77eedd0eb5dbd3974d176dcc7dea164736f6c63430007010033';
var github_token = '';
var username = '';

var user;

//                                   init web3js
//-------------------------------------------------------------------------------------------

web3 = new Web3(provider);
contract = new this.web3.eth.Contract(contract_abi, contract_address);
manager_contract = new this.web3.eth.Contract(manager_contract_abi, manager_contract_address);

account = web3.eth.accounts.privateKeyToAccount(private_key);


//                                  init layout settings
//-------------------------------------------------------------------------------------------

window.addEventListener("load", function () {
    gotoCard(5);
});

function initLayout() {
    let keyMatrix = [
        { key: "pbk", id: "public-key", type: "span" },
        { key: "prk", id: "private-key", type: "span" },
        { key: "token", id: "cred-token", type: "input" }
    ];

    // sync the key and account data from the chrome storage
    valideSyncStorageKey(keyMatrix).then(async _ => {
        showLoader();

        if(getPublicKey()) {
            let balance = await web3.eth.getBalance(getPublicKey());
            document.getElementById("account-balance").textContent = (parseInt(balance) / (10 ** 18)) + " ETH";
        }

        gotoCard(0);
        hideLoader();

    }).catch(err => {
        gotoCard(5);
    });
}

// get the references of the lists
var reposList = document.getElementById("repoList");
var pollsList = document.getElementById("pollsList");
var issuesList = document.getElementById("issuesList");
var mergeList = document.getElementById("mergeList");

// references to all the back buttons
var backBtns = document.getElementsByClassName("backBtn");


//                          layout-setting
//-------------------------------------------------------------------------------------------

// cards ^= the views of the extension pages that are displayed by DOM-Scripting
var cardArray = [
    document.getElementById("menuCard"),
    document.getElementById("pollsCard"),
    document.getElementById("repoCard"),
    document.getElementById("walletCard"),
    document.getElementById("credCard"),
    document.getElementById("loginCard"),
    document.getElementById("mergeCard"),
    document.getElementById("repoInfoCard"),
    document.getElementById("issuesCard"),
    document.getElementById("issueActionCard"),
    document.getElementById("pollActionCard"),
];

// static view buttons (the buttons that are not generted dynamically)
document.getElementById("gotoCredBtn").addEventListener("click", function () { gotoCard(4) });
//document.getElementById("cred-btn").addEventListener("click", function () { gotoCard(5) });
document.getElementById("gotoWalletBtn").addEventListener("click", function () { initWalletView() });
//document.getElementById("wallet-btn").addEventListener("click", function () { initWalletView() });


document.getElementById("gotoRepoBtn").addEventListener("click", async function () {
    showLoader();

    gotoCard(2);
    let repositories = await getRequest('https://api.github.com/users/' + user.getUsername() + '/starred');
    repositories.forEach(repository => {
        UIapppendRepo(repository);
    });
    
    await chrome.storage.sync.get("token", function (data) {

         /* if(tempBalance<0.1 || tempPk.length <=0 || tempSk.length <=0 || developer_token.length <=0){//TODO correct length
            alert("Fehler: Fehlende Daten oder nicht genug ETH");
            gotoCard(0);
         } */
     });


    hideLoader();
});


// go back to the last (currently first page of the extension)
for (let i = 0; i < backBtns.length; i++) {
    backBtns[i].addEventListener("click", function () { gotoCard(0) });
}

// generic navigation function
function gotoCard(index) {
    cardArray.forEach(element => {
        element.style.display = "none";
    });
    cardArray[index].style.display = "block";
}


async function initWalletView() {
    showLoader();

    document.getElementById("account-balance").textContent = await getWalletBalance(web3, getPublicKey());
    gotoCard(3);

    hideLoader();
}

//                          Events (generate, get, build up, ... something)
//-------------------------------------------------------------------------------------------

// load or reloard the polls list (the poll elements)
async function goToPollsEvent(repository, index) {
    showLoader();

    document.getElementById("pollsHeader").innerHTML = "Polls of " + formateName(repository.name);
    gotoCard(index);

    let response = await initContractPollsAndPollables(repository);
    UIsetPollableAndMergeableNumber(response.pollables, response.mergeables, repository);

    for (let i = 0; i < response.contracts.length; i++) {
        UIaddPoll(response.contracts[i]["timestamp"], response.contracts[i]["pqTitle"], response.contracts[i]["pqLink"], i, repository, response.contracts[i]);
    }

    hideLoader();
}


//                          wallet management
//-------------------------------------------------------------------------------------------


async function genKeys() {
    showLoader();

    let acc = web3.eth.accounts.create(web3.utils.randomHex(32));

    // save adress and private key in the persistant storage
    document.getElementById("public-key").textContent = acc['address'];
    document.getElementById("private-key").textContent = acc['privateKey'];
    await chrome.storage.sync.set({ "pbk": acc['address'] });
    await chrome.storage.sync.set({ "prk": acc['privateKey'] });
    await initWalletWithGas(web3, public_address, acc['address'], private_key);
    document.getElementById("account-balance").textContent = await getWalletBalance(web3, getPublicKey());

    hideLoader();
}

document.getElementById("btn-gen-keys").addEventListener("click", () => {
    genKeys();
})

document.getElementById("save-btn").addEventListener("click", () => {
    showLoader();
/*     developer_token = document.getElementById("cred-token").value;
    chrome.storage.sync.set({ token: developer_token }); */
    gotoCard(0);
    hideLoader();
})

//                          generate dynamic repository elements
//-------------------------------------------------------------------------------------------

function UIapppendRepo(repository) {
    let repoElement = document.createElement("div");
    let repoName = generateSpan(formateName(repository.name), "");

    repoElement.classList.add("repository-element");
    repoElement.addEventListener("click", function () {
        initRepositorySettings(repository)
    });

    repoElement.appendChild(repoName);
    repoList.appendChild(repoElement);
}

