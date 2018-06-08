import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbTabset} from "@ng-bootstrap/ng-bootstrap";
import { ShareService } from "../share.service";


let UsaSchools = require("../data/US-schools.json");

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    providers: [UserService]
})
export class SettingsComponent implements OnInit {
    profile: any = {};
    comm: any;
    profileFields: any[];
    passwordNotFB: boolean = false;
    passwordEdit: boolean = false;
    passwordChangeSuccess: boolean = false;
    passwordForm: FormGroup;
    activeTab: string = "general";
    generalQuestionsForm: FormGroup = new FormGroup({});
    profilepublic: Object = {form: {}, question: {}};
    notificationsettings: Object = {form: {}, question: {}};
    generalQuestions: any[];
    educationfield: Object = {edit: false, values: "", summary: ""};
    network: any[];
    notifications: any[];
    reject: boolean = false;
    picture: Object = {edit: false, formValue: null, current: null, newurl: null, success: false, failure: false};
    loaded: boolean = false;
    settingsSaved: boolean = false;

    @ViewChild('tabs')
    private tabs:NgbTabset;

    constructor(
        private http: Http,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private shareService: ShareService
    ) {}

    range(start, end) {
        return Array.from({length: (end - start)}, (v, k) => k + start);
    }

    ngOnInit() {
        this.userService.afterLoginCheck().then(userData => {
            if (userData) {
                this.retrieveData();
            } else {
                this.reject = true;
                window.setTimeout(() => { this.router.navigate(['/']); }, 1800);
            }
        });
    }

    retrieveData() {
        this.http
            .get(`/users/settings/info`).toPromise()
            .then(res => {
                if (res.json().status == 1) {
                    this.profile = res.json().data;
                    this.comm = res.json().comm;
                    this.network = res.json().network;
                    this.notifications = res.json().notifications;

                    // process picture
                    this.picture.current = this.profile.pic;

                    // process education
                    this.educationfield = {edit: false, values: this.profile.education, summary: ""};
                    if (this.educationfield.values != null) {
                        if (this.educationfield.values.undergraduateDegree == false && this.educationfield.values.mastersDegree == false) {
                            this.educationfield.summary = "";
                        } else if (this.educationfield.values.undergraduateDegree == true && this.educationfield.values.mastersDegree == false) {
                            this.educationfield.summary = "Undergraduate degree";
                        } else if (this.educationfield.values.undergraduateDegree == true && this.educationfield.values.mastersDegree == true) {
                            this.educationfield.summary = "Postgraduate degree";
                        }
                    }

                    //
                    this.passwordNotFB = (this.profile.facebookID == null);
                    this.constructProfileFields();
                    this.loaded = true;

                    this.passwordForm = this.fb.group({
                        current: ['', Validators.required],
                        new: ['', Validators.required],
                        confirmation: ['', Validators.required]
                    }, {
                        validator: this.passwordMatchValidator
                    });

                    // privacy stuff
                    this.profilepublic.form = this.fb.group({
                        public: [this.profile.public, Validators.required]});

                    this.profilepublic.question = {
                        body: "Would you like your profile to be visible to anyone visiting Questionsly?",
                        name: "public",
                        type: "radio",
                        options: [
                            {value: true, label: "Yes"},
                            {value: false, label: "No"}]
                    };

                    // notification settings
                    this.notificationsettings.form = this.fb.group({
                        summary: [this.profile.notifications.summary, Validators.required]
                    });

                    this.notificationsettings.question = [{
                        label: "Daily Summary",
                        body: "Would you like to receive emails summarizing your daily activity?",
                        name: "summary",
                        type: "radio",
                        options: [
                            {value: true, label: "Yes"},
                            {value: false, label: "No"}]
                    }];

                    // which page should be opened
                    this.route.params.subscribe(params => {
                        if (params['page'] == "notifications") {
                            this.tabs.select('notifications-tab');
                            this.activeTab = "notifications";
                        }
                    });

                    let currentDate = new Date();

                    let degreeQuestions = {
                        "Yes": [
                            {
                                body: "Enter or select the name of your school",
                                name: "school",
                                type: "dropdown",
                                options: UsaSchools.map(school => {
                                    return {label: school, value: school}
                                })
                            },
                            {
                                body: "Have you graduated?",
                                name: "graduated",
                                type: "radio",
                                options: [
                                    {value: true, label: "Yes"},
                                    {value: false, label: "No"}
                                ],
                                subQuestions: {
                                    "Yes": [
                                        {
                                            body: "When did you graduate",
                                            placeholder: "Select year",
                                            name: "graduatedYear",
                                            type: "dropdown",
                                            options: this.range(1950, currentDate.getFullYear()).map(year => {
                                                return {
                                                    value: year,
                                                    label: year
                                                }
                                            })
                                        }
                                    ],
                                    "No": [
                                        {
                                            body: "When do you expect to graduate",
                                            placeholder: "Select year",
                                            name: "expectToGraduate",
                                            type: "dropdown",
                                            options: this.range(2017, 2023).map(year => {
                                                return {
                                                    value: year,
                                                    label: year
                                                }
                                            })
                                        }
                                    ]
                                }
                            }
                        ]
                    };

                    this.generalQuestions = [
                        {
                            body: "Do you have a master's degree or are you enrolled in one?",
                            name: "mastersDegree",
                            type: "radio",
                            options: [
                                {value: true, label: "Yes"},
                                {value: false, label: "No"}
                            ],
                            subQuestions: {
                                "Yes": [
                                    {
                                        body: "Is it an MBA?",
                                        name: "mba",
                                        type: "radio",
                                        options: [
                                            {value: true, label: "Yes"},
                                            {value: false, label: "No"}
                                        ],
                                        subQuestions: Object.assign({}, degreeQuestions, {
                                            "No": [
                                                {
                                                    body: "What's your master's in (major)",
                                                    name: "major",
                                                    type: "text"
                                                }
                                            ]
                                        })
                                    }
                                ]
                            }
                        },
                        {
                            body: "Do you have an undergraduate's degree or are you enrolled in one?",
                            name: "undergraduateDegree",
                            type: "radio",
                            options: [
                                {value: true, label: "Yes"},
                                {value: false, label: "No"}
                            ],
                            subQuestions: degreeQuestions
                        }
                    ];

                } else {
                    this.reject = true;
                }
            })
            .catch(function() {
                this.reject = true;
            });
    }

