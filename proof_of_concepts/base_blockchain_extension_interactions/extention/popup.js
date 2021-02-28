/* -------------------------------------------------------------------------------------------
*                                   env settings
------------------------------------------------------------------------------------------- */

var public_address = '0x28CfbA097FF9bb9D904471c493b032Df45B9f953';
var private_key = 'f1d57d756f7a47c3e70b740acf95b38611a26b81c7a0cff7de872ab306ae35d0';

var provider = 'https://sokol.poa.network';
var manager_contract_address = '0x067d94002F28C0Bc94d5A44941108a30A8d7B01d';
let bytecode = '6080604052600060025560006003556040518060200160405280600081525060049080519060200190610033929190610251565b507328cfba097ff9bb9d904471c493b032df45b9f953600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561009557600080fd5b50600160405180604001604052807328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff1681526020016000815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155505060006040518060800160405280600081526020016001151581526020017328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff168152602001600081525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816002015550506102ee565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061029257805160ff19168380011785556102c0565b828001600101855582156102c0579182015b828111156102bf5782518255916020019190600101906102a4565b5b5090506102cd91906102d1565b5090565b5b808211156102ea5760008160009055506001016102d2565b5090565b610aa1806102fd6000396000f3fe6080604052600436106100c25760003560e01c80636a7300c51161007f578063d8dfeb4511610059578063d8dfeb4514610361578063dc2f87441461038c578063e8c35c72146103f8578063ec9a01fe146104dd576100c2565b80636a7300c514610258578063899a1e36146102e8578063943dfef114610336576100c2565b8063267e6529146100c7578063553ea3e9146100f25780635ab77cb3146101095780635df813301461014157806361ebccfd146101bd57806365b768fa14610217575b600080fd5b3480156100d357600080fd5b506100dc610508565b6040518082815260200191505060405180910390f35b3480156100fe57600080fd5b50610107610514565b005b61013f6004803603604081101561011f57600080fd5b8101908080359060200190929190803590602001909291905050506105a6565b005b34801561014d57600080fd5b5061017a6004803603602081101561016457600080fd5b810190808035906020019092919050505061062f565b6040518085815260200184151581526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b610215600480360360608110156101d357600080fd5b8101908080351515906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610699565b005b34801561022357600080fd5b5061022c610784565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561026457600080fd5b5061026d6107aa565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102ad578082015181840152602081019050610292565b50505050905090810190601f1680156102da5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610334600480360360408110156102fe57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610848565b005b34801561034257600080fd5b5061034b610900565b6040518082815260200191505060405180910390f35b34801561036d57600080fd5b50610376610906565b6040518082815260200191505060405180910390f35b34801561039857600080fd5b506103c5600480360360208110156103af57600080fd5b810190808035906020019092919050505061090c565b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b6104db6004803603606081101561040e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561044b57600080fd5b82018360208201111561045d57600080fd5b8035906020019184600183028401116401000000008311171561047f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019092919050505061095d565b005b3480156104e957600080fd5b506104f26109c1565b6040518082815260200191505060405180910390f35b60008080549050905090565b600354600254016002819055506000600381905550604051806020016040528060008152506004908051906020019061054e9291906109ce565b507328cfba097ff9bb9d904471c493b032df45b9f953600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600082815481106105b357fe5b906000526020600020906003020160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561062a573d6000803e3d6000fd5b505050565b6000818154811061063c57fe5b90600052602060002090600302016000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b60006040518060800160405280600080549050815260200185151581526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018481525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600201555050505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108405780601f1061081557610100808354040283529160200191610840565b820191906000526020600020905b81548152906001019060200180831161082357829003601f168201915b505050505081565b600160405180604001604052808473ffffffffffffffffffffffffffffffffffffffff16815260200183815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155505080600254016002819055505050565b60025481565b60035481565b6001818154811061091957fe5b90600052602060002090600202016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b80600381905550816004908051906020019061097a9291906109ce565b5082600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050565b6000600180549050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610a0f57805160ff1916838001178555610a3d565b82800160010185558215610a3d579182015b82811115610a3c578251825591602001919060010190610a21565b5b509050610a4a9190610a4e565b5090565b5b80821115610a67576000816000905550600101610a4f565b509056fea2646970667358221220eaa1c23dca827976f2f1bd6be5218ae75a24d629b6c49502cf1011bd5f88065d64736f6c63430007010033';
var user;

