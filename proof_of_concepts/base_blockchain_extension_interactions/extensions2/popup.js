/* -------------------------------------------------------------------------------------------
*                                   env settings
------------------------------------------------------------------------------------------- */
var public_address = '0x28CfbA097FF9bb9D904471c493b032Df45B9f953';
var private_key = 'f1d57d756f7a47c3e70b740acf95b38611a26b81c7a0cff7de872ab306ae35d0';
var provider = 'https://sokol.poa.network';
var manager_contract_address = '0x28c92BB0a8dbfF8dAfbcf44b99c4c92629ED2dE2';
var manager_contract_abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"polls","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"poll_contract_address","type":"string"},{"internalType":"bool","name":"open","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"addr","type":"string"}],"name":"addPoll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPollsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"helloWorld","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"}];
var poll_contract_abi = [{"inputs":[{"internalType":"string","name":"_timestamp","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"votes","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"bool","name":"decision","type":"bool"},{"internalType":"address payable","name":"delegate","type":"address"},{"internalType":"uint256","name":"weight","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"desc","type":"bool"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"address payable","name":"addr","type":"address"}],"name":"vote","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"resolve","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getVotesLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
var github_token = 'd2a43e5829945acdb73a8bcb404790f1dc9d9953';
var username = "SerQuicky";
let bytecode = '608060405234801561001057600080fd5b506040516106243803806106248339818101604052602081101561003357600080fd5b810190808051604051939291908464010000000082111561005357600080fd5b8382019150602082018581111561006957600080fd5b825186600182028301116401000000008211171561008657600080fd5b8083526020830192505050908051906020019080838360005b838110156100ba57808201518184015260208101905061009f565b50505050905090810190601f1680156100e75780820380516001836020036101000a031916815260200191505b506040525050508060019080519060200190610104929190610203565b5060006040518060800160405280600081526020016001151581526020017322a5206a65aaf639c4d446f29586f0c00e0f7fa973ffffffffffffffffffffffffffffffffffffffff168152602001600081525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600201555050506102a0565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061024457805160ff1916838001178555610272565b82800160010185558215610272579182015b82811115610271578251825591602001919060010190610256565b5b50905061027f9190610283565b5090565b5b8082111561029c576000816000905550600101610284565b5090565b610375806102af6000396000f3fe60806040526004361061003f5760003560e01c8063267e6529146100445780632810e1d61461006f5780635df813301461007957806361ebccfd146100f5575b600080fd5b34801561005057600080fd5b5061005961014f565b6040518082815260200191505060405180910390f35b61007761015b565b005b34801561008557600080fd5b506100b26004803603602081101561009c57600080fd5b81019080803590602001909291905050506101ea565b6040518085815260200184151581526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b61014d6004803603606081101561010b57600080fd5b8101908080351515906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610254565b005b60008080549050905090565b600060018154811061016957fe5b906000526020600020906003020160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc662386f26fc100009081150290604051600060405180830381858888f193505050501580156101e7573d6000803e3d6000fd5b50565b600081815481106101f757fe5b90600052602060002090600302016000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b60006040518060800160405280600080549050815260200185151581526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018481525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020155505050505056fea2646970667358221220fccffb9a0e7fc30d4a1e5098df1fdbbc086487eac9ed24b404f1069bba69d6dd64736f6c63430007010033';


//                                   init web3js
//-------------------------------------------------------------------------------------------

web3 = new Web3(provider);
contract = new this.web3.eth.Contract(manager_contract_abi, manager_contract_address);
account = web3.eth.accounts.privateKeyToAccount(private_key);

let sign = document.getElementById("sign");
sign.addEventListener("click", function () {
    var redirectUri = chrome.identity.getRedirectURL('http://localhost:3000');
});

let getpolls = document.getElementById("getpolls");
getpolls.addEventListener("click", function () {
    contract.methods.getPollsLength().call().then(async res => {
        for (let i = 0; i < res; i++) {
            await contract.methods.polls(i).call().then(poll => {
                console.log(JSON.stringify(poll))
            })
        }
    });
});

let addpoll = document.getElementById("addpoll");
addpoll.addEventListener("click", async function () {
    const new_contract_address = await createContract();
    console.log(new_contract_address)
    const added_contract = await addContract(new_contract_address);
    alert(JSON.stringify(added_contract));
});

let addstake = document.getElementById("addstake");
addstake.addEventListener("click", async function () {
    await contract.methods.polls(1).call().then(poll => {
        console.log(JSON.stringify(poll));
        console.log(poll["poll_contract_address"]);
        addVote(poll["poll_contract_address"], "100000000000000000");
    })
});

let getstakes = document.getElementById("getstakes");
getstakes.addEventListener("click", async function () {
    await contract.methods.polls(1).call().then(async poll => {
        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, poll["poll_contract_address"]);
        await single_poll_contract.methods.votes(1).call().then(vote => { 
            console.log(vote)
        });
    })
});

let releasestake = document.getElementById("releasestake");
releasestake.addEventListener("click", async function () {
    await contract.methods.polls(1).call().then(async poll => {
        transferResult(poll["poll_contract_address"]);
    })
});

function createContract() {
    return new Promise((resolve, reject) => {
        const account = web3.eth.accounts.privateKeyToAccount('0x' + private_key);
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;

        let deploy_contract = new web3.eth.Contract(JSON.parse(JSON.stringify(poll_contract_abi)));

        let payload = {
            data: bytecode,
            arguments: ["12223222"]
        }

        let parameter = {
            from: public_address,
            gas: web3.utils.toHex(12475600),
            gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
        }

        deploy_contract.deploy(payload).send(parameter, (err, transactionHash) => {
            console.log('Transaction Hash :', transactionHash);
        }).on('confirmation', () => { }).then((newContractInstance) => {
            console.log(newContractInstance)
            console.log('Deployed Contract Address : ', newContractInstance.options.address);
            resolve(newContractInstance.options.address);
        })
    });
}

function addContract(address) {
    return new Promise((resolve, reject) => {
        contract.methods.addPoll(address).estimateGas({ from: public_address }).then(gas => {

            const tx = {
                from: public_address,
                to: manager_contract_address,
                contractAddress: manager_contract_address,
                gas: gas,
                data: contract.methods.addPoll(address).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, private_key);

            signPromise.then((signedTx) => {
                const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                sentTx.on("receipt", receipt => {
                    console.log("JA");
                    resolve(receipt);
                });
                sentTx.on("error", err => {
                    console.log("FEHLER");
                    reject(err);
                });
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}

function addVote(address, stake) {
    return new Promise((resolve, reject) => {

        let single_poll_contract = new this.web3.eth.Contract(poll_contract_abi, address);

        single_poll_contract.methods.vote(true, stake, public_address).estimateGas({ from: public_address }).then(gas => {

            const tx = {
                from: public_address,
                to: address,
                contractAddress: address,
                gas: gas,
                value: stake,
                data: single_poll_contract.methods.vote(true, stake, public_address).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, private_key);

            signPromise.then((signedTx) => {
                const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                sentTx.on("receipt", receipt => {
                    console.log("JA");
                    resolve(receipt);
                });
                sentTx.on("error", err => {
                    console.log("FEHLER");
                    reject(err);
                });
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}

function transferResult(address) {
    return new Promise((resolve, reject) => {

        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, address);

        single_poll_contract.methods.resolve().estimateGas({ from: public_address }).then(gas => {

            const tx = {
                from: public_address,
                to: address,
                contractAddress: address,
                gas: gas,
                data: single_poll_contract.methods.resolve().encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, private_key);

            signPromise.then((signedTx) => {
                const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                sentTx.on("receipt", receipt => {
                    console.log("JA");
                    resolve(receipt);
                });
                sentTx.on("error", err => {
                    console.log("FEHLER");
                    reject(err);
                });
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}

