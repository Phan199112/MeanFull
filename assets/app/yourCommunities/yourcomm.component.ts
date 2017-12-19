import { Component, Input } from "@angular/core";
import { YourCommunitiesModel } from "./yourcomm.model";
import { Http } from "@angular/http";

@Component({
    selector: 'your-comm-component',
    templateUrl: './yourcomm.component.html',
    styleUrls: ['./yourcomm.component.scss']
})
export class YourCommunityComponent {
    @Input() comm: YourCommunitiesModel;

    constructor(private http: Http) {

    }

    shareInComm() {
        this.http.post(`/community/shareform`, {commid: this.comm.id, formid: this.comm.link}).toPromise()
            .then((result) => {
                if (result.json().status == 1) {
                    //console.log("accepted comm share request");
                } else {
                    //console.log("failed comm share request");
                }
                //

            })
            .catch(function() {
                //console.log("failed comm share request");
            });

    }
}