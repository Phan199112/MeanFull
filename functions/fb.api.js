var FB = require('fb');
FB.options({appId: '669514259923041', appSecret: 'd8b44aeaa9a26c211c7605049fe45e93'});

exports.FBLocation = function FBLocation(locid) {
    // get location info
    return new Promise(function(resolve, reject) {
        return new Promise(function(resolve, reject) {
            FB.api('oauth/access_token', {
                client_id: '669514259923041',
                client_secret: 'd8b44aeaa9a26c211c7605049fe45e93',
                grant_type: 'client_credentials'
            }, function (res) {
                if (!res || res.error) {
                    reject();
                } else {
                    FB.setAccessToken(res.access_token);
                    resolve();
                }
            })
        })
            .then(function() {
                FB.api(locid, { fields: 'location' }, function (res) {
                    if(!res || res.error) {
                        reject();
                    } else {
                        resolve(res.location);
                    }
                });

            }).catch(function() {
                reject();
            });

    })
        .catch(function() {
            return null;
        });

};

