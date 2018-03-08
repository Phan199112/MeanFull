import { Component, OnInit, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/observable/of';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../form.service";
import {UserService} from "../../user.service";
import {Router, ActivatedRoute} from "@angular/router";
import * as autoScroll from 'dom-autoscroller';
import {FlatpickrOptions} from 'ng2-flatpickr/ng2-flatpickr';

@Component({
    selector: 'rating-question-form',
    templateUrl: './ratingForm.component.html',
    styleUrls: [
        './ratingForm.component.scss'
    ],
})

export class RatingQuestionForm implements OnInit {
    @Output() questionData: EventEmitter<Object> = new EventEmitter<Object> ();
    question: FormGroup;
    temp: string[];
    
    constructor(
        private fb: FormBuilder,
        private formService: FormService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.temp = Array(5);
    }

    createForm() {
        this.question = this.fb.group({
            body: ['', Validators.required],
            kind: ['Rating', Validators.required],
            options: this.fb.array([]),
            required: false,
            scale: '5',
            id: Math.random().toString().substring(2),
        })
    }


    toggleLimit(newLimit: string) {
        if (newLimit == 5) {
            this.question.get('scale').setValue('5');
            this.temp = Array(5);
        } else {
            this.question.get('scale').setValue('10')
            this.temp = Array(10);
        }

        window.console.log("emitted: ", newLimit, " and value of form Multiple Option: ", this.question.get('scale').value)
    }

    submitQuestion() {
        if (this.question.valid) {
            // window.console.log('Submitted!', this.question.value);
            this.questionData.emit(this.question.value);
            this.question.reset();
            this.question.get('scale').setValue('5');            
        }
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

