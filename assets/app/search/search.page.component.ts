import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'search-page',
    templateUrl: './search.page.component.html',
    styleUrls: ['./search.page.component.scss'],
    providers: [UserService]
})
export class SearchPageComponent implements OnInit  {
    loggedin: boolean = false;
    searchoutput: any = [];
    results: boolean = false;
    usersearchresultsList: any[] = [];
    communitysearchresultsList: any[] = [];
    tagsList: any[] = [];

    constructor(private http: Http, private userService: UserService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.userService.afterLoginCheck().then(data => {
            if (data != 0) {
                this.loggedin = true;
            }
        });

        this.route.params.subscribe(params => {
            this.results = false;
            const query = params['q'];

            this.http.post('/search/all', {keyword: query}).toPromise()
                .then(data => {
                    if (data.json().status == 1) {
                        this.usersearchresultsList = data.json().users;
                        this.communitysearchresultsList = data.json().communities;
                        this.tagsList = data.json().tags;
                        this.results = true;
                    } else {
                        this.results = false;
                    }
                });
        });



    }

}