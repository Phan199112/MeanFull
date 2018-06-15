import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { Http } from "@angular/http";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { RouterModule, Router, Routes, ActivatedRoute} from "@angular/router";
import { CommunityListComponent } from "../communityContainer/community.list.component";
import { CommunityModel } from "../communityContainer/community.model";
import { NetworkModel } from "../networkContainer/network.model";
import * as $ from 'jquery';


// import { UserService } from "../user.service";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class Sidebar implements OnInit, OnChanges {
    @Input() loggedin: boolean;
    @Input() user: String;
    @Input() friends: any;
    @Input() context: string;
    @Input() name: string;
    @Input() me: boolean;

    userName: string = "";
    communities: Object[];
    users : Object[];
    networklist: NetworkModel[];
    communitylist: CommunityModel[] = [];
    randomlist: CommunityModel[] = [];
    data: Object[];
    randomlistdata: Object[];
    mobWidth: number;
    amountToFetch: number = 9;
    amountArray = Array(9);
    showFriendsLoading: boolean = true;
    showCommunityLoading: boolean = true;
    ogNetworkList: Object[];
    ogCommunityList: Object[];
    ogUsersList: Object[];
    ogRandomList: Object[];
    

    constructor(private http: Http, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {  
        this.users = [];
        this.ogUsersList = [];
        this.networklist = [];
        this.mobWidth = (window.screen.width);
        // console.log(this.mobWidth)
     }

    ngOnInit() {
        this.communitylist = [];
        this.changeMobileFetchCount();

        var windowWidth = $(window).width();
        if (windowWidth < 1089) {
            this.amountToFetch = 6;
        }

        this.http.get('/users/feedlist')
            .toPromise()
            .then(response => {
                this.users = this.users.concat(response.json().data);
                this.ogUsersList = this.ogUsersList.concat(response.json().data);
                this.users = this.users.slice(0,this.amountToFetch);
                this.showFriendsLoading = false;
            });

        this.handleScrollAndResize();
    }


    changeMobileFetchCount(){
        if (this.mobWidth <= 768) {
            this.amountToFetch = 6;
            this.amountArray = Array(6);
        }
    }

    ngOnChanges() {
        if (this.name) this.userName = this.name.split(' ')[0];

        this.networklist = [];
        this.ogNetworkList = [];
            if (this.friends) {
                
                var j = 0;
                for (let obj of this.friends) {
                    if (j < this.amountToFetch) {
                        this.networklist.push(new NetworkModel(obj));
                        this.ogNetworkList.push(new NetworkModel(obj));
                        j++;
                    }
                }
                this.showFriendsLoading = false;
            }

        this.http.post(`/community/list`, { user: this.user }).toPromise()
            .then(res => {
                if (res.json().status == 1) {
                    this.data = res.json().data;
                    
                    this.randomlistdata = res.json().random;

                    this.communitylist = [];

                    var k=0;
                    this.communitylist = [];
                    this.ogCommunityList = [];
                    for (let obj of this.data) {
                        if (k < this.amountToFetch) {
                            // console.log("obj:", obj);
                            this.communitylist.push(new CommunityModel(obj));
                            this.ogCommunityList.push(new CommunityModel(obj));
                            k++;
                        }
                    }


                    var i = 0;
                    if (this.randomlistdata != null) {
                        this.randomlist = [];
                        this.ogRandomList = [];
                        for (let obj of this.randomlistdata) {
                            if (i < this.amountToFetch) {
                                this.randomlist.push(new CommunityModel(obj));
                                this.ogRandomList.push(new CommunityModel(obj));
                                i++;
                            }
                        }
                    }

                    this.showCommunityLoading = false;
                }

            })
            .catch(error => console.log("Error retrieving form: " + error));            
    }

    handleScrollAndResize() {
        // Translates sidebar as you scroll to keep it on the window
        $(window).scroll(function () {
            var wScroll = $(window).scrollTop();
            var windowWidth = $(window).width();
            if (windowWidth > 768) {
                if (wScroll > 53) {
                    wScroll -= 43;
                }
                $('#sidebar, #rightPanel').css({
                    'transform': 'translateY(' + wScroll + 'px)'
                })
            } else {
                $('#sidebar, #rightPanel').css({
                    'transform': 'translateY(' + 0 + 'px)'
                })
            }
        });

        // Helper function to slice user/community arrays when resizing
        const sliceLists = (x: number) => {
            this.users = this.ogUsersList.slice(0, x);
            this.networklist = this.ogNetworkList.slice(0, x);
            this.communitylist = this.ogCommunityList.slice(0, x);
            this.randomlist = this.randomlist.slice(0, x);
        }

        // Resets sidebar and rightpanel position when window is resized
        $(window).resize(function () {
            var wScroll = $(window).scrollTop();
            var windowWidth = $(window).width();

            if (windowWidth > 768) {
                if (wScroll > 53) {
                    wScroll -= 43;
                }
                $('#sidebar, #rightPanel').css({
                    'transform': 'translateY(' + wScroll + 'px)'
                })
            } else {
                $('#sidebar, #rightPanel').css({
                    'transform': 'translateY(' + 0 + 'px)'
                })
            }

            // Following is to restore proper quantity of items in sidebar
            if (windowWidth > 1089) {
                sliceLists(9);
            }

            if (windowWidth < 1089) {
                sliceLists(6);
            }
            if (windowWidth < 820) {
                sliceLists(3);
            }

            if (windowWidth < 768) {
                sliceLists(6);
            }
        });
    }

// Function to test summary email
    // sendSummary() {
    //     this.http.get('/test-summary')
    //         .toPromise()
    //         .then(response => {
            
    //         });
    // }

}