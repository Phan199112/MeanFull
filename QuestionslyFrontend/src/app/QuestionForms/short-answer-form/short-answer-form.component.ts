import { Component, OnInit, OnDestroy, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
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
    selector: 'app-sa-question-form',
    templateUrl: './short-answer-form.component.html',
    styleUrls: [
        './short-answer-form.component.scss'
    ],
    providers: [FormService]

})

export class ShortAnswerFormComponent implements OnInit {
    @Input() questionType: string;
    @Input() qLength: number;
    @Input() updateData: any;
    @Output() questionData: EventEmitter<Object> = new EventEmitter<Object> ();
    @Output() outputUpdateData: EventEmitter<Object> = new EventEmitter<Object>();

    question: FormGroup;
    updateView: boolean = false;
    errors: any = {
        question: false,
    }

    @ViewChildren("imgTooltipCtrl") imgTooltipCtrls;
    @ViewChildren("imgTooltipToggle") imgTooltipToggles; 
    
    constructor(
        private fb: FormBuilder,
        private formService: FormService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        if (this.updateData && this.updateData.kind != "Short Answer") {
            this.updateData = null;
        }
        this.createForm();
    }

    ngOnChanges() {
        if (this.updateData) {
            this.createForm();
        }
    }

    // ngOnDestroy() {
    //     this.updateData = null;
    // }

    createForm() {

        if (this.updateData) {
            this.updateView = true;


            this.question = this.fb.group({
                body: [this.updateData.body, [Validators.required, Validators.minLength(1)]],
                kind: ['Short Answer', Validators.required],
                options: this.fb.array([]),
                required: this.updateData.required,
                number: this.updateData.number,
                pic: this.updateData.pic,
                id: this.updateData.id
            })
        } else {
            this.question = this.fb.group({
                body: ['', [Validators.required, Validators.minLength(1)]],
                kind: ['Short Answer', Validators.required],
                options: this.fb.array([]),
                required: true,
                number: this.qLength,
                pic: "",
                id: Math.random().toString().substring(2),
            })
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
            this.errors.question = false;

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
            this.errors.question = !this.question.get('body').valid
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
        this.question.get('body').setValue("");
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



