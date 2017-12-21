var email 	= require("../node_modules/emailjs/email");
var server 	= email.server.connect({
    user:    "cw@arnebruyneel.be",
    password:"HCW-9yE-9Tz-keb",
    host:    "send.one.com",
    ssl:     true
});


exports.sendEmailVerification = function sendEmailVerification(email, link) {
    var messagesafe = "A request was received to generate a user account with your email address. " +
        "If you made this request, please confirm by clicking on the link. <a href="+link+">"+link+"</a>" +
        "If not, please ignore this email.";

    var message = `<div class="card text-center" style="width: 60%; margin: 0 auto 0 auto;">
                                    <div class="card-body">
                                        <p class="card-text">One step away!</p>
                                        <a href=`+link+` class="btn btn-success">Verify your email</a>
                                    </div>
                                </div>
                                <small class="text-muted">You are receiving this email because you requested to sign up at <a target="_blank" href="https://www.crowdworks.us">crowdworks</a>.</small>
                                <br>
                                <p><small class="text-muted">If you don't wish to continue please ignore this email.</small></p>
                                <small class="text-muted">Having trouble with verification? Please, copy and paste the following link in the browser</small>
                                <br>
                                <small>`+link+`</small>`;
    this.sendEmail(email, "Account verification", message, messagesafe);
};

exports.sendNewPassword = function sendNewPassword(email, pw) {
    var messagesafe = "new password: "+pw;
    var message = `<div class="card text-center" style="width: 60%; margin: 0 auto 0 auto;">
                                    <div class="card-body">
                                        <p class="card-text">No worries, we'll get you going again!</p>
                                         Here is your new password: `+pw+`
                                    </div>
                                </div>
                                <small class="text-muted">You are receiving this email because your email addres was used to request a new password at <a target="_blank" href="https://www.crowdworks.us">crowdworks</a>.</small>
                   `;

    this.sendEmail(email, "New password requested", message, messagesafe);
};


exports.sendNotificationFriendRequest = function sendNotificationFriendRequest(email, friendname) {
    var message = `<div class="card text-center" style="width: 60%; margin: 0 auto 0 auto;">
                                    <div class="card-body">
                                        <p class="card-text">`+friendname+` requested you to connect on CrowdWorks</p>
                                         <a href="https://www.crowdworks.us/settings;page=notifications" class="btn btn-success">Review network requests</a>
                                    </div>
                                </div>
                   `;
    var messagesafe = "Hello! "+friendname+" requested you to connect. Please review the notifications page to review your pending network requests. https://www.crowdworks.us/settings;page=notifications";

    this.sendEmail(email, "New network request from Crowdworks", message, messagesafe);
};

exports.sendNotificationFormRequest = function sendNotificationFormRequest(email, friendname, link) {
    var message = `<div class="card text-center" style="width: 60%; margin: 0 auto 0 auto;">
                                    <div class="card-body">
                                        <p class="card-text">`+friendname+` requested you to fill in a form on CrowdWorks</p>
                                         <a href="https://www.crowdworks.us/feed;survey=`+link+`" class="btn btn-success">View the survey</a>
                                    </div>
                                </div>
                   `;
    var messagesafe = "Hello! "+friendname+" requested you to fill in a form on CrowdWorks. Please review the notifications page to review your pending requests. https://www.crowdworks.us/settings;page=notifications";

    this.sendEmail(email, "New survey request from Crowdworks", message, messagesafe);
};

exports.sendEmail = function sendEmail(email, subject, message, messagesafe) {
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
