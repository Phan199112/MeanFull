import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Http } from "@angular/http";
import { FeedForm } from "./feed.form.model";
import { FormArray, FormControl, FormGroup, FormBuilder, NgModel } from "@angular/forms";
import { AppComponent } from '../app.component';
import { PopupShareComponent } from '../popup/popup.share.component';
import { PopupService } from "../popup.service";
import { ConfirmationPopupComponent } from "../confirmationPopup/confirmationPopup.component";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'feed-form-component',
    templateUrl: './feed.form.component.html',
    styleUrls: ['./feed.form.component.scss'],
    providers: [PopupService]
})
export class FeedFormComponent implements OnInit {
    @Input() form: FeedForm;
    @Input() pic: string;
    @Input() pictype: string;
    dataselectionform : FormGroup;
    submitted: boolean = false;
    showsubmit: boolean = false;
    submissionfailed: boolean = false;
    showdiscussion: boolean = false;
    hide: boolean = false;
    loggedin: boolean = false;
    userData: any;
    count: string = null;
    name : string;
    nocreated :any;
    notaken :any;
    nodiscussion : any;
    location: any;  


    //  ------ Emoticon properties to change/check against
    hasReacted: boolean = false;
    reaction: string = null;
    reactionData: Object;

    // ------ Filter variables
    ageList = [];
    ageSelected = [];
    ageSettings = {};

    locationList = [];
    locationSelected = [];
    locationSettings = {};

    genderList = [];
    genderSelected = [];
    genderSettings = {};


    @ViewChild(ConfirmationPopupComponent) confirmationPopup;
    @ViewChild('shareModal') shareModal;

    // event data
    eventdatatable: any[];

    otherloc: boolean = true;
    locations: Object[] = [];
    otherlocations: string[] = [];
    
    alllocationsarray: FormArray = new FormArray([]);

    defaultages: string[] = [];
    // NEW: THIS IS THE DATA FED INTO THE FILTERS
    plotselection: Object = {age: this.defaultages, location: [], gender: ['male', 'female']};

    //ages
    valuesagesmin17: string[] = [];
    valuesages17to23: string[] = [];
    valuesages24to29: string[] = [];
    valuesages30to39: string[] = [];
    valuesages40to49: string[] = [];
    valuesages50to59: string[] = [];
    valuesplus60: string[] = [];


    constructor(private http: Http, private modalService: NgbModal, private fb: FormBuilder) {
        this.userData = {};
        this.nocreated = null;
        this.name = "";
        this.nodiscussion = null;
        this.notaken = null;
        this.location = {city: "", state: "", country:""};
        this.reactionData = {great: 20, wtf: 60, angry: 20};


        this.dataselectionform = new FormGroup({
            //set them to true to have filters true from the start
            age: new FormControl([]),
            otherlocbox: new FormControl(true),
            alllocations: this.alllocationsarray,
            locations: new FormControl([]),
            gender: new FormControl([])
        });


    }

