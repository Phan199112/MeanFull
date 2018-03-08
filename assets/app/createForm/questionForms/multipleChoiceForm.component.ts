import { Component, OnInit, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/observable/of';
import {FormBuilder, FormControl, FormArray, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../form.service";
import {UserService} from "../../user.service";
import {Router, ActivatedRoute} from "@angular/router";
import * as autoScroll from 'dom-autoscroller';
import {FlatpickrOptions} from 'ng2-flatpickr/ng2-flatpickr';
import { create } from 'domain';

@Component({
    selector: 'mc-question-form',
    templateUrl: './multipleChoiceForm.component.html',
    styleUrls: [
        './multipleChoiceForm.component.scss'
    ],
})

export class MultipleChoiceQuestionForm implements OnInit {
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
            kind: ['Multiple Choice', Validators.required],
            options: this.fb.array([]),
            required: false,
            canSelectMultiple: false,
            id: Math.random().toString().substring(2),
        })

        this.addMcOption();
    }

    // simulateTabPress() {
    //     var keyboardEvent = window.document.createEvent("KeyboardEvent");
    //     var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";


    //     keyboardEvent[initMethod](
    //         "keydown", // event type : keydown, keyup, keypress
    //         true, // bubbles
    //         true, // cancelable
    //         window, // viewArg: should be window
    //         false, // ctrlKeyArg
    //         false, // altKeyArg
    //         false, // shiftKeyArg
    //         false, // metaKeyArg
    //         13, // keyCodeArg : unsigned long the virtual key code, else 0
    //         0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    //     );
    //     document.dispatchEvent(keyboardEvent);
    // }



    addMcOption() {
        const control = this.question.get('options');
        control.push(this.createOption());
    }

    enterMcOption(f: any) {
        // add address to the list
        // window.console.log("Maybe works: ", f);
        const arrayControl = this.question.get('options') as FormArray;
        const lastGroup = arrayControl.at(arrayControl.length - 1) as FormGroup;
        const lastControl = lastGroup.get('option') as FormControl;
        // window.console.log("pre add: ", arrayControl.length, " last item: ", lastControl);
        const control = this.question.get('options');
        control.push(this.createOption());
        // this.simulateTabPress();

    }

    createOption(): FormGroup {
        return this.fb.group({
            option: ''
        });
    }

    toggleMultiple(isMultiple: string) {
        if (isMultiple === "Yes") {
            this.question.get('canSelectMultiple').setValue(true);
        } else {
            this.question.get('canSelectMultiple').setValue(false)
        }
    }

    submitQuestion() {
        if (this.question.valid) {
            this.questionData.emit(this.question.value);
            this.question.reset();
            this.createForm();
            this.clearArray();
            this.question.get('canSelectMultiple').setValue(false);
        }
    }


    clearArray() {
        const control = <FormArray>this.question.controls['options'];
        let i=0;
        while (i<control.length) {
            control.removeAt(i)
            i++;
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
        window.console.log("i: ", i, "item at i: ", arrayControl.at(i));

        const lastGroup = arrayControl.removeAt(i);
    }

    /*
  Function to carry out the actual PUT request to S3 using the signed request from the app.
*/
    uploadFile(file, signedRequest, url, question) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.pics[question.get("id").value] = url;
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
    getSignedRequest(file, question) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    this.uploadFile(file, response.signedRequest, response.url, question);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }

}

