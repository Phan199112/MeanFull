import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'feedback-form',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
    formfeedback: FormGroup;
    submissionfailed: boolean = false;
    submissionthanks: boolean = false;
    submitted: boolean = false;

    constructor(private fb: FormBuilder, private http: Http) {
    }

    ngOnInit() {
        this.formfeedback = this.fb.group({
            feedback: ['', Validators.compose([Validators.minLength(10), Validators.required])]
        });
    }

    checkSubmit() {
        this.setAsTouched(this.formfeedback);
        if (this.formfeedback.invalid) {
            this.formfeedback.wasChecked = true;
        } else {
            this.submitted = true;
            this.Submit();
        }
    }

    Submit() {
        this.http.post('/savefeedback', this.formfeedback.value).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    this.submissionthanks = true;
                } else {
                    this.submissionfailed = true;
                }

            })
            .catch(error => function (error) {
                this.submissionfailed = true;
                alert("Error posting form: " + error);
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
}