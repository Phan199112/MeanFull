import { Component, Input, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {FormService} from '../form.service';
import { MygroupsService } from '../mygroups.service';

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
    shareLink = '';
    newGroupLink: any;
    commurl: String;
    errors: any = {
        title: false
    };

    constructor(
        private fb: FormBuilder,
        private http: Http,
        private router: Router,
        private myGroupsService: MygroupsService,
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
        if (!this.fgCreateGroup.invalid) {
            this.submitted = true;
            this.submitForm();
        }
    }

    submitForm() {
        this.fgCreateGroup.get('category').setValue(this.category.category);

        let date = new Date();
        let data = this.createcommunityData();
        console.log("posted", data);

        this.http.post('/group/save', data).toPromise()
            .then(response => {
                const responseJson = response.json();

                if (responseJson.status === 1) {
                    this.myGroupsService.acknowledgeUserOrGroupChange();
                    this.shareLink = '/' + this.category.category + '/' + responseJson.id + '?t=' + responseJson.shareToken;
                    this.newGroupLink = ['/', this.category.category, responseJson.id];
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

    goToNewGroup() {
        this.router.navigate(this.newGroupLink);
    }

    toggleForCurrentSession(forCurrentSession: string) {
        this.fgCreateGroup.get('forCurrentSession').setValue(forCurrentSession);
    }
}
