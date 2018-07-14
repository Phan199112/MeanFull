import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from "@angular/http";
import { UserService } from "../user.service";
import { ShareService } from "../share.service";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
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
    pic: any;
    pictype: string;
    picdata: Object;
    notifications: any[] = [];
    networkNotifications: any[] = [];
    communityNotifications: any[] = [];
    unreadNotifications: number = 0;
    events: any;
    gender: string;
    showNotifications: boolean = false;
    notifShowCount: number = 10;
    startingTime: any;
    newestNotificationId: any = null;


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
        this.startingTime = Date.now();

        this.searchbox = this.fb.group({
            searchterm: ['', Validators.required]
        });

        this.checkLoggedin();

        // update the list every 30 seconds



        this.obs = Observable.interval(1000 * 30).subscribe(x => {
            this.getEventsList();
        });


        // const aboutOffset = $('qSidebar').offset().top;

        // $(window).scroll(function () {
        //     var wScroll = $(window).scrollTop();
        //     $('.qSidebar').css({position:"relative"; left: aboutOffset + wScroll });
        //     if (wScroll < 0) wScroll = 0;
        // });
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
                this.userService.listenForLogin(this.checkLoggedin.bind(this));
            }
        });
    };

    clearNotifications() {
        // reset the counter
        this.unreadNotifications = 0;

        this.networkNotifications = [];
        this.notifications = [];
        this.communityNotifications = [];
    }


    addNotification(notification) {
        if (notification.type === 'network') {
            this.networkNotifications.push(notification);
            if (notification.seen == false) {
                this.unreadNotifications++;
            }
            this.networkNotifications.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

        }

        if (notification.type === 'comm' || notification.type === 'comm-admin' || notification.type === "comm-request") {
            this.communityNotifications.push(notification);
            if (notification.seen == false) {
                this.unreadNotifications++;
            }
            this.communityNotifications.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
        }

        if (notification.type === 'form' || notification.type === 'form-shared' || notification.type === 'form-answer' || notification.type === 'form-discussion') {
            this.notifications.push(notification);
            if (notification.seen == false) {
                this.unreadNotifications++;
            }
            this.notifications.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
        }
    }

    getEventsList() {
        this.userService.afterLoginCheck().then(response => {
            if (response == '0')
                return;
            var onlyGetNewNotifications = !!this.newestNotificationId;

            this.http.post('/events/list', {since: this.newestNotificationId})
            .toPromise()
            .then(eventsdata => {
                var eventsList;
                try {
                    eventsList = eventsdata.json();
                } catch (err) {
                    // Since we poll for events every few seconds, this will handle the
                    // case of an idle browser tab that becomes logged out
                    this.router.navigate(['/users/login']);
                    return;
                }

                // nothing new so don't render / rerender
                if (!eventsList.events)
                    return;

                if (onlyGetNewNotifications) {
                    // we already have this.events and just need to append to it
                    Array.prototype.push.apply(this.events, eventsList.events);
                } else {
                    // array of objects
                    this.events = eventsList.events;
                }

                // clear the current list and add new data
                this.clearNotifications();
                for (let e of this.events) {
                    // window.console.log(e);
                    this.addNotification(e);
                }

                if (eventsList.newestEvent)
                    this.newestNotificationId = eventsList.newestEvent;
            });
        });
    }

    showMoreNotifications() {
        this.notifShowCount += 10;
        window.setTimeout(()=>{this.showNotifications = true}, 1);
    }

    setAsSeen(notification) {
        // if (notification.seen) {
        //     window.setTimeout(()=>{this.toggleNotifications();},10);
        //     return;
        // }
        this.http.post('/events/seen', { id: notification.id }).toPromise()
            .then(eventsdata => {
                // this.toggleNotifications();
                this.unreadNotifications--;
                notification.seen = true;
            });
    }

    notificationLink(notification) {

        switch (notification.type) {
            case "form":
                if (notification.data.comm) {
                    return ['/group', notification.data.comm.value, { 'survey': notification.data.formid }];
                } else {
                    return ['/feed', { 'survey': notification.data.formid }];
                }
            case "form-answer":
                return ['/feed', { 'survey': notification.data }];
            case "form-shared":
                return ['/group', notification.data.commid ]
                // return ['/group', notification.data.commid, { 'survey': notification.data.formid } ]
            case "form-discussion":
                return ['/feed', { 'survey': notification.data.formid, 'message': notification.data.messageid }];
            case "network":
            case "comm-request":
                return ['/profile', notification.fromUserId]
            case "comm":
            case "comm-admin":
                return ['/group', notification.data];
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
                    // return `/images/${notification.fromuser.gender}.png`;
                    return "/images/male.png";
                }
            }
        } else {
            return "/images/question.jpg";
        }
    }

    notificationMessage(notification) {
        var name;
        var pronoun;


        // trim message
        function trimMessage(string, wordCount = 12) {
            var index = 0;
            var words = 0;
            var finalString = [];

            if (!string)
                return '';

            for (let i = 0; i < string.length; i++) {
                if (string[i] === " ") {
                    words++;
                }

                if (words == wordCount) {
                    index = i;
                    break;
                }
            }

            if (!index) {
                return string;
            } else {
                return string.substr(0,index) + '...';
            }

        }

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
                if (notification.data.comm) {
                    return { name: name, action: ` asked`, message: `'${trimMessage(notification.qTitle)}'`, action2: ` in `, community: `${notification.data.comm.display.substr(1)}`};
                } else {
                    return { name: name, action: ` asked`, message: `'${trimMessage(notification.qTitle)}'` };
                }
            case "form-shared":
                return { name: name, action: ` has shared `, message: `'${trimMessage(notification.qTitle)}'`, action2: ` in `, community: notification.commTitle };
            case "form-answer":
                return { name: name, action: ` has answered your question '${trimMessage(notification.qTitle)}'` };
            case "form-discussion":
                return { name: name, action: ` has commented on your question '${trimMessage(notification.qTitle)}'` };
            case "network":
                return { name: name, message: ` invited you to be a part of ${pronoun} network` };
            case "comm-request":
                return { name: name, message: ` has requested to join `, community: notification.commTitle };
            case "comm":
                return { name: name, message: ` has invited you to join `, community: notification.commTitle };
            case "comm-admin":
                return { name: name, message: ` invited you to be an admin of `, community: notification.commTitle };
        }
    }

    logout() {
        this.goTo('/users/logout');
    }

    goTo(url) {
        window.location.href = url;
    }

    onDocClick(event) {

        // Auto Scroll for Filters in Feed Post
        if ($(event.target).hasClass('filterButton')) {
            window.setTimeout(() => {
                var target = $(event.target).closest('.fBody').find('#analysisContainer');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: Math.ceil(target.offset().top - 100)
                    }, 700);
                    return;
                }
            }, 50);


            return;
        }

        if (this.showNotifications) {
            this.navExpanded = false;
            this.showNotifications = false;
            $('body').css('overflow', 'auto');
        }

        if ($(event.target).parents('.notificationDropdown').length || $(event.target).parents('.settingsDropdown').length) {
            $('#navbarSupportedContent').removeClass('show');
        }

        if ($(event.target).hasClass('navbar-toggler') || $(event.target).hasClass('navbar-toggler-icon')) {
            return;
        }


        if (!$(event.target).parents('.navbar-collapse').length) {
            $('#navbarSupportedContent').removeClass('show');
        }

        if (this.showNotifications) {
            this.navExpanded = false;
            this.showNotifications = false;
            $('body').css('overflow', 'auto');
        }
    }

    closeNavbar() : void {
        $('#navbarSupportedContent').removeClass('show');
    }


    checkSubmit(form) {
        this.setAsTouched(form);
        if (form.invalid) {
            form.wasChecked = true;
        } else {
            // submit
            this.submitSearch();
            this.searchbox.get("searchterm").setValue("");
            this.closeNavbar();
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


    toggleNotifications() {
        if (this.showNotifications) return;
        window.setTimeout(()=>{
            this.showNotifications = !this.showNotifications;
            $('body').css('overflow', 'hidden');
        }, 10);
    }


    acceptConnectionRequest(notification) {
        this.http.post(`/users/settings/acceptnetworkrequest`, { eventid: notification.id }).toPromise()
            .then(() => {
                this.http.post(`/events/delete`, { id: notification.id }).toPromise()
                .then(() => {
                    this.reloadFullNotificationsList();
                    this.router.navigate(['/profile', notification.fromUserId]);
                })
            })
            .catch(error => alert("Error: " + error));
    }

    deleteConnectionRequest(fromuserid, notificationid) {
        // Note: it might be better to mark the request as declined rather than deleting it
        this.http.post(`/users/settings/removefromnetwork`, {targetid: fromuserid}).toPromise()
            .then(() => {
                this.reloadFullNotificationsList();
            })
            .catch(error => alert("Error: " + error));
    }

    acceptCommunityRequest(x, asAdmin = false) {
        this.http.post(`/users/settings/acceptcommrequest`, { eventid: x, asadmin: asAdmin }).toPromise()
            .then(() => {
                this.http.post(`/events/delete`, { id: x }).toPromise()
                    .then(() => {
                        this.reloadFullNotificationsList();
                    })

            })
            .catch(error => alert("Error: " + error));
    }

    acceptNewgroupMemberRequest(x, commId, memberId) {
        this.http.post(`/group/accept`, { commid: commId, memberid: memberId }).toPromise()
            .then(() => {
                //delete event for all admins once one of them makes a decision

                this.http.post(`/events/delete`, { id: x }).toPromise()
                    .then(() => {
                        this.reloadFullNotificationsList();
                    });
            })
            .catch(error => alert("Error: " + error));
    }

    rejectNewgroupMemberRequest(x, commId, memberId) {
        this.http.post(`/group/reject`, { commid: commId, memberid: memberId }).toPromise()
            .then(() => {
                this.reloadFullNotificationsList();
            })
            .catch(error => alert("Error: " + error));
    }



    deleteCommunityRequest(x) {
        this.http.post(`/users/settings/deletecommrequest`, { eventid: x }).toPromise()
            .then(() => {
                this.reloadFullNotificationsList();
            })
            .catch(error => alert("Error: " + error));
    }

    markAllRead() {
        this.http.post(`/events/markAllRead`, {}).toPromise()
            .then(() => {

                this.notifications.forEach((x) => {
                    x.seen = true;
                })

                this.networkNotifications.forEach((x) => {
                    x.seen = true;
                })

                this.communityNotifications.forEach((x) => {
                    x.seen = true;
                })

                this.unreadNotifications = 0;

            })
            .catch(error => alert("Error: " + error));

    }

    // Use this if you know this.events is now out-of-date
    reloadFullNotificationsList() {
        this.newestNotificationId = null;
        this.events = [];
        this.getEventsList();
    }

    clickedLogin() {
        var startingTime = this.startingTime;
        (window as any).mixpanel.track("Login Clicked", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "timestamp": Date.now()
        });
    }

}