    ngOnInit() {

        this.http.get(`/users/profile/${this.form.object.author.link}`).toPromise()
            .then(res => {

                if (res) {
                    // counts
                    this.userData = res.json();
                    this.location = this.userData.userprofile.location || { city: "NA", state: "NA", country: "NA" };
                    this.name = this.userData.userprofile.name || "";
                    this.nocreated = this.userData.userprofile.nocreated || 0;
                    this.nodiscussion = this.userData.userprofile.nodiscussion || 0;
                    this.notaken = this.userData.userprofile.notaken || 0;
                }
            });

        if (this.form.questions != null) {
            // did the current user complete this form, if so answers can be shown
            this.isFilledIn();

            this.form.eventplot = false;
            this.form.contracted = this.form.questions.length > 1;

            // default ages. Uncomment to have initial plot data include all ages
            for (let i=0; i < 120; i++) {
                this.defaultages.push(i);
            }

            for (let i=0; i < 17; i++) {
                this.valuesagesmin17.push(i);
            }

            for (let i=17; i < 24; i++) {
                this.valuesages17to23.push(i);
            }

            for (let i=24; i < 30; i++) {
                this.valuesages24to29.push(i);
            }

            for (let i=30; i < 40; i++) {
                this.valuesages30to39.push(i);
            }

            for (let i=40; i < 50; i++) {
                this.valuesages40to49.push(i);
            }

            for (let i=50; i < 60; i++) {
                this.valuesages50to59.push(i);
            }

            for (let i=60; i < 120; i++) {
                this.valuesplus60.push(i);
            }
        }


        this.ageList = [
            { "id": 1, "itemName": "< 17", "input": "age", "min": 0 , "max": 16 },
            { "id": 2, "itemName": "17 - 23", "input": "age", "min":17 , "max":23  },
            { "id": 3, "itemName": "24 - 29", "input": "age", "min":24 , "max":29  },
            { "id": 4, "itemName": "31-39", "input": "age", "min":30 , "max":39  },
            { "id": 5, "itemName": "40 - 49", "input": "age", "min":40 , "max": 49  },
            { "id": 6, "itemName": "50 - 59", "input": "age", "min":50 , "max": 59 },
            { "id": 7, "itemName": "60+", "input": "age", "min":60 , "max": 119  },
        ];

        this.genderList = [
            { "id": 1, "input": "gender", "itemName": "Male" },
            { "id": 2, "input": "gender", "itemName": "Female" },
        ];

        this.locationList = [];

        this.ageSelected = [
            { "id": 1, "itemName": "< 17", "input": "age", "min": 0, "max": 16 },
            { "id": 2, "itemName": "17 - 23", "input": "age", "min": 17, "max": 23 },
            { "id": 3, "itemName": "24 - 29", "input": "age", "min": 24, "max": 29 },
            { "id": 4, "itemName": "31-39", "input": "age", "min": 30, "max": 39 },
            { "id": 5, "itemName": "40 - 49", "input": "age", "min": 40, "max": 49 },
            { "id": 6, "itemName": "50 - 59", "input": "age", "min": 50, "max": 59 },
            { "id": 7, "itemName": "60+", "input": "age", "min": 60, "max": 119 },
        ];

        this.genderSelected = [
            { "id": 1, "input": "gender", "itemName": "Male" },
            { "id": 2, "input": "gender", "itemName": "Female" },
        ];

        this.ageSettings = {
            singleSelection: false,
            text: "Age",
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
            classes: "myclass custom-class"
        };    

        this.locationSettings = {
            singleSelection: false,
            text: "Location",
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
            classes: "myclass custom-class"
        };    

        this.genderSettings = {
            singleSelection: false,
            text: "Gender",
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
            classes: "myclass custom-class"
        };    


    }

    onItemSelect(item: any) {
        item.status = true;
        console.log(item);
        this.doDataSelectionUpdate(item);
    }
    OnItemDeSelect(item: any) {
        item.status = false;
        console.log(item);
        this.doDataSelectionUpdate(item);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }


    // NEW: ONLY THING I CARE ABOUT HERE IS THE INITIAL PLOT INFORMATION RECEIVED ON LINE 271
    isFilledIn() {
        this.form.viewGraphs(false);

        // did the current user complete this particular survey?
        let data = {link: this.form.id};

        // post and get response
        this.http.post('/forms/data', data)
            .toPromise()
            .then(response => {
                let responsedata = response.json().data;
                let responsestatus = response.json().status;
                this.loggedin = response.json().loggedin;

                // set parameters for visualising the results
                if (responsestatus == 2) {
                    this.form.setAnswered(true);
                    // make sure the plot is given the data
                    this.form.plotdata = [];

                    // iniital data to give plot
                    this.form.plotdata = this.form.plotdata.concat(responsedata);


                    // window.console.log("Raw plot data: ", this.form.plotdata);

                    
                    this.submitted = true;
                    this.showsubmit = false;
                    this.showdiscussion = true;
                    this.count = response.json().count;


                    if (this.form.typeevent) {
                        this.retrieveEventData();
                    }

                    this.retrieveEventDataTotals();

                    this.form.setShowData(true);

                    // query top locations
                    this.queryTopLocation();

                    this.form.viewGraphs(true);

                } else if (responsestatus == 3) {
                    // results not public, but answered
                    this.form.setAnswered(true);
                    this.form.setShowData(false);
                    this.showdiscussion = true;
                    this.submitted = true;
                    this.showsubmit = false;

                } else if (responsestatus == 1) {
                    //test whether this form can be submitted if not signed in.
                    if (this.form.loginRequired === true) {
                        this.form.setAnswered(true);
                        this.showdiscussion = false;
                        this.showsubmit = false;

                    } else {
                        this.form.setAnswered(false);
                        this.showdiscussion = false;
                        this.showsubmit = true;

                    }

                } else if (responsestatus == 0) {
                    this.form.setAnswered(false);
                    this.showdiscussion = true;
                    this.showsubmit = true;

                } else {
                    this.form.setAnswered(false);
                    this.showsubmit = false;
                }
            })
            .catch(error => {
                this.form.setAnswered(false);
            });
    }

