import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FeedFormModel } from '../Feed/feed-form.model';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

import * as $ from 'jquery';

@Component({
    selector: 'app-feed-list',
    templateUrl: './feed-list.component.html',
    styleUrls: ['./feed-list.component.scss'],
    providers: [UserService]
})
export class FeedListComponent implements OnInit, OnChanges {
    feedlist: FeedFormModel[] = [];
    data: any[];
    formids: string[] = [];

    @Input() user: string;
    @Input() comm: string;
    @Input() pic: string;
    @Input() emptyMessage = 'Retrieving Data...';
    @Input() pictype: string;
    @Input() tag: string;
    @Input() pref: string;
    @Input() showAnsweredQuestions: boolean; // when true, `user` must be given, and `comm` / `tag` do not apply

    me: string;
    formselected: any;
    somethingChanged = false;
    prevTag: string;
    prevComm: string;
    prevUser: string;
    showLoadingBoxes = true;

    constructor(private http: Http,
                private userService: UserService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.formselected = (this.route.params as any).value.survey;
        this.prevTag = this.tag;

        this.route.params.subscribe(params => {
            if (this.formselected !== params.survey) {
                // console.log('Changed from: ',this.formselected, ' to ', params.survey, '\n' );
                this.formselected = params.survey;
                this.somethingChanged = true;
                this.getTopPost();
            }
        });

        this.userService.afterLoginCheck().then(userData => {
            if (userData != 0) {
                this.me = userData.dbid;
            }
        });

        const loadMorePosts = this.loadMorePosts.bind(this);

        window.setTimeout(loadMorePosts, 3000);
    }

    ngOnChanges() {
        this.formselected = (this.route.params as any).value.survey;

        // Check if changes came from tag or community
        if (this.prevTag !== this.tag) {
            this.somethingChanged = true;
            this.prevTag = this.tag;
        }

        if (this.prevComm !== this.comm) {
            this.somethingChanged = true;
            this.prevComm = this.comm;
        }

        if (this.prevUser !== this.user) {
            this.somethingChanged = true;
            this.prevUser = this.user;
        }



        this.refreshFeed();
    }

    loadMorePosts() {
        var prevPostCount = this.feedlist.length;
        var postPostCount = this.feedlist.length;
        var $docHeight = $(document).height(),
            $windHeight = $(window).height(),
            triggerHeight = .75 * ($docHeight - $windHeight),
            fetched = false;

        // console.log('Document Height:', $docHeight, '\nWindow Height:', $windHeight, '\nTRIGGER HEIGHT:', triggerHeight);

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


    refreshFeed(totalRefresh: boolean = false) {
        var route;
        var requestBody;

        if (totalRefresh) {
            this.formids = [];
            this.feedlist = [];
        }

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

            // Clear list if fetching new Top Survey from notification
            if (this.somethingChanged) {
                this.feedlist = [];
                this.formids = [];
                this.somethingChanged = false;
            }
            requestBody = {
                tag: this.tag,
                user: this.user,
                topsurvey: this.formselected,
                comm: this.comm,
                pref: this.pref,
                anonymous: true,
                // Just a flag to not show anonymous
                currentPosts: this.formids
            };

        }

        this.http
            .post(route, requestBody)
            .toPromise()
            .then(res => {
                if (res.json().status === 1) {

                    // add to list
                    this.data = res.json().data;

                    for (let obj of this.data) {

                        if (this.formids.indexOf(obj.id) === -1) {
                            // Push forms into feedlist if not there already
                            // console.log('PREBODY: ', obj);

                            this.feedlist.push(new FeedFormModel(obj));

                            // Populate array full of id's of questions currently shown on feed
                            // Sending this to the backend so it can skip over these when fetching for more questions
                            this.formids.push(obj.id);
                        }
                    }


                    if (this.feedlist.length == 0) {
                        this.emptyMessage = 'No questions have been asked yet';
                        this.showLoadingBoxes = false;
                    }


                }
            })
            .catch(error => console.log('Error retrieving form: ' + error));
    }

    getTopPost() {
        var route = `/forms/topSurvey`;

        var requestBody = {
            topsurvey: this.formselected,
        };

        this.http
            .post(route, requestBody)
            .toPromise()
            .then(res => {
                if (res.json().status == 1) {
                    // add to list

                    // remove current top survey
                    const removedPost = this.feedlist.shift();
                    if (removedPost) {
                        var rmvIndex = this.formids.indexOf(removedPost.id);
                        this.formids.splice(rmvIndex,1);
                    }

                    // Add new top survey
                    this.feedlist.unshift(new FeedFormModel(res.json().formdata))
                    this.formids.push(this.formselected);
                    console.log(this.formids.length);

                }
            })
            .catch(error => console.log('Error retrieving form: ' + error));
    }
}
