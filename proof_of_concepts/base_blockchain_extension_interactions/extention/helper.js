function formateTime(str) {
    return str.substr(6, 2) + "." + str.substr(4, 2) + "." + str.substr(0, 4) + " " + str.substr(8, 2) + ":" + str.substr(10, 2);
}

function formateName(str) {
    return str.length > 15 ? str.substr(0, 15) + "..." : str;
}

function getCurrentDate() {
    let today = new Date();
    return parseInt(today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate() + "" + today.getHours() + "" + today.getMinutes());
}

function getPublicKey() {
    return document.getElementById("public-key").textContent;
}

function getPrivateKey() {
    return document.getElementById("private-key").textContent;
}

function hideLoader() {
    setTimeout(() => {
        document.getElementById("overlay").classList.add("card");
    }, 500);
}

function showLoader() {
    document.getElementById("overlay").classList.remove("card");
}


function valideSyncStorageKey(list) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < list.length; i++) {
            await new Promise((resolve, reject) => {
                chrome.storage.sync.get(list[i].key, function (data) {
                    if (data[list[i].key]) {
                        list[i].type == "span" ?
                            document.getElementById(list[i].id).innerHTML = data[list[i].key]
                            : document.getElementById(list[i].id).value = data[list[i].key];
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }
        resolve();
    });
}


function generateSpan(text) {
    let element = document.createElement("span");
    element.textContent = text;
    return element;
}

function generateDiv(classList, id) {
    let element = document.createElement("div");
    
    if(classList) {
        element.classList.add(classList);
    }

    if(id) {
        element.setAttribute("id", id);
    }

    return element;
}

function generateButton(classList, id, src) {
    let element = document.createElement("div");
    
    if(classList) {
        element.classList.add(classList);
    }

    if(id) {
        element.setAttribute("id", id);
    }

    var icon = document.createElement("img");
    icon.src = src;
    element.appendChild(icon);

    return element;
}


function generateInput(classList, id, type) {
    let element = document.createElement("input");
    
    if(classList) {
        element.classList.add(classList);
    }

    if(id) {
        element.setAttribute("id", id);
    }

    if(type) {
        element.setAttribute("type", type);
    }

    return element;
}