    postForm(data) {
        data.id = this.form.id;
        window.console.log("Presubmit: ", data.questions);
        this.http.post('/forms/answers', data).toPromise()
          .then(response => {
              if (response.json().status == 1) {
                  this.submitted = true;
                  this.form.answered = true;
                  this.isFilledIn();
              } else {
                  this.submissionfailed = true;
              }

          })
          .catch(error => alert("Error posting survey: " + error));  
    }

    expand() {
        this.form.contracted = false;
    }

    queryTopLocation() {
        this.http.post('/forms/requestTopLocations', {id: this.form.id}).toPromise()
            .then(response => {
                var all = response.json().data;
                let tempLocation = [];

                for (let a of all) {
                    this.locations.push({name: a[0], count: a[1]});

                    // Push to list for dropdown
                    tempLocation.push({itemName: a[0], input: "location"});

                    //comment out to add all locations to initial plot selection
                    this.plotselection.location.push(a[0]);
                    let fg = new FormGroup({});

                    //change to true to have filters true from the start
                    fg.addControl(a[0], new FormControl(true));
                    this.alllocationsarray.push(fg);
                }

                tempLocation.map((loc,ind) => {
                    this.locationList.push({id: ind + 1, itemName: loc.itemName, input: "location"});
                    this.locationSelected.push({ id: ind + 1, itemName: loc.itemName, input: "location"});
                });

                // deal with the possibility of more than 5 locations
                var other = response.json().otherlocations;
                if (other != null) {
                    this.otherloc = true;
                    for (let o of other) {
                        this.otherlocations.push(o[0]);
                        this.plotselection.location.push(o[0]);
                    }
                }
            })
            .catch(error => {
            });
    }

// NEW: THIS IS THE FUNCTION THATS CALLED WHEN THE FORM CONTROL IS CHANGED
    doDataSelectionUpdate(x) {
        this.form.viewGraphs(false);
        
        // NEW: INPUT CHANGE WAS FOR AGE
        if (x.input == 'age') {

            // NEW: THIS REMOVES THIS AGE RANGE FROM THE plotselection.age array
            if (x.status == false) {
                // remove entries from the array
                var tempremoval = [];
                if (x.min === 0) {
                    tempremoval = this.valuesagesmin17;
                }  else if (x.min === 17) {
                    tempremoval = this.valuesages17to23;
                } else if (x.min === 24) {
                    tempremoval = this.valuesages24to29;
                } else if (x.min === 30) {
                    tempremoval = this.valuesages30to39;
                } else if (x.min === 40) {
                    tempremoval = this.valuesages40to49;
                } else if (x.min === 50) {
                    tempremoval = this.valuesages50to59;
                } else if (x.min === 60) {
                    tempremoval = this.valuesplus60;
                }

                this.plotselection.age = this.plotselection.age.filter(function(e) {return tempremoval.indexOf(e) == -1});

            } else {

                // NEW: THIS REMOVES THIS AGE RANGE FROM THE plotselection.age array
                var tempadd = [];
                if (x.min === 0) {
                    tempadd = this.valuesagesmin17;
                } else if (x.min === 17) {
                    tempadd = this.valuesages17to23;
                } else if (x.min === 24) {
                    tempadd = this.valuesages24to29;
                } else if (x.min === 30) {
                    tempadd = this.valuesages30to39;
                } else if (x.min === 40) {
                    tempadd = this.valuesages40to49;
                } else if (x.min === 50) {
                    tempadd = this.valuesages50to59;
                } else if (x.min === 60) {
                    tempadd = this.valuesplus60;
                }

                this.plotselection.age = this.plotselection.age.concat(tempadd);

            }

        } else if (x.input == 'location') {

            if (x.status == false) {
                if (x.value != 'other') {
                    this.plotselection.location = this.plotselection.location.filter(function(e) {return x.itemName.indexOf(e) == -1});

                } else {
                    var remove = this.otherlocations;
                    this.plotselection.location = this.plotselection.location.filter(function(e) {return remove.indexOf(e) == -1});

                }


            } else {
                if (x.value != 'other') {
                    this.plotselection.location = this.plotselection.location.concat(x.itemName);

                } else {
                    this.plotselection.location = this.plotselection.location.concat(this.otherlocations);

                }


            }

        } else if (x.input == 'gender') {
            // Something to filter it
            var tempgenderstring = [x.itemName.toLowerCase()];

            if (x.status == false) {
                this.plotselection.gender = this.plotselection.gender.filter(function(e) {return tempgenderstring.indexOf(e) == -1});
            } else {
                this.plotselection.gender = this.plotselection.gender.concat(tempgenderstring);
            }

        }

<<<<<<< HEAD
        // -----------BREAKS HERE -------
=======
>>>>>>> 528158eebc27175c7eaad809335232bd8ab5e733
        this.executePlotDataRetrieval();
    }

