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

function getContractAbi() {
    return contract_abi;
}