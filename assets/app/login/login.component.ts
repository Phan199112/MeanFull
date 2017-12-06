import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import {Router, ParamMap, ActivatedRoute} from "@angular/router";
let UsSchools = require("../data/US-schools.json");

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    login: FormGroup;
    signup: FormGroup;
    pwdReset: FormGroup;
    profilePic: any;
    profilePicURL: string;
    status: boolean = true;
    UsSchools: string[] = UsSchools;
    statusreset: boolean = true;
    signupstarted: boolean = false;
    signuppending: boolean = false;
    signupfailed: boolean = false;
    signupcompleted: boolean = false;

    constructor(
        private fb: FormBuilder,
        private http: Http,
        private router: Router,
        private route: ActivatedRoute
    ){

    }

    emailMatchValidator(input) {
        let errors = null;
        if (input.get('email') && input.get('confirmation') && input.get('email').value != input.get('confirmation').value) {
            errors = {emailMismatch: true};
        }
        return errors;
    }

    passwordMatchValidator(input) {
        let errors = null;
        if (input.get('password') && input.get('confirmation') && input.get('password').value != input.get('confirmation').value) {
            errors = {passwordMismatch: true};
        }
        return errors;
    }
    
    ngOnInit() {
        this.login = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.signup = this.fb.group({
            name: this.fb.group({
                firstname: ['', Validators.compose([Validators.minLength(2), Validators.required])],
                lastname: ['', Validators.compose([Validators.minLength(2), Validators.required])]
            }),
            email: this.fb.group({
                email: ['', Validators.required],
                confirmation: '',
            }, {
                validator: this.emailMatchValidator
            }),
            password: this.fb.group({
                password: ['', Validators.required],
                confirmation: ''
            }, {
                validator: this.passwordMatchValidator
            }),
            city: ['', Validators.required],
            state: ['', Validators.required],
            country: ['United States', Validators.required],
            gender: ['female', Validators.required],
            dob: this.fb.group({
                date : ['', Validators.required],
                month : ['', Validators.required],
                year: ['', Validators.required],
            }),
            schoolAffiliation: ''
        });

        this.pwdReset = this.fb.group({
            email: ['', Validators.required]
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

    checkSubmit(form, name) {
        this.setAsTouched(form);
        if (form.invalid) {
            form.wasChecked = true;
        } else {
            if (name == 'signup') {
                this.submitSignup();
            } else if (name == 'login') {
                this.submitLogin();
            } else if (name == 'pwdReset') {
                this.submitPwdReset();
            }
        }
    }

    onProfilePicChange($event) {
        const file = $event.target.files[0];
        if(file == null){
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    }

    submitPwdReset() {
        let data = this.pwdReset.value;

        this.http.post('/users/pwdReset', data).toPromise()
             .then(k => {
                if (k.data == 1) {
                    this.pwdReset.submitted = true;
                } else {
                    this.statusreset = false;
                }

            })
            .catch((error) => alert("Error submitting password reset: " + error));
    }

    submitLogin() {
        let data = this.login.value;

        this.http.post('/users/login/local', data)
            .map((res:any) => res.json())
            .subscribe(
                (data) => {
                    // Handle response here
                    let response = data.success;

                    if (response == true) {
                        this.router.navigateByUrl('/');
                    } else {
                        this.router.navigateByUrl('/login');
                    }
                    // force reload
                    location.reload();
                },
                err => {
                    this.status = false;
                }
            );
    }

    submitSignup() {
        // status
        this.signupstarted = true;
        this.signuppending = true;
        this.signupcompleted = false;
        this.signupfailed = false;

        // data
        let date = new Date();
        let signupData = Object.assign({
            createdAt: date.toString(),
            profilePic: this.profilePicURL
        }, this.signup.value);

        this.http.post('/users/signup', signupData).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    this.signupfailed = false;
                    this.signuppending = false;
                    this.signupcompleted = true;

                } else {
                    this.signuppending = false;
                    this.signupfailed = true;
                }
            })
            .catch(error => alert("Error posting signup data: " + error));
    }


    // picture upload code
    /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    uploadFile(file, signedRequest, url){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    this.profilePicURL = url;
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
