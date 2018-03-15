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
                
                console.log('Temp1: ', temp);


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
            // console.log('Temp1: ', temp);

            //WORKED BELOW HERE IN CASE I FUCK UP
            // if (temp.length === 1 &&)

            // WORKED UP ABOVE HERE IN CASE I FUCK UP

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
                    summaryLabels.push(key); //the answer
                    summaryValues.push(counts[key]); //answer count
                }
            }

            //
            exportdataAll.push([summaryLabels, [{data: summaryValues, label: "all"}]]);
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
            var temp_male = [];
            var temp_female = [];
            var temp_undisclosed = [];

            // loop through all forms and look at data for this question
            for (var j = 0; j < x.length; j++) {
                var current = x[j];
                var currentq = current.answers[i];
                var templocation;
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

                        if (all === true || (param.age.indexOf(age) !== -1) && (param.location.indexOf(templocation) !== -1)) {
                            proceed = true;
                        }

                    } else if (users[current.userid].type === false) {
                        //
                        if (all === true) {
                            proceed = true;
                        }

                    }

                    if (proceed) {
                        if (types[i] === 'Checkboxes') {
                            if (currentq.answer.constructor === Array) {
                                for (var r = 0; r < currentq.answer.length; r++) {
                                    temp.push(currentq.answer[r]);

                                    // by gender
                                    if (users[current.userid].gender === "male") {
                                        temp_male.push(currentq.answer[r]);
                                    } else if (users[current.userid].gender === "female") {
                                        temp_female.push(currentq.answer[r]);
                                    } else {
                                        temp_undisclosed.push(currentq.answer[r]);
                                    }
                                }

                            } else {
                                temp.push(currentq.answer);
                                // by gender
                                if (users[current.userid].gender === "male") {
                                    temp_male.push(currentq.answer);
                                } else if (users[current.userid].gender === "female") {
                                    temp_female.push(currentq.answer);
                                } else {
                                    temp_undisclosed.push(currentq.answer);
                                }
                            }

                        } else if (types[i] === 'Stars') {
                            if (currentq.answer > 1) {
                                temp.push(currentq.answer+" stars");
                                // by gender
                                if (users[current.userid].gender === "male") {
                                    temp_male.push(currentq.answer+" stars");
                                } else if (users[current.userid].gender === "female") {
                                    temp_female.push(currentq.answer+" stars");
                                } else {
                                    temp_undisclosed.push(currentq.answer+" stars");
                                }

                            } else {
                                temp.push(currentq.answer+" star");
                                // by gender
                                if (users[current.userid].gender === "male") {
                                    temp_male.push(currentq.answer+" star");
                                } else if (users[current.userid].gender === "female") {
                                    temp_female.push(currentq.answer+" star");
                                } else {
                                    temp_undisclosed.push(currentq.answer+" star");
                                }
                            }

                        } else if (types[i] === "Rank") {
                            //
                            // loop through the rank array
                            for (var a = 0; a < currentq.answer.length; a++) {
                                temp.push(a+1+"."+currentq.answer[a].label);
                            }
                            // by gender
                            if (users[current.userid].gender === "male") {
                                // loop through the rank array
                                for (var a = 0; a < currentq.answer.length; a++) {
                                    temp_male.push(a+1+"."+currentq.answer[a].label);
                                }
                            } else if (users[current.userid].gender === "female") {
                                // loop through the rank array
                                for (var a = 0; a < currentq.answer.length; a++) {
                                    temp_female.push(a+1+"."+currentq.answer[a].label);
                                }
                            } else {
                                // loop through the rank array
                                for (var a = 0; a < currentq.answer.length; a++) {
                                    temp_undisclosed.push(a+1+"."+currentq.answer[a].label);
                                }
                            }



                        } else {
                            temp.push(currentq.answer);
                            // by gender
                            if (users[current.userid].gender === "male") {
                                temp_male.push(currentq.answer);
                            } else if (users[current.userid].gender === "female") {
                                temp_female.push(currentq.answer);
                            } else {
                                temp_undisclosed.push(currentq.answer);
                            }

                        }
                    }


                }
            }

            // make a summary
            var counts = {};
            var counts_male = {};
            var counts_female = {};
            var counts_undisclosed = {};
            var total = 0;
            var total_male = 0;
            var total_female = 0;
            var total_undisclosed = 0;

            for (k = 0; k < temp.length; k++) {
                counts[temp[k]] = (counts[temp[k]] + 1) || 1;
                total += 1;
            }
            for (k = 0; k < temp_male.length; k++) {
                counts_male[temp_male[k]] = (counts_male[temp_male[k]] + 1) || 1;
                total_male += 1;
            }
            for (k = 0; k < temp_female.length; k++) {
                counts_female[temp_female[k]] = (counts_female[temp_female[k]] + 1) || 1;
                total_female += 1;
            }
            for (k = 0; k < temp_undisclosed.length; k++) {
                counts_undisclosed[temp_undisclosed[k]] = (counts_undisclosed[temp_undisclosed[k]] + 1) || 1;
                total_undisclosed += 1;
            }

            // reformat
            // and make percentage
            var summaryLabels = [];
            var summaryValues = [];
            var summaryValues_male = [];
            var summaryValues_female = [];
            var summaryValues_undisclosed = [];

            for (var key in counts) {
                // Trace labels --------
                summaryLabels.push(key);
                summaryValues.push(Math.round(((100/total)*counts[key])*100)/100);

                if (counts_male.hasOwnProperty(key)) {
                    summaryValues_male.push(Math.round(((100/total_male)*counts_male[key])*100)/100);
                } else {
                    summaryValues_male.push(Math.round(0));
                }
                if (counts_female.hasOwnProperty(key)) {
                    summaryValues_female.push(Math.round(((100/total_female)*counts_female[key])*100)/100);
                } else {
                    summaryValues_female.push(Math.round(0));
                }
                if (counts_undisclosed.hasOwnProperty(key)) {
                    summaryValues_undisclosed.push(Math.round(((100/total_undisclosed)*counts_undisclosed[key])*100)/100);
                } else {
                    summaryValues_undisclosed.push(Math.round(0));
                }

            }

            // CHECK THIS
            // exportdata.push([summaryLabels, [{ data: summaryValues_male, label: "male" }, { data: summaryValues_female, label: "female" }, { data: summaryValues_undisclosed, label: "undisclosed" }]]);
            exportdata.push([summaryLabels, [{ data: summaryValues, label: "all" }, { data: summaryValues_male, label: "male" }, { data: summaryValues_female, label: "female" }, { data: summaryValues_undisclosed, label: "undisclosed" }]]);


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
