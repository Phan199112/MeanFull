import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { AppComponent } from '../app.component';
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'view-community',
    templateUrl: './viewCommunity.component.html',
    styleUrls: ['./viewCommunity.component.scss']
})

export class ViewCommunityComponent implements OnInit {
    loggedin: boolean = false;
    data: Object;
    id: string;
    loadsuccessful: boolean = false;
    loading: boolean = true;
    addfailed: boolean = false;
    status: string;
    inviteForm: FormGroup;
    friends: any[] = [];    
    @ViewChild('invitationModal') invitationModal;    

    constructor(private http: Http,
                private fb: FormBuilder,
                private modalService: NgbModal,        
                private route: ActivatedRoute) {
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
                    this.loading = false;
                    this.status = res.json().status;

                    if (this.status == '1') {
                        this.data = res.json().data;
                        window.console.log("First, ", this.data);

                        this.loggedin = res.json().loggedin == '1';
                        this.loadsuccessful = true;

                    } else if (this.status == '2') {
                        this.data = res.json().data;
                        window.console.log(this.data);

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


        this.http.get("/users/network").toPromise().then(res => {
            var json = res.json();
            if (json.data) {
                this.friends = json.data;
            }
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

    inviteToCommunity() {
        this.inviteForm = this.fb.group({
            friends: null
        });
        this.modalService.open(this.invitationModal).result.then((result) => {
            this.http.post("/community/invite", {
                commid: this.id, 
                userids: this.inviteForm.get('friends').value.map(friend => friend.value)
            }).toPromise().then((result) => {
                if (result.json().status == 1) {
                    //console.log("accepted comm invite request");
                } else {
                    alert("Failed to send invites");
                }
            })
            .catch(function() {
                alert("Failed to send invites");
            });
        }, (reason) => {
            //on cancel
        });
    }

    transformName(x) {
        let value, display;
        if (x !== null && typeof x === 'object') {
            value = x.value;
            display = x.display;
            if (value[0] === "@") {
                value = value.substring(1);
            }
            return Observable.of({
                display: `@${display}`,
                value: value
            });
        } else {
            return Observable.of({
                display: `@${x}`,
                value: x
            });
        }

    }

    nameMatching(keyword, target) {
        var targetValue = target.name;

        if (keyword[0] === "@") {
            keyword = keyword.substring(1);
        }
        return keyword.length > 0 && 
            targetValue && 
            targetValue.toLowerCase().indexOf(keyword.toLowerCase()) === 0;
    }

    focusTagInput(tagInput) {
        setTimeout(() => {
            tagInput.inputForm.input.nativeElement.focus();
        });
    }

}
