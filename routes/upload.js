const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-west-1';
var randommod = require("../functions/random");

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    app.get('/sign-s3', function (req, res) {
        console.log('s3 sign request');
        const s3 = new aws.S3();
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];

        // Figure out a unique filename
        var ext = fileName.split('.').pop();
        var random = randommod.makeRandomFilename();

        var filename = random + '.' + ext;

        const s3Params = {
            Bucket: S3_BUCKET,
            Key: filename,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };

        s3.getSignedUrl('putObject', s3Params, function (err, data) {
            if (err) {
                console.log(err);
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`
            };
            console.log(returnData);
            res.write(JSON.stringify(returnData));
            res.end();
        });
    });

};