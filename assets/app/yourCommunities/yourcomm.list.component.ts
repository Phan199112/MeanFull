import { Component, OnInit, Input } from "@angular/core";
import { YourCommunitiesModel } from "./yourcomm.model";
import { Http, Response, Headers } from "@angular/http";

@Component({
    selector: 'yourcomm-list',
    templateUrl: './yourcomm.list.component.html',
    styleUrls: ['./yourcomm.list.component.scss']
})
export class YourCommunityListComponent implements OnInit {
    yourcommlist: YourCommunitiesModel[] = [];
    data: Object[];
    visible: boolean = false;

    @Input() link: string;

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.http.get(`/community/mylist`).toPromise()
            .then(res => {
                if (res.json().status == 1) {
                    this.data = res.json().data;

                    for (let obj of this.data) {
                        this.yourcommlist.push(new YourCommunitiesModel(obj, this.link));
                    }

                    if (this.yourcommlist.length > 0) {
                        this.visible = true;
                    }

                } else {
                    this.visible = false;
                }
            })
            .catch(error => alert("Error retrieving form: " + error));
    }
}