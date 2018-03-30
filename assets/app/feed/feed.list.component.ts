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
    @Input() emptyMessage: string = "Retrieving Data...";
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

<<<<<<< HEAD
            this.refreshFeed();
        });

    }

    ngOnChanges() {
        this.refreshFeed();
    }


    refreshFeed() {
        this.http.post(`/forms/feed`, { tag: this.tag, user: this.userinfo, topsurvey: this.formselected, comm: this.comminfo, category: this.category }).toPromise()
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
<<<<<<< HEAD
                        //window.console.log("pre feedform:", obj);;
=======
                        // window.console.log("pre feedform:", obj);;
>>>>>>> ff12f5c0971fab2cc32363f5cc98618dd5bfab2d
                        this.feedlist.push(new FeedForm(obj));
=======
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
                            window.console.log("pre feedform:", obj);;
                            this.feedlist.push(new FeedForm(obj));
                        }

                        if (this.feedlist.length == 0) this.emptyMessage = "No questions have been asked yet"
>>>>>>> b02fd5a5687e4782838096bfedc3998fb2e8c2a0
                    }
                })
                .catch(error => alert("Error retrieving form: " + error));
        });
        
    }
}