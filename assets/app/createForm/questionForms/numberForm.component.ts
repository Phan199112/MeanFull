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
    selector: 'number-question-form',
    templateUrl: './numberForm.component.html',
    styleUrls: [
        './numberForm.component.scss'
    ],
})

export class NumberQuestionForm implements OnInit {
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
        this.onChanges();
    }

    createForm() {
        this.question = this.fb.group({
            body: ['', Validators.required],
            kind: ['Number', Validators.required],
            options: this.fb.array([]),
            required: false,
            boundaries: false,
            lowerBoundary: [0, Validators.required],
            upperBoundary: [100, Validators.required],
            id: Math.random().toString().substring(2),
        })
    }

    onChanges(): void {
        this.question.get('lowerBoundary').valueChanges.subscribe(val => {
            // this.question.get('lowerBoundary').setValue(val);
            window.console.log(this.question.get('lowerBoundary').value);
        });

        this.question.get('upperBoundary').valueChanges.subscribe(val => {
        });
    }


    toggleBoundaries(boundaries: string) {
        if (boundaries === "Yes") {
            this.question.get('boundaries').setValue(true);
        } else {
            this.question.get('boundaries').setValue(false)
        }
    }

    submitQuestion() {
        if (this.question.valid) {
            // window.console.log('Submitted!', this.question.value);
            this.questionData.emit(this.question.value);
            this.question.reset();
            this.question.get('lowerBoundary').setValue(0);
            this.question.get('upperBoundary').setValue(10);
            this.question.get('boundaries').setValue(true);
            
            
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