var developer_collateral = 10000000000;

//                                   init web3js
//-------------------------------------------------------------------------------------------

web3 = new Web3(provider);
manager_contract = new this.web3.eth.Contract(manager_contract_abi, manager_contract_address);
account = web3.eth.accounts.privateKeyToAccount(private_key);


//                                  init layout settings
//-------------------------------------------------------------------------------------------

window.addEventListener("load", function () {
    openNewView(document.getElementById("loginCard"));
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

        if (getPublicKey()) {
            let balance = await web3.eth.getBalance(getPublicKey());
            document.getElementById("account-balance").textContent = (parseInt(balance) / (10 ** 18)) + " ETH";
        }

        const developer_token = document.getElementById("cred-token").value;
        if (developer_token) {
            user.setToken(developer_token)
        }

        openNewView(document.getElementById("menuCard"));
        
        await initAdvancedStart();
    
        hideLoader();

    }).catch(err => {
        openNewView(document.getElementById("loginCard"));
    });
}

// get the references of the lists and action menus
var reposList = document.getElementById("repoList");
var pollsList = document.getElementById("pollsList");
var issuesList = document.getElementById("issuesList");
var issue_actions = document.getElementById("issue-settings-actions");
var poll_actions = document.getElementById("poll-settings-actions");

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
    document.getElementById("repoInfoCard"),
    document.getElementById("issuesCard"),
    document.getElementById("issueActionCard"),
    document.getElementById("pollActionCard"),
];

// static view buttons (the buttons that are not generted dynamically)
document.getElementById("gotoCredBtn").addEventListener("click", function () { openNewView(document.getElementById("credCard")) });
document.getElementById("gotoWalletBtn").addEventListener("click", function () { initWalletView() });

document.getElementById("gotoRepoBtn").addEventListener("click", async function () {
    showLoader();

    let balance = await web3.eth.getBalance(getPublicKey());
    if (balance > 100000000000000000) {
        let repositories = await getRequest('https://api.github.com/users/' + user.getUsername() + '/starred');

        while (reposList.firstChild) {
            reposList.removeChild(reposList.lastChild);
        }

        if (!repositories['message']) {
            openNewView(document.getElementById("repoCard"));
            repositories.forEach(repository => {
                UIappendRepo(repository);
            });
        } else {
            alert("Bad credentials (developer token) or no access to this data!")
        }
    } else {
        hideLoader();
        alert("Your account balance is under 0.1 ETH, please add more ETH to your balance!");
    }

    hideLoader();
});


// go back to the last (currently first page of the extension)
for (let i = 0; i < backBtns.length; i++) {
    backBtns[i].addEventListener("click", function () { openNewView(document.getElementById("menuCard")) });
}

// generic navigation function
function openNewView(reference) {
    cardArray.forEach(element => {
        element.style.display = "none";
    });
    reference.style.display = "block";
}


async function initWalletView() {
    showLoader();

    document.getElementById("account-balance").textContent = await getWalletBalance(web3, getPublicKey());
    openNewView(document.getElementById("walletCard"));

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
    developer_token = document.getElementById("cred-token").value;
    chrome.storage.sync.set({ token: developer_token });
    user.setToken(developer_token);
    openNewView(document.getElementById("menuCard"));
    hideLoader();
})

//                          generate dynamic repository elements
//-------------------------------------------------------------------------------------------

function UIappendRepo(repository) {
    let repoElement = document.createElement("div");
    let repoName = generateSpan(formateName(repository.name), "");

    repoElement.classList.add("repository-element");
    repoElement.addEventListener("click", function () {
        initRepositorySettings(repository)
    });

    repoElement.appendChild(repoName);
    repoList.appendChild(repoElement);
}

