import { Component, OnInit, OnDestroy } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/observable/of';
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../form.service";
import {UserService} from "../user.service";
import {Router, ActivatedRoute} from "@angular/router";
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import * as autoScroll from 'dom-autoscroller';
import {FlatpickrOptions} from 'ng2-flatpickr/ng2-flatpickr';

@Component({
    selector: 'create-form',
    templateUrl: './createForm.component.html',
    styleUrls: ['./createForm.component.scss'],
    providers: [FormService, UserService]
})
export class CreateFormComponent implements OnInit, OnDestroy {
    questionnaire: FormGroup;
    kinds: string[] = ["Radio", "Checkboxes", "Drop-down", "Short answer", "Paragraph"];
    edit: boolean = false;
    activeQuestion: string;
    autoScroll: any;
    pics: Object = {};
    timePickerConfig: FlatpickrOptions;
    datePickerConfig: FlatpickrOptions;
    reject: boolean = false;
    typeevent: boolean = false;

    constructor(
        private fb: FormBuilder,
        private http: Http, 
        private formService: FormService, 
        private router: Router,
        private route: ActivatedRoute,
        private dragulaService: DragulaService,
        private userService: UserService
    ) {
        this.dragulaService.drop.subscribe(args => {
            this.questionnaire.get("questions").controls.forEach((q,i) => {
                q.patchValue({number: i + 1});
            });
        });
        this.dragulaService.drag.subscribe(args => {
            if (!this.autoScroll) {
                this.autoScroll = autoScroll([window, document.body], {margin: 50, autoScroll: () => this.dragulaService.bags[0].drake.dragging});
            }
            this.activeQuestion = args[1].dataset.id;
        });
    }

    ngOnInit() {
        if (this.userService.getLoggedin() === true) {
            this.route.queryParams.subscribe(params => {
                if (params.edit) {
                    this.edit = true;
                }

                if (params.event) {
                    this.typeevent = true;

                } else {
                    this.typeevent = false;
                }

                this.createForm();
            });
        } else {
            this.reject = true;
        }
    }

    ngOnDestroy() {
        if (this.autoScroll) {
            this.autoScroll.destroy();
        }
    }

    createForm() {
        //
        let defaultExpDate = new Date();
        defaultExpDate.setHours(23);
        defaultExpDate.setMinutes(59);

        if (this.edit) {
            let prevData = this.formService.getData();
            this.typeevent = prevData.typeevent;
        }

        this.timePickerConfig = {
            enableTime: true,
            noCalendar: true,
            altInput: true,
            altInputClass: 'form-control',
            defaultDate: defaultExpDate,
            dateFormat: 'h:i K'
        };

        this.datePickerConfig = {
            altInput: true,
            altInputClass: 'form-control',
            defaultDate: defaultExpDate
        };

        this.questionnaire = this.fb.group({
            title: '',
            description: '',
            hashtags: null,
            anonymous: false,
            public: true,
            resultsPublic: true,
            sharedWithCommunities: null,
            sharedWithUsers: null,
            expires: false,
            typeevent: this.typeevent,
            expireTime: defaultExpDate,
            expireDate: defaultExpDate,
            questions: this.fb.array([])
        });

        this.questionnaire.get('anonymous').valueChanges.subscribe(data => {
            if (data) {
                this.isAnonymous = true;
                this.questionnaire.get('public').setValue(true);
            } else {
                this.isAnonymous = null;
            }
        });
        
        if (this.edit) {
            let data = this.formService.getData();
            for (let key of Object.keys(data)) {
                if (key !== "questions") {
                    let control = this.questionnaire.get(key);
                    if (control) {
                       control.setValue(data[key]);
                    }
                }
            }
            for (let question of data.questions) {
                question.options = this.fb.array(question.options.map(option => this.fb.group(option)));
                if (question.pic) {
                    this.pics[question.id] = question.pic;
                }
                this.questionnaire.controls["questions"].push(this.fb.group(question));
            }
        } else {
           this.addQuestion();
        }
    }

    onPicChange(question, $event) {
        const file = $event.target.files[0];
        console.log(file);
        if(file == null){
            return alert('No file selected.');
        }
        this.getSignedRequest(file, question);
    }

    addQuestion() {
        let questions = this.questionnaire.controls.questions;
        questions.push(this.fb.group({
            body: ['', Validators.required],
            kind: ['', Validators.required],
            options: this.fb.array([]),
            required: false,
            number: questions.length + 1,
            id: Math.random().toString().substring(2)
        }, {validator: Validators.compose([this.optionsHaveErrors, this.hasNoOptions])}));
        this.questionnaire.wasChecked = false;
    }

    deleteQuestion(i) {
        this.questionnaire.get("questions").removeAt(i);
    }

    getInputType(question) {
        switch(question.get("kind").value) {
            case "Radio":
                return "radio";
            case "Checkboxes":
                return "checkbox";
        }
    }

    deleteOption(question, i) {
        question.get("options").removeAt(i);
    }

    isInvalid(control) {
        return control.invalid && control.touched;
    }

