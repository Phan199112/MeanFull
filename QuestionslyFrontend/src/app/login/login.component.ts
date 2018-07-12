import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
declare var require: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    login: FormGroup;
    signup: FormGroup;
    pwdReset: FormGroup;
    profilePic: any;
    profilePicURL: string;
    status: boolean = true;

    // reset
    showForgotPwd: boolean = false;
    statusresetfailed: boolean = false;
    statusresetok: boolean = false;
    // signup
    signupstarted: boolean = false;
    signuppending: boolean = false;
    signupfailed: boolean = false;
    signupcompleted: boolean = false;

    constructor(
        private fb: FormBuilder,
        private http: Http,
        private router: Router,
        private userService: UserService
    ){
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
            email: ['', Validators.required],
            password: ['', Validators.required],
            // city: ['', Validators.required],
            // state: ['', Validators.required],
            // country: ['United States', Validators.required],
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
        console.log('PwdData: ', data);


        this.http.post('/users/pwdReset', data).toPromise()
             .then(k => {
                if (k.json().status == 1) {
                    this.statusresetok = true;
                } else {
                    this.statusresetfailed = true;
                    var resetField = () => {this.statusresetfailed = false};
                    window.setTimeout(resetField, 1800);
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
                    if (data.status == 1) {

                        // reload userservice
                        this.userService.acknowledgeLogin(data);
                        // navigate to feed
                        this.router.navigate(['/']);

                    } else {
                        this.status = false;
                    }

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

        var commToJoinWith = localStorage.getItem("comm");
        // var commlocalStorage.getItem("commVerification");

        // data
        localStorage.removeItem("comm");
        localStorage.removeItem("commVerification");

        let signupData = Object.assign({
            profilePic: this.profilePicURL,
            commToJoinWith: commToJoinWith
        }, this.signup.value);

        this.http.post('/users/signup', signupData).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    this.http.post('/users/login/local', {email: signupData.email, password: signupData.password})
                        .map((res: any) => res.json())
                        .subscribe(
                            (data) => {
                                // Handle response here
                                if (data.status == 1) {
                                    // reload userservice
                                    this.userService.acknowledgeLogin(data);
                                    // navigate to feed
                                    this.router.navigate(['/'])
                                        .then(function () {
                                            // reload the page
                                            location.reload(true);

                                            // Track signup
                                            (<any>window).mixpanel.track("User Signed Up", {
                                                    "email": signupData.email,
                                                    "name": `${signupData.name.firstname} ${signupData.name.lastname}`,
                                                    "timestamp": Date.now()
                                            });

                                        });

                                } else {
                                    this.status = false;
                                }
                            },
                            err => {
                                this.status = false;
                            }
                        );

                    // this.signupfailed = false;
                    // this.signuppending = false;
                    // this.signupcompleted = true;

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
