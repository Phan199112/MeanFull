import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    public whichStep = 'loading'; // Options: loading, noemail, noorg, noaccount, login
    public email: string;
    public emailDomain: string;
    public orgName: string;
    public loginPasswordIncorrect = false;

    profilePic: any;
    profilePicURL: string;

    noemailForm: FormGroup;
    loginForm: FormGroup;
    noaccountForm: FormGroup;

    constructor(
        private cookieService: CookieService,
        private http: Http,
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService,
    ) { }

    ngOnInit() {
        // Logged-in users shouldn't go through sign-in flow
        if (this.userService.getUser() !== 0) {
            this.router.navigate(['/']);
            return;
        }

        this.setEmail(this.cookieService.get('sign-in-email'));
        this.initAllForms();
        this.computeWhichStep();
    }

    computeWhichStep() {
        if (!this.email) {
            this.whichStep = 'noemail';
            return;
        }

        this.http.post('/users/status', {email: this.email}).toPromise()
        .then(response => {
            const responseJson = response.json();

            if (responseJson.status !== 1) {
                this.router.navigate(['/']);
                return;
            }

            this.orgName = (responseJson.orgExists ? responseJson.orgName : '');
            console.log('just set the name', this.orgName, responseJson);

            if (responseJson.userExists) {
                this.whichStep = 'login';
            } else if (responseJson.orgExists) {
                this.whichStep = 'noaccount';
            } else {
                this.whichStep = 'noorg';
            }
        })
        .catch (error => this.router.navigate(['/']));
    }

    initAllForms() {
        this.noemailForm = this.fb.group({
            email: ['', Validators.compose([Validators.email, Validators.required])],
        });

        this.loginForm = this.fb.group({
            password: ['', Validators.required],
        });

        this.noaccountForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: ['', Validators.required],
            gender: ['female', Validators.required],
        });
    }

    setEmail(email: string) {
        this.email = email;
        this.emailDomain = email.split('@')[1];
        this.cookieService.set('sign-in-email', this.email);
    }

    //
    // For noemail step
    //

    noemailFormSubmit() {
        this.noemailForm.controls['email'].markAsTouched();
        if (!this.noemailForm.invalid) {
            this.setEmail(this.noemailForm.controls['email'].value);
            this.computeWhichStep();
        }
    }

    joinInterestList(button) {
        this.http
            .post('/api/joinWaitingList', {email: this.email}).toPromise()
            .then(response => {
                document.getElementById('joinInterestList').innerHTML = 'Joined!';
            })
            .catch (error => this.router.navigate(['/']));
    }

    tryADifferentEmailAddress() {
        this.setEmail('');
        this.noemailForm.controls['email'].setValue('');
        this.noemailForm.controls['email'].markAsUntouched();
        this.computeWhichStep();
    }

    //
    // For noaccount step
    //

    noaccountSubmit() {
        this.noaccountForm.markAsTouched();

        if (!this.noaccountForm.invalid) {
            const signupData = Object.assign({
                email: this.email,
                name: {
                    firstname: this.noaccountForm.controls['firstName'].value,
                    lastname: this.noaccountForm.controls['lastName'].value,
                },
                profilePic: this.profilePicURL,
            }, this.noaccountForm.value);

            this.http
                .post('/users/signup', signupData).toPromise()
                .then(response => {
                    const responseJson = response.json();

                    if (responseJson.status === 1) {
                        this.http.post('/users/login/local', {email: signupData.email, password: signupData.password})
                            .map((res: any) => res.json())
                            .subscribe(
                                (data) => {
                                    if (data.status === 1) {
                                        this.userService.acknowledgeLogin(data);
                                        this.router.navigate(['/']).then(function () { /* location.reload(true); shouldn't be needed */ });
                                    } else {
                                        alert('Error, please try again');
                                    }
                                }
                            );
                    } else {
                        alert('Error, please try again');
                    }
                })
                .catch (error => alert('Error, please try again'));
        }
    }

    onProfilePicChange($event) {
        const file = $event.target.files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
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

    /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    uploadFile(file, signedRequest, url) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.profilePicURL = url;
                } else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }

    //
    // For login step
    //

    loginSubmit() {
        this.loginForm.controls['password'].markAsTouched();
        this.loginPasswordIncorrect = false;
        if (!this.loginForm.invalid) {
            this.http
                .post('/users/login/local', {email: this.email, password: this.loginForm.controls['password'].value}).toPromise()
                .then(response => {
                    const responseJson = response.json();

                    this.userService.acknowledgeLogin(responseJson);
                    this.router.navigate(['/']);
                })
                .catch (error => {
                    this.loginPasswordIncorrect = true;
                });
        }
    }

    forgotPassword() {
        alert('not implemented');
    }
}
