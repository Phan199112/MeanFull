import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: []
})
export class HomePageComponent implements OnInit {
    static shareTokenInfo: any = null;

    public isLoggedIn: boolean;
    public viewGroupId = '';
    public viewFilter = '';

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private http: Http,
    ) { }

    ngOnInit() {
        this.isLoggedIn = this.userService.getUser() !== 0;
        if (!this.isLoggedIn) {
            // Save the share token in case user logs in and then comes back
            HomePageComponent.shareTokenInfo = this.getFixedQueryParams(this.route.snapshot.queryParams);
            return;
        }

        this.route.queryParams.subscribe(params => {
            params = this.getFixedQueryParams(params);
            this.viewGroupId = params.group;
            this.viewFilter = params.filter;

            this.consumeGroupShareTokens(params);
        });
    }

    consumeGroupShareTokens(queryParams: any) {
        // Take the token from the URL if it's there; or fallback to the params we previously saved
        const tokenInfo = queryParams.t ? queryParams : HomePageComponent.shareTokenInfo;
        HomePageComponent.shareTokenInfo = null;

        // Use token
        if (tokenInfo) {
            this.http
                .post('/group/accept', {commid: tokenInfo.group, shareToken: tokenInfo.t}).toPromise()
                .then(response => {
                    const responseJson = response.json();

                    if (responseJson.status === 1) {
                        // Pull token out of URL -- we are done with it
                        this.router.navigate(['/'], {queryParams: {group: queryParams.group, filter: queryParams.filter}});
                    }
                })
                .catch (error => console.log(error));
        }
    }

    // When pasting a URL with query params into the browser, we are getting:
    // {group: "XYZ;t=123"}
    // When we should be getting:
    // {group: "XYZ", t: "123"}
    getFixedQueryParams(queryParams: any) {
        if (queryParams.group && queryParams.group.indexOf(';t=') > 0) {
            return {
                group: queryParams.group.split(';t=')[0],
                t: queryParams.group.split(';t=')[1],
            };
        }
        return queryParams;
    }
}
