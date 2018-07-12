var express = require('express');
var router = express.Router();
var path = require('path');

module.exports = function(app, passport, manager, hashids) {

    /* GET home page. */
    app.get('/', function(req, res) {
        var userLoginState = '0';
        if (req.isAuthenticated()) {
            userLoginState = JSON.stringify({
                firstname: req.user.name.first,
                lastname: req.user.name.last,
                dbid: hashids.encodeHex(req.session.userid),
                location: req.user.location,
                picdata: req.user.pic,
                gender: req.user.gender,
                fbid:req.user.fbid,
                fb: req.user.fb
            });
        }
        
        res.render(path.join(__dirname, '..', 'QuestionslyFrontend', 'dist', 'index-template.hbs'), {userLoginState: userLoginState});
    });

};
