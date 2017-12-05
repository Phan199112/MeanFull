import { Component, OnInit } from "@angular/core";
import { FeedForm } from "./feed.form.model";
import { Http, Response, Headers } from "@angular/http";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {UserService} from "../user.service";

@Component({
    selector: 'feed-page',
    templateUrl: './feed.page.component.html',
    styleUrls: ['./feed.page.component.scss'],
    providers: [UserService]
})
export class FeedPageComponent implements OnInit  {
    loggedin: boolean = false;

    constructor(private http: Http, private userService: UserService) {
    }

    ngOnInit() {
        this.userService.afterLoginCheck().then(data => {
            if (data != 0) {
                this.loggedin = true;
            }
        });
    }

}