    executePlotDataRetrieval() {
        // post and get response
        this.http.post('/forms/alldata', {link: this.form.id, dataselection: this.plotselection, all: false})
            .toPromise()
            .then(response => {
                var responsedata = response.json().data;
                var responsestatus = response.json().status;

                // set parameters for visualising the results
                if (responsestatus == 2) {
                    // make sure the plot is given the data
                    this.form.setAnswered(true);

                    window.console.log("New Plot Data", responsedata);
                    this.form.setPlotData(responsedata);
                    this.submitted = true;
                    this.showsubmit = false;
                    this.form.viewGraphs(true);

                } else if (responsestatus == 1) {
                    this.form.setAnswered(false);
                    this.showsubmit = false;

                } else if (responsestatus == 0) {
                    this.form.setAnswered(false);
                    this.showsubmit = true;

                } else {
                    this.form.setAnswered(false);
                    this.showsubmit = false;
                }
            })
            .catch(error => {
                this.form.setAnswered(false);
            });
    }

    deleteForm() {
        // post and get response
        this.confirmationPopup.confirm('Are you sure you want to delete this survey?').then(answer => {
            if (answer) {
                this.http.post('/forms/delete', {id: this.form.id})
                    .toPromise()
                    .then(response => {
                        if (response.json().status == 1) {
                            this.hide = true;
                        }
                    });
            }
        });
    }

    expireForm() {
        // post and get response
        this.confirmationPopup.confirm('Are you sure you want to expire this survey? No further answers will be accepted, this action can not be undone.').then(answer => {
            if (answer) {
                this.http.post('/forms/expire', {id: this.form.id})
                    .toPromise()
                    .then(response => {
                        if (response.json().status == 1) {
                            this.form.expired = true;
                        }
                    });
            }
        });
    }

    releaseForm() {
        // update form parameters to make survey 'public': shared boolean set to true.
        this.confirmationPopup.confirm('Are you sure you want to release this form? Users will be able to view and answer this form when you release it.').then(answer => {
            if (answer) {
                this.http.post('/forms/shared', {formid: this.form.id}).toPromise()
                    .then(response => {
                        if (response.json().status == 1) {
                        }
                    });
            }
        });
    }

    shareForm() {
        this.modalService.open(this.shareModal);
    }

    reportForm() {
        this.http.post('/forms/report', {targetid: this.form.id}).toPromise()
            .then(response => {
                //
            })
            .catch(error => function () {
                //
            });

    }

    retrieveEventData() {
        this.http.post(`/forms/resultstable`, {formid: this.form.id}).toPromise()
            .then(res => {
                if (res.json().status == '1') {
                    this.eventdatatable = res.json().data;
                    this.form.eventdatatotals = res.json().totals;
                    this.form.eventplot = true;
                }
            });
    }

    retrieveEventDataTotals() {
        this.http.post(`/forms/resultstabletotals`, {formid: this.form.id}).toPromise()
            .then(res => {
                if (res.json().status == '1') {
                    this.form.eventdatatotals = res.json().totals;
                    this.form.viewTablesbool = true;
                }
            });
    }

    ResetDataForm() {
        //
        this.form.viewGraphs(false);

        // alter the graph type to split by gender
        this.http.post('/forms/alldata', {link: this.form.id, all: true})
            .toPromise()
            .then(response => {
                var responsedata = response.json().data;
                var responsestatus = response.json().status;

                // set parameters for visualising the results
                if (responsestatus == 2) {
                    // make sure the plot is given the data
                    this.form.setAnswered(true);
                    this.form.setPlotData(responsedata);
                    this.submitted = true;
                    this.showsubmit = false;
                    this.form.viewGraphs(true);

                } else if (responsestatus == 1) {
                    this.form.setAnswered(false);
                    this.showsubmit = false;

                } else if (responsestatus == 0) {
                    this.form.setAnswered(false);
                    this.showsubmit = true;

                } else {
                    this.form.setAnswered(false);
                    this.showsubmit = false;
                }
            })
            .catch(error => {
                this.form.setAnswered(false);
            });
    }



    //Emoticon functions
    chooseReaction(reaction: string) : void {
        if (this.hasReacted) return;

        // TO-DO: Need to submit reaction to back-end and update percentages and return
        // reactionData object. Exp: {great: 22, wtf: 48, angry: 30}
        // this.reactionData = 

        this.hasReacted = true;
        this.reaction = reaction;
    }

}