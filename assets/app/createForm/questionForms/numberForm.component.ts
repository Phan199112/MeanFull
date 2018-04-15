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
    @Input() qLength: number;
    @Input() updateData: any;
    @Output() questionData: EventEmitter<Object> = new EventEmitter<Object> ();
    @Output() outputUpdateData: EventEmitter<Object> = new EventEmitter<Object>();

    question: FormGroup;

    updateView: boolean = false;


    @ViewChildren("imgTooltipCtrl") imgTooltipCtrls;
    @ViewChildren("imgTooltipToggle") imgTooltipToggles; 
    
    constructor(
        private fb: FormBuilder,
        private formService: FormService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        if (this.updateData && this.updateData.kind != "Number") {
            this.updateData = null;
        }
        this.createForm();
        this.onChanges();
    }

    ngOnChanges() {
        if (this.updateData && this.updateData.kind != "Number") {
            this.updateData = null;
        }
        this.createForm();
    }

    validateNumber(event: any) {
        const newValue = Number(event.target.value);
        const name = event.target.name;
        const ub = this.question.get('upperBoundary').value;
        const lb = this.question.get('lowerBoundary').value;


        if (name === "lowerBoundary" && newValue >= ub) this.question.get('lowerBoundary').setValue(ub-1);
        if (name === "upperBoundary" && newValue <= lb) this.question.get('upperBoundary').setValue(lb + 1);
    }

    createForm() {

        console.log("num:", this.updateData, this.updateView)

        if (this.updateData) {
            this.updateView = true;


            this.question = this.fb.group({
                body: [this.updateData.body, Validators.required],
                kind: ['Number', Validators.required],
                options: this.fb.array([]),
                required: this.updateData.required,
                number: this.updateData.number,
                pic: this.updateData.pic,
                boundaries: this.updateData.boundaries,
                lowerBoundary: [this.updateData.lowerBoundary, Validators.required],
                upperBoundary: [this.updateData.upperBoundary, Validators.required],
                id: this.updateData.id
            })
        } else {
            this.question = this.fb.group({
                body: ['', Validators.required],
                kind: ['Number', Validators.required],
                options: this.fb.array([]),
                required: true,
                number: this.qLength,
                pic: "",
                boundaries: false,
                lowerBoundary: [0, Validators.required],
                upperBoundary: [100, Validators.required],
                id: Math.random().toString().substring(2),
            })
        }
    }

    onChanges(): void {
        this.question.get('lowerBoundary').valueChanges.subscribe(val => {
            // window.console.log(this.question.get('lowerBoundary').value);
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

    toggleRequried(isRequired: string) {
        if (isRequired === "Yes") {
            this.question.get('required').setValue(true);
        } else {
            this.question.get('required').setValue(false)
        }
    }

    submitQuestion() {
        if (this.question.valid) {
            if (this.updateView) {
                this.outputUpdateData.emit(this.question.value);
                this.updateView = false;
                this.updateData = null;
                this.createForm();
            } else {
                this.questionData.emit(this.question.value);
            }
            this.purgeForm();
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

    purgeForm() {
        this.question.markAsPristine();
        this.question.markAsUntouched();
        this.question.updateValueAndValidity();

        this.question.get('body').setValue('');
        this.question.get('boundaries').setValue(false);
        this.question.get('lowerBoundary').setValue('0');
        this.question.get('upperBoundary').setValue('100');
        this.question.get('pic').setValue("");
        this.question.get('id').setValue(Math.random().toString().substring(2));
    }

    uploadFile(file, signedRequest, url) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.question.get('pic').setValue(url);
                }
                else {
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
                }
                else {
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

