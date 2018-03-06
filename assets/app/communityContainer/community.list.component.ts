import { Component, OnInit, Input } from "@angular/core";
import { CommunityModel } from "./community.model";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'community-list',
    templateUrl: './community.list.component.html',
    styleUrls: ['./community.list.component.scss']
})
export class CommunityListComponent implements OnInit {
    communitylist: CommunityModel[] = [];
    randomlist: CommunityModel[] = [];
    data: Object[];
    randomlistdata: Object[];
    loggedin: boolean = false;

    @Input() user: String;

    constructor(private http: Http, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.http.post(`/community/list`, {user: this.user}).toPromise()
            .then(res => {
                if (res.json().status == 1) {
                    this.data = res.json().data;
                    this.randomlistdata = res.json().random;
                    this.loggedin = res.json().loggedin;

                    for (let obj of this.data) {
                        this.communitylist.push(new CommunityModel(obj));
                    }

                    if (this.randomlistdata != null) {
                        for (let obj of this.randomlistdata) {
                            this.randomlist.push(new CommunityModel(obj));
                        }
                    }
                    window.console.log(this.data);

                }

            })
            .catch(error => alert("Error retrieving form: " + error));
    }
}