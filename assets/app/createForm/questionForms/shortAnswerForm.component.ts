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
    selector: 'sa-question-form',
    templateUrl: './shortAnswerForm.component.html',
    styleUrls: [
        './shortAnswerForm.component.scss'
    ],
})

export class ShortAnswerQuestionForm implements OnInit {
    @Input() questionType: string;
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
            kind: ['Short Answer', Validators.required],
            options: this.fb.array([]),
            required: false,
            id: Math.random().toString().substring(2),
        })
    }

    submitQuestion() {
        if (this.question.valid) {
            this.questionData.emit(this.question.value);
            this.question.reset();
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



