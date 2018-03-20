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
        if (types[i] !== "Short Answer" && types[i] !== "Paragraph" && types[i] !== "Matrix") {
            // declare temp
            var temp = [];

            // loop through all forms and look at data for this question
            if (types[i] === 'Multiple Choice') {
                // if multiple selected split.
                for (var j = 0; j < x.length; j++) {

                    if (typeof x[j].answers[i].answer === "object") {
                        for (var key in x[j].answers[i].answer) {
                            if (x[j].answers[i].answer[key]) {
                                temp.push(key);
                            }
                        }
                        
                        // Old code.... In MongoDB, the answers are getting stored as Objects
    
                        // if (x[j].answers[i].answer.constructor === Array) { 
                        //     for (var r = 0; r < x[j].answers[i].answer.length; r++) {
                        //         temp.push(x[j].answers[i].answer[r]);
                        //     }


                    } else {
                        temp.push(x[j].answers[i].answer);
                    }
                }
                
                // console.log('Temp1: ', temp);


            } else if (types[i] === 'Stars') {
                // add the word star(s) to the numerical value
                for (var j = 0; j < x.length; j++) {
                    if (x[j].answers[i].answer > 1) {
                        temp.push(x[j].answers[i].answer + " stars");
                    } else {
                        temp.push(x[j].answers[i].answer + " star");
                    }
                }

            } else if (types[i] === "Rank") {
                //
                for (var j = 0; j < x.length; j++) {
                    // loop through the rank array
                    for (var a = 0; a < x[j].answers[i].answer.length; a++) {
                        temp.push(a+1+"."+x[j].answers[i].answer[a].label);
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
            var summaryCounts = [];
            if (percent) {
                // and make percentage
                for (var keys in counts) {
                    summaryLabels.push(keys);
                    summaryValues.push(Math.round(((100/total)*counts[keys])*100)/100);
                    summaryCounts.push(counts[keys]);
                }

            } else {
                // counts
                for (var key in counts) {
                    summaryLabels.push(key); //the answer
                    summaryValues.push(counts[key]); //answer count
                }
            }

            //
            exportdataAll.push([summaryLabels, [{ data: summaryValues, label: "all" }], summaryCounts]);
        } else {
            // return a blank for this question
            exportdataAll.push([[], [{data: [], label: ""}]]);
        }

    }

    return exportdataAll;
};

exports.analyzeSegregated = function analyzeSegregated(x, users, param, types, all) {
    // variables
    var exportdata = [];
    // compute
    var firstanswer = x[0];
    var noquestions = firstanswer.answers.length; //number of questions

    // loop through all questions
    for (var i = 0; i < noquestions; i++) {
        // test first of this question is of a suitable type:
        if (types[i] !== "Short Answer" && types[i] !== "Paragraph" && types[i] !== "Matrix") {
            // declare temp
            var temp = [];

            // loop through all forms and look at data for this question
            for (var j = 0; j < x.length; j++) {
                var current = x[j];
                var currentq = current.answers[i];
                var templocation;
                var tempgender;
                var age;

                if (users[current.userid] != null) {
                    var proceed = false;

                    if (users[current.userid].type === true) {
                        // a registered user

                        if (users[current.userid].location != null) {
                            if (users[current.userid].location.city !== "" && users[current.userid].location.state !== "" && users[current.userid].location.country !== "") {
                                //add users location to temp location array
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

                        if (users[current.userid].gender != null) {
                            tempgender = users[current.userid].gender;
                        } else {
                            tempgender = '';
                        }

                        if (all === true || (param.age.indexOf(age) !== -1) && (param.location.indexOf(templocation) !== -1) && (param.gender.indexOf(tempgender) !== -1)) {
                            proceed = true;
                        }

                    } else if (users[current.userid].type === false) {
                        //
                        if (all === true) {
                            proceed = true;
                        }

                    }

                    if (proceed) {
                        // New code
                        if (types[i] === 'Multiple Choice') {
                            // if multiple selected split.
                            if (typeof currentq.answer === "object") {
                                for (var key in currentq.answer) {
                                    if (currentq.answer[key]) {
                                        temp.push(key);
                                    }
                                }

                            } else {
                                temp.push(currentq.answer);
                            }

                        } else if (types[i] === 'Rating') {
                            if (currentq.answer > 1) {
                                temp.push(currentq.answer+" stars");

                            } else {
                                temp.push(currentq.answer+" star");
                            }

                        } else if (types[i] === "Rank") {
                            //
                            // loop through the rank array
                            for (var a = 0; a < currentq.answer.length; a++) {
                                temp.push(a+1+"."+currentq.answer[a].label);
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
            var summaryCounts = [];

            for (var key in counts) {
                // Trace labels --------
                summaryLabels.push(key);
                summaryValues.push(Math.round(((100/total)*counts[key])*100)/100);
                summaryCounts.push(counts[key]);
            }

            // CHECK THIS
            exportdata.push([summaryLabels, [{ data: summaryValues, label: "all" }], summaryCounts]);

        } else {
            // return a blank for this question
            exportdata.push([[], [{data: [], label: ""}]]);
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

        exportdata.push({user: users[temp.userid], answers: ans});
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


// exports.reactionssummary = function reactionssummary(reactions) {
//     // make a summary
//     var counts = {};
//     var total = 0;
//     var summary = {};

//     if (reactions != null) {
//         for (var k in reactions) {
//             counts[k] = (counts[reactions[k]] + 1) || 1;
//             total += 1;
//         }

//         // reformat
//         // and make percentage
//         for (var k in reactions) {
//             summary[k] = (Math.round(((100/total)*counts[k])*100)/100);
//         }
//     }

//     return summary;
// };
