var request = require('request');
var AWS = require('aws-sdk');
var randommod = require("../functions/random");

// From https://stackoverflow.com/a/25564742/638818
function put_from_url(s3, url, bucket, key, callback) {
    request({
        url: url,
        encoding: null
    }, function(err, res, body) {
        if (err)
            return callback(err, res);

        s3.putObject({
            Bucket: bucket,
            Key: key,
            ContentType: res.headers['content-type'],
            ContentLength: res.headers['content-length'],
            Body: body // buffer
        }, callback);
    })
}

exports.uploadFromUrlToS3 = function uploadFromUrlToS3(url, callback) {
    AWS.config.region = 'us-west-1';

    var s3 = new AWS.S3();
    var bucket = process.env.S3_BUCKET;
    var key = randommod.makeRandomFilename() + '.' + url.split('.').pop();

    // console.log('uploadFromUrlToS3', url, bucket, key);

    put_from_url(s3, url, bucket, key, function (err, res) {
        var newUrl = `https://${bucket}.s3.amazonaws.com/${key}`
        // console.log('uploadFromUrlToS3-done', !!err, res, newUrl);
        callback(err, res, newUrl);
    });
};
