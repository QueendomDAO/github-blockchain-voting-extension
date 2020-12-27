const client_id = "Iv1.07743fea85c47be2";
const redirectUri = chrome.identity.getRedirectURL("github");
const client_secret = "8136df7bf962a19ff7557759974e86669ce121a9";

let global_token = "asdf";

window.onload = function () {
    console.log('OAUTH ACTIVE');
    document.querySelector('#sign').addEventListener('click', function () {
        chrome.identity.launchWebAuthFlow({
            'url': 'https://github.com/login/oauth/authorize?client_id=' + client_id + "&scope=repo", 'interactive': true
        },
            function (redirect_url) {
                console.log(redirect_url);
                let urlParams = new URL(redirect_url.toString());
                console.log(urlParams);
                console.log(urlParams.searchParams.get("code"));

                let code = urlParams.searchParams.get("code");

                let request = new XMLHttpRequest();
                request.onload = init;
                request.open('post', 'https://github.com/login/oauth/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code);
                request.send();
            });
    });
};

function init() {
    console.log(this.responseText);

    let token = this.responseText.split("=")[1].split("&")[0];
    console.log(token);

    fetch("https://api.github.com/user", {
        method: 'GET',
        headers: new Headers({
            'User-agent': 'Mozilla/4.0 Custom User Agent',
            "Authorization": "Bearer " + token,
        }),
    })
    .then(response => response.json())
    .then(res => console.log(res))

    fetch("https://api.github.com/users/serquicky/starred", {
        method: 'GET',
        headers: new Headers({
            'User-agent': 'Mozilla/4.0 Custom User Agent',
            "Authorization": "Bearer " + token,
        }),
    })
    .then(response => response.json())
    .then(res => console.log(res))

}