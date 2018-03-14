import { Component, OnInit, Input } from "@angular/core";
import { FeedForm } from "./feed.form.model";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'feed-list',
    templateUrl: './feed.list.component.html',
    styleUrls: ['./feed.list.component.scss']
})
export class FeedListComponent implements OnInit {
    feedlist: FeedForm[] = [];
    data: Object[];

    @Input() user: String;
    @Input() comm: String;
    @Input() pic: string;
    @Input() pictype: string;
    userinfo: String = null;
    comminfo: String = null;

    constructor(private http: Http, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const tag = params['tag'];
            const formselected = params['survey'];

            this.userinfo = this.user;
            this.comminfo = this.comm;

            this.http.post(`/forms/feed`, {tag: tag, user: this.userinfo, topsurvey: formselected, comm: this.comminfo}).toPromise()
                .then(res => {
                    if (res.json().status == 1) {
                        // clean current data list
                        var l = this.feedlist.length;
                        while (l--) {
                            this.feedlist.splice(l, 1);
                        }

                        // create new list
                        this.data = res.json().data;
                        for (let obj of this.data) {
                            this.feedlist.push(new FeedForm(obj));
                        }
                    }
                })
                .catch(error => alert("Error retrieving form: " + error));
        });
        
    }
}