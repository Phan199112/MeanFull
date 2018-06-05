var email 	= require("../node_modules/emailjs/email");
var EmailStoreModel = require('../db.models/emailStore.model');
var UserModel = require('../db.models/user.model');
var FormModel = require('../db.models/form.model');
var CommunityModel = require('../db.models/community.model');

// var server 	= email.server.connect({
//     user:    "support@questionsly.com",
//     password:"welcome4294!",
//     host:    "smtpout.secureserver.net",
//     ssl:     true,
//     tls: {ciphers: "SSLv3"}
// });

var server 	= email.server.connect({
    user:    "cw@arnebruyneel.be",
    password:"HCW-9yE-9Tz-keb",
    host:    "send.one.com",
    ssl:     true
});

var fs = require("fs");
var mjml = require("mjml");


/// functions

function renderTemplate(template, context) {
    return new Promise(function(resolve, reject) {
        fs.readFile(`views/emails/${template}.mjml`, function(error, data) {
            var str = data.toString();
            Object.keys(context).forEach(function(key) {
                str = str.replace(new RegExp(`{{${key}}}`, 'g'), context[key]);
            });
            resolve(mjml.mjml2html(str).html);
        });
    });
}

function getUserDisplayName(user) {
    var name = "";

    //if (user.provider === "facebook") {
    //    name = user.displayName;
    //} else {
        name = user.name.first + ' ' + user.name.last;
    //}

    return name;
}

function getUserGender(user) {
    return user.gender;
}

function getUserPic(user) {
    if (user.fb) {
        return `https://graph.facebook.com/${user.fbid}/picture?width=80&height=80`;
    } else {
        if (user.pic) {
            return user.pic;
        } else {
            return `http://questionsly.com/images/${user.gender}.png`;
        }
    }
}

exports.sendEmailVerification = function sendEmailVerification(email, link, firstName) {
    var subject = "Account Verification";
    var messagesafe = "A request was received to generate a user account with your email address. " +
        "If you made this request, please confirm by clicking on the link. <a href="+link+">"+link+"</a>" +
        "If not, please ignore this email.";


    renderTemplate("email-verification", {subject: subject, firstName: firstName, confirmationLink: link}).then(function(html) {
        exports.sendEmail(email, subject, html, messagesafe);
    });
};

exports.sendNewPassword = function sendNewPassword(email, pw) {
    var messagesafe = "new password: "+pw;
    var subject = "Questionsly - New Password Requested";
    
    renderTemplate("new-password", {subject: subject, password: pw}).then(function(html) {
        exports.sendEmail(email, subject, html, messagesafe);
    });
};

// `user` can be null for anonymous questions
exports.sendNotificationFormRequest = function sendNotificationFormRequest(email, user, link, questionText) {
    var subject = getUserDisplayName(user) + ": Request to answer question on Questionsly";
    var messagesafe = "Hello! " + " requested you to answer on Questionsly. Please review the notifications page to review your pending requests. https://www.questionsly.com/settings;page=notifications";

    var data;
    if (user) {
        data = {
            userName:   getUserDisplayName(user),
            userPic:    getUserPic(user),
            userGender: user.gender === 'male' ? "his" : "her",
            question:   questionText,
            link:       `https://www.questionsly.com/feed;survey=${link}`
        };
    } else {
        data = {
            userName:   'Someone',
            userPic:    '',
            userGender: 'his',
            question:   questionText,
            link:       `https://www.questionsly.com/feed;survey=${link}`
        };
    }

    renderTemplate("notification-form-request", data).then(function(html) {
        exports.sendEmail(email, subject, html, messagesafe);
    });
};


exports.sendReport = function sendReport(email, user, title, question, reportName) {
    var subject = "Questionsly - " + getUserDisplayName(user) + " has shared a document with you!";
    var messagesafe = "Hello! Users are completing your form on Questionsly. Please review the notifications page to review your pending requests. https://www.questionsly.com/settings;page=notifications";
    // console.log('EXPORTED:', email, user, question, title, reportName );

    renderTemplate("notification-report", {
        subject: subject,
        userPic: getUserPic(user),
        userName: getUserDisplayName(user),
        userGender: getUserGender(user),
        question: question,
        title: title
    }).then(function(html) {
        exports.sendReportEmail(email, subject, html, messagesafe, reportName);
    });
};

