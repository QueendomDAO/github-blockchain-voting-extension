/* -------------------------------------------------------------------------------------------
*                                   env settings
------------------------------------------------------------------------------------------- */

var public_address = '0x28CfbA097FF9bb9D904471c493b032Df45B9f953';
var private_key = 'f1d57d756f7a47c3e70b740acf95b38611a26b81c7a0cff7de872ab306ae35d0';

var provider = 'https://sokol.poa.network';
var manager_contract_address = '0xacC3D626c8F1c8825bf9B0266FF20db117b479Cb';
let bytecode = '608060405234801561001057600080fd5b50600460405180604001604052807328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff1681526020016000815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155505060036040518060800160405280600081526020016001151581526020017328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff168152602001600081525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600201555050610983806101d66000396000f3fe6080604052600436106100865760003560e01c8063899a1e3611610059578063899a1e36146101c4578063d379be2314610212578063dc2f8744146102c6578063e8c35c7214610332578063ec9a01fe1461041757610086565b8063267e65291461008b5780635ab77cb3146100b65780635df81330146100ee57806361ebccfd1461016a575b600080fd5b34801561009757600080fd5b506100a0610442565b6040518082815260200191505060405180910390f35b6100ec600480360360408110156100cc57600080fd5b81019080803590602001909291908035906020019092919050505061044f565b005b3480156100fa57600080fd5b506101276004803603602081101561011157600080fd5b81019080803590602001909291905050506104d8565b6040518085815260200184151581526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b6101c26004803603606081101561018057600080fd5b8101908080351515906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610542565b005b610210600480360360408110156101da57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061062d565b005b34801561021e57600080fd5b506102276106da565b604051808473ffffffffffffffffffffffffffffffffffffffff16815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b8381101561028957808201518184015260208101905061026e565b50505050905090810190601f1680156102b65780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b3480156102d257600080fd5b506102ff600480360360208110156102e957600080fd5b81019080803590602001909291905050506107aa565b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b6104156004803603606081101561034857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561038557600080fd5b82018360208201111561039757600080fd5b803590602001918460018302840111640100000000831117156103b957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001909291905050506107fb565b005b34801561042357600080fd5b5061042c6108a3565b6040518082815260200191505060405180910390f35b6000600380549050905090565b6003828154811061045c57fe5b906000526020600020906003020160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156104d3573d6000803e3d6000fd5b505050565b600381815481106104e557fe5b90600052602060002090600302016000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b60036040518060800160405280600380549050815260200185151581526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018481525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600201555050505050565b600460405180604001604052808473ffffffffffffffffffffffffffffffffffffffff16815260200183815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015550505050565b60008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561079a5780601f1061076f5761010080835404028352916020019161079a565b820191906000526020600020905b81548152906001019060200180831161077d57829003601f168201915b5050505050908060020154905083565b600481815481106107b757fe5b90600052602060002090600202016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b60405180606001604052808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152506000808201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010190805190602001906108909291906108b0565b5060408201518160020155905050505050565b6000600480549050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106108f157805160ff191683800117855561091f565b8280016001018555821561091f579182015b8281111561091e578251825591602001919060010190610903565b5b50905061092c9190610930565b5090565b5b80821115610949576000816000905550600101610931565b509056fea2646970667358221220870a2cd09cb4858fcff24df5cff961aa2d10856a8c1eefd52445b2918bccd82764736f6c63430007010033'
var user;

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
        hideLoader();

    }).catch(err => {
        openNewView(document.getElementById("loginCard"));
    });
}

// get the references of the lists
var reposList = document.getElementById("repoList");
var pollsList = document.getElementById("pollsList");
var issuesList = document.getElementById("issuesList");

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

