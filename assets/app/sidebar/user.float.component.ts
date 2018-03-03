import { Component, Input, OnInit } from "@angular/core";
import {UserService} from '../user.service';
import { ShareService } from "../share.service";

@Component({
    selector: 'user-float',
    templateUrl: './user.float.component.html',
    styleUrls: ['./user.float.component.scss']
})
export class UserFloat implements OnInit {
    userName: string;
    loggedin = false;
    fbid = false;
    firstname = null;
    lastname = null;
    dbid = null;
    pic: string;
    pictype: string;
    picdata: Object;
    gender: string;

    constructor(private userService: UserService, private shareService: ShareService
 ) {

    }

    ngOnInit() {
        this.checkLoggedin();
    }

    checkLoggedin() {
        this.userService.afterLoginCheck().then(userData => {
            if (userData != 0) {
                this.loggedin = true;
                this.fbid = userData.fbid;
                this.dbid = userData.dbid;
                this.firstname = userData.firstname;
                this.lastname = userData.lastname;
                this.picdata = userData.picdata;
                this.gender = userData.gender;

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

}