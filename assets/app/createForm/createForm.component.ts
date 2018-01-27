import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/observable/of';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../form.service";
import {UserService} from "../user.service";
import {Router, ActivatedRoute} from "@angular/router";
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import * as autoScroll from 'dom-autoscroller';
import {FlatpickrOptions} from 'ng2-flatpickr/ng2-flatpickr';

@Component({
    selector: 'create-form',
    templateUrl: './createForm.component.html',
    styleUrls: [
        './createForm.component.scss'
    ],
    providers: [FormService, UserService],
    host: {
        '(document:click)': 'onDocClick($event)',
    }
})
export class CreateFormComponent implements OnInit, OnDestroy {
    questionnaire: FormGroup;
    kinds: string[] = ["Radio", "Checkboxes", "Drop-down", "Short answer", "Rank", "Stars"]; //, "Matrix"
    kindsWithOptions: string[] = ["Radio", "Checkboxes", "Drop-down", "Rank"];
    kindIcons: any = {
        'Radio': 'list.png',
        'Checkboxes': 'checkbox.png',
        'Drop-down': 'sort.png',
        'Rank': 'rank.png',
        'Short answer': 'textbox.png',
        'Matrix': 'matrix.png',
        'Stars': 'stars.png'
    };
    kindAliases: any = {
        'Radio': 'Multiple Choice',
        'Short answer': 'Text question'
    };
    edit: boolean = false;
    activeQuestion: string;
    autoScroll: any;
    pics: Object = {};
    timePickerConfig: FlatpickrOptions;
    datePickerConfig: FlatpickrOptions;
    reject: any = null;
    typeevent: boolean = false;
    focusedOption: number = 0;
    step: number = 1;
    updateform: boolean = false; // so when you go back to the previous page to correct something that it doesn't create a new database entry for the form
    published: boolean = false;
    shareLink: string = "";
    alphabeth: string = "abcdefghijklmnopqrstuvwxyz";
    @ViewChildren("imgTooltipCtrl") imgTooltipCtrls;
    @ViewChildren("imgTooltipToggle") imgTooltipToggles;         

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
        this.route.queryParams.subscribe(params => {
            if (params.edit) {
                this.edit = true;
            }

            this.typeevent = !!params.event;

            this.createForm();
        });       
        this.userService.afterLoginCheck().then(userData => {  
            if (userData != 0) {
                this.reject = false;
            } else {
                this.reject = true;
            }
        });
    }

    ngOnDestroy() {
        if (this.autoScroll) {
            this.autoScroll.destroy();
        }
    }

    onDocClick(event) {
        this.imgTooltipCtrls.forEach((ctrl, i) => {
            if (
                ctrl.isOpen() &&
                !document.querySelector(`#${ctrl._ngbTooltipWindowId}`).contains(event.target) && 
                event.target != this.imgTooltipToggles.toArray()[i].nativeElement
            )  {
                ctrl.close();
            }
        });
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
            hashtags: null,
            anonymous: false,
            sharedWithCommunities: null,
            sharedWithUsers: null,
            sharedWithFb: null,
            public: !this.typeevent,
            loginRequired: true,
            typeevent: this.typeevent,
            questions: this.fb.array([])
        });
        
        if (this.edit) {
            let data = this.formService.getData();
            console.log(data);
            for (let key of Object.keys(data)) {
                if (key !== "questions" && key !== "hashtags") {
                    let control = this.questionnaire.get(key);
                    if (control) {
                       control.setValue(data[key]);
                    }
                } else if (key === 'hashtags') {
                    let tagarray = [];
                    for (let tag of data['hashtags']) {
                        tagarray.push(this.transformHashtagArray(tag));
                    }
                    console.log(tagarray);
                    this.questionnaire.get('hashtags').setValue(tagarray);
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
           this.forceOptionRequired(0);
        }
    }

    forceOptionRequired(index) {
        let requiredControl = this.questionnaire.get('questions').get(index.toString()).get('required');
        requiredControl.setValue(true);
        requiredControl.disable();
    }

    onPicChange(question, $event) {
        const file = $event.target.files[0];
        if(file == null){
            return alert('No file selected.');
        }
        this.getSignedRequest(file, question);
    }

    setPicUrl(index, url) {
        this.pics[this.questionnaire.get('questions').get(index.toString()).get('id').value] = url;
        this.imgTooltipCtrls.toArray()[index].close();
    }

    addQuestion() {
        let questions = this.questionnaire.controls.questions;
        let question = this.fb.group({
            body: ['', Validators.required],
            kind: ['', Validators.required],
            options: this.fb.array([]),
            required: false,
            number: questions.length + 1,
            id: Math.random().toString().substring(2),
        }, {validator: Validators.compose([this.optionsHaveErrors, this.hasNoOptions.bind(this)])});
        questions.push(question);
        this.questionnaire.wasChecked = false;

        question.kindHasOptions = () => this.kindsWithOptions.includes(question.get('kind').value);
        question.isOneOf = (kinds) => kinds.includes(question.get('kind').value);

        question.get('kind').valueChanges.subscribe(kind => {
            if (this.kindsWithOptions.includes(kind)) {
                if (question.controls.options.length === 0) {
                    this.addOption(question);
                    this.addOption(question);
                    this.addOption(question);
                }
            } else {
                while (question.controls.options.length > 0) {
                    question.controls.options.removeAt(0);
                }
            }

            if (kind === 'Matrix') {
                question.addControl('columns', this.fb.array([]));
                question.addControl('rows', this.fb.array([]));
                this.addOneTo(question, 'columns');
                this.addOneTo(question, 'columns');                
                this.addOneTo(question, 'rows');
                this.addOneTo(question, 'rows');                                               
            } else {
                question.removeControl('columns');
                question.removeControl('rows');                              
                this.focusedOption = 0;               
            }
        });

        //enable first required control when adding second question
        if (questions.controls.length === 2) {
            this.questionnaire.get('questions').get('0').get('required').enable();
        }
    }

    deleteQuestion(i) {
        let questions = this.questionnaire.get("questions");
        questions.removeAt(i);
        if (questions.length === 1) {
            this.forceOptionRequired(0);
        }
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
        if (input.kindHasOptions && input.kindHasOptions() && input.controls.options.length === 0) {
            return {noOptions: true};
        } else {
            return null;
        }
    }

    optionIsUnique(input) {
        let error = null;
        if (input && input.value && input.parent && input.parent.parent) {
            for (let option of input.parent.parent.controls) {
                option = option.controls.body;
                if (input !== option && input.value == option.value) {
                    error = {duplicateOption: true};
                }
            }
        }
        return error;
    }

    valueIsUnique(input) {
        let error = null;
        if (input && input.value && input.parent) {
            for (let other of input.parent.value) {
                if (input.value == other) {
                    error = {duplicateValue: true};
                }
            }
        }
        return error;
    }

    inputHasError(error) {
        return (input) => this.isInvalid(input) && input.hasError(error);
    }

    addOption(question, focus = false) {
        question.get("options").push(this.fb.group({
            body: ["", Validators.compose([this.optionIsUnique, Validators.required])]
        }));
        this.questionnaire.wasChecked = false;
        if (focus) {
            this.focusedOption = question.get("options").controls.length - 1;
        }
    }

    addOneTo(question, collection) {
        question.get(collection).push(
            this.fb.control("", Validators.compose([this.valueIsUnique, Validators.required]))
        );
    }

    optionClicked(question, i) {
        if (i === question.get("options").length - 1) {
            this.addOption(question);
        }
    }

    fieldClicked(question, collection, i) {
        if (i === question.get(collection).length - 1) {
            this.addOneTo(question, collection);
        }
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

    transformHashtagArray(value) {
        if (value !== null && typeof value === 'object') {
            value = value.value;
        }
        if (value[0] === "#") {
            value = value.substring(1);
        }
        return {
            display: `#${value}`,
            value: value
        };
    }

    transformName(x) {
        let value, display;
        if (x !== null && typeof x === 'object') {
            value = x.value;
            display = x.display;
            if (value[0] === "@") {
                value = value.substring(1);
            }
            return Observable.of({
                display: `@${display}`,
                value: value
            });
        } else {
            return Observable.of({
                display: `@${x}`,
                value: x
            });
        }

    }

    observableSourceTag(keyword: any): Observable<any[]> {
        if (keyword) {
            if (keyword[0] === "#") {
                keyword = keyword.substring(1);
                if (keyword.length === 0) {
                    return Observable.of([]);
                }
            }
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
            if (keyword[0] === "@") {
                keyword = keyword.substring(1);
                if (keyword.length === 0) {
                    return Observable.of([]);
                }
            }
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
            if (keyword[0] === "@") {
                keyword = keyword.substring(1);
                if (keyword.length === 0) {
                    return Observable.of([]);
                }
            }
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
            for (let l=0; l < results.length; l++) {
                searchoutput.push(results[l]);
            }
            return searchoutput;
        } else {
            return [];
        }
    };


    acMatching() {
        return true;
    }

    focusTagInput(tagInput) {
        setTimeout(() => {
            tagInput.inputForm.input.nativeElement.focus();
        });
    }

    onMatrixDrag(event, matrix) {
        // if scrollable
        if (matrix.scrollWidth > matrix.clientWidth) {
            // prevent drag
            event.stopPropagation();
        }
        return true;
    }

    kindText(kind) {
        return this.kindAliases[kind] || kind;
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

    setAsUntouched(group) {
        group.markAsUntouched();
        for (let i in group.controls) {
            if (group.controls[i] instanceof FormControl) {
                group.controls[i].markAsUntouched();
            } else {
                this.setAsUntouched(group.controls[i]);
            }
        }
    }

    checkSubmit() {
        this.setAsTouched(this.questionnaire);
        if (this.questionnaire.invalid) {
            this.questionnaire.wasChecked = true;
        } else {
            if (!this.updateform) {
                this.submitForm();
            } else {
                this.updateForm();
            }
        }
    }

    checkPreview() {
        this.setAsTouched(this.questionnaire);
        if (this.questionnaire.invalid) {
            this.questionnaire.wasChecked = true;
        } else {
            var formdata = this.questionnaireData();
            this.formService.setPersistedData(formdata).then(() => window.open("/previewForm"));
        }
    }

    checkPublish() {
        this.setAsTouched(this.questionnaire);
        if (this.questionnaire.invalid) {
            this.questionnaire.wasChecked = true;
        } else {
            this.updateForm();
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
        let data = this.questionnaire.getRawValue();

        if (this.pics) {
            for (let l=0; l < data.questions.length; l++) {
                if (Object.keys(this.pics).indexOf(data.questions[l].id) != -1) {
                    data.questions[l].pic = this.pics[data.questions[l].id];
                } else {
                    data.questions[l].pic = null;
                }
            }
        }

        for (let i=0; i < data.questions.length; i++) {
            if (this.kindsWithOptions.indexOf(data.questions[i].kind) !== -1) {
                console.log(data.questions[i]);
                for (let j=0; j < data.questions[i].options.length; j++) {
                    data.questions[i].options[j].label = this.alphabeth[j];
                }
            }
        }
        
        for (let tagField of ['hashtags', 'sharedWith']) {
            if (data[tagField]) {
                data[tagField] = data[tagField].map(tag => tag.value ? tag.value : tag);
            }
        }
        
        return data;
    }

    postForm() {
        let formData = this.questionnaireData();
        this.http.post('/forms/create', formData).toPromise()
            .then(response => {
                formData.id = response.json().id;
                this.shareLink = `https://www.questionsly.com/takeForm/${formData.id}`;
                this.formService.setData(formData);
                this.step = 2;
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
                if (this.step === 1) {
                    this.step = 2;
                } else {
                    this.published = true;
                }
            })
            .catch(error => alert("Error updating form: " + error));
    }

    /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    uploadFile(file, signedRequest, url, question){
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
