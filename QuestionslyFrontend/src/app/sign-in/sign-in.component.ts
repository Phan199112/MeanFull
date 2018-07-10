import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    public whichStep = 'loading'; // Options: loading, noemail, noorg, noaccount, login
    private email: string;
    public emailDomain: string;

    noemailForm: FormGroup;

    constructor(
        private cookieService: CookieService,
        private http: Http,
        private router: Router,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
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
        this.http.post('/api/joinWaitingList', {email: this.email}).toPromise()
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
}
