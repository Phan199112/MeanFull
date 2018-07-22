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
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Set up default mongoose connection

// FOR DEBUG AND TESTING
//var mongoDB = 'mongodb://cwlocaltest:HCW-9yE-9Tz-keb@ds125255.mlab.com:25255/cw';

// mongodb (this is the live version with real data, if you'd like to do tests us the mlab above)
// PRODUCTION LEVEL DB
var mongoDB = 'mongodb://questionslyadmindb123:g92TcJdYWzDkTK7I@questionslydb1-shard-00-00-hv0tz.mongodb.net:27017,questionslydb1-shard-00-01-hv0tz.mongodb.net:27017,questionslydb1-shard-00-02-hv0tz.mongodb.net:27017/qslyOrgs?ssl=true&replicaSet=questionslydb1-shard-0&authSource=admin';

mongoose.connect(mongoDB, {
    useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));






// HTTPS
// enable ssl redirect
app.use(sslRedirect());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'QuestionslyFrontend', 'dist')));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(session({
    secret: 'efewgndwdssxsxsffsdhgldsljgjdskfdfdspkpldfdgdk',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: db})
}));
app.use(flash());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// routes
var usersroute = require('./routes/users.login.js')(app, passport, manager, hashids);
var formsroute = require('./routes/forms')(app, passport, manager, hashids);
var profileroute = require('./routes/users.profile')(app, passport, manager, hashids);
var tagsroute = require('./routes/tags')(app, passport, manager, hashids);
var settingsroute = require('./routes/settings')(app, passport, manager, hashids);
var eventsroute = require('./routes/events')(app, passport, manager, hashids);
var communityroute = require('./routes/groups')(app, passport, manager, hashids);
var feedbackroute = require('./routes/feedback')(app, passport, manager, hashids);
var searchroute = require('./routes/search')(app, passport, manager, hashids);
var uploadroute = require('./routes/upload')(app, passport, manager, hashids);
var discussroute = require('./routes/discussion')(app, passport, manager, hashids);
var orgsroute = require('./routes/organizations')(app, passport, manager, hashids);
var emailfunctions = require("./functions/email");

//
app.use('/privacy', function(req, res, next) {
    res.render("privacy");
});
app.use('/tos', function(req, res, next) {
    res.render("tos");
});

// Index and all 404's
app.use(function(req, res, next) {
    var userLoginState = '0';
    // Check req.user.name in case we are authenticated as a deleted user
    if (req.isAuthenticated() && req.user.name) {
        userLoginState = JSON.stringify({
            firstname: req.user.name.first,
            lastname: req.user.name.last,
            dbid: hashids.encodeHex(req.session.userid),
            location: req.user.location,
            picdata: req.user.pic,
            gender: req.user.gender,
            fbid:req.user.fbid,
            fb: req.user.fb,
            role: req.user.role,
        });
    }
    
    res.render(path.join(__dirname, 'QuestionslyFrontend', 'dist', 'index-template.hbs'), {userLoginState: userLoginState});
});



// cron jobs
var cron = require('node-cron');
var TagsModel = require('./db.models/tags.model');
var UserModel = require('./db.models/user.model');
var PostModel = require('./db.models/post.model');
var GroupModel = require('./db.models/group.model');
var EmailStoreModel = require('./db.models/emailStore.model');
var NetworkEdgesModel = require('./db.models/networkedges.model');

// July 2018: this needs some re-work
//getSearchAndTags();
//
// // crons for tags
// cron.schedule('*/1 * * * *', getSearchAndTags);

function getSearchAndTags() {
    var tags = [];
    var datadump = [];
    var promiseslist = [];

    // mongoDB query for tags, only query public forms
    new Promise(function (resolve, reject) {
        var tempfunctionTagsForms = function () {
            return new Promise(function (resolve, reject) {
                PostModel.find({ public: true, shared: true }).cursor()
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
        };

        var tempfunctionTagsCommunities = function () {
            return new Promise(function (resolve, reject) {
                GroupModel.find({ public: true }).cursor()
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
        };

        var randomCommunitities = function () {
            return new Promise(function (resolve, reject) {
                GroupModel.syncRandom(function (err, result) {
                    resolve();
                });
            });
        };

        var tempfunctionListUsers = function () {
            var userlist = [];
            return new Promise(function (resolve, reject) {
                UserModel.find({}).cursor()
                    .on('data', function (user) {
                        userlist.push(user.name.first + " " + user.name.last);
                    })
                    .on('error', function (err) {
                        reject(err);
                    })
                    .on('end', function () {
                        console.log(userlist);
                        resolve();
                    });
            });
        };

        // push promises to array
        promiseslist.push(tempfunctionTagsForms());
        //promiseslist.push(tempfunctionTagsCommunities());
        promiseslist.push(randomCommunitities());
        //promiseslist.push(tempfunctionListUsers());

        return Promise.all(promiseslist).then(function () {
            for (var key in tags) {
                datadump.push({ tag: key, count: +tags[key] });
            }
            resolve();
        }).catch(function () {
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
}

var CronJob = require('cron').CronJob;
var job = new CronJob({
    cronTime: '00 00 20 * * 0-6',
    onTick: emailfunctions.sendSummary,
    start: false,
    timeZone: 'America/Los_Angeles'
});
job.start();

module.exports = app;



// Functions below are for quick fixes for MongoDB problems during UCLA signups

// Multiple Community Addition Fix
// (function() {
//     if (GroupModel) {
//         GroupModel.findById("communityID", function(err, comm) {
//         var members = comm.members;
//         var gotFirstAlready = false;
//         var firstIndex = 0;
//         var lastIndex = 0;
//         members.forEach((m,i) => {
//             if (m === "userID") {
//                 if (!gotFirstAlready) {
//                     gotFirstAlready = true; 
//                     firstIndex = i;
//                     lastIndex = i;
//                     console.log("Special treatment", i);
//                 } else {
//                     // console.log(i);
//                     lastIndex = i;
//                 }   
//             }
//             return;
//         })

//         var numToDelete = lastIndex - firstIndex;
//         console.log('lastIndex:', lastIndex, "TO DELETE: ", numToDelete);

//         members.splice(firstIndex + 1, numToDelete);
//         comm.save(function(err) {
//             console.log("OOPS", err);
//         })
//         // console.log(members);
//     })

// }}
// )();



// Find Duplicates within a community
// (function() {
//     if (GroupModel) {
//         GroupModel.findById("5ae62d1393627a0014880ba6", function(err, comm) {
//         var members = comm.members;
//         var duplicates = [];

//         members.forEach((m,i) => {
//             members.forEach((n,j) => {
//                 if (m == n && i!=j) {
//                     duplicates.push([m,j]);
//                 }
//             })
//         })

//         console.log('Duplicates: \n', duplicates);
//     })
// }}
// )();

// Get all friend requests for a user
// (function() {
//     if (NetworkEdgesModel) {
//         NetworkEdgesModel.find({ userid: "userID" , status: false}, function(err, comm) {
            
//         comm.forEach((m,i) => {
//             console.log(`https://www.questionsly.com/profile/${hashids.encodeHex(m.userid[0])} \n`);            
//         })
//     })
// }}
// )();




// Decode hash
// console.log("Unhashed:", hashids.decodeHex(""));