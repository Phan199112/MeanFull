import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { FormService } from "../form.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { PopupComponent} from '../popup/popup.component';
import { AppComponent } from '../app.component';
import {PopupService} from "../popup.service";
import {PopupInviteCommComponent} from "../popup/popup.invitecomm.component";

@Component({
    selector: 'view-community',
    templateUrl: './viewCommunity.component.html',
    styleUrls: ['./viewCommunity.component.scss'],
    providers: [PopupService]
})

export class ViewCommunityComponent implements OnInit {
    loggedin: boolean = false;
    data: Object;
    id: string;
    loadsuccessful: boolean = false;
    loading: boolean = true;
    addfailed: boolean = false;
    status: string;

    constructor(private http: Http,
                private route: ActivatedRoute,
                private popupService: PopupService) {
    }

    ngOnInit() {
        this.loggedin = false;
        this.loading = true;
        this.loadData();
    }

    loadData() {
        this.route.params.subscribe(params => {
            this.id = params.id;
            this.http.get(`/community/retrieve/${params.id}`).toPromise()
                .then(res => {
                    console.log(res.json());

                    this.loading = false;
                    this.status = res.json().status;

                    if (this.status == '1') {
                        this.data = res.json().data;
                        this.loggedin = res.json().loggedin == '1';
                        this.loadsuccessful = true;

                    } else if (this.status == '2') {
                        this.data = res.json().data;
                        this.loggedin = res.json().loggedin == '1';
                        this.loadsuccessful = true;

                    } else {
                        this.loadsuccessful = false;

                    }
                })
                .catch(function() {
                    this.loading = false;
                    this.loadsuccessful = false;
                });
        });
    }

    joinCommunity(x) {
        this.http.post('/community/join', {targetid: x}).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    this.data.ismember = true;
                } else {
                    this.addfailed = true;
                }
                //
            })
            .catch(error => function () {
                this.addfailed = true;
            });
    }

    leaveCommunity(x) {
        this.http.post('/community/leave', {targetid: x}).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    //
                    this.data.ismember = false;
                } else {
                    this.addfailed = true;
                }
                //
            })
            .catch(error => function () {
                this.addfailed = true;
            });
    }

    reportCommunity(x) {
        this.http.post('/community/report', {targetid: x}).toPromise()
            .then(response => {
                //
            })
            .catch(error => function () {
                //
            });
    }

    deleteCommunity(x) {
        this.http.post('/community/delete', {targetid: x}).toPromise()
            .then(response => {
                //
                if (response.json().status == 1) {

                }
            })
            .catch(error => function () {
                //
            });
    }

    inviteToCommunity(x) {
        // make a popup with various options
        this.popupService.setLink(x);
        //
        var popup =  AppComponent.PopupControler.PopupComponent(PopupInviteCommComponent);
    }

}
