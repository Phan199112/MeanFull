import {Component, Input, OnInit} from "@angular/core";
import { YourFriendsModel } from "./yourfriends.model";
import { Http, Response, Headers } from "@angular/http";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
    selector: 'your-friends-list-component',
    templateUrl: './yourfriends.list.component.html',
    styleUrls: ['./yourfriends.list.component.scss']
})
export class YourFriendsListComponent implements OnInit{
    yourfriends: YourFriendsModel[] = [];
    @Input() link: string;
    data: Object[];
    visible: boolean = false;

    constructor(private http: Http) {

    }

    ngOnInit() {
        this.http.get(`/users/yourlist`).toPromise()
            .then(res => {
                if (res.json().status == '1') {
                    this.data = res.json().data;

                    for (let obj of this.data) {
                        this.yourfriends.push(new YourFriendsModel(obj, this.link));
                    }

                    if (this.yourfriends.length > 0) {
                        this.visible = true;
                    }
                }


            })
            .catch(error => alert("Error retrieving form: " + error));
    }
}