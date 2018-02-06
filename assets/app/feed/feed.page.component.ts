import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'feed-page',
    templateUrl: './feed.page.component.html',
    styleUrls: ['./feed.page.component.scss'],
    providers: [UserService]
})
export class FeedPageComponent implements OnInit  {
    loggedin: boolean = false;
    emailconfirmfailed: boolean = false;
    emailconfirmok: boolean = false;
    completedform: boolean = false;

    constructor(private http: Http, private userService: UserService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.userService.afterLoginCheck().then(data => {
            if (data != 0) {
                this.loggedin = true;
            }
        });

        this.route.queryParams.subscribe(params => {
            if (params.message) {
                if (params.message == "emailconfirmfailed") {
                    this.emailconfirmfailed = true;

                } else if (params.message == "emailconfirmok") {
                    this.emailconfirmok = true;

                } else if (params.message == "completedform") {
                    this.completedform = true;
                }
            }
        });
    }

}