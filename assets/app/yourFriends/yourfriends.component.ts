import { Component, Input } from "@angular/core";
import { YourFriendsModel } from "./yourfriends.model";
import { Http, Response, Headers } from "@angular/http";

@Component({
    selector: 'your-friends-component',
    templateUrl: './yourfriends.component.html',
    styleUrls: ['./yourfriends.component.scss']
})
export class YourFriendsComponent {
    @Input() yourfriend: YourFriendsModel;

    constructor(private http: Http) {

    }

    inviteToComm() {
        this.http.post(`/community/invite`, {commid: this.yourfriend.link, userid: this.yourfriend.id}).toPromise()
            .then((result) => {
                if (result.json().status == 1) {
                    //console.log("accepted comm invite request");
                } else {
                    //console.log("failed comm invite request");
                }
            })
            .catch(function() {
                //console.log("failed comm share request (catch)");
            });

    }
}
