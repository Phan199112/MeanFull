import { Component, OnInit, OnChanges, ViewChildren, QueryList, Input, Output, EventEmitter, Inject } from '@angular/core';
import 'rxjs/add/observable/of';
import {FormBuilder, FormControl, FormArray, FormGroup, Validators} from "@angular/forms";
import {FormService} from '../../form.service';
import {Router, ActivatedRoute} from '@angular/router';
// import { create } from 'domain';

import * as $ from 'jquery';

@Component({
    selector: 'app-mc-question-form',
    templateUrl: './multiple-choice-form.component.html',
    styleUrls: [
        './multiple-choice-form.component.scss'
    ],
    providers: [FormService]
})

export class MultipleChoiceFormComponent implements OnInit, OnChanges {
    @Input() questionType: string;
    @Input() qLength: number;
    @Input() getData: boolean;
    @Input() updateData: any;
    @Output() questionData: EventEmitter<Object> = new EventEmitter<Object> ();
    @Output() outputUpdateData: EventEmitter<Object> = new EventEmitter<Object> ();

    question: any; // FormGroup usually
    updateView = false;
    errors: any = {
        question: false,
        choices: false
    };

    @ViewChildren('imgTooltipCtrl') imgTooltipCtrls;
    @ViewChildren('imgTooltipToggle') imgTooltipToggles;

    constructor(
        private fb: FormBuilder,
        private formService: FormService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        if (this.updateData && this.updateData.kind !== "Multiple Choice") {
            this.updateData = null;
        }
        this.createForm();
    }

    ngOnChanges() {
        if (this.updateData) {
            this.createForm();
        }
        
        if (this.getData) {
            console.log('called');
            
            this.submitQuestion();
        }
    }

    createForm() {
        if (this.updateData) {
            this.updateView = true;


            this.question = this.fb.group({
                kind: ['Multiple Choice', Validators.required],
                options: this.fb.array([]),
                required: this.updateData.required,
                number: this.updateData.number,
                pic: this.updateData.pic,
                canSelectMultiple: this.updateData.canSelectMultiple,
                id: this.updateData.id
            });

            const control = this.question.get('options');

            for (let i = 0; i < this.updateData.options.length; i++) {
                (<FormArray>control).push(this.createOption(this.updateData.options[i].body));
            }

        } else {
            this.question = this.fb.group({
                kind: ['Multiple Choice', Validators.required],
                options: this.fb.array([]),
                required: true,
                number: this.qLength,
                pic: '',
                canSelectMultiple: false,
                id: Math.random().toString().substring(2),
            });
            this.addMcOption();

        }

    }



    addMcOption() {
        const control = this.question.get('options');
        (<FormArray>control).push(this.createOption());
    }

    enterMcOption(f: any) {
        if (f.value == '') {
            return;
        }
        const arrayControl = this.question.get('options') as FormArray;
        const lastGroup = arrayControl.at(arrayControl.length - 1) as FormGroup;
        const lastControl = lastGroup.get('option') as FormControl;
        const control = this.question.get('options');
        (<FormArray>control).push(this.createOption());
        window.setTimeout(() => { $('#focusLastBtn').click();}, 90);
    }

    focusLast(f: any) {
        f.focus();
    }


    createOption(val: string = ""): FormGroup {
        return this.fb.group({
            body: [val, [Validators.required, Validators.minLength(1)]]
        });
    }

    toggleMultiple(isMultiple: string) {
        if (isMultiple === "Yes") {
            this.question.get('canSelectMultiple').setValue(true);
        } else {
            this.question.get('canSelectMultiple').setValue(false)
        }
    }

    toggleRequried(isRequired: string) {
        if (isRequired === "Yes") {
            this.question.get('required').setValue(true);
        } else {
            this.question.get('required').setValue(false)
        }
    }

    purgeForm() {
        var arrayControl = this.question.get('options') as FormArray;
        var lastGroup = arrayControl.at(arrayControl.length - 1) as FormGroup;
        var lastControl = lastGroup.get('body') as FormControl;


        this.question.markAsPristine();
        this.question.markAsUntouched();
        this.question.updateValueAndValidity();

        while (1 !== arrayControl.length) {
            arrayControl.removeAt(0);
        }

        lastControl.setValue('');
        this.question.get('canSelectMultiple').setValue(false);
        this.question.get('pic').setValue("");
        this.question.get('id').setValue(Math.random().toString().substring(2));
    }

    submitQuestion() {

        //Remove empty option at end if more than 2 choices entered to make choices valid
        if ((<FormArray>this.question.get('options')).length > 2) {
            const cont = this.question.get('options') as FormArray;
            var lg = cont.at(cont.length - 1) as FormGroup;
            if (!lg.value.body)  this.removeOption(cont.length-1);
        }



        console.log(this.question.valid, (<FormArray>this.question.get('options')).length);
        if (this.question.valid && (<FormArray>this.question.get('options')).length > 1) {
            console.log('In here');
            
            this.errors.question = false;
            this.errors.choices = false;

            const empty = /^\s*$/;

            var arrayControl = this.question.get('options') as FormArray;
            var lastGroup = arrayControl.at(arrayControl.length - 1) as FormGroup;
            var lastControl = lastGroup.get('body') as FormControl;


            if (arrayControl.length === 1 && empty.test(lastControl.value)) return;

            for(let i=0; i<  arrayControl.length; i++) {
                let group = arrayControl.at(i) as FormGroup;
                let control = group.get('body') as FormControl;
                if (empty.test(control.value)) this.removeOption(i);
            }

            if (this.updateView) {
                this.outputUpdateData.emit(this.question.value);
                this.updateView = false;
                this.updateData = null;
                this.createForm();

            } else {
                
                this.questionData.emit(this.question.value);
            }

            this.purgeForm();
        } else {
            this.errors.choices = !this.question.get('options').valid;

            if ((<FormArray>this.question.get('options')).length < 2) {
                this.errors.choices = true;
            }

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

    removeOption(i: number) : void {
        const arrayControl = this.question.get('options') as FormArray;
        const lastGroup = arrayControl.removeAt(i);
        // window.console.log("i: ", i, "item at i: ", arrayControl.at(i));
    }

    /*
  Function to carry out the actual PUT request to S3 using the signed request from the app.
*/
    uploadFile(file, signedRequest, url) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.question.get('pic').setValue(url);
                } else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    getSignedRequest(file) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    this.uploadFile(file, response.signedRequest, response.url);
                } else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }


    onPicChange($event) {
        const file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    }

    setPicUrl(url) {
        this.question.get('pic').setValue(url);
    }

}
