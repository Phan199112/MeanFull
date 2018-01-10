import { Component, OnInit } from '@angular/core';
import {FormService} from "../form.service";
import {UserService} from "../user.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Http } from "@angular/http";

@Component({
    selector: 'preview-form',
    templateUrl: './previewForm.component.html',
    styleUrls: ['./previewForm.component.scss'],
    providers: [FormService, UserService]
})

export class PreviewFormComponent implements OnInit {
    data: Object;
    errorShared: boolean = false;
    reject: boolean = false;

    constructor(private formService: FormService,
                private router: Router,
                private http: Http,
                private route: ActivatedRoute,
                private userService: UserService) {
    }

    ngOnInit() {
        if (this.userService.getLoggedin() === true) {
            this.formService.getPersistedData().then(data => {
                this.data = data;
            });
        } else {
            this.reject = true;
        }
    }

    share() {
        // update form parameters to make survey 'public': shared boolean set to true.
        this.http.post('/forms/shared', {formid: this.data.id}).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    // navigate
                    this.router.navigate(['shareForm']);
                } else {
                    this.errorShared = true;
                }
            })
            .catch(error => {
                this.errorShared = true;
            });
    }

    edit() {
        this.router.navigate(['createForm'], {queryParams: {edit: 'true'}});
    }
}
