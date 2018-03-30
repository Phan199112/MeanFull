import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from "@angular/http";
import {UserService} from "../user.service";
import {ShareService} from "../share.service";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    providers: [UserService],
    host: {
        '(document:click)': 'onDocClick($event)',
    }
})
export class NavbarComponent implements OnInit {
    searchbox: FormGroup;
    loggedin = false;
    fbid = false;
    firstname = null;
    dbid = null;
    pic: string;
    pictype: string;
    picdata: Object;
    notifications: string[] = [];
    //
    unreadNotifications: number = 0;
    events: any;
    gender: string;

    navExpanded: boolean = false;
    @ViewChild('toggler') toggler;
    private obs: any;

    constructor(
        private http: Http,
        private fb: FormBuilder,
        private userService: UserService,
        private shareService: ShareService,
        private router: Router
    ) { }


    ngOnInit() {
        this.searchbox = this.fb.group({
            searchterm: ['', Validators.required]
        });

        this.checkLoggedin();

        // update the list every 30 seconds



        this.obs = Observable.interval(1000 * 30).subscribe(x => {
            this.getEventsList();
        });

    }

    ngOnDestroy() {
        this.obs.unsubscribe();
    }

    checkLoggedin() {
        this.userService.afterLoginCheck().then(userData => {
            if (userData != 0) {
                this.loggedin = true;
                this.fbid = userData.fbid;
                this.dbid = userData.dbid;
                this.firstname = userData.firstname;
                this.picdata = userData.picdata;
                this.gender = userData.gender;

                // deal with events
                this.getEventsList();

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
                //if local pic is uploaded in settings
                this.shareService.get("profilePic").subscribe(pic => {
                    this.pictype = "local";
                    this.pic = pic;
                });
            } else {
                this.loggedin = false;
            }
        });
    };

    clearNotifications() {
        // reset the counter
        this.unreadNotifications = 0;
        // clean current data list
        let l = this.notifications.length;
        while (l--) {
            this.notifications.splice(l, 1);
        }
    }

    addNotification(notification) {
        this.notifications.push(notification);
        if (notification.seen == false) {
            this.unreadNotifications++;
        }
    }

    getEventsList() {
        this.userService.afterLoginCheck().then(response => {
            // request eventslist
            if (response != '0') {
                this.http.get('/events/list').toPromise()
                    .then(eventsdata => {
                        // store the data
                        this.events = eventsdata.json().events; // array of objects
                        window.console.log("the eventData is", this.events);
                        //get the question that the user posted

                        //var eventid = hashids.decodeHex(req.body.id);


                        // clear the current list
                        this.clearNotifications();

                        // add new data
                        if (this.events != null) {
                            for (let e of this.events) {
                                let hashedFormId = e["data"];
                                window.console.log("hashed is", hashedFormId);
                                let unHashed = this.hex2a (hashedFormId);
                                window.console.log("data is", hashedFormId);
                                this.addNotification(e);
                            }
                        }
                    });
            }
        });
    }

     hex2a(hex) {
        var str = '';
        for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }
    

    setAsSeen(notification) {
        if (notification.seen) return;
        this.http.post('/events/seen', {id: notification.id}).toPromise()
            .then(eventsdata => {
                this.unreadNotifications--;
                notification.seen = true;                
            });
    }

    notificationLink(notification) {
        switch (notification.type) {
            case "form":
            case "form-shared":
                return ['/feed', {'survey': notification.data}];
            case "form-answer":
                return ['/feed', {'survey': notification.data}];
            case "form-discussion":
                if (typeof notification.data == "object") {
                    return ['/feed', {'survey': notification.data.formid, 'message': notification.data.messageid}];
                } else {
                    return ['/feed', {'survey': notification.data}];                    
                }
            case "network":
            case "comm":
            case "comm-admin":
                return ['/settings', {'page': 'notifications'}];
        }
    }

    notificationPic(notification) {
        if (notification.fromuser) {
            if (notification.fromuser.fb !== null) {
                return `https://graph.facebook.com/${notification.fromuser.fb}/picture?width=30&height=30`;
            } else {
                if (notification.fromuser.pic) {
                    return notification.fromuser.pic;
                } else {
                    return `/images/${notification.fromuser.gender}.png`;
                }
            }
        } else {
            return "/images/question.jpg";
        }
    }

    notificationMessage(notification) {
        var name;
        var pronoun;

        if (notification.fromuser) {
            name = notification.fromuser.name;
            if (notification.fromuser.gender == "male") {
                pronoun = "his";
            } else if (notification.fromuser.gender == "female") {
                pronoun = "her";
            } else {
                pronoun = "their";
            }
        } else {
            name = "Someone";
            pronoun = "their";
        }

        switch (notification.type) {
            case "form":
                return `${name} has created a new survey`;//get the text from the database
            case "form-shared":
                return `${name} has shared a survey`;
            case "form-answer":
                return `${name} has answered your survey`;
            case "form-discussion":
                return `${name} has commented on your survey`;            
            case "network":
                return `${name} has invited you to be a part of ${pronoun} network`;
            case "comm":
                return `${name} has invited you to a community`;
            case "comm-admin":
                return `${name} has invited you to be an admin in a community`;                        
        }
    }

    logout() {
        this.userService.clearLogin();
        this.goTo('/users/logout');
    }

    goTo(url) {
        window.location.href = url;
    }

    onDocClick(event) {
        if (!this.toggler.nativeElement.contains(event.target))  {
            this.navExpanded = false;
        }
    }


    checkSubmit(form) {
        this.setAsTouched(form);
        if (form.invalid) {
            form.wasChecked = true;
        } else {
            // submit
            this.submitSearch();
        }
    }

    setAsTouched(group) {
        group.markAsTouched();
        for (let i in group.controls) {
            if (group.controls[i] instanceof FormControl) {
                group.controls[i].markAsTouched();
            } else {
                this.setAsTouched(group.controls[i]);
            }
        }
    }

    submitSearch() {
        this.router.navigate(['/searchresults', { 'q': this.searchbox.value.searchterm }]);
    }



}
