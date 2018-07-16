import { Component, Input, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {FormService} from '../form.service';

@Component({
    selector: 'app-create-group',
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.scss'],
    providers: [FormService]
})
export class CreateGroupComponent implements OnInit {

    @Input() category: any;

    fgCreateGroup: FormGroup;
    submissionfailed = false;
    submitted = false;
    visitbutton = false;
    commurl: String;
    errors: any = {
        title: false
    };

    constructor(
        private fb: FormBuilder,
        private http: Http,
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.fgCreateGroup = this.fb.group({
            category: '',
            title: new FormControl('', [Validators.required, Validators.minLength(1)]),
            description: '',
            forCurrentSession: false,
            admins: null,
            pic: '',
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
        this.setAsTouched(this.fgCreateGroup);
        if (this.fgCreateGroup.invalid) {
            this.errors.title = true;
        } else {
            this.submitted = true;
            this.submitForm();
        }
    }

    submitForm() {
        this.fgCreateGroup.get('category').setValue(this.category.category);
        this.postForm();
    }

    postForm() {
        let date = new Date();
        let data = this.createcommunityData();
        console.log("posted", data);

        this.http.post('/group/save', data).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    this.commurl = response.json().id;
                    this.visitbutton = true;
                    this.router.navigate(['/', {queryParams: {groupId: this.commurl}}]);

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
        let data = this.fgCreateGroup.value;

        for (let tagField of ['hashtags', 'admins']) {
            if (data[tagField]) {
                data[tagField] = data[tagField].map(tag => tag.value);
            }
        }

        return data;
    }

    toggleForCurrentSession(forCurrentSession: string) {
        this.fgCreateGroup.get('forCurrentSession').setValue(forCurrentSession);
    }
}
