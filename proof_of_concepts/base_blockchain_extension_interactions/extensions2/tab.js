var gh = (function() {
    'use strict';
  
    var signin_button;
  
    var tokenFetcher = (function() {
      // Replace clientId and clientSecret with values obtained by you for your
      // application https://github.com/settings/applications.
      var clientId = 'Iv1.07743fea85c47be2';
      // Note that in a real-production app, you may not want to store
      // clientSecret in your App code.
      var clientSecret = '8136df7bf962a19ff7557759974e86669ce121a9';
      var redirectUri = chrome.identity.getRedirectURL('provider_cb');
      var redirectRe = new RegExp(redirectUri + '[#\?](.*)');
  
      var access_token = null;
  
      return {
        getToken: function(interactive, callback) {
          // In case we already have an access_token cached, simply return it.
          if (access_token) {
            callback(null, access_token);
            return;
          }
  
          var options = {
            'interactive': interactive,
            'url': 'https://github.com/login/oauth/authorize' +
                   '?client_id=' + clientId +
                   '&redirect_uri=' + encodeURIComponent(redirectUri)
          }
          
          chrome.identity.launchWebAuthFlow(options, function(redirectUri) {
            console.log('launchWebAuthFlow completed', chrome.runtime.lastError, redirectUri);
  
            if (chrome.runtime.lastError) {
              callback(new Error(chrome.runtime.lastError));
              return;
            }
  
            // Upon success the response is appended to redirectUri, e.g.
            // https://{app_id}.chromiumapp.org/provider_cb#access_token={value}
            //     &refresh_token={value}
            // or:
            // https://{app_id}.chromiumapp.org/provider_cb#code={value}
            var matches = redirectUri.match(redirectRe);
            if (matches && matches.length > 1)
              handleProviderResponse(parseRedirectFragment(matches[1]));
            else
              callback(new Error('Invalid redirect URI'));
          });
  
          function parseRedirectFragment(fragment) {
            var pairs = fragment.split(/&/);
            var values = {};
  
            pairs.forEach(function(pair) {
              var nameval = pair.split(/=/);
              values[nameval[0]] = nameval[1];
            });
  
            return values;
          }
  
          function handleProviderResponse(values) {
            console.log('providerResponse', values);
            if (values.hasOwnProperty('access_token'))
              setAccessToken(values.access_token);
            // If response does not have an access_token, it might have the code,
            // which can be used in exchange for token.
            else if (values.hasOwnProperty('code'))
              exchangeCodeForToken(values.code);
            else 
              callback(new Error('Neither access_token nor code avialable.'));
          }
  
          function exchangeCodeForToken(code) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET',
                     'https://github.com/login/oauth/access_token?' +
                     'client_id=' + clientId +
                     '&client_secret=' + clientSecret +
                     '&redirect_uri=' + redirectUri +
                     '&code=' + code);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.onload = function () {
              // When exchanging code for token, the response comes as json, which
              // can be easily parsed to an object.
              if (this.status === 200) {
                var response = JSON.parse(this.responseText);
                console.log(response);
                if (response.hasOwnProperty('access_token')) {
                  setAccessToken(response.access_token);
                } else {
                  callback(new Error('Cannot obtain access_token from code.'));
                }
              } else {
                console.log('code exchange status:', this.status);
                callback(new Error('Code exchange failed'));
              }
            };
            xhr.send();
          }
  
          function setAccessToken(token) {
            access_token = token; 
            console.log('Setting access_token: ', access_token);
            callback(null, access_token);
          }
        },
  
        removeCachedToken: function(token_to_remove) {
          if (access_token == token_to_remove)
            access_token = null;
        }
      }
    })();
  
    function xhrWithAuth(method, url, interactive, callback) {
      var retry = true;
      var access_token;
  
      console.log('xhrWithAuth', method, url, interactive);
      getToken();
  
      function getToken() {
        tokenFetcher.getToken(interactive, function(error, token) {
          console.log('token fetch', error, token);
          if (error) {
            callback(error);
            return;
          }
  
          access_token = token;
          requestStart();
        });
      }
  
      function requestStart() {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.onload = requestComplete;
        xhr.send();
      }
  
      function requestComplete() {
        console.log('requestComplete', this.status, this.response);
        if ( ( this.status < 200 || this.status >=300 ) && retry) {
          retry = false;
          tokenFetcher.removeCachedToken(access_token);
          access_token = null;
          getToken();
        } else {
          callback(null, this.status, this.response);
        }
      }
    }
  
    function getUserInfo(interactive) {
      xhrWithAuth('GET',
                  'https://api.github.com/user',
                  interactive,
                  onUserInfoFetched);
    }
  
    // Functions updating the User Interface:
  
    function onUserInfoFetched(error, status, response) {
      if (!error && status == 200) {
        console.log("Got the following user info: " + response);
        var user_info = JSON.parse(response);
        populateUserInfo(user_info);
        hideButton(signin_button);
        fetchUserRepos(user_info["repos_url"]);
      } else {
        console.log('infoFetch failed', error, status);
      }
    }
  
    function populateUserInfo(user_info) {
      var nameElem = document.createElement('div');
      nameElem.innerHTML = "<b>Hello " + user_info.name + "</b><br>"
          + "Your github page is: " + user_info.html_url;
      elem.appendChild(nameElem);
    }
  
  
  
    function fetchUserRepos(repoUrl) {
      xhrWithAuth('GET', repoUrl, false, onUserReposFetched);
    }
  
    function onUserReposFetched(error, status, response) {
      var elem = document.querySelector('#user_repos');
      elem.value='';
      if (!error && status == 200) {
        console.log("Got the following user repos:", response);
        var user_repos = JSON.parse(response);
        user_repos.forEach(function(repo) {
          if (repo.private) {
            elem.value += "[private repo]";
          } else {
            elem.value += repo.name;
          }
          elem.value += '\n';
        });
      } else {
        console.log('infoFetch failed', error, status);
      }
      
    }
  
    // Handlers for the buttons's onclick events.
  
    function interactiveSignIn() {
      tokenFetcher.getToken(true, function(error, access_token) {
        if (error) {
          //showButton(signin_button);
        } else {
          getUserInfo(true);
        }
      });
    }
  
    return {
      onload: function () {
        signin_button = document.querySelector('#sign');
        signin_button.onclick = interactiveSignIn;
      
        console.log(signin_button);
  
        getUserInfo(false);
      }
    };
  })();
  
  
  window.onload = gh.onload;