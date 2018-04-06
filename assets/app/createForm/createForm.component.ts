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
    // host: {
    //     '(document:click)': 'onDocClick($event)',
    // }
})
// @Component({
//     selector: 'create-form',
//     templateUrl: './createForm.componentssss.html',
//     styleUrls: [
//         './createForm.componentssss.scss'
//     ],
//     providers: [FormService, UserService],
//     host: {
//         '(document:click)': 'onDocClick($event)',
//     }
// })
export class CreateFormComponent implements OnInit, OnDestroy {
    questionnaire: FormGroup;
    cool: string;
    kinds: string[] = ["Multiple Choice", "Short Answer", "Rating", "Number"]; //, "Rank", "Matrix", "Checkbox", "Stars", "Drop-down"
    kindsWithOptions: string[] = ["Multiple Choice", "Checkboxes", "Drop-down", "Rank"];
    kindIcons: any = {
        'Multiple Choice': 'list.png',
        'Checkboxes': 'checkbox.png',
        'Drop-down': 'sort.png',
        'Rank': 'rank.png',
        'Short Answer': 'textbox.png',
        'Matrix': 'matrix.png',
        'Stars': 'stars.png'
    };
    kindAliases: any = {
        'Multiple Choice': 'Multiple Choice',
        'Short Answer': 'Text question'
    };
    typeView: string;
    kind: string = null;
    questionData: Array<Object> = [];
    sortedQuestions: Observable<Array<Object>>;
    question: any = null;
    edit: boolean = false;
    activeQuestion: string;
    questionsSubmitted: number;
    autoScroll: any;
    pics: Object = {};
    temp: string[] = [];
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
    categoryList: Array<Object>;
    categorySettings: Object;


    
     

    constructor(
        private fb: FormBuilder,
        private http: Http, 
        private formService: FormService, 
        private router: Router,
        private route: ActivatedRoute,
        private dragulaService: DragulaService,
        private userService: UserService
    ) {
        this.questionsSubmitted = 0;
        this.typeView = "Multiple Choice";
    }

    toggleView(view: string) {
        this.typeView = view;
    }

    pushQuestionToList(res: object) {
        if (res.kind === "Rating") {
            let size = Number(res.scale);
            res.temp = Array(size);
        }

        if (res.kind === "Multiple Choice") {
            const space = /^\s*$/;
            res.options = res.options.filter(x => !space.test(x.body));
        }

        res.number = this.questionData.length;

        this.questionData.push(res);
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params.edit) this.edit = true;

            // this.typeevent = !!params.event;

