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
    public activeGroupId = '';
    public activeSubsection = '';

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
            HomePageComponent.shareTokenInfo = [this.route.snapshot.params.groupid, this.route.snapshot.queryParams.t];
            return;
        }

        this.route.params.subscribe(params => {
            this.activeGroupId = params.groupid;
            this.activeSubsection = params.subsection;
            console.log('Subsection: ', params.subsection);
            
        });
        this.route.queryParams.subscribe(params => {
            this.consumeGroupShareTokens([this.route.snapshot.params.groupid, this.route.snapshot.queryParams.t]);
        });
    }

    consumeGroupShareTokens(shareTokenInfo: any) {
        // Take the token from the URL if it's there; or fallback to the params we previously saved
        const tokenInfo = shareTokenInfo[1] ? shareTokenInfo : HomePageComponent.shareTokenInfo;
        HomePageComponent.shareTokenInfo = null;

        // Use token
        if (tokenInfo) {
            this.http
                .post('/group/accept', {commid: tokenInfo[0], shareToken: tokenInfo[1]}).toPromise()
                .then(response => {
                    const responseJson = response.json();

                    if (responseJson.status === 1) {
                        // Go to group and/or remove share token from URL
                        this.router.navigate(['/', responseJson.category, tokenInfo[0]], {queryParams: {}});
                    }
                })
                .catch (error => console.log(error));
        }
    }
}
