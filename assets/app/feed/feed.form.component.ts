import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { FeedForm } from "./feed.form.model";
import { FormArray, FormControl, FormGroup, FormBuilder, NgModel } from "@angular/forms";
import { AppComponent } from '../app.component';
import { PopupShareComponent } from '../popup/popup.share.component';
import { PopupService } from "../popup.service";
import { ConfirmationPopupComponent } from "../confirmationPopup/confirmationPopup.component";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ENGINE_METHOD_DIGESTS } from "constants";
import * as html2canvas from "html2canvas";
import * as jsPDF from 'jspdf';
import * as $ from 'jquery';
import { VariableAst } from "@angular/compiler";




@Component({
    selector: 'feed-form-component',
    templateUrl: './feed.form.component.html',
    styleUrls: ['./feed.form.component.scss'],
    providers: [PopupService],
    host: {
        '(document:click)': 'onDocClick($event)',
    }
})
export class FeedFormComponent implements OnInit {
    @Input() form: FeedForm;
    @Input() pic: string;
    @Input() pictype: string;
    @Input() inComm: string;
    @Input() me: string;
    @Output() emitSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();

    dataselectionform : FormGroup;
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
    submitted: boolean = false;
    location: any;
    showFilter: boolean = false;
    startingTime: any;
    shortAnswers2: any = [];
    shareUrl: string;
    isMyPost: boolean = false;
    answersExist: boolean = true;
    shareEmails: boolean = false;
    shareEmailStatus: string = null;


    //  ------ Emoticon properties to change/check against
    hasReacted: boolean = false;
    reaction: string = null;
    reactionData: Object;
    intReactionData: Object;

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
    plotselection: Object = {age: this.defaultages, location: [], gender: ['male', 'female', 'unknown']};

    //ages
    unknownage: string[] = ["Unknown"];
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
        if (this.me && this.form && this.me == this.form.authorlink) {
            this.isMyPost = true;
        }
        // update reactions
        // this.intReactionData = this.form.reactions;
        // this.reactionData = this.reactionssummary(this.intReactionData);

        // get profile info

        this.startingTime = Date.now();

        if (this.inComm) {
            this.shareUrl = `https://www.questionsly.com/group/${this.inComm};survey=${this.form.id}`;
        } else {
            this.shareUrl = `https://www.questionsly.com/feed;survey=${this.form.id}`
        }

