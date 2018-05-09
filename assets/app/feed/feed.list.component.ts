import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { FeedForm } from "./feed.form.model";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../user.service";


@Component({
    selector: 'feed-list',
    templateUrl: './feed.list.component.html',
    styleUrls: ['./feed.list.component.scss'],
    providers: [UserService]
})
export class FeedListComponent implements OnInit, OnChanges {
    feedlist: FeedForm[] = [];
    data: Object[];

    @Input() user: String;
    @Input() comm: String;
    @Input() pic: string;
    @Input() emptyMessage: string = "Retrieving Data...";
    @Input() pictype: string;
    @Input() tag: string;
    @Input() pref: string;
    
    // tag: any;
    
    me: string;
    formselected: any;


    constructor(private http: Http, 
                private userService: UserService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            // this.formselected = params.survey;
            // this.tag = params['tag'];
            // this.refreshFeed();
        });


        this.userService.afterLoginCheck().then(userData => {
            if (userData != 0) {
                this.me = userData.dbid;
            }
        });
    }

    ngOnChanges() {
        this.route.params.subscribe(params => {
            // this.tag = params['tag'];
            this.formselected = params.survey;
            // this.refreshFeed();
        });
        this.refreshFeed();
    }


    refreshFeed() {
        this.http.post(`/forms/feed`, { tag: this.tag, user: this.user, topsurvey: this.formselected, comm: this.comm, pref: this.pref }).toPromise()
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

                    if (this.feedlist.length == 0) this.emptyMessage = "No questions have been asked yet"
                }
            })
            .catch(error => alert("Error retrieving form: " + error));
    }
}
