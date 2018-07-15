import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {FormService} from '../form.service';
import {UserService} from '../user.service';

@Component({
    selector: 'app-create-community',
    templateUrl: './create-community.component.html',
    styleUrls: ['./create-community.component.scss'],
    providers: [FormService, UserService]
})
export class CreateCommunityComponent  {

    fgCreateCommunity: FormGroup;
    submissionfailed = false;
    submitted = false;
    commPicURL: any;
    showAdmins: boolean;
    visitbutton = false;
    commurl: String;
    privacyOption = 0;
    friends: any[] = [];
    errors: any = {
        title: false
    };

    constructor(
        private fb: FormBuilder,
        private http: Http,
        private userService: UserService,
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.createForm();
        this.userService.afterLoginCheck().then(userData => {
            if (userData != 0) {
                this.http.get("/users/network").toPromise().then(res => {
                    var json = res.json();
                    if (json.data) {
                        this.friends = json.data;
                    }
                });
            }
        });
    }

    createForm() {
        this.fgCreateCommunity = this.fb.group({
            title: new FormControl('', [Validators.required, Validators.minLength(1)]),
            description: '',
            public: true,
            admins: null,
            pic: ""
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
            this.errors.title = true;
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
        let data = this.createcommunityData();
        data.category = 'class';
        console.log("posted", data);

        this.http.post('/group/save', data).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    this.commurl = response.json().id;
                    this.visitbutton = true;
                    this.router.navigate(['/group', this.commurl]);

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
            return this.http.post('/search', {type: 'tag', keyword: keyword})
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
            for (let l=0; l < results.length; l++) {
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
            el.blur();
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
