import { Component, OnInit, Output } from '@angular/core';
import { Http } from "@angular/http";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { FeedForm } from "../feed/feed.form.model";

import * as $ from 'jquery';


@Component({
    selector: 'take-form',
    templateUrl: './takeForm.component.html',
    styleUrls: ['./takeForm.component.scss']
})

export class TakeFormComponent implements OnInit {
    formdata: Object;
    form: FeedForm;
    authordata: Object;
    id: string;
    submitted: boolean = false;
    showsubmit: boolean = false;
    loggedin: boolean = false;
    unavailable: boolean = false;
    author: string;
    authorlink: string;
    authorgender: string;
    authorlinkdisabled: boolean;
    pic: string;
    pictype: string;
    timestamp: string;
    startTime: any;
    

    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params.id;
            this.startTime = Date.now();

            // window.mixpanel.track(this.id.toString()); //track users directed to questionsly via shared links
            this.http.get(`/forms/${params.id}`).toPromise()
                .then(res => {
                    if (res.json().status == 1) {
                        this.formdata = res.json().formdata;
                        window.mixpanel.track(this.formdata.questions[0].body + "\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008" + this.id + " Start: " + Date.now()); //track users directed to questionsly via shared links
                        this.authordata = res.json().authordata;
                        this.loggedin = res.json().loggedin;
                        this.showsubmit = false;
                        this.unavailable = false;
                        this.timestamp = this.formdata.timestamp;

                        console.log("fdata", this.formdata);

                        if (this.authordata.anonymous == false) {
                            this.author = this.authordata.name;
                            this.authorlink = this.authordata.link;
                            this.authorlinkdisabled = false;
                            // deal with picture
                            if (this.authordata.facebookID != null) {
                                this.pic = this.authordata.facebookID;
                                this.pictype = "fb";
                            } else {
                                if (this.authordata.pic != null) {
                                    this.pictype = "local";
                                    this.pic = this.authordata.pic;
                                } else {
                                    this.pictype = "default";
                                    this.authorgender = this.authordata.gender;
                                }
                            }
                        } else {
                            this.author = "Anonymous";
                            this.authorlink = "";
                            this.authorlinkdisabled = true;
                            this.pictype = "anonymous";
                        }

                        if (this.loggedin) {
                            this.isFilledIn();
                        }
                    } else {
                        this.unavailable = true;
                    }
                    // this.formdata.pic = this.pic;
                    // this.formdata.pictype = this.pictype;      
                    // this.formdata.authorgender = this.authorgender;
                    // this.formdata.object = {author: this.authordata};
                    this.formdata.id = this.id;

                    this.form =  new FeedForm({formdata: this.formdata, author: this.authordata, id: this.id, found: true});
                    // window.console.log("Response; ", this.formdata);

                    // this.formdata.location = this.authordata.location;   
                    // this.formdata.nocreated = this.authordata.nocreated;              
                    // this.formdata.nodiscussion = this.authordata.nodiscussion;              
                    // this.formdata.notaken = this.authordata.notaken;              
           


                })
                .catch(error => alert("Error retrieving form: " + error));
        })

        this.startTime = new Date();

    }

    postForm(data) {
        data.id = this.id;
        this.http.post('/forms/answers', data).toPromise()
          .then(response => { 
              this.submitted = true;
              // redirect
              this.router.navigate(['/'], { queryParams: { message: 'completedform' } });
          })
          .catch(error => alert("Error posting survey: " + error));  
    }

    isFilledIn() {
        // did the current user complete this particular survey?
        var data = {formid: this.id};

        // post and get response
        this.http.post('/forms/checkcompleted', data)
            .toPromise()
            .then(response => {
                if (response.json().data == 1) {
                    //completed
                    this.showsubmit = false;
                    this.submitted = true;
                } else {
                    this.showsubmit = true;
                }
            })
            .catch(error => {
                // error, assume completed
                this.showsubmit = false;
            });
    }

    stopTimer(val: boolean) {
        if (val) window.mixpanel.track(this.formdata.questions[0].body + "\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008\u2008" + this.id + " Submit: " + Date.now()); //track users directed to questionsly via shared links
    }
}