        this.http.post(`/users/profile/${this.form.object.author.link}`, {slim: true}).toPromise()
            .then(res => {

                if (res) {

                    this.userData = res.json();
                    
                    // anonymous
                    if (this.userData.status == 0) {
                        this.location = { city: "", state: "", country: "" };
                        this.name = {first:"Anonymous", last: ""};
                        this.nocreated = 100;
                        this.nodiscussion = 100;
                        this.notaken = 100;
                    } else {
                        // User
                        this.location = this.userData.userprofile.location || { city: "", state: "", country: "" };
                        this.name = this.userData.userprofile.name || "";
                        this.nocreated = this.userData.userprofile.nocreated || 0;
                        this.nodiscussion = this.userData.userprofile.nodiscussion || 0;
                        this.notaken = this.userData.userprofile.notaken || 0;
                    }

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
            this.defaultages.push("Unknown");

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
            { "id": 7, "itemName": "60+", "input": "age", "min":60 , "max": 119  }
        ];
        if (!this.form.loginRequired) this.ageList.push({ "id": 8, "itemName": "Unknown", "input": "age", "min": -1, "max": -1 })


        this.genderList = [
            { "id": 1, "input": "gender", "itemName": "Male" },
            { "id": 2, "input": "gender", "itemName": "Female" }
        ];
        if (!this.form.loginRequired) this.genderList.push({ "id": 3, "input": "gender", "itemName": "Unknown" })


        this.locationList = [];

        this.ageSelected = [
            { "id": 1, "itemName": "< 17", "input": "age", "min": 0, "max": 16 },
            { "id": 2, "itemName": "17 - 23", "input": "age", "min": 17, "max": 23 },
            { "id": 3, "itemName": "24 - 29", "input": "age", "min": 24, "max": 29 },
            { "id": 4, "itemName": "31-39", "input": "age", "min": 30, "max": 39 },
            { "id": 5, "itemName": "40 - 49", "input": "age", "min": 40, "max": 49 },
            { "id": 6, "itemName": "50 - 59", "input": "age", "min": 50, "max": 59 },
            { "id": 7, "itemName": "60+", "input": "age", "min": 60, "max": 119 }
        ];
        if (!this.form.loginRequired) this.ageSelected.push({ "id": 8, "itemName": "Unknown", "input": "age", "min": -1, "max": -1 });


        this.genderSelected = [
            { "id": 1, "input": "gender", "itemName": "Male" },
            { "id": 2, "input": "gender", "itemName": "Female" }
        ];

        if (!this.form.loginRequired) this.genderSelected.push({ "id": 3, "input": "gender", "itemName": "Unknown" });

        this.ageSettings = {
            singleSelection: false,
            text: "Age",
            classes: "filterDropdownText",
            badgeShowLimit: 0,
            enableCheckAll: false,
            maxHeight: 350
        };

        this.locationSettings = {
            singleSelection: false,
            text: "Location",
            classes: "filterDropdownText",
            badgeShowLimit: 0,
            enableCheckAll: false,
            maxHeight: 350

        };

        this.genderSettings = {
            singleSelection: false,
            text: "Gender",
            classes: "filterDropdownText",
            badgeShowLimit: 0,
            enableCheckAll: false,
            maxHeight: 350

        };
    }

    onItemSelect(item: any) {
        item.status = true;
        this.doDataSelectionUpdate(item);
    }
    OnItemDeSelect(item: any) {
        item.status = false;
        this.doDataSelectionUpdate(item);
    }
    onSelectAll(items: any) {
        // console.log(items);
    }
    onDeSelectAll(items: any) {
        // console.log(items);
    }


    onDocClick(event) {
        // event.preventDefault();
        // console.log(event.target);
        // Auto Scroll for Filters in Feed Post
        // if ($(event.target).hasClass('filterButton')) {
        //     window.setTimeout(() => {
        //         var target = $(event.target).closest('.fBody').find('#analysisContainer');
        //         if (target.length) {
        //             $('html, body').animate({
        //                 scrollTop: Math.ceil(target.offset().top - 100)
        //             }, 700);
        //             return;
        //         }
        //     }, 50);

        //     return;
        // }


        // if ($(event.target).hasClass('navbar-toggler') || $(event.target).hasClass('navbar-toggler-icon')) {
        //     return;
        // }


        // if (!$(event.target).parents('.navbar-collapse').length) {
        //     $('#navbarSupportedContent').removeClass('show');
        // }

    }

    // NEW: ONLY THING I CARE ABOUT HERE IS THE INITIAL PLOT INFORMATION RECEIVED ON LINE 271
    isFilledIn() {
        this.form.viewGraphs(false);

        // did the current user complete this particular survey?
        
        let data = {link: this.form.id, answered: this.form.answered, isAuthor: this.isMyPost };


        // post and get response
        this.http.post('/forms/data', data)
            .toPromise()
            .then(response => {

                let responsedata = response.json().data;

                this.shortAnswers2 = response.json().shortAnswers2;
                
                let responsestatus = response.json().status;
                this.loggedin = response.json().loggedin;                                            

                // set parameters for visualising the results
                if (responsestatus == 2) {
                    this.form.setAnswered(true);
                    // make sure the plot is given the data
                    this.form.answerCount = response.json().count;
                    this.form.plotdata = [];

                    // iniital data to give plot
                    this.form.plotdata = this.form.plotdata.concat(responsedata);
                    


                    this.submitted = true;
                    this.showsubmit = false;
                    this.showdiscussion = true;
                    this.count = response.json().count;

                    // if (this.form.typeevent) {
                    //     this.retrieveEventData();
                    // }

                    // this.retrieveEventDataTotals();

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
        var startingTime = this.startingTime;
        this.emitSubmitted.emit(true);
        window.mixpanel.track("Answered Question", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "question": this.form.questions[0].body,
            "id": this.form.id,
            "timestamp": Date.now()
        });

        data.id = this.form.id;
        this.http.post('/forms/answers', data).toPromise()
          .then(response => {

              if (response.json().status == 1) {
                  this.submitted = true;
                  this.form.answered = true;
                //   this.form.viewGraphs(false);
                  this.isFilledIn();
                  this.form.setAnswered(true);
                  this.form.viewGraphs(true);

              } else {
                  this.submissionfailed = true;
              }

          })
          .catch(error => alert("Error posting survey: " + error));
    }

    expand() {
        var startingTime = this.startingTime;

        this.form.contracted = false;
        window.mixpanel.track("Clicked 'See More'", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "question": this.form.questions[0].body,
            "id": this.form.id,
            "timestamp": Date.now()
        });

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
                // var other = response.json().otherlocations;
                // if (other != null) {
                //     this.otherloc = true;

                //     other.map((loc, ind) => {
                //         this.locationList.push({ id: tempLocation.length + ind+ 1, itemName: loc[0], input: "location" });
                //         this.locationSelected.push({ id:tempLocation.length + ind + 1, itemName: loc[0], input: "location" });
                //     });

                //     this.locationList.push({ id: tempLocation.length + other.length + 1, itemName:"Unknown", input: "location" });
                //     this.locationSelected.push({ id: tempLocation.length + other.length + 1, itemName:"Unknown", input: "location" });

                //     for (let o of other) {
                //         this.otherlocations.push(o[0]);
                //         this.plotselection.location.push(o[0]);
                //     }
                // }
            })
            .catch(error => {
            });
    }

// NEW: THIS IS THE FUNCTION THATS CALLED WHEN THE FORM CONTROL IS CHANGED
    doDataSelectionUpdate(x) {
        this.form.viewGraphs(false);

            if(x.itemName == "Unknown") {

                var tempgenderstring = ["unknown"];
                var tempage = [];

                if (x.status == false) {

                    if(x.input = 'age') {
                        if (this.locationSelected[this.locationSelected.length - 1].itemName === "Unknown") this.locationSelected = this.locationSelected.slice(0, this.locationSelected.length - 1);
                        if (this.genderSelected[this.genderSelected.length - 1].itemName === "Unknown") this.genderSelected = this.genderSelected.slice(0, this.genderSelected.length - 1);
                    }

                    if (x.input = 'gender') {
                        if (this.locationSelected[this.locationSelected.length - 1].itemName === "Unknown") this.locationSelected = this.locationSelected.slice(0, this.locationSelected.length - 1);
                        if (this.ageSelected[this.ageSelected.length - 1].itemName === "Unknown") this.ageSelected = this.ageSelected.slice(0, this.ageSelected.length - 1);
                    }

                    if (x.input = 'location') {
                        if (this.ageSelected[this.ageSelected.length - 1].itemName === "Unknown") this.ageSelected = this.ageSelected.slice(0, this.ageSelected.length - 1);
                        if (this.genderSelected[this.genderSelected.length - 1].itemName === "Unknown") this.genderSelected = this.genderSelected.slice(0, this.genderSelected.length - 1);
                    }

                    tempage = this.unknownage;
                    this.plotselection.age = this.plotselection.age.filter(function (e) { return tempage.indexOf(e) == -1 });
                    this.plotselection.location = this.plotselection.location.filter(function (e) { return x.itemName.indexOf(e) == -1 });
                    this.plotselection.gender = this.plotselection.gender.filter(function (e) { return tempgenderstring.indexOf(e) == -1 });

                } else {

                    if (x.input = 'age') {
                        if (this.locationSelected[this.locationSelected.length - 1].itemName !== "Unknown") this.locationSelected.push({ "id": this.locationList.length, "input": "location", "itemName": "Unknown" });
                        if (this.genderSelected[this.genderSelected.length - 1].itemName !== "Unknown") this.genderSelected.push({ "id": 3, "input": "gender", "itemName": "Unknown" });
                    }

                    if (x.input = 'gender') {
                        if (this.locationSelected[this.locationSelected.length - 1].itemName !== "Unknown") this.locationSelected.push({ "id": this.locationList.length, "input": "location", "itemName": "Unknown" });
                        if (this.ageSelected[this.ageSelected.length - 1].itemName !== "Unknown") this.ageSelected.push({ "id": 8, "itemName": "Unknown", "input": "age", "min": -1, "max": -1 });
                    }

                    if (x.input = 'location') {
                        if (this.ageSelected[this.ageSelected.length - 1].itemName !== "Unknown") this.ageSelected.push({ "id": 8, "itemName": "Unknown", "input": "age", "min": -1, "max": -1 });
                        if (this.genderSelected[this.genderSelected.length - 1].itemName !== "Unknown") this.genderSelected.push({ "id": 3, "input": "gender", "itemName": "Unknown" });
                    }

                    tempage = this.unknownage;
                    this.plotselection.age = this.plotselection.age.concat(tempage);
                    this.plotselection.location = this.plotselection.location.concat(x.itemName);
                    this.plotselection.gender = this.plotselection.gender.concat(tempgenderstring);
                }
            }

        if (x.itemName !== "Unknown" && x.input == 'age') {

            // NEW: THIS REMOVES THIS AGE RANGE FROM THE plotselection.age array
            if (x.status == false) {
                // remove entries from the array
                var tempremoval = [];
                if (x.min === 0) {
                    tempremoval = this.valuesagesmin17;
                } else if (x.min === 17) {
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

        } else if (x.itemName !== "Unknown" && x.input == 'location') {

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

        } else if (x.itemName !== "Unknown" && x.input == 'gender') {
            // Something to filter it
            var tempgenderstring = [x.itemName.toLowerCase()];

            if (x.status == false) {
                this.plotselection.gender = this.plotselection.gender.filter(function(e) {return tempgenderstring.indexOf(e) == -1});
            } else {
                this.plotselection.gender = this.plotselection.gender.concat(tempgenderstring);
            }

        }

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
                //Used to disenable graphs for non logged in users
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

    reactionssummary(reactions) {
    // make a summary
        var counts = {};
        var total = 0;
        var summary = {};

        if (reactions != null) {
            for (var k in reactions) {
                total += reactions[k];
            }

            // reformat
            // and make percentage
            for (var k in reactions) {
                summary[k] = (Math.round( ( (reactions[k]/total) * 100 ) * 100 ) / 100   );
            }
        }

        return summary;
    };

    toggleFilters(e: boolean) {
        this.form.contracted = false;
        this.showFilter = e;
    }

    toggleShareEmails() {
        this.shareEmails = !this.shareEmails;
    }

    sendEmails(emails) {
        var emailList = emails;
        this.exportPDF(false);
    }

    beginPDF(save = true) {
        // Calling this function to expand form first if needed, so it can capture all pie charts
        var exportPDF = this.exportPDF.bind(this);
        if (this.form.contracted ) {
            this.form.contracted = false;

            if (save) {
                window.setTimeout(()=>{this.exportPDF();}, 1000);
            } else {
                this.shareEmails = true;
                window.setTimeout(()=>{this.exportPDF(false);}, 1000);
            }
        } else {
            if (save) {
                this.exportPDF();
            } else {
                this.shareEmails = true;
                this.exportPDF(false);
            }
        }
        
    }

    exportPDF(save = true, list = "") {
        if (!save) {
            this.shareEmailStatus = "Sending...";
        }

        var doc = new jsPDF();
        var yOffset;
        
        // Map pie charts to right questions
        var pieChartsIndexes = $(event.target).parents('.fBody').find('[formarrayname]').find('pie-chart');
        var pieCharts = $(event.target).parents('.fBody').find('[formarrayname]').find('canvas');
        var indexes = [];
        var pieChartPromises = [];
        var pieImages = [];

        for (let i=0; i< pieChartsIndexes.length; i++) {
            indexes.push(pieChartsIndexes[i].id);
        }

        // Extract the index from id and make it a number
        indexes = indexes.map(x => {
            return Number(x.substr(x.indexOf('-') + 1));
        });

        // Start Creating PDF Here
        var pdf;
        

        renderPieCharts().then(() => {
    
        // Create page per question in survey
        this.form.questions.forEach( (q,i) => {

            // Reset yOffset for new pages
            yOffset = 25;
            
            // Heading
            doc.setTextColor(40, 171, 100);
            doc.setFontSize(12);
            doc.text('Questionsly', 20, yOffset);
            doc.setLineWidth(0.3)
            yOffset += 4;
            doc.line(20, yOffset, 180, yOffset)
            yOffset += 10;
            
            // Response Count
            doc.setTextColor(96,96,96);
            doc.setFontSize(18);
            doc.text(`${this.count} Responses`, 80, yOffset);
            yOffset += 15;
            

            // Survey Title
            if (i == 0 && this.form.title) {
                doc.setTextColor(0,0,0);
                doc.setFontSize(16);
                doc.text(this.form.title, 20, yOffset);
                yOffset += 15;
            }

            // Question Body
            doc.setTextColor(32,32,32);
            doc.setFontSize(14);
            doc.text((i+1) +'. ' + multipleLine(q.body, 12).text, 20, yOffset);
            yOffset += Math.max(10, 6 * multipleLine(q.body).lines);
            
            // Question Image
            if (q.pic) {
                try {                    
                    doc.addImage(q.pic, 'PNG', 20, yOffset, 100, 50);
                    yOffset += 60;
                } catch {
                    yOffset += 10;
                    console.log("COULD NOT EXPORT QUESTION IMAGE TO PDF.\n");
                }
            }

            // Question options
            if (q.options && q.options.length > 0) {
                doc.setFontSize(10);
                q.options.forEach(option => {
                    doc.text(`${option.label}. ${option.body}`, 20, yOffset);
                    yOffset += 8;
                })
            } 
            // yOffset += 20;

            // Check to see if this question has a pie chart
            var hasChart = indexes.indexOf(i);

            // Add Pie Charts
            if (pieCharts.length > 0 && hasChart !== -1) {
                var width = pieCharts[hasChart].clientWidth / 2.5;
                var height = pieCharts[hasChart].clientHeight / 2.5;
                                    
                doc.addImage(pieImages[hasChart], 'PNG', 20, yOffset, width, height);
            }

            // Add Text Responses if Short Answer Question
            if (this.form.questions[i].kind == "Short Answer") {
                // Heading
                doc.setTextColor(32, 32, 32);
                doc.setFontSize(12);
                doc.text("Responses", 20, yOffset);
                yOffset += 2;
                doc.setLineWidth(0.1)
                doc.line(20, yOffset, 43, yOffset)
                yOffset += 5;
            
                this.shortAnswers2[i].forEach((res) => {
                    // Move to new page if necessary
                    yOffset = overflowCheck(yOffset);

                    // Add User Image if possible
                    try{
                        doc.addImage(res.pic, 'PNG', 20, yOffset, 12, 12);
                    } catch (err) {
                        console.log("COULD NOT SAVE USER IMAGE TO PDF. USING DEFAULT.\n");
                        doc.addImage('/images/male.png', 'PNG', 20, yOffset, 12, 12);
                    }

                    yOffset += 6;

                    // User Name
                    doc.setFontSize(10);
                    doc.text(`${res.name}`, 35, yOffset);
                    yOffset += 4;

                    // Response
                    doc.setTextColor(32, 32, 32);
                    doc.setFontSize(8);
                    doc.text(`${multipleLine(res.answer, 16).text}`, 40, yOffset);

                    yOffset += (4 * multipleLine(res.answer, 16).lines);
                });
            }

            // Add Page if more questions
            if (this.form.questions.length > (i+1) ) {
                doc.addPage();
            }
        });
        
        // Save or Share PDF
        if (save) {
            doc.save(`${this.form.questions[0].body.substr(0, 20)}.pdf`);
            return;            
        } else {       
            //Output for sharing 

            return doc.output('blob');

            // return doc.output('blob');             
        }
        }).then(pdf => {
            if (pdf) {      
                this.sendPDF(pdf, list);
            }
        });
    


        // Aux Functions

        // Need to render pie charts before because they are async and will be appended randomly throughout the page if not loaded first
        function renderPieCharts() {        
            if (pieCharts.length > 0) {
                for (let i = 0; i < pieCharts.length; i++) {
                    pieChartPromises.push(new Promise((resolve, reject) => {
                        html2canvas(pieCharts[i]).then(canvas => {
                            var img = canvas.toDataURL("image/png");
                            pieImages.push(img);
                            resolve();
                        });
                    }));
                }

                return Promise.all(pieChartPromises);

            } else {                
                return new Promise((resolve) => resolve());
            }
        }
        
        //Create New Page if Overflow
        function overflowCheck(yOffset) {
            if (yOffset >= 260) {
                doc.addPage();
                yOffset = 25;
            }
            return yOffset;
        } 

        // Breakdown long lines since jsPDF doesn't wrap the lines. Wordcount is words per line
        function multipleLine(s, wordCount = 14) {
            var index = [];
            var words = 0;
            var finalString = [];

            for (let i = 0; i < s.length; i++) {
                if (s[i] === " ") {
                    words++;
                }

                if (words == wordCount) {
                    words = 0;
                    index.push(i);
                }
            }

            if (index.length > 0) {
                var prevValue;
                index.forEach(((x, i) => {
                    if (i == 0) {
                        // console.log(s.substr(0,x), "OKOKO", x);
                        finalString.push(s.substr(0, x));
                        prevValue = x;
                    } else {
                        finalString.push(s.substr(prevValue + 1, x - prevValue - 1));
                        prevValue = x;
                    }
                });)
                finalString.push(s.substr(prevValue + 1, s.length - prevValue - 1));
            }
            return finalString.length === 0 ? {text: s, lines: 1} : {text: finalString.join('\n'), lines: finalString.length};
        }


    }


    sendPDF(pdf, list) {
        // Get pdf
        // get email list

        var data = new FormData();
        data.append('survey' , pdf);

        var xhr = new XMLHttpRequest();

        var sendlist = () => {
            this.http.post(`/forms/sendOutPDF`, { emails: list, title: this.form.title, firstQuestion: this.form.questions[0].body }).toPromise()
                .then(res => {
                    if (res) {
                    }
                }); 
        }

        
        var done = () => {
            this.toggleShareEmails();
            this.shareEmailStatus = null;
        }

        var completed = () => {
            this.shareEmailStatus = "Report Sent!";
            window.setTimeout(done, 1800)
        }


        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status !== 200) {
                    // handle error
                } else {
                    sendlist();
                    completed();   
                }
            }
        
        }

        xhr.open('POST', '/forms/generatePDF', true);
        xhr.send(data);
    }



}