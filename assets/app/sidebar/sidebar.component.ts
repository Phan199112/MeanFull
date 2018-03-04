import { Component, Input } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { UserService } from "../user.service";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class Sidebar {
    @Input() loggedin: boolean;
    view : string;
    


    constructor() {
        this.view="surveys";
    }

    toggleView(v:string) : void {
        this.view = v;
    }

    getUsers() : void {

    this.http.get(`/users/profile/${this.id}`).toPromise()
    .then(res => {
        this.status = res.json().status;
        if (this.status == '1') {
            this.hidefeed = true;
            //
            this.userprofile = res.json().userprofile;
            this.network = res.json().network;

            // counts
            this.nocreated = res.json().nocreated;
            this.notaken = res.json().notaken;
            this.nodiscussion = res.json().nodiscussion;

            //
            this.me = this.userprofile.me;
            this.innetwork = this.userprofile.innetwork;
            this.pending = this.userprofile.pending;
            this.name = this.userprofile.name.first + " " + this.userprofile.name.last;
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
                this.location = this.userprofile.location.city + ", " + this.userprofile.location.state + ", " + this.userprofile.location.country;
            }

            // deal with picture
            // if pic was uploaded in settings
            if (this.shareService.data.profilePic) {
                this.pictype = "local";
                this.pic = this.shareService.data.profilePic;
            } else {
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
            }

            // is the viewer logged in?
            this.loggedin = res.json().loggedin;

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
            this.name = this.userprofile.name.first + " " + this.userprofile.name.last;
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
                this.location = this.userprofile.location.city + ", " + this.userprofile.location.state + ", " + this.userprofile.location.country;
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
  }

}