import { Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {UserService} from "../user.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    providers: [UserService]
})
export class NavbarComponent implements OnInit {
    loggedin = false;
    fbid = false;
    firstname = null;
    dbid = null;
    pic: string;
    pictype: string;
    picdata: Object;
    notifications: string[] = [];
    unreadNotifications: number = 0;
    events: any;

    constructor(private http: Http, private userService: UserService) { }

    checkLoggedin = function() {
        this.userService.afterLoginCheck().then(userData => {
            if (userData != 0) {
                this.loggedin = true;
                this.fbid = userData.id;
                this.dbid = userData.dbid;
                this.firstname = userData.firstname;
                this.picdata = userData.picdata;

                this.userService.setData({
                    dbid: this.dbid
                });

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
                        this.pictype = "default";
                    }
                }
            } else {
                this.loggedin = false;
            }
        });
    };

    addNotification(notification) {
        this.notifications.push(notification);
        if (notification.seen == false) {
            this.unreadNotifications++;
        }
    }

    ngOnInit() {
        this.checkLoggedin();
    }

    getEventsList() {
        this.userService.afterLoginCheck().then(response => {
            // request eventslist
            if (response != null) {
                this.http.get('/events/list').toPromise()
                    .then(eventsdata => {
                        this.events = eventsdata.json().events; // array of objects

                        if (this.events != null) {
                            for (let e of this.events) {
                                this.addNotification(e);
                            }
                        }
                    })
                    .catch(error => alert("Error retrieving events list: " + error));
            }
        });
    }

    setAsSeen(x) {
        this.http.post('/events/seen', {id: x}).toPromise()
            .then(eventsdata => {
                //console.log("updated as seen");
            })
            .catch(error => alert("Error retrieving events list: " + error));
    }

    goTo(url) {
        window.location.href = url;
    }
}
