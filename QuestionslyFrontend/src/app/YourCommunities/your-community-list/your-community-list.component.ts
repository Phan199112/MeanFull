import { Component, OnInit, Input } from "@angular/core";
import { YourCommunitiesModel } from "../your-community.model";
import { Http } from "@angular/http";

@Component({
    selector: 'app-your-comm-list',
    templateUrl: './your-community-list.component.html',
    styleUrls: ['./your-community-list.component.scss']
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
                    //    window.console.log("communities", obj);
                    }


                    if (this.yourcommlist.length > 0) {
                        this.visible = true;
                    }

                } else {
                    this.visible = false;
                }
            })
            .catch(error => console.log("Error retrieving form: " + error));
    }
}