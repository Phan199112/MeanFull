var email 	= require("../node_modules/emailjs/email");
var server 	= email.server.connect({
    user:    "cw@arnebruyneel.be",
    password:"HCW-9yE-9Tz-keb",
    host:    "send.one.com",
    ssl:     true
});
var fs = require("fs");
var mjml = require("mjml");

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

    if (user.provider === "facebook") {
        name = user.displayName;
    } else {
        name = user.name.first + ' ' + user.name.last;
    }

    return name;
}

function getUserPic(user) {
    if (user.pic) {
        return user.pic;
    } else {
        return `http://questionsly.com/images/${user.gender}.png`;
    }
}

exports.sendEmailVerification = function sendEmailVerification(email, link) {
    var subject = "Account verification";
    var messagesafe = "A request was received to generate a user account with your email address. " +
        "If you made this request, please confirm by clicking on the link. <a href="+link+">"+link+"</a>" +
        "If not, please ignore this email.";

    renderTemplate("email-verification", {subject: subject, link: link}).then(function(html) {
        exports.sendEmail(email, subject, html, messagesafe);
    });
};

exports.sendNewPassword = function sendNewPassword(email, pw) {
    var messagesafe = "new password: "+pw;
    var subject = "New password requested";
    
    renderTemplate("new-password", {subject: subject, password: pw}).then(function(html) {
        exports.sendEmail(email, subject, html, messagesafe);
    });
};


exports.sendNotificationFriendRequest = function sendNotificationFriendRequest(email, user) {
    var name = getUserDisplayName(user);
    var messagesafe = "Hello! " + name + " requested you to connect. Please review the notifications page to review your pending network requests. https://www.questionsly.com/settings;page=notifications";
    var subject = "New network request from Crowdworks";
    
    renderTemplate("notification-friend-request", {
        subject: subject, 
        friendName: name,
        pic: getUserPic(user),
        link: "https://www.questionsly.com/settings;page=notifications"
    }).then(function(html) {
        exports.sendEmail(email, subject, html, messagesafe);
    });
};

exports.sendNotificationFormRequest = function sendNotificationFormRequest(email, friendname, link) {
    var message = `<div class="card text-center" style="width: 60%; margin: 0 auto 0 auto;">
                                    <div class="card-body">
                                        <p class="card-text">`+friendname+` requested you to fill in a form on CrowdWorks</p>
                                         <a href="https://www.questionsly.com/feed;survey=`+link+`" class="btn btn-success">View the survey</a>
                                    </div>
                                </div>
                   `;
    var messagesafe = "Hello! "+friendname+" requested you to fill in a form on CrowdWorks. Please review the notifications page to review your pending requests. https://www.questionsly.com/settings;page=notifications";

    this.sendEmailOld(email, "New survey request from Crowdworks", message, messagesafe);
};


exports.sendNotificationDiscussion = function sendNotificationDiscussion(email, friendname, link) {
    var message = `<div class="card text-center" style="width: 60%; margin: 0 auto 0 auto;">
                                    <div class="card-body">
                                        <p class="card-text">`+friendname+` commented on your form on CrowdWorks</p>
                                         <a href="https://www.questionsly.com/feed;survey=`+link+`" class="btn btn-success">View the survey</a>
                                    </div>
                                </div>
                   `;
    var messagesafe = "Hello! "+friendname+" commented on your form on CrowdWorks. Please review the notifications page to review your pending requests. https://www.questionsly.com/settings;page=notifications";

    this.sendEmailOld(email, "Survey comments on Crowdworks", message, messagesafe);
};


exports.sendNotificationFormActivity = function sendNotificationFormActivity(email, link) {
    var message = `<div class="card text-center" style="width: 60%; margin: 0 auto 0 auto;">
                                    <div class="card-body">
                                        <p class="card-text">Users are completing your form on CrowdWorks</p>
                                         <a href="https://www.questionsly.com/feed;survey=`+link+`" class="btn btn-success">View the survey and results</a>
                                    </div>
                                </div>
                   `;
    var messagesafe = "Hello! Users are completing your form on CrowdWorks. Please review the notifications page to review your pending requests. https://www.questionsly.com/settings;page=notifications";

    this.sendEmailOld(email, "Survey activity on Crowdworks", message, messagesafe);
};


exports.sendNotificationError = function sendNotificationError(error) {
    var email = "arne.bruyneel@gmail.com";
    var message = `<div class="card text-center" style="width: 60%; margin: 0 auto 0 auto;">
                                    <div class="card-body">
                                        <p class="card-text">`+error+`</p>
                                    </div>
                                </div>
                   `;
    var messagesafe = error;

    this.sendEmailOld(email, "Error report CrowdWorks", message, messagesafe);
};

exports.sendEmailOld = function sendEmail(email, subject, message, messagesafe) {
    server.send({
        text:    messagesafe,
        from:    "CrowdWorks <cw@arnebruyneel.be>",
        to:      "<"+email+">",
        subject: subject,
        attachment:
            [
                { data: `
               <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>`+subject+`</title>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/css/bootstrap.min.css">
                    </head>
                    <body>
                    <div class="container" style="margin: 50px 0 0 0">
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 text-center" style="color: #1E824C; ">
                                <h2>CrowdWorks</h2>
                                `+message+`
                            </div>
                            <div class="col-md-3"></div>
                        </div>
                    </div>
                    </body>
                    </html>
               `,alternative:true
                }
            ]
    }, function(err) {
        console.log(err);
    });
};

exports.sendEmail = function sendEmail(email, subject, html, messagesafe) {
    server.send({
        text:    messagesafe,
        from:    "CrowdWorks <cw@arnebruyneel.be>",
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
