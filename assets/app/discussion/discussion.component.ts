import { Component, Input } from "@angular/core";
import { DiscussionModel } from "./discussion.model";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Component({
    selector: 'discussion-item',
    templateUrl: './discussion.component.html',
    styleUrls: ['./discussion.component.scss'],
})
export class DiscussionComponent {
    @Input() data: DiscussionModel;
    hide: boolean;

    constructor(private http: Http) {
    }

    deleteMessage() {
        // post and get response
        this.http.post('/discussions/delete', {id: this.data.id})
            .toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    this.hide = true;
                }
            });
    }

}