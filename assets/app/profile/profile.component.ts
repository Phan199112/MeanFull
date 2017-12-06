import { Component, OnInit, OnDestroy, ɵisObservable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {UserService} from "../user.service";
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [UserService]
})

export class ProfileComponent implements OnInit, OnDestroy {
    userprofile: Object;
    network: any;
    name: string;
    firstname: string;
    gender: string;
    pronoun: string;
    location: string;
    id: string;
    pic: string;
    pictype: string;
    me: boolean;
    form: FormGroup;
    innetwork: boolean;
    loading: boolean = true;
    addfailed: boolean = false;
    loadsuccessful: boolean = false;
    loading: boolean = true;
    loggedin: boolean = false;
    parametersObservable: any;
    hidefeed: boolean = true;
    hidetags: boolean = true;
    notaken: string;
    nocreated: string;
    nodiscussion: string;
    pending: boolean = false;
    status: string = 0;

    constructor(
        private http: Http, 
        private route: ActivatedRoute, 
        private userService: UserService,
        private fb: FormBuilder) {
    }

    ngOnDestroy() {
        if(this.parametersObservable != null) {
            this.parametersObservable.unsubscribe();
        }
    }

    clearAll() {
        this.hidefeed = true;
        this.hidetags = true;
        this.id = null;

        this.form = this.fb.group({
            interests: null
        });

    }

    ngOnInit() {
        // load new data
        this.loading = true;
        this.loadProfile();

    }

    loadProfile() {
        this.route.params.subscribe(params => {
            this.clearAll();
            this.id = params.id;
            this.http.get(`/users/profile/${this.id}`).toPromise()
                .then(res => {
                    this.status = res.json().status;
                    if (this.status == '1') {
                        this.hidefeed = true;
                        //
                        this.userprofile = res.json().userprofile;
                        this.network = res.json().network;

                        // is the viewer loggedin
                        this.loggedin = res.json().loggedin;

                        // counts
                        this.nocreated = res.json().nocreated;
                        this.notaken = res.json().notaken;
                        this.nodiscussion = res.json().nodiscussion;

                        //
                        this.me = this.userprofile.me;
                        this.innetwork = this.userprofile.innetwork;
                        this.pending = this.userprofile.pending;
                        this.name = this.userprofile.name.first+" "+this.userprofile.name.last;
                        this.firstname = this.userprofile.name.first;
                        this.gender = this.userprofile.gender;

                        if (this.gender == "male") {
                            this.pronoun = "his";
                        } else if (this.gender == "female") {
                            this.pronoun = "her";
                        } else {
                            this.pronoun = "their";
                        }

                        if (this.userprofile.location == null) {
                            this.location = "";
                        } else {
                            this.location = this.userprofile.location.city+", "+this.userprofile.location.state+", "+this.userprofile.location.country;
                        }

                        // deal with picture
                        if (this.userprofile.facebookID != null) {
                            this.pic = this.userprofile.facebookID;
                            this.pictype = "fb";
                        } else {
                            if (this.userprofile.pic != null) {
                                this.pictype = "local";
                                this.pic = this.userprofile.pic;
                            } else {
                                this.pictype = "default";
                            }
                        }

                        // switch off loading
                        this.loading = false;

                        // loading successful (entire profile)
                        this.loadsuccessful = true;

                        // show again
                        this.hidefeed = false;
                        this.hidetags = false;

                    } else if (this.status == '2') {
                        // display limited version of the profile
                        this.hidefeed = true;
                        this.hidetags = true;

                        this.userprofile = res.json().userprofile;

                        // is the viewer loggedin
                        this.loggedin = res.json().loggedin;

                        // counts
                        this.nocreated = res.json().nocreated;
                        this.notaken = res.json().notaken;
                        this.nodiscussion = res.json().nodiscussion;

                        //
                        this.innetwork = this.userprofile.innetwork;
                        this.pending = this.userprofile.pending;
                        this.name = this.userprofile.name.first+" "+this.userprofile.name.last;
                        this.firstname = this.userprofile.name.first;
                        this.gender = this.userprofile.gender;
                        if (this.gender == "male") {
                            this.pronoun = "his";
                        } else if (this.gender == "female") {
                            this.pronoun = "her";
                        } else {
                            this.pronoun = "their";
                        }
                        this.me = this.userprofile.me;

                        if (this.userprofile.location == null) {
                            this.location = "";
                        } else {
                            this.location = this.userprofile.location.city+", "+this.userprofile.location.state+", "+this.userprofile.location.country;
                        }

                        // deal with picture
                        if (this.userprofile.facebookID != null) {
                            this.pic = this.userprofile.facebookID;
                            this.pictype = "fb";
                        } else {
                            if (this.userprofile.pic != null) {
                                this.pictype = "local";
                                this.pic = this.userprofile.pic;
                            } else {
                                this.pictype = "default";
                            }
                        }

                        // switch off loading
                        this.loading = false;
                        this.loadsuccessful = true;

                    } else {
                        this.loading = false;
                        this.loadsuccessful = false;
                    }
                })
                .catch(error => function (error) {
                    this.loading = false;
                    this.loadsuccessful = false;
                });
        });
    }

    onAddToNetwork(x) {
        this.loading = true;
        this.http.post('/users/settings/addtonetwork', {targetid: x}).toPromise()
            .then(response => {
                this.loading = false;
                if (response.json().status == 1) {
                    this.pending = true;
                } else {
                    this.addfailed = true;
                }
                //
            })
            .catch(error => function () {
                this.addfailed = true;
                this.loading = false;
            });
    };

    removeFromNetwork(x) {
        this.loading = true;
        this.http.post('/users/settings/removefromnetwork', {targetid: x}).toPromise()
            .then(response => {
                this.loading = false;
                if (response.json().status == 1) {
                    this.innetwork = false;
                } else {
                    this.addfailed = true;
                }
                //
            })
            .catch(error => function () {
                this.addfailed = true;
                this.loading = false;
            });
    };

    reportUser(x) {
        this.http.post('/users/settings/report', {targetid: x}).toPromise()
            .then(response => {
                //
            })
            .catch(error => function () {
                //
            });
    }

}
