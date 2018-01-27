import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { FeedForm } from "./feed.form.model";

@Component({
    selector: 'mini-show-form',
    templateUrl: './miniShowForm.component.html',
    styleUrls: ['./miniShowForm.component.scss']
})

export class MiniShowFormComponent implements OnInit {
    questionnaire: FormGroup;
    contracted: boolean = false;

    @Input()
    data: FeedForm;

    @Input()
    showSubmit: boolean;

    @Input()
    submissionfailed: boolean;

    @Input()
    submitted: boolean = false;

    @Input()
    expired: boolean = false;

    @Output()
    submitForm: EventEmitter<Object> = new EventEmitter<Object>();

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
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
            if (question.kind === 'Checkboxes') {
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
}