    passwordMatchValidator(input) {
        let errors = null;
        if (input.get('new').value != input.get('confirmation').value) {
            errors = {passwordMismatch: true};
        }
        return errors;
    }

    getProfileFields() {
        let profile = this.profile;

        // check for blank location.
        if (profile.location == null) {
            profile.location = {city: "NA", state: "NA", country: "NA"};
        }
        if (profile.dob == null) {
            profile.dob = {year: "1900", month: "1", date: "1"};
        }

        return [
            {
                label: "Name",
                name: "name",
                value: `${profile.name.first} ${profile.name.last}`,
                edit: false,
                inputs: [
                    {
                        label: "First name",
                        name: "first",
                        type: "text",
                        value: profile.name.first
                    },
                    {
                        label: "Last name",
                        name: "last",
                        type: "text",
                        value: profile.name.last
                    }
                ]
            },
            {
                label: "Email",
                name: "email",
                value: profile.email,
                edit: false,
                inputs: [
                    {
                        name: "email",
                        type: "text"
                    }
                ]
            },
            {
                label: "Gender",
                name: "gender",
                value: profile.gender,
                edit: false,
                inputs: [
                    {
                        type: "radio",
                        name: "gender",
                        options: [
                            {
                                label: "Male",
                                value: "male",
                            },
                            {
                                label: "Female",
                                value: "female",
                            }
                        ]
                    }
                ]
            },
            {
                label: "DOB",
                name: "dob",
                value: (new Date(profile.dob.year, profile.dob.month, profile.dob.date)).toDateString(),
                edit: false,
                formatValue(value) {
                    value = value.dob;

                    //control wraps the value in array sometimes
                    if (value.length) {
                        value = value[0]
                    }

                    return {
                        dob: {
                            year: value.getFullYear(),
                            month: value.getMonth(),
                            date: value.getDate()
                        }
                    };
                },
                inputs: [
                    {
                        name: "dob",
                        type: "date",
                        config: {
                            defaultDate: new Date(profile.dob.year, profile.dob.month, profile.dob.date),
                            altInput: true,
                            altInputClass: 'form-control'
                        }
                    }
                ]
            },
            {
                label: "City",
                name: "city",
                value: profile.location.city,
                edit: false,
                formatValue: (value) => {
                    return {
                        location: Object.assign({}, this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: "city",
                        type: "text"
                    }
                ]
            },
            {
                label: "State",
                name: "state",
                value: profile.location.state,
                edit: false,
                formatValue: (value) => {
                    return {
                        location: Object.assign({}, this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: "state",
                        type: "text"
                    }
                ]
            },
            {
                label: "Country",
                name: "country",
                value: profile.location.country,
                edit: false,
                formatValue: (value) => {
                    return {
                        location: Object.assign({}, this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: "country",
                        type: "country"
                    }
                ]
            }
        ];
    }


    initProfileFields() {
        // check for blank location.
        this.profile.location = { city: "NA", state: "NA", country: "NA" };
        
        this.profile.dob = { year: "1900", month: "1", date: "1" };
    

        return [
            {
                label: "Name",
                name: "name",
                value: ` `,
                edit: false,
                inputs: [
                    {
                        label: "First name",
                        name: "first",
                        type: "text",
                        value: ""
                    },
                    {
                        label: "Last name",
                        name: "last",
                        type: "text",
                        value: ""
                    }
                ]
            },
            {
                label: "Email",
                name: "email",
                value: "",
                edit: false,
                inputs: [
                    {
                        name: "email",
                        type: "text"
                    }
                ]
            },
            {
                label: "Gender",
                name: "gender",
                value: "",
                edit: false,
                inputs: [
                    {
                        type: "radio",
                        name: "gender",
                        options: [
                            {
                                label: "Male",
                                value: "male",
                            },
                            {
                                label: "Female",
                                value: "female",
                            }
                        ]
                    }
                ]
            },
            {
                label: "DOB",
                name: "dob",
                value: (new Date().toDateString()),
                edit: false,
                formatValue(value) {
                    value = value.dob;

                    //control wraps the value in array sometimes
                    if (value.length) {
                        value = value[0]
                    }

                    return {
                        dob: {
                            year: value.getFullYear(),
                            month: value.getMonth(),
                            date: value.getDate()
                        }
                    };
                },
                inputs: [
                    {
                        name: "dob",
                        type: "date",
                        config: {
                            defaultDate: new Date(),
                            altInput: true,
                            altInputClass: 'form-control'
                        }
                    }
                ]
            },
            {
                label: "City",
                name: "city",
                value: "",
                edit: false,
                formatValue: (value) => {
                    return {
                        location: Object.assign({}, this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: "city",
                        type: "text"
                    }
                ]
            },
            {
                label: "State",
                name: "state",
                value: "",
                edit: false,
                formatValue: (value) => {
                    return {
                        location: Object.assign({}, this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: "state",
                        type: "text"
                    }
                ]
            },
            {
                label: "Country",
                name: "country",
                value: "",
                edit: false,
                formatValue: (value) => {
                    return {
                        location: Object.assign({}, this.profile.location, value)
                    };
                },
                inputs: [
                    {
                        name: "country",
                        type: "country"
                    }
                ]
            }
        ];

        // this.constructProfileFields();
    }



    constructProfileFields() {
        this.profileFields = this.getProfileFields();

        for (let field of this.profileFields) {
            let formGroupObj = {};
            for (let input of field.inputs) {
                if (input.value) {
                    formGroupObj[input.name] = [input.value, Validators.required];
                } else {
                    formGroupObj[input.name] = [field.value, Validators.required];
                }
            }
            field.formGroup = this.fb.group(formGroupObj);
        }
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

    isInvalid(control) {
        return control.invalid && control.touched;
    }

    checkSubmit(form, callback) {
        this.setAsTouched(form);
        if (form.invalid) {
            form.wasChecked = true;
        } else {
            callback();
        }
    }

    submitPasswordChange() {
        this.checkSubmit(this.passwordForm, () => {
            this.http.post(`/users/settings/changepwd`, {pwdsettings: this.passwordForm.value}).toPromise()
                .then(() => {
                    this.passwordEdit = false;
                    this.passwordChangeSuccess = true;
                })
                .catch(error => alert("Error submitting password change: " + error));
        });
    }

    submitField(field) {
        let data;

        this.checkSubmit(field.formGroup, () => {
            let formValue = field.formGroup.value;

            if (field.formatValue) {
                formValue = field.formatValue(formValue);
            }
            if (field.inputs.length > 1) {
                data = {};
                data[field.name] = formValue;
            } else {
                data = Object.assign({}, formValue);
            }

            this.http.put(`/users/settings/changesettings`, data).toPromise()
                .then(res => {
                    Object.assign(this.profile, data);
                    let newProfileFields = this.getProfileFields();
                    let index = newProfileFields.findIndex(p => p.name == field.name);
                    Object.assign(this.profileFields[index], newProfileFields[index]);
                    field.edit = false;
                })
                .catch(error => alert("Error submitting settings: " + error));
        });
    }

    submitPublicField() {
        this.checkSubmit(this.profilepublic.form, () => {
            let formValue = this.profilepublic.form.value;

            this.http.put(`/users/settings/changeprivacy`, formValue).toPromise()
                .then(res => {

                })
                .catch(error => alert("Error submitting settings: " + error));
        });
    }

    submitNotificationSettingsField() {
        const changeSaved = () => {this.settingsSaved = !this.settingsSaved};
        this.checkSubmit(this.notificationsettings.form, () => {
            let formValue = this.notificationsettings.form.value;
            

            this.http.put(`/users/settings/changenotifications`, formValue).toPromise()
                .then(res => {
                    if(res.json().status == 1) {
                        changeSaved();
                        window.setTimeout(changeSaved, 2000);
                    } else {
                    }
                })
                .catch(error => alert("Error submitting settings: " + error));
        });
    }

    postGeneralQuestions() {
        this.http.put('/users/settings/generalQuestions', {data: this.generalQuestionsForm.value}).toPromise()
            .then(res => {
                this.generalQuestionsForm.submitted = true;
                this.generalQuestionsForm.submittedValue = this.generalQuestionsForm.value;
                this.generalQuestionsForm.markAsPristine();
            })
            .catch((error) => alert("Error posting general questions data:" + error));
    }


    submitPicture() {
        this.http.put('/users/settings/changeprofilepicture', {data: this.picture.newurl}).toPromise()
            .then(res => {
                //
                if (res.json().status == 1) {
                    this.retrieveData();
                    this.picture.success = true;
                    this.picture.newurl = null;
                } else {
                    this.picture.failure = true;
                }
            })
            .catch((error) => alert("Error posting general questions data:" + error));
    }

    rejectPicture() {
        this.picture.edit = false;
    }


    //// accept or reject

    acceptConnectionRequest(x) {
        this.http.post(`/users/settings/acceptnetworkrequest`, {eventid: x}).toPromise()
            .then(() => {
                //
                this.retrieveData();
            })
            .catch(error => alert("Error: " + error));

    }

    deleteConnectionRequest(x, y) {
        this.http.post(`/users/settings/deletenetworkrequest`, {edgeid: x, eventid: y}).toPromise()
            .then(() => {
                this.retrieveData();
            })
            .catch(error => alert("Error: " + error));

    }

    deleteConnection(x) {
        this.http.post(`/users/settings/deletenetwork`, {edgeid: x}).toPromise()
            .then(() => {
                this.retrieveData();
            })
            .catch(error => alert("Error: " + error));
    }

    setAsSeen(x) {
        this.http.post('/events/seen', {id: x}).toPromise()
            .then(eventsdata => {
                this.retrieveData();
            })
            .catch(error => alert("Error " + error));
    }

    deleteNotification(x) {
        this.http.post('/events/delete', {id: x}).toPromise()
            .then(eventsdata => {
                this.retrieveData();
            })
            .catch(error => alert("Error " + error));
    }

    acceptCommunityRequest(x, asAdmin = false) {
        this.http.post(`/users/settings/acceptcommrequest`, {eventid: x, asadmin: asAdmin}).toPromise()
            .then(() => {
                this.retrieveData();
            })
            .catch(error => alert("Error: " + error));
    }

    deleteCommunityRequest(x) {
        this.http.post(`/users/settings/deletecommrequest`, {eventid: x}).toPromise()
            .then(() => {
                this.retrieveData();
            })
            .catch(error => alert("Error: " + error));

    }

    // picture upload code

    onProfilePicChange($event) {
        const file = $event.target.files[0];
        if(file == null){
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    }

    /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    uploadFile(file, signedRequest, url){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    this.picture.newurl = url;
                    this.shareService.set("profilePic", url);
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
    getSignedRequest(file){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const response = JSON.parse(xhr.responseText);
                    this.uploadFile(file, response.signedRequest, response.url);
                }
                else{
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }
}