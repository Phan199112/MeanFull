import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
import { Http } from '@angular/http';
import { FeedFormModel } from '../Feed/feed-form.model';

import * as $ from 'jquery';

@Component({
    selector: 'app-mini-show-form',
    templateUrl: './mini-show-form.component.html',
    styleUrls: ['./mini-show-form.component.scss'],
})
export class MiniShowFormComponent implements OnInit, OnChanges {
    questionnaire: FormGroup;
    contracted = false;
    showFilters = false;
    startingTime: any;
    saIndexes: number[] = [];
    lastMcQuestionIndex = null;
    topTags: any;

    @Input() data: FeedFormModel;
    @Input() shortAnswers2: any;

    @Input() count: number;

    @Input() showSubmit: boolean;

    @Input() submissionfailed: boolean;

    @Input() submitted = false;

    @Input() expired = false;
    @Input() isMyPost = false;
    @Input() me: string; // Currently only used to determine if logged-in or not

    @Output() submitForm: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() toggleFilters: EventEmitter<boolean> = new EventEmitter<boolean>();





    constructor(private fb: FormBuilder, private http: Http) {}

    ngOnInit() {
        this.startingTime = Date.now();
        this.createForm();
    }

    ngOnChanges() {
        // Load short answer array and get index of questions that are short answers and put their index in an array
        if (this.data) {
            var qs = this.data.questions;
            this.saIndexes = [];

            qs.map((q,i) => {
                if (q.kind == "Short Answer") {
                    this.saIndexes.push(i);
                }
                if (q.kind == "Multiple Choice") {
                    this.lastMcQuestionIndex = i;
                }
            });
        }

    }

    getShortAnswerResponses() {
        this.http.post('/forms/shortAnswerResponses', {})
            // Display the top tags + their counts
            .toPromise()
            .then(res => {
                let tags = res.json().data;
                for (let i = 0; i < tags.length; i++) {
                    let t = tags[i];
                    this.topTags.push(t.tag + " (" + t.count + ")");
                    // this.topTags.push(t.tag);
                }
            });
    }

    createForm() {
        //
        let tempf = function(x) {
            return {label: x.label, body: x.body};
        };
        //
        let questions = [];

        for (let question of this.data.questions) {
            let groupObject = {
                body: question.body,
                label: question.label,
                kind: question.kind,
                number: question.number,
                answer: null,
                answerAnonymously: null,
            };
            if (question.kind === 'Multiple Choice' && question.canSelectMultiple) {
                    groupObject.answer = {};
                    for (let option of question.options) {
                        groupObject.answer[option.label] = false;
                    }
                    if (question.required) {
                        groupObject.answer = this.fb.group(groupObject.answer, {validator: this.checkboxesRequired});
                    } else {
                        groupObject.answer = this.fb.group(groupObject.answer);
                    }

            } else if (question.kind === 'Rank') {
                groupObject.answer = question.options.map(option => tempf(option));
                groupObject.answer = this.fb.array(groupObject.answer);
            } else if (question.kind === 'Rating') {
                groupObject.answer = 0;
                if (question.required) {
                    groupObject.answer = [groupObject.answer, Validators.required];
                }
            } else if (question.kind === 'Matrix') {
                groupObject.answer = {};
                for (let row of question.rows) {
                    groupObject.answer[row] = "";
                    if (question.required) {
                        groupObject.answer[row] = [groupObject.answer[row], Validators.required];
                    }
                }
                groupObject.answer = this.fb.group(groupObject.answer);
            } else { // Short Answer or Multiple Choice
                groupObject.answer = "";
                if (question.kind === 'Short Answer') {
                    groupObject.answerAnonymously = false;
                }
                if (question.required) {
                    groupObject.answer = [groupObject.answer, Validators.required];
                }
            }
            questions.push(this.fb.group(groupObject));
        }
        this.questionnaire = this.fb.group({questions: this.fb.array(questions)});
    }

    checkboxesRequired(input) {
        let somethingIsChecked = false;

        for (let option of Object.keys(input.controls)) {
            if (input.get(option).value) {
                somethingIsChecked = true;
            }
        }

        if (!somethingIsChecked) {
            return {required: true};
        } else {
            return null;
        }
    }

    isInvalid(questionIndex) {
        const control = (this.questionnaire.controls.questions as FormArray).controls[questionIndex];
        return control.invalid && control.touched;
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
        this.setAsTouched(this.questionnaire);
        if (this.questionnaire.invalid) {
            (this.questionnaire as any).wasChecked = true;
        } else {
            this.submitIt();
        }
    }

    submitIt() {
        if (this.submitted) return;

        let value = Object.assign({}, this.questionnaire.value);
        for (let question of value.questions) {
            if (question.kind === 'Checkboxes') {
                question.answer = Object.keys(question.answer).filter(k => question.answer[k]);
            }
        }
        this.submitForm.emit(value);
    }

    setRating(rating: number, i: number) {
        (this.questionnaire.get('questions') as FormArray).controls[i].get('answer').setValue(rating);
    }

    toggleFilter() {
        const startingTime = this.startingTime;
        this.showFilters = !this.showFilters;
        this.toggleFilters.emit(this.showFilters);

        (window as any).mixpanel.track("Clicked Apply Filters", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "question": this.data.questions[0].body,
            "id": this.data.id,
            "timestamp": Date.now()
        });
    }

}
