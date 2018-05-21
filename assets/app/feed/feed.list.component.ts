import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { FeedForm } from "./feed.form.model";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../user.service";

import * as $ from 'jquery';


@Component({
    selector: 'feed-list',
    templateUrl: './feed.list.component.html',
    styleUrls: ['./feed.list.component.scss'],
    providers: [UserService]
})
export class FeedListComponent implements OnInit, OnChanges {
    feedlist: FeedForm[] = [];
    data: Object[];
    formids: String[] = [];

    @Input() user: String;
    @Input() comm: String;
    @Input() pic: string;
    @Input() emptyMessage: string = "Retrieving Data...";
    @Input() pictype: string;
    @Input() tag: string;
    @Input() pref: string;
    @Input() showAnsweredQuestions: boolean; // when true, `user` must be given, and `comm` / `tag` do not apply
    
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
        });


        this.userService.afterLoginCheck().then(userData => {
            if (userData != 0) {
                this.me = userData.dbid;
            }
        });

        var loadMorePosts = this.loadMorePosts.bind(this);

        window.setTimeout(loadMorePosts, 3000);
    }

    ngOnChanges() {
        this.route.params.subscribe(params => {
            // this.tag = params['tag'];
            this.formselected = params.survey;
            // this.refreshFeed();
        });
        this.refreshFeed();
    }

    loadMorePosts() {
        var prevPostCount = this.feedlist.length;
        var postPostCount = this.feedlist.length;
        var $docHeight = $(document).height(),
            $windHeight = $(window).height(),
            triggerHeight = .75 * ($docHeight - $windHeight),
            fetched = false;

        // console.log("Document Height:", $docHeight, "\nWindow Height:", $windHeight, "\nTRIGGER HEIGHT:", triggerHeight);

        var refreshFeed = this.refreshFeed.bind(this);

        $(window).scroll(function () {
            var wScroll = $(window).scrollTop();
            if (wScroll > triggerHeight && !fetched) {
                refreshFeed();

                fetched = true;

                // Reset trigger location to initiate new post fetch
                window.setTimeout(function() {
                    $docHeight = $(document).height();
                    triggerHeight = .75 * ($docHeight - $windHeight);
                    fetched = false;
                }, 3000);
            }

        })
    }


    refreshFeed() {
        var route;
        var requestBody;

        if (this.showAnsweredQuestions) {
            route = `/forms/feed/answered`;
            requestBody = {
                user: this.user,
                pref: this.pref,
                offset: 0,
                limit: this.formids.length + 10
            };
        } else {
            route = `/forms/feed`;
            requestBody = {
                tag: this.tag,
                user: this.user,
                topsurvey: this.formselected,
                comm: this.comm,
                pref: this.pref,
                currentPosts: this.formids
            };
        }

        this.http
            .post(route, requestBody)
            .toPromise()
            .then(res => {
                if (res.json().status == 1) {

                    // add to list
                    this.data = res.json().data;
                    for (let obj of this.data) {
                        if (this.formids.indexOf(obj.id) == -1) {
                            // Push forms into feedlist if not there already
                            this.feedlist.push(new FeedForm(obj));
                            
                            // Populate array full of id's of questions currently shown on feed
                            // Sending this to the backend so it can skip over these when fetching for more questions
                            this.formids.push(obj.id);
                        }
                    }


                    if (this.feedlist.length == 0) this.emptyMessage = "No questions have been asked yet"

                }
            })
            .catch(error => alert("Error retrieving form: " + error));
    }
}
