import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
    getStartedForm: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cookieService: CookieService,
    ) { }

    ngOnInit() {
        this.getStartedForm = this.fb.group({
            email: ['', Validators.email],
        });
    }

    getStartedItsFree() {
        // Set the cookie and go to sign-in page, even if the email address is not given or is invalid.
        // This should be nicer than showing the user a red error message.

        if (this.getStartedForm.invalid) {
            this.cookieService.set('sign-in-email', '');
        } else {
            this.cookieService.set('sign-in-email', this.getStartedForm.controls['email'].value);
        }

        this.router.navigate(['/sign-in']);
    }
}
