import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    public whichStep = 'loading'; // Options: loading, noemail, noorg, noaccount, login
    private email: string;

    constructor(
        private cookieService: CookieService,
        private http: Http,
        private router: Router,
    ) { }

    ngOnInit() {
        this.email = this.cookieService.get('sign-in-email');

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

}
