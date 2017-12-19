import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/observable/of';
import {FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {FormService} from "../form.service";
import {UserService} from "../user.service";

@Component({
    selector: 'create-community',
    templateUrl: './createCommunity.component.html',
    styleUrls: ['./createCommunity.component.scss'],
    providers: [FormService, UserService]
})
export class CreateCommunityComponent  {

    fgCreateCommunity: FormGroup;
    submissionfailed: boolean = false;
    submitted: boolean = false;
    commPicURL: string;
    visitbutton: boolean = false;
    commurl: String;
    reject: boolean = false;

    constructor(
        private fb: FormBuilder,
        private http: Http,
        private userService: UserService
    ) {

    }

    ngOnInit() {
        if (this.userService.getLoggedin() === true) {
            this.createForm();

        } else {
            this.reject = true;
        }
    }

    createForm() {
        this.fgCreateCommunity = this.fb.group({
            title: '',
            description: '',
            hashtags: null,
            public: true,
            sharedWith: null,
        });
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

    checkSubmit() {
        this.setAsTouched(this.fgCreateCommunity);
        if (this.fgCreateCommunity.invalid) {
            this.fgCreateCommunity.wasChecked = true;
        } else {
            this.submitted = true;
            this.submitForm();
        }
    }

    submitForm() {
        this.postForm();
    }

    postForm() {
        let date = new Date();
        let meta = {
            pic: this.commPicURL
        };
        let data = Object.assign(this.createcommunityData(), meta);

        this.http.post('/community/save', data).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    this.commurl = response.json().id;
                    this.visitbutton = true;
                } else {
                    this.submissionfailed = true;
                }

            })
            .catch(error => function (error) {
                this.submissionfailed = true;
                alert("Error posting community: " + error);
            });
    }

    createcommunityData() {
        let data = this.fgCreateCommunity.value;

        for (let tagField of ['hashtags', 'sharedWith']) {
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
            return this.http.post('/search', {type: 'tag', keyword: keyword})
                .map(this.observableTagProcess.bind(this))
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
            for (let l=0; l < results.length; l++) {
                searchoutput.push(results[l].word);
            }
            return searchoutput;
        } else {
            return [];
        }
    }

    observableSourceUser(keyword: any): Observable<any[]> {
        if (keyword) {
            return this.http.post('/search', {type: 'user', keyword: keyword})
                .map(this.observableProcessRaw.bind(this))
                .catch(err => {
                    return [];
                });
        } else {
            return Observable.of([]);
        }
    }

    observableProcessRaw(data) {
        if (data.json().status == 1) {
            let searchoutput = [];
            let results = data.json().results;
            for (let l=0; l < results.length; l++) {
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
            return Observable.of({
                display: display,
                value: value
            });
        } else {
            return Observable.of({
                display: x,
                value: x
            });
        }

    }


    /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    uploadFile(file, signedRequest, url){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    this.commPicURL = url;
                }
                else{
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    getSignedRequest(file){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const response = JSON.parse(xhr.responseText);
                    this.uploadFile(file, response.signedRequest, response.url);
                }
                else{
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }

    onPicChange($event) {
        const file = $event.target.files[0];
        if(file == null){
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    }

}