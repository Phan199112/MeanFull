import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Http } from "@angular/http";
import { GoogleCharts } from 'google-charts';
import { FeedForm } from "./feed.form.model";

import * as $ from 'jquery';

@Component({
    selector: 'mini-show-form',
    templateUrl: './miniShowForm.component.html',
    styleUrls: ['./miniShowForm.component.scss'],
})

export class MiniShowFormComponent implements OnInit {
    questionnaire: FormGroup;
    contracted: boolean = false;
    showFilters: boolean = false;
    startingTime: any;
    saIndexes: number[] = [];

    @Input() data: FeedForm;
    @Input() shortAnswers: any;

    @Input() count: number;

    @Input() showSubmit: boolean;

    @Input() submissionfailed: boolean;

    @Input() submitted: boolean = false;

    @Input() expired: boolean = false;

    @Output() submitForm: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() toggleFilters: EventEmitter<boolean> = new EventEmitter<boolean>();





    constructor(private fb: FormBuilder, private http: Http,) {}

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
                    console.log('questsion', q.body, i);
                    this.saIndexes.push(i);
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
                console.log(tags);
                for (let i = 0; i < tags.length; i++) {
                    let t = tags[i];
                    this.topTags.push(t.tag + " (" + t.count + ")");
                    // this.topTags.push(t.tag);
                }
            });
    }

    returnIndex(i: number) : number {
        // This function feeds the right index to the short answer modal to load the question "See All" was clicked for
        var ind = this.saIndexes.findIndex(x => x === i);

        return ind;
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
                number: question.number
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
            } else {
                groupObject.answer = "";
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
        let control = this.questionnaire.controls.questions.controls[questionIndex];
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
            this.questionnaire.wasChecked = true;
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
        this.questionnaire.get('questions').controls[i].get('answer').setValue(rating);
    }
  

    toggleFilter() {
        var startingTime = this.startingTime;
        this.showFilters = !this.showFilters;
        this.toggleFilters.emit(this.showFilters);
        
        window.mixpanel.track("Clicked Apply Filters", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "question": this.data.questions[0].body,
            "id": this.data.id,
            "timestamp": Date.now()
        });
    }

}