function renderTemplateLoopFix(template, context) { 
    return new Promise(function (resolve, reject) {
        fs.readFile(`views/emails/${template}.mjml`, function (error, data) {
            var str = data.toString();
            Object.keys(context).forEach(function (key) {
                str = str.replace(new RegExp(key, 'g'), context[key]);
            });
            resolve(mjml.mjml2html(str).html);
        });
    });
}

exports.sendSummary = function sendSummary() {
    var subject = "Your Daily Questionsly Summary";
    var messagesafe = "";
    var date = new Date();
    var dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    var date = date.toLocaleDateString('en-US', dateOptions);

    // Goes through email store to send summary emails to whoever has received any notification in the past day
    EmailStoreModel.find({}, function (err, updates) {
        if (err) {
            console.log("Error sending out summary email.");
            return;
        } 

        // Does this for each person: Each entry in the email store represents one user.
        updates.forEach(function(update) {
            var email = "";
            var networkString = "";
            var communityString = "";
            var questionsString = "";
            var sharedString = "";
            var ifNetworkString = "";
            var ifCommunityString = "";
            var ifQuestionsString = "";
            var ifSharedString = "";

            if (update.network.length > 0) ifNetworkString = `
                <mj-section padding-left="20px" padding-bottom="5px">
                    <mj-text font-size="22" color="#2b2b2b"font-family="Karla">People Who Added You</mj-text>  
                </mj-section>
            `;
            if (update.community.length > 0) ifCommunityString = `
                <mj-section padding-left="20px" padding-bottom="5px">
                    <mj-text font-size="22" color="#2b2b2b"font-family="Karla">Community Requests</mj-text>  
                </mj-section>
            `;
            if (update.questions.length > 0) ifQuestionsString = `
                <mj-section padding-left="20px" padding-bottom="5px">
                    <mj-text font-size="22" color="#2b2b2b"font-family="Karla">Question Updates</mj-text>  
                </mj-section>
            `;
            if (update.shared.length > 0) ifSharedString = `
                <mj-section padding-left="20px" padding-bottom="5px">
                    <mj-text font-size="22" color="#2b2b2b"font-family="Karla">Questions Shared With You</mj-text>  
                </mj-section>
            `;

            update.network.forEach(function(person) {
                networkString += `
                    <mj-section border="0px" text-align="left" padding-left="20px"  padding-top="10px">
                        <mj-column width="100px">
                            <mj-image width="80px" src="${person.pic}" href="${person.link}"/>
                            </mj-column>
                            
                            <mj-column>
                            <mj-text color="#818181" font-size="15" font-family="Karla">
                            <a style="color: #007bff" href="${person.link}">
                                ${person.name}
                            </a>
                            </mj-text>
                        </mj-column>
                    </mj-section> 

                `
            });
            
            update.community.forEach(function(community) {
                communityString += `
                    <mj-section border="0px" text-align="left" padding-left="20px"  padding-top="5px">
                        <mj-column width="100px">
                            <mj-image width="80px" src="${community.communityPic || 'https://kehillah.org/wp-content/uploads/2016/11/community-icon-1.png'}" href="${community.link}"/>
                        </mj-column>
                        <mj-column>
                            <mj-text color="#818181" font-size="15" font-family="Karla">
                                <a style="color: #007bff" href="${community.link}">
                                ${community.senderName} invited you to join the community ${community.communityTitle}
                                </a>
                            </mj-text>
                        </mj-column>
                    </mj-section> 
                    
                `
            });
            
            update.questions.forEach(function(question) {
                var responsePlural = question.responseCount > 1 ? 'responses' : 'response';
                var commentPlural = question.commentCount > 1 ? 'comments' : 'comment';
                var text = '';
                var picsHTML = '';

                if (question.responseCount == 0) {
                    text = question.commentCount + ' new ' + commentPlural;
                } else if (question.commentCount == 0) {
                    text = question.responseCount + ' new ' + responsePlural;
                } else {
                    text = question.responseCount + ' new ' + responsePlural + ' and ' +
                        question.commentCount + ' new ' + commentPlural;
                }

                var profiles = question.responseProfiles.slice(0, 5);
                for (var i = 0; i < question.anonymousCount && profiles.length < 5; i++) {
                    profiles.push({
                        name: 'Anonymous',
                        profilePic: 'https://www.questionsly.com/images/male.png'
                    });
                }
                profiles.forEach(function (profile) {
                    picsHTML += `
                        <p style="padding-left: 25px; margin: 4px 0">
                            <a style="text-decoration: none; color: #2b2b2b" href="${question.link}">
                                <img src="${profile.profilePic}" style="height: 50px; vertical-align: middle; padding-right: 8px;">
                            </a>
                            <a style="text-decoration: none; color: #2b2b2b" href="${question.link}">
                                ${profile.name}
                            </a>
                        </p>
                    `
                });

                questionsString += `
                    <mj-section border="0px" padding-left="25px">
                        <mj-text font-size="15" font-family="Karla">
                            <a style="color: #007bff" href="${question.link}">${question.question}</a>
                            <br>
                            <a style="text-decoration: none; color: #2b2b2b" href="${question.link}">${text}</a>
                            ${picsHTML}
                        </mj-text>
                    </mj-section>
                `
            });

            update.shared.forEach(function(question) {
                sharedString += `
                    <mj-section border="0px" text-align="left" padding-left="20px"  padding-top="5px">
                        <mj-column width="120px">
                            <mj-image width="100px" src="${question.senderPic}" href="${question.link}"/>
                        </mj-column>
                        <mj-column>
                            <mj-text color="#818181" font-size="15" font-family="Karla">
                                <a style="text-decoration: none; color: #2b2b2b" href="${question.link}">${question.senderName} requested your answer to: </a>
                                <br/>
                                 <a style="color: #007bff" href="${question.link}">${question.question}</a>
                            </mj-text>
                        </mj-column>
                    </mj-section> 

                `
            });


            new Promise(function(resolve, reject) {
                UserModel.findById(update.userid, function (err, recipient) {
                    if (err) {
                        console.log("Error getting user!");
                        reject();
                    }
                    email = recipient.email;
                    resolve();
                });
            }).then(function() {
                renderTemplateLoopFix("summary", {
                    subject: subject,
                    fecha: date,
                    ifNetworkRequests: ifNetworkString,
                    ifCommunityRequests: ifCommunityString,
                    ifQuestionsRequests: ifQuestionsString,
                    ifSharedRequests: ifSharedString,
                    networkRequests: networkString,
                    communityRequests: communityString,
                    questionsRequests: questionsString,      
                    sharedRequests: sharedString      
                }).then(function (html) {
                    console.log("SUMMARY SENT OUT");
                    exports.sendEmail(email, subject, html, messagesafe);
                });
            }).then(function() {
                EmailStoreModel.remove({}, function (err, res) {
                    if (err) {
                        console.log("error deleting email store", err);
                    }
                    console.log("Emptied email store.");
                });
            })
            .catch(function(err) {
                console.log("Error in summary promise.", err);
            })
        });
        return;
    });
    
};


exports.sendEmail = function sendEmail(email, subject, html, messagesafe, reportName = "") {
    server.send({
        text:    messagesafe,
        from:    "Questionsly <cw@arnebruyneel.be>",
        to:      "<"+email+">",
        subject: subject,
        attachment:
            [
                { data: html, alternative:true }
            ]
    }, function(err) {
        console.log(err);
    });
};

exports.sendReportEmail = function sendEmail(email, subject, html, messagesafe, reportPath = "") {    
    server.send({
        text:    messagesafe,
        from:    "Questionsly <cw@arnebruyneel.be>",
        to:      "<"+email+">",
        subject: subject,
        attachment:
            [
                { data: html, alternative:true },
                { path: reportPath, type: "application/pdf", name: "Questionsly Report.pdf" }
            ]
    }, function(err) {
        console.log(err);
    });
};