            this.createForm();
        });       

        //checks user is logged in
        this.userService.afterLoginCheck().then(userData => {  
            if (userData != 0) {
                this.reject = false;
            } else {
                this.reject = true;
                window.setTimeout(() => { this.router.navigate(['/']); }, 2200);
            }
        });

        this.getSortedQuestions();

        this.categoryList = [
            { "id": 1, "itemName": "Automotive" },
            { "id": 2, "itemName": "Business" },
            { "id": 3, "itemName": "Cooking" },
            { "id": 4, "itemName": "Education" },
            { "id": 5, "itemName": "Entertainment" },
            { "id": 6, "itemName": "Fashion" },
            { "id": 7, "itemName": "Fitness" },
            { "id": 8, "itemName": "Health" },
            { "id": 9, "itemName": "Health" },
            { "id": 10, "itemName": "Home Improvement" },
            { "id": 11, "itemName": "Sports" },
            { "id": 12, "itemName": "Technology" },
        ];

        this.categorySettings = {
            singleSelection: false,
            text: "Select up to 4 Categories",
            classes: "filterDropdownText",
            badgeShowLimit: 4,
            limitSelection: 4,
            enableSearchFilter: true,
            enableCheckAll: false
        };    
    }

    ngOnDestroy() {
        if (this.autoScroll) {
            this.autoScroll.destroy();
        }
    }

    onItemSelect(item: any) {
        item = item.itemName;
    }
    OnItemDeSelect(item: any) {
    }

    getSortedQuestions() {

        let sArr = this.questionData.sort((a,b) => a.number > b.number));
        return sArr;
    }


    createForm() {
        //set expire date
        let defaultExpDate = new Date();
        defaultExpDate.setHours(23);
        defaultExpDate.setMinutes(59);

        //see if editing form...only for event type I believe
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

        //Creates whole questionnaire, not individual questions
        this.questionnaire = this.fb.group({
            title: '',
            hashtags: null,
            kind: "Multiple Choice",
            categories: [],
            anonymous: false,
            sharedWithCommunities: null,
            sharedWithUsers: null,
            sharedWithFb: null,
            public: true,
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
        //    this.addQuestion();
        //    this.forceOptionRequired(0);
        }
    }

    // forceOptionRequired(index) {
    //     let requiredControl = this.questionnaire.get('questions').get(index.toString()).get('required');
    //     requiredControl.setValue(true);
    //     requiredControl.disable();
    // }

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

    // addQuestion(kind: string) {
    //     let questions = this.questionnaire.controls.questions;

    //     //Create form group for individual question
        
    //     questions.push(question);
    //     this.questionsSubmitted++;
    //     this.questionnaire.wasChecked = false;


    //     //enable first required control when adding second question
    //     if (questions.controls.length === 2) {
    //         this.questionnaire.get('questions').get('0').get('required').enable();
    //     }
    // }

    deleteQuestion(i) {
        let questions = this.questionnaire.get("questions");
        questions.removeAt(i);
        if (questions.length === 1) {
            this.forceOptionRequired(0);
        }
    }

    getInputType(question) {
        switch(question.get("kind").value) {
            case "Multiple Choice":
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

        data.questions = this.questionData;
        

        for (let i=0; i < data.questions.length; i++) {
            if (this.kindsWithOptions.indexOf(data.questions[i].kind) !== -1) {
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
                    window.setTimeout(() => { this.router.navigate(['/']);}, 2000 )
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

    nextView() {
        this.step = 2;
    }

    prevView() {
        this.step = 1;
    }

    removeQuestion(i: number) {
        this.questionData.splice(i, 1);
        for (let j=i; j < this.questionData.length; j++) {
            this.questionData[j].number = this.questionData[j].number -1;
        }

        if (this.questionData.length === 1) this.questionData[0].required = true;
    }

    toggleRequired(i: number) {
        let last: number = 0;
        for (let j=0; j<this.getSortedQuestions()[j]; j++) {
            window.console.log("value", this.questionData[j].required);
            if (this.getSortedQuestions[j].required) {last++};
        }
        if (last === 1 && this.getSortedQuestions()[i].required) {
            // window.console.log("worked",last, this.questionData);
            return;
        } else {
            // window.console.log("failed", last, this.questionData);
            this.questionData[i].required = !this.questionData[i].required;
        }
        
    }

    toggleAuthor(anonymous: string) {
        this.questionnaire.get('anonymous').setValue(anonymous);
    }

    toggleAudience(audience: string) {
        this.questionnaire.get('public').setValue(audience);
    }

    toggleLogin(required: string) {
        this.questionnaire.get('loginRequired').setValue(required);
    }

    tester() {
        window.console.log(this.questionnaireData());
    }

    moveUp(i: number) {
        // Up meaning lowering the number, so higher up the list
        if (i == 0) return;
        let currentNum = this.questionData[i].number

        this.questionData[i].number = currentNum - 1;
        this.questionData[i-1].number = currentNum;



    }

    moveDown(i: number) {
        // Down meaning raising the number, so lower down the list
        let qdLength = this.questionData.length;
        if (i === (qdLength -1)) return;

        let currentNum = this.questionData[i].number

        this.questionData[i].number = currentNum + 1;
        this.questionData[i + 1].number = currentNum;
    }

}


