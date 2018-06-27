import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-feedback-form',
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

    }

}
