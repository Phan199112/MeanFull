import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";
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
    fgCreateCommunity: FormGroup;

    friends: any[] = [];    
    showEdit: boolean = false;
    @ViewChild('invitationModal') invitationModal;    

    constructor(private http: Http,
                private fb: FormBuilder,
                private modalService: NgbModal,        
                private route: ActivatedRoute,
                private router: Router,
    ) {
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

                        this.loggedin = res.json().loggedin == '1';
                        this.loadsuccessful = true;

                    } else if (this.status == '2') {
                        this.data = res.json().data;

                        this.loggedin = res.json().loggedin == '1';
                        this.loadsuccessful = true;

                    } else {
                        this.loadsuccessful = false;
                    }
                  
                    this.fgCreateCommunity = this.fb.group({
                        title: this.data.title,
                        description: this.data.description,
                        public: this.data.public,
                        admins: this.data.admins,
                        pic: this.data.pic
                    });
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

    updateCommunity() {

        let data = this.createcommunityData();

        window.console.log("Submitted:", data);


        this.http.put('/community/update', data).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    var commurl = response.json().id;

                    this.data.title = data.title;
                    this.data.description = data.description;
                    this.data.pic = data.pic;
                    this.data.public = data.public;



                    window.console.log("Dumb");
                    this.toggleEdit();

                } else {
                    window.console.log("Updating Community Failed.")
                }

            })
            .catch(error => function (error) {
                this.submissionfailed = true;
                alert("Error posting community: " + error);
            });
    }

    createcommunityData() {
        let data = this.fgCreateCommunity.value;

        data.commid = this.id;


        for (let tagField of ['hashtags', 'admins']) {
            if (data[tagField]) {
                data[tagField] = data[tagField].map(tag => tag.value);
            }
        }

        return data;
    }
    
    transformHashtag(value) {
        if (value !== null && typeof value === 'object') {
            value = value.value;
        }
        if (value[0] === "#") {
            value = value.substring(1);
        }
        return Observable.of({
            display: `#${value}`,
            value: value
        });
    }

    focusTagInput(tagInput) {
        setTimeout(() => {
            tagInput.inputForm.input.nativeElement.focus();
        });
    }

    observableSourceTag(keyword: any): Observable<any[]> {
        if (keyword) {
            if (keyword[0] === "#") {
                keyword = keyword.substring(1);
                if (keyword.length === 0) {
                    return Observable.of([]);
                }
            }
            return this.http.post('/search', { type: 'tag', keyword: keyword })
                .map(this.observableProcessRaw.bind(this))
                .catch(err => {
                    return [];
                });
        } else {
            return Observable.of([]);
        }
    }

    observableTagProcess(data) {
        if (data.json().status == 1) {
            let searchoutput = [];
            let results = data.json().results;
            for (let l = 0; l < results.length; l++) {
                searchoutput.push(results[l].word);
            }
            return searchoutput;
        } else {
            return [];
        }
    }

    observableProcessRaw(data) {
        if (data.json().status == 1) {
            let searchoutput = [];
            let results = data.json().results;
            for (let l = 0; l < results.length; l++) {
                searchoutput.push(results[l]);
            }
            return searchoutput;
        } else {
            return [];
        }
    };

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
                commtitle: this.data.title,
                commpic: this.data.pic,
                userids: this.inviteForm.get('friends').value.map(friend => friend.value),
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

    toggleEdit() {
        this.showEdit = !this.showEdit;
    }

    uploadFile(file, signedRequest, url) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.fgCreateCommunity.get('pic').setValue(url);
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }


    getSignedRequest(file) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }


    onPicChange($event) {
        const file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    }

    setPicUrl(url) {
        this.fgCreateCommunity.get('pic').setValue(url);
    }


    toggleAudience(audience: string) {
        this.fgCreateCommunity.get('public').setValue(audience);
    }

    autosizeTextarea(event: any, el: any) {
        if (event.keyCode == 13) {
            el.blur()
        } else {
            setTimeout(function () {
                el.style.cssText = 'height:auto; padding:0';
                // for box-sizing other than "content-box" use:
                el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }, 0);
        }
    }

}
