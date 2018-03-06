import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Http } from "@angular/http";
import { FeedForm } from "./feed.form.model";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
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
    @ViewChild(ConfirmationPopupComponent) confirmationPopup;
    @ViewChild('shareModal') shareModal;

    // event data
    eventdatatable: any[];

    otherloc: boolean = true;
    locations: Object[] = [];
    otherlocations: string[] = [];
    alllocationsarray: FormArray = new FormArray([]);


    dataselectionform = new FormGroup({
        //set them to true to have filters true from the start
        agesmin17: new FormControl(true),
        ages17to23: new FormControl(true),
        ages24to29: new FormControl(true),
        ages30to39: new FormControl(true),
        ages40to49: new FormControl(true),
        ages50to59: new FormControl(true),
        plus60: new FormControl(true),
        otherlocbox: new FormControl(true),
        alllocations: this.alllocationsarray
    });


    defaultages: string[] = [];
    plotselection: Object = {age: this.defaultages, location: []};

    //ages
    valuesagesmin17: string[] = [];
    valuesages17to23: string[] = [];
    valuesages24to29: string[] = [];
    valuesages30to39: string[] = [];
    valuesages40to49: string[] = [];
    valuesages50to59: string[] = [];
    valuesplus60: string[] = [];


    constructor(private http: Http, private modalService: NgbModal) {
        this.userData = {};
        this.nocreated = null;
        this.name = "";
        this.nodiscussion = null;
        this.notaken = null;
        this.location = {city: "", state: "", country:""};
    }

    ngOnInit() {

        this.http.get(`/users/profile/${this.form.object.author.link}`).toPromise()
            .then(res => {

                if (res) {
                    // counts
                    this.userData = res.json();
                    this.location = this.userData.userprofile.location;
                    this.name = this.userData.userprofile.name;
                    this.nocreated = this.userData.userprofile.nocreated || 0;
                    this.nodiscussion = this.userData.userprofile.nodiscussion || 0;
                    this.notaken = this.userData.userprofile.notaken || 0;
                }
            })

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
    }

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
                    this.form.plotdata = this.form.plotdata.concat(responsedata);
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
                for (let a of all) {
                    this.locations.push({name: a[0], count: a[1]});

                    //comment out to add all locations to initial plot selection
                    this.plotselection.location.push(a[0]);
                    let fg = new FormGroup({});

                    //change to true to have filters true from the start
                    fg.addControl(a[0], new FormControl(true));
                    this.alllocationsarray.push(fg);
                }

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


    doDataSelectionUpdate(x) {
        this.form.viewGraphs(false);
        if (x.input == 'age') {

            if (x.status == false) {
                // remove entries from the array
                var tempremoval = [];
                if (x.value == "agesmin17") {
                    tempremoval = this.valuesagesmin17;
                }  else if (x.value == "ages17to23") {
                    tempremoval = this.valuesages17to23;
                } else if (x.value == "ages24to29") {
                    tempremoval = this.valuesages24to29;
                } else if (x.value == "ages30to39") {
                    tempremoval = this.valuesages30to39;
                } else if (x.value == "ages40to49") {
                    tempremoval = this.valuesages40to49;
                } else if (x.value == "ages50to59") {
                    tempremoval = this.valuesages50to59;
                } else if (x.value == "plus60") {
                    tempremoval = this.valuesplus60;
                }

                this.plotselection.age = this.plotselection.age.filter(function(e) {return tempremoval.indexOf(e) == -1});

            } else {

                var tempadd = [];
                if (x.value == "agesmin17") {
                    tempadd = this.valuesagesmin17;
                } else if (x.value == "ages17to23") {
                    tempadd = this.valuesages17to23;
                } else if (x.value == "ages24to29") {
                    tempadd = this.valuesages24to29;
                } else if (x.value == "ages30to39") {
                    tempadd = this.valuesages30to39;
                } else if (x.value == "ages40to49") {
                    tempadd = this.valuesages40to49;
                } else if (x.value == "ages50to59") {
                    tempadd = this.valuesages50to59;
                } else if (x.value == "plus60") {
                    tempadd = this.valuesplus60;
                }

                this.plotselection.age = this.plotselection.age.concat(tempadd);

            }

        } else if (x.input == 'location') {

            if (x.status == false) {
                if (x.value != 'other') {
                    this.plotselection.location = this.plotselection.location.filter(function(e) {return x.value.indexOf(e) == -1});

                } else {
                    var remove = this.otherlocations;
                    this.plotselection.location = this.plotselection.location.filter(function(e) {return remove.indexOf(e) == -1});

                }


            } else {
                if (x.value != 'other') {
                    this.plotselection.location = this.plotselection.location.concat(x.value);

                } else {
                    this.plotselection.location = this.plotselection.location.concat(this.otherlocations);

                }


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

}