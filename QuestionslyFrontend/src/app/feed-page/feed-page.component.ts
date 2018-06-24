import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'feed-page',
    templateUrl: './feed-page.component.html',
    styleUrls: ['./feed-page.component.scss'],
    providers: [UserService]
})
export class FeedPageComponent implements OnInit  {
    loggedin = false;
    tag: string;
    fbid = false;
    firstname = null;
    dbid = null;
    pic: any;
    pictype: string;
    picdata: Object;
    emailconfirmfailed = false;
    emailconfirmok = false;
    completedform = false;
    startingTime: any;
    gender: any;


    constructor(private http: Http, private userService: UserService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.startingTime = Date.now();
        var startingTime = this.startingTime;
        (window as any).mixpanel.track("Feed Start", {
            "timestamp": Date.now()
        });

        window.addEventListener("beforeunload", function (event) {
            var amountScrolled = window.scrollY;
            (window as any).mixpanel.track("Feed End", {
                "timeSpentOnFeed": (Date.now() - startingTime) / 1000,
                "scrolled": amountScrolled,
                "timestamp": Date.now()
            });

        });

        this.tag = null;

        this.userService.afterLoginCheck().then(userData => {
            if (userData != 0) {

                this.loggedin = true;
                this.fbid = userData.fbid;
                this.dbid = userData.dbid;
                this.firstname = userData.firstname;
                this.picdata = userData.picdata;
                this.gender = userData.gender;


                // deal with picture
                if (this.fbid != null) {
                    this.pic = this.fbid;
                    this.pictype = "fb";
                } else {
                    if (this.picdata != null) {
                        this.pictype = "local";
                        this.pic = this.picdata;
                    } else {
                        if (this.gender) {
                            if (this.gender == 'male') {
                                this.pictype = "default-male";
                            } else {
                                this.pictype = "default-female";
                            }
                        }
                    }
                }

                var commid = localStorage.getItem("comm");

                if (commid) {
                    this.http.post('/community/accept', { commid: commid }).toPromise()
                        .then(response => {
                            localStorage.removeItem("comm");
                            localStorage.removeItem("commVerification");
                        })
                        .catch(error => function () {});
                }

            } else {
                this.loggedin = false;
            }
        });


        this.route.queryParams.subscribe(params => {
            if (params.message) {
                if (params.message == "emailconfirmfailed") {
                    this.emailconfirmfailed = true;

                } else if (params.message == "emailconfirmok") {
                    this.emailconfirmok = true;

                } else if (params.message == "completedform") {
                    this.completedform = true;
                }
            }
        });
    }

    ngOnDestroy() {
        var amountScrolled = window.scrollY;
        var startingTime = this.startingTime;
        (window as any).mixpanel.track("Feed End", {
            "timeSpentOnFeed": (Date.now() - startingTime) / 1000,
            "scrolled": amountScrolled,
            "timestamp": Date.now()
        });

    }



    setTag(tag: string) : void {
        this.tag = tag;
    }

    askQuestion() {
        var startingTime = this.startingTime;
        (window as any).mixpanel.track("Clicked Ask Question", {
            "timeSpentOnFeed": (Date.now() - startingTime) / 1000,
            "timestamp": Date.now()
        });


    }

    sendFix() {
        this.http.post('/events/sendfix', {}).toPromise()
            .then(response => {
            })
            .catch(error => function () { });
    }
}
