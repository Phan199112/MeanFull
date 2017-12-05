var NetworkEdgesModel = require('../db.models/networkedges.model');

// this function will test whether two user are connected
exports.areConnected  = function areConnected(x,y) {
    var networkdatatemp = [];
    var output = false;
    return new Promise(function (resolve, reject) {
        NetworkEdgesModel.find({userid: x}).cursor()
            .on('data', function (edge) {
                // edge.userid will contain two IDs, we want the other one (not x)
                if (edge.status === true) {
                    // status: true means that they are connected
                    if (edge.userid[0] !== x) {
                        networkdatatemp.push(edge.userid[0]);
                    } else {
                        networkdatatemp.push(edge.userid[1]);
                    }
                }
            })
            .on('error', function (err) {
                reject(err);
            })
            .on('end', function () {
                // in network?
                for (var i = 0; i < networkdatatemp.length; i++) {
                    if (networkdatatemp[i] === y) {
                        output = true;
                    }
                }
                //
                resolve(output);
            });
    });
};