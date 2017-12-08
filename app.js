var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var manager = require('connect-ensure-login');
var passport = require('passport');
var app = express();
var Hashids = require('hashids');
var hashids = new Hashids('crowdworksdgbl');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var flash = require('req-flash');
var fs = require('fs');
var sslRedirect = require('heroku-ssl-redirect');

// HTTPS
// enable ssl redirect
app.use(sslRedirect());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // changed to true
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('express-session')({ secret: 'efewgnsdjkgsdlgsdhgldsljgjdskgsdkjgdk', resave: true, saveUninitialized: true }));
app.use(flash());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//Set up default mongoose connection

// Arne test database
//var mongoDB = 'mongodb://cwlocaltest:HCW-9yE-9Tz-keb@ds125255.mlab.com:25255/cw';
// Arne 2 node replica on mlab
//var mongoDB = 'mongodb://cwserver:HCW-9yE-9Tz-keb@ds249425-a0.mlab.com:49425,ds249425-a1.mlab.com:49425/cwlive?replicaSet=rs-ds249425';
// mongodb (this is the live version with real data, if you'd like to do tests us the mlab 2 node replica)
var mongoDB = 'mongodb://cwdbnode:owHHvHTL9pn2MFRo@cwdb-shard-00-00-zcm55.mongodb.net:27017,cwdb-shard-00-01-zcm55.mongodb.net:27017,cwdb-shard-00-02-zcm55.mongodb.net:27017/test?ssl=true&replicaSet=cwdb-shard-0&authSource=admin';

mongoose.connect(mongoDB, {
    useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// routes
var index = require('./routes/index');
var usersroute = require('./routes/users.login.js')(app, passport, manager, hashids);
var formsroute = require('./routes/forms')(app, passport, manager, hashids);
var profileroute = require('./routes/users.profile')(app, passport, manager, hashids);
var tagsroute = require('./routes/tags')(app, passport, manager, hashids);
var settingsroute = require('./routes/settings')(app, passport, manager, hashids);
var eventsroute = require('./routes/events')(app, passport, manager, hashids);
var communityroute = require('./routes/communities')(app, passport, manager, hashids);
var feedbackroute = require('./routes/feedback')(app, passport, manager, hashids);
var searchroute = require('./routes/search')(app, passport, manager, hashids);
var uploadroute = require('./routes/upload')(app, passport, manager, hashids);
var discussroute = require('./routes/discussion')(app, passport, manager, hashids);

//
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render("index");
});

// cron jobs
var cron = require('node-cron');
var TagsModel = require('./db.models/tags.model');
var FormModel = require('./db.models/form.model');
var CommunityModel = require('./db.models/community.model');



cron.schedule('*/5 * * * *', function(){
    //console.log('running tags update task every 2 minutes');

    var tags = [];
    var datadump = [];
    var promiseslist = [];

    // mongoDB query for tags, only query public forms
    new Promise(function(resolve, reject) {
            var tempfunctionTagsForms = function () {
                var promise = new Promise(function(resolve, reject) {
                    FormModel.find({public: true, shared: true}).cursor()
                        .on('data', function (form) {
                            // form is one entry of many
                            // there may be multi hashtags
                            if (form.hashtags != null) {
                                for (i = 0; i < form.hashtags.length; i++) {
                                    if (tags[form.hashtags[i]] == null) {
                                        tags[form.hashtags[i]] = 1;
                                    } else {
                                        tags[form.hashtags[i]] += 1;
                                    }

                                }
                            }
                        })
                        .on('error', function (err) {
                            reject(err);
                        })
                        .on('end', function () {
                            resolve();
                        });
                });
                return promise;
            };

            var tempfunctionTagsCommunities = function () {
                var promise = new Promise(function(resolve, reject) {
                    CommunityModel.find({public: true}).cursor()
                        .on('data', function (comm) {
                            // form is one entry of many
                            // there may be multi hashtags
                            if (comm.hashtags != null) {
                                for (i = 0; i < comm.hashtags.length; i++) {
                                    if (tags[comm.hashtags[i]] == null) {
                                        tags[comm.hashtags[i]] = 1;
                                    } else {
                                        tags[comm.hashtags[i]] += 1;
                                    }
                                }
                            }
                        })
                        .on('error', function (err) {
                            reject(err);
                        })
                        .on('end', function () {
                            resolve();
                        });
                });
                return promise;
            };

            var randomCommunitities = function() {
                var promise = new Promise(function(resolve, reject) {
                    CommunityModel.syncRandom(function (err, result) {
                        resolve();
                    });
                });
                return promise;
            };

            // push promises to array
            promiseslist.push(tempfunctionTagsForms());
            //promiseslist.push(tempfunctionTagsCommunities());
            promiseslist.push(randomCommunitities());

            return Promise.all(promiseslist).then(function () {
                for (var key in tags) {
                    datadump.push({tag: key, count: +tags[key]});
                }
                resolve();
            }).catch(function() {
                reject();
            });

        })
        .then(function () {
            // delete all current counts
            TagsModel.collection.drop();
        })
        .then(function () {
            // dump this data
            TagsModel.create(datadump, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log("tags updated");
                }
            });
        });
});

module.exports = app;
