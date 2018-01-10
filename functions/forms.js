var mathfunctions = require('../functions/math');
var FormModel = require('../db.models/form.model');

exports.formPublic  = function formPublic(x) {
    return new Promise(function(resolve, reject){
        FormModel.findById(x, function (err, forminfo) {
            if (err) {
                reject(err);
            } else {
                if (forminfo) {
                    resolve(forminfo.public);
                } else {
                    resolve(false);
                }
            }
        });
    });
};

exports.formEvent  = function formEvent(x) {
    return new Promise(function(resolve, reject){
        FormModel.findById(x, function (err, forminfo) {
            if (err) {
                reject(err);
            } else {
                if (forminfo) {
                    resolve(forminfo.typeevent);
                } else {
                    resolve(false);
                }
            }
        });
    });
};

// this function will test whether a user is a member or admin
exports.formAdmin = function formAdmin(x,y) {
    return new Promise(function(resolve, reject){
        FormModel.findById(x, function (err, forminfo) {
            if (err) {
                reject(err);
            } else {
                if (forminfo) {
                    if (forminfo.userid == y) {
                        resolve(true);

                    } else {
                        resolve(false);
                    }

                } else {
                    resolve(false);
                }
            }
        });
    });
};


exports.analyzeAll = function analyzeAll(x, types, percent) {
    var exportdataAll = [];
    // compute
    var firstanswer = x[0];
    var noquestions = firstanswer.answers.length;

    // analysis type
    percent = percent === undefined;

    // loop through all questions
    for (var i = 0; i < noquestions; i++) {
        // test first of this question is of a suitable type:
        if (types[i] !== "Short answer" && types[i] !== "Paragraph" && types[i] !== "Rank" && types[i] !== "Matrix") {
            // declare temp
            var temp = [];

            // loop through all forms and look at data for this question
            if (types[i] === 'Checkboxes') {
                // if multiple selected split.
                for (var j = 0; j < x.length; j++) {
                    if (x[j].answers[i].answer.constructor === Array) {
                        for (var r = 0; r < x[j].answers[i].answer.length; r++) {
                            temp.push(x[j].answers[i].answer[r]);
                        }

                    } else {
                        temp.push(x[j].answers[i].answer);
                    }

                }

            } else if (types[i] === 'Stars') {
                // add the word star(s) to the numerical value
                for (var j = 0; j < x.length; j++) {
                    if (x[j].answers[i].answer > 1) {
                        temp.push(x[j].answers[i].answer+" stars");
                    } else {
                        temp.push(x[j].answers[i].answer+" star");
                    }
                }

            } else {
                //
                for (var j = 0; j < x.length; j++) {
                    temp.push(x[j].answers[i].answer);
                }

            }

            // make a summary
            var counts = {};
            var total = 0;
            for (k = 0; k < temp.length; k++) {
                counts[temp[k]] = (counts[temp[k]] + 1) || 1;
                total += 1;
            }

            // reformat
            var summaryLabels = [];
            var summaryValues = [];
            if (percent) {
                // and make percentage
                for (var keys in counts) {
                    summaryLabels.push(keys);
                    summaryValues.push(Math.round(((100/total)*counts[keys])*100)/100);
                }

            } else {
                // counts
                for (var key in counts) {
                    summaryLabels.push(key);
                    summaryValues.push(counts[key]);
                }
            }

            //
            exportdataAll.push([summaryLabels, summaryValues]);
        } else {
            // return a blank for this question
            exportdataAll.push([[], []]);
        }

    }

    return exportdataAll;
};

exports.analyzeSegregated = function analyzeSegregated(x, users, param, types) {
    var exportdata = [];
    // compute
    var firstanswer = x[0];
    var noquestions = firstanswer.answers.length;

    // loop through all questions
    for (var i = 0; i < noquestions; i++) {
        // test first of this question is of a suitable type:
        if (types[i] !== "Short answer" && types[i] !== "Paragraph" && types[i] !== "Rank" && types[i] !== "Matrix") {
            // declare temp
            var temp = [];
            // loop through all forms and look at data for this question
            for (var j = 0; j < x.length; j++) {
                var current = x[j];
                var currentq = current.answers[i];
                var templocation;
                var age;

                if (users[current.userid] != null) {
                    if (users[current.userid].location != null) {
                        if (users[current.userid].location.city !== "" && users[current.userid].location.state !== "" && users[current.userid].location.country !== "") {
                            templocation = users[current.userid].location.city+", "+users[current.userid].location.state+", "+users[current.userid].location.country;

                        } else {
                            templocation = 'Earth';

                        }

                    } else {
                        templocation = 'Earth';

                    }

                    if (users[current.userid].dob != null) {
                        age = mathfunctions.calculateAge(users[current.userid]);
                    } else {
                        age = 0;
                    }

                    if ((param.gender.indexOf(users[current.userid].gender) !== "-1") && (param.age.indexOf(age) !== "-1") && (param.location.indexOf(templocation) !== "-1")) {

                        if (types[i] === 'Checkboxes') {
                            if (currentq.answer.constructor === Array) {
                                for (var r = 0; r < currentq.answer.length; r++) {
                                    temp.push(currentq.answer[r]);
                                }

                            } else {
                                temp.push(currentq.answer);
                            }

                        } else if (types[i] === 'Stars') {
                            if (currentq.answer > 1) {
                                temp.push(currentq.answer+" stars");

                            } else {
                                temp.push(currentq.answer+" star");
                            }


                        } else {
                            temp.push(currentq.answer);

                        }
                    }
                }
            }

            // make a summary
            var counts = {};
            var total = 0;
            for (k = 0; k < temp.length; k++) {
                counts[temp[k]] = (counts[temp[k]] + 1) || 1;
                total += 1;
            }

            // reformat
            // and make percentage
            var summaryLabels = [];
            var summaryValues = [];
            for (var key in counts) {
                summaryLabels.push(key);
                summaryValues.push(Math.round(((100/total)*counts[key])*100)/100);
            }

            //
            exportdata.push([summaryLabels, summaryValues]);

        } else {
            // return a blank for this question
            exportdata.push([[], []]);
        }

    }

    return exportdata;
};


exports.analyzeTable = function analyzeTable(x, users) {
    var exportdata = [];
    // compute
    var firstanswer = x[0];
    var noquestions = firstanswer.answers.length;

    // loop through answers and link to users at the same time
    for (var k = 0; k < x.length; k++) {
        var temp = x[k];
        var ans = [];

        // loop through all questions
        for (var i = 0; i < noquestions; i++) {
            ans.push(temp.answers[i].answer);
        }

        exportdata.push({name: users[temp.userid], answers: ans});
    }

    return exportdata;
};

exports.exportTable = function exportTable(x, users) {
    var exportdata = "Name";
    // compute
    var firstanswer = x[0];
    var noquestions = firstanswer.answers.length;

    // header
    for (j = 0; j < noquestions; j++) {
        exportdata += ",Q"+(j+1);
    }

    // loop through answers and link to users at the same time
    for (k = 0; k < x.length; k++) {
        var temp = x[k];
        var ans = "";

        // loop through all questions
        for (i = 0; i < noquestions; i++) {
            if (i > 0) {
                ans += ","+temp.answers[i].answer;
            } else {
                ans = ","+temp.answers[i].answer;
            }
        }

        exportdata += "\n"+users[temp.userid]+ans;
    }

    return exportdata;
};
