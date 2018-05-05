var email 	= require("../node_modules/emailjs/email");
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
        // exports.sendEmail(email, subject, html, messagesafe);
    });
};

exports.sendNewPassword = function sendNewPassword(email, pw) {
    var messagesafe = "new password: "+pw;
    var subject = "New password requested";
    
    renderTemplate("new-password", {subject: subject, password: pw}).then(function(html) {
        // exports.sendEmail(email, subject, html, messagesafe);
    });
};


exports.sendNotificationFriendRequest = function sendNotificationFriendRequest(email, user) {
    var messagesafe = "Hello! ... requested you to connect. Please review the notifications page to review your pending network requests. https://www.questionsly.com/settings;page=notifications";
    var subject = "New Friend Requests on Questionsly";
    var gender = user.gender === 'male' ? "his" : "her";
    var dateString = new Date();
    dateString = dateString.toDateString();
    
    renderTemplate("notification-friend-request", {
        subject: subject, 
        friendName: getUserDisplayName(user),
        pic: getUserPic(user),
        gender: gender,
        date: dateString,
        link: "https://www.questionsly.com/settings;page=notifications"
    }).then(function(html) {
        // exports.sendEmail(email, subject, html, messagesafe);
    });
};

exports.sendNotificationFormRequest = function sendNotificationFormRequest(email, user, link) {
    var name = getUserDisplayName(user);    
    var subject = getUserDisplayName(user) + ": Request to answer question on Questionsly";
    var messagesafe = "Hello! " + " requested you to answer on Questionsly. Please review the notifications page to review your pending requests. https://www.questionsly.com/settings;page=notifications";

    renderTemplate("notification-form-request", {
        subject: subject, 
        friendName: name,
        pic: getUserPic(user),
        link: `https://www.questionsly.com/feed;survey=${link}`
    }).then(function(html) {
        // exports.sendEmail(email, subject, html, messagesafe);
    });
};


exports.sendNotificationCommRequest = function sendNotificationCommRequest(email, sender, commtitle, commpic) {
    var subject = "You have been invited to join a community on Questionsly";
    var messagesafe = "Hello! " + " invited you to join a community on Questionsly. Please review the notifications page to review your pending requests. https://www.questionsly.com/settings;page=notifications";
    var dateString = new Date();
    dateString = dateString.toDateString();

    renderTemplate("notification-community-invitation", {
        subject: subject,
        sender: sender,
        community: commtitle,
        commPic: commpic,
        date: dateString,
        link: `https://www.questionsly.com/settings;page=notifications`
    }).then(function(html) {
        // exports.sendEmail(email, subject, html, messagesafe);
    });
};


exports.sendNotificationDiscussion = function sendNotificationDiscussion(email, commenter, link, firstquestion) {
    var subject = "Survey comments on Questionsly";
    var messagesafe = "Hello! " + " commented on your form on Questionsly. Please review the notifications page to review your pending requests. https://www.questionsly.com/settings;page=notifications";
    var dateString = new Date();
    dateString = dateString.toDateString();

    renderTemplate("notification-comment", {
        subject: subject, 
        commenter: getUserDisplayName(commenter),
        commenterPic: getUserPic(commenter),
        date: dateString,
        question: firstquestion,
        link: `https://www.questionsly.com/feed;survey=${link}`
    }).then(function(html) {
        // exports.sendEmail(email, subject, html, messagesafe);
    });
};


exports.sendNotificationDiscussionFollowUp = function sendNotificationDiscussionFollowUp(email, commenter, ogPoster, firstquestion, link) {
    var subject = "Survey comments on Questionsly";
    var messagesafe = "Hello! "  + " commented on your form on Questionsly. Please review the notifications page to review your pending requests. https://www.questionsly.com/settings;page=notifications";
    var dateString = new Date();
    dateString = dateString.toDateString();

    renderTemplate("notification-followup-comment", {
        subject: subject,
        newCommenter: getUserDisplayName(commenter),
        newCommenterPic: getUserPic(commenter),
        ogPoster: getUserDisplayName(ogPoster),
        question: firstquestion,
        date: dateString,
        link: `https://www.questionsly.com/feed;survey=${link}`
    }).then(function (html) {
        // exports.sendEmail(email, subject, html, messagesafe);
    });
};



exports.sendNotificationFormActivity = function sendNotificationFormActivity(email, user, question, link) {
    var subject = "People are answering your question";
    var messagesafe = "Hello! Users are completing your form on Questionsly. Please review the notifications page to review your pending requests. https://www.questionsly.com/settings;page=notifications";
    var dateString = new Date();
    dateString = dateString.toDateString();

    console.log("User:", user, "pic:", getUserPic(user));

    renderTemplate("notification-survey-activity", {
        subject: subject,
        userPic: getUserPic(user),
        userName: getUserDisplayName(user),
        question: question,
        date: dateString,
        link: `https://www.questionsly.com/feed;survey=${link}`
    }).then(function(html) {
        // exports.sendEmail(email, subject, html, messagesafe);
    });
};


exports.sendNotificationError = function sendNotificationError(error) {
    var subject = "Error report Questionsly";
    var email = "arne.bruyneel@gmail.com";
    var messagesafe = error;

    renderTemplate("notification-error", {
        subject: subject, 
        error: error
    }).then(function(html) {
        // exports.sendEmail(email, subject, html, messagesafe);
    });
};

exports.sendEmail = function sendEmail(email, subject, html, messagesafe) {
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