    optionsHaveErrors(input) {
        let errors = null;
        for (let option of input.controls.options.controls) {
            if (option.controls.body.errors) {
                errors = option.controls.body.errors;
            }
        }
        return errors;
    }

    hasNoOptions(input) {
        let kind = input.get('kind').value;
        if ((kind === "Radio" || kind === "Checkboxes" || kind === "Drop-down") && input.controls.options.length === 0) {
            return {noOptions: true};
        } else {
            return null;
        }
    }

    optionIsUnique(input) {
        let error = null;
        if (input && input.value && input.parent && input.parent.parent) {
            for (let option of input.parent.parent.value) {
                if (input.value == option.body) {
                    error = {duplicateOption: true};
                }
            }
        }
        return error;
    }

    addOption(question) {
        question.get("options").push(this.fb.group({
            body: ["", Validators.compose([this.optionIsUnique, Validators.required])]
        }));
        this.questionnaire.wasChecked = false;
    }

    transformHashtag(value) {
        if (value !== null && typeof value === 'object') {
            value = value.value;
        }
        if (value[0] === "#") {
            value = value.substring(1);
        }
        return Observable.of({
            display: `#${value}`, 
            value: value
        });
    }

    transformName(x) {
        let value, display;
        if (x !== null && typeof x === 'object') {
            value = x.value;
            display = x.display;
            return Observable.of({
                display: display,
                value: value
            });
        } else {
            return Observable.of({
                display: x,
                value: x
            });
        }

    }

    observableSourceTag(keyword: any): Observable<any[]> {
        if (keyword) {
            return this.http.post('/search', {type: 'tag', keyword: keyword})
                .map(this.observableProcessRaw.bind(this))
                .catch(err => {
                    return [];
                });
        } else {
            return Observable.of([]);
        }
    }

    observableSourceCom(keyword: any): Observable<any[]> {
        if (keyword) {
            return this.http.post('/search', {type: 'comm', keyword: keyword})
                .map(this.observableProcessRaw.bind(this))
                .catch(err => {
                    return [];
                });
        } else {
            return Observable.of([]);
        }
    }

    observableSourceUser(keyword: any): Observable<any[]> {
        if (keyword) {
            return this.http.post('/search', {type: 'user', keyword: keyword})
                .map(this.observableProcessRaw.bind(this))
                .catch(err => {
                    return [];
                });
        } else {
            return Observable.of([]);
        }
    }

    observableProcessRaw(data) {
        if (data.json().status == 1) {
            let searchoutput = [];
            let results = data.json().results;
            console.log(results);
            for (let l=0; l < results.length; l++) {
                searchoutput.push(results[l]);
            }
            return searchoutput;
        } else {
            return [];
        }
    };

    focusTagInput(tagInput) {
        setTimeout(() => {
            tagInput.inputForm.input.nativeElement.focus();
        });
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
            this.submitForm();
        }
    }

    submitForm() {
        if (this.edit) {
            this.updateForm();
        } else {
            this.postForm();
        }
    }

    questionnaireData() {
        let data = this.questionnaire.value;

        if (this.pics) {
            for (let l=0; l < data.questions.length; l++) {
                if (Object.keys(this.pics).indexOf(data.questions[l].id) != -1) {
                    data.questions[l].pic = this.pics[data.questions[l].id];
                } else {
                    data.questions[l].pic = null;
                }
            }
        }

        for (let dateField of ['expireDate', 'expireTime']) {
            if (data[dateField] && data[dateField].length) {
                data[dateField] = data[dateField][0];
            }
        }
        
        for (let tagField of ['hashtags', 'sharedWith']) {
            if (data[tagField]) {
                data[tagField] = data[tagField].map(tag => tag.value);
            }
        }

        if (data.expires) {
            data.expireDate.setHours(data.expireTime.getHours());
            data.expireDate.setMinutes(data.expireTime.getMinutes());
            data.expireDate = data.expireDate.toString();
        } else {
            delete data.expireDate;
        }
        delete data.expireTime;
        
        return data;
    }

    postForm() {
        let date = new Date();

        this.http.post('/forms/create', this.questionnaireData()).toPromise()
            .then(response => {
                let formData = Object.assign(this.questionnaireData());
                formData.id = response.json().id;
                this.formService.setData(formData);
                this.router.navigate(['previewForm']);
            })
            .catch(error => alert("Error posting form: " + error));
    }

    updateForm() {
        let formData = this.formService.getData();
        let meta = {
            id: formData.id
        };
        let data = Object.assign(this.questionnaireData(), meta);

        console.log(data);

        this.http.put(`/forms/${data.id}`, data).toPromise()
            .then(response => {
                this.formService.setData(Object.assign(this.questionnaireData(), meta));
                this.router.navigate(['previewForm']);
            })
            .catch(error => alert("Error updating form: " + error));
    }

    /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    uploadFile(file, signedRequest, url, question){
        console.log("upload");
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    this.pics[question.get("id").value] = url;
                }
                else{
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
    getSignedRequest(file, question){
        console.log("sign");
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const response = JSON.parse(xhr.responseText);
                    this.uploadFile(file, response.signedRequest, response.url, question);
                }
                else{
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }
}
