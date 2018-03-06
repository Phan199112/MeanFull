import { Component, OnInit, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/observable/of';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../form.service";
import {UserService} from "../user.service";
import {Router, ActivatedRoute} from "@angular/router";
import * as autoScroll from 'dom-autoscroller';
import {FlatpickrOptions} from 'ng2-flatpickr/ng2-flatpickr';

@Component({
    selector: 'question-form',
    templateUrl: './questionForm.component.html',
    styleUrls: [
        './questionForm.component.scss'
    ],
})

export class QuestionForm implements OnInit {
    @Output() questionData: EventEmitter<Object> = new EventEmitter<Object> ();
    question: FormGroup;
    
    constructor(
        private fb: FormBuilder,
        private formService: FormService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.question = this.fb.group({
            body: ['', Validators.required],
            kind: ['', Validators.required],
            options: this.fb.array([this.fb.control({option: ""})]),
            required: false,
            canSelectMultiple: false,
            id: Math.random().toString().substring(2),
        })
    }


    addMcOption() {
        // add address to the list
        const control = this.question.get('options');
        control.push(this.fb.control({option: [""]}));
        this.questionData.emit(this.question.get('options').length);
        // window.console.log(this.question);
    }


    // addQuestion(kind: string) {
    //     switch (kind) {
    //         case "Radio":
    //             question = this.fb.group({
    //                 body: ['', Validators.required],
    //                 kind: [kind, Validators.required],
    //                 options: this.fb.array([]),
    //                 required: false,
    //                 canSelectMultiple: false,
    //                 number: questions.length + 1,
    //                 id: Math.random().toString().substring(2),
    //             }, { validator: Validators.compose([this.optionsHaveErrors, this.hasNoOptions.bind(this)]) })
    //             break;
    //         case "Drop-down":
    //             question = this.fb.group({
    //                 body: ['', Validators.required],
    //                 kind: [kind, Validators.required],
    //                 options: this.fb.array([]),
    //                 required: false,
    //                 number: questions.length + 1,
    //                 id: Math.random().toString().substring(2),
    //             }, { validator: Validators.compose([this.optionsHaveErrors, this.hasNoOptions.bind(this)]) });
    //             break;
    //         case "Short answer":
    //             question = this.fb.group({
    //                 body: ['', Validators.required],
    //                 kind: [kind, Validators.required],
    //                 options: this.fb.array([]),
    //                 required: false,
    //                 number: questions.length + 1,
    //                 id: Math.random().toString().substring(2),
    //             }, { validator: Validators.compose([this.optionsHaveErrors, this.hasNoOptions.bind(this)]) });
    //             break;
    //         case "Stars":
    //             question = this.fb.group({
    //                 body: ['', Validators.required],
    //                 kind: [kind, Validators.required],
    //                 options: this.fb.array([]),
    //                 upperLimit: 10,
    //                 required: false,
    //                 number: questions.length + 1,
    //                 id: Math.random().toString().substring(2),
    //             }, { validator: Validators.compose([this.optionsHaveErrors, this.hasNoOptions.bind(this)]) });
    //             break;
    //         case "Number":
    //             question = this.fb.group({
    //                 body: ['', Validators.required],
    //                 kind: [kind, Validators.required],
    //                 options: this.fb.array([]),
    //                 lowerLimit: 0,
    //                 upperLimit: 100,
    //                 required: false,
    //                 number: questions.length + 1,
    //                 id: Math.random().toString().substring(2),
    //             }, { validator: Validators.compose([this.optionsHaveErrors, this.hasNoOptions.bind(this)]) });
    //             break;
    //         default:
    //             return;
    //     }

}

