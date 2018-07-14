import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RouterModule, Router, Routes, ActivatedRoute} from '@angular/router';
//import { CommunityListComponent } from '../communityContainer/community.list.component';
import { GroupModel } from '../group.model';
import { NetworkModel } from '../../Network/network.model';
import * as $ from 'jquery';


// import { UserService } from '../user.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
    @Input() loggedin: boolean;
    @Input() user: String;
    @Input() friends: any;
    @Input() context: string;
    @Input() name: string;
    @Input() me: boolean;

    userName = '';
    communities: Object[];
    users: Object[];
    networklist: NetworkModel[];
    communitylist: GroupModel[] = [];
    randomlist: GroupModel[] = [];
    data: Object[];
    randomlistdata: Object[];
    mobWidth: number;
    amountToFetch = 9;
    amountArray = Array(9);
    showFriendsLoading = true;
    showCommunityLoading = true;
    showNames = false;
    ogNetworkList: Object[];
    ogCommunityList: Object[];
    ogUsersList: Object[];
    ogRandomList: Object[];
    sliceHeightResize = {sliced: false, count: 9, prevHeight: 1200};


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

        const windowWidth = $(window).width();
        if (windowWidth < 1089) {
            this.amountToFetch = 6;
        }

        const showNames = () => {this.showNames = true;}

        this.http.get('/users/feedlist')
            .toPromise()
            .then(response => {
                this.users = this.users.concat(response.json().data);
                this.ogUsersList = this.ogUsersList.concat(response.json().data);
                this.users = this.users.slice(0, this.amountToFetch);
                this.showFriendsLoading = false;
                window.setTimeout(showNames, 500);
            });

        this.handleScrollAndResize();
    }


    changeMobileFetchCount() {
        if (this.mobWidth <= 768) {
            this.amountToFetch = 6;
            this.amountArray = Array(6);
        }
    }

    ngOnChanges() {
        if (this.name) {
          this.userName = this.name.split(' ')[0];
        }

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

        this.http.post(`/group/list`, { user: this.user }).toPromise()
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
                            // console.log('obj:', obj);
                            this.communitylist.push(new GroupModel(obj));
                            this.ogCommunityList.push(new GroupModel(obj));
                            k++;
                        }
                    }


                    var i = 0;
                    if (this.randomlistdata != null) {
                        this.randomlist = [];
                        this.ogRandomList = [];
                        for (let obj of this.randomlistdata) {
                            if (i < this.amountToFetch) {
                                this.randomlist.push(new GroupModel(obj));
                                this.ogRandomList.push(new GroupModel(obj));
                                i++;
                            }
                        }
                    }

                    this.showCommunityLoading = false;
                }

            })
            .catch(error => console.log('Error retrieving form: ' + error));
    }

    handleScrollAndResize() {
        // Helper function to slice user/community arrays when resizing
        const sliceLists = (x: number) => {
            this.users = this.ogUsersList.slice(0, x);
            (this.networklist as any) = this.ogNetworkList ? this.ogNetworkList.slice(0, x) : [];
            (this.communitylist as any) = this.ogCommunityList ? this.ogCommunityList.slice(0, x) : [];
            this.randomlist = this.randomlist.slice(0, x);
        }

        const fixSidebar = () => {
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            var sdbPos = $('.sdbHolder').offset();
            var sdbWidth = $('.sdbHolder').width();
            var rpnPos = $('.rpnHolder').offset();
            var rpnWidth = $('.rpnHolder').width();
            var heightToSlice = $('#sdb').height() + sdbPos.top;
            var flag = false;

            // For vertical resizing and slicing of elements in sidebar so the whole sidebar is always in the window
            if (windowHeight - heightToSlice < 1 && this.sliceHeightResize.count !== 3) {
                flag = true;
                let newCount = this.sliceHeightResize.count - 3;
                this.sliceHeightResize = { count: newCount, prevHeight: windowHeight, sliced: true};
                sliceLists(newCount);
            }

            if (windowHeight - heightToSlice > 200 && this.sliceHeightResize.count !== 9) {
                flag = true;
                let newCount = this.sliceHeightResize.count + 3;
                this.sliceHeightResize = {count: newCount, prevHeight: windowHeight, sliced: true};
                sliceLists(newCount);
            }



            // Width checks for setting the sidebar either fixed or static position in the page
            if (windowWidth > 767) {
                $('#sdb').css({
                    'position': 'fixed',
                    'width': sdbWidth,
                    'top': sdbPos.top - 8,
                    'left': sdbPos.left
                });

                if (rpnPos) {
                    $('#rightPanel').css({
                        'position': 'fixed',
                        'width': rpnWidth,
                        'top': rpnPos.top - 8,
                        'left': rpnPos.left
                    });
                }
            }

            if (windowWidth < 768) {
                $('#sdb, #rightPanel').css({
                    'position': 'static',
                    'width': '100%'
                });
            }

            // Window width resizing checks that will resize sidebar if needed
            if (!flag) {
                if (windowWidth > 1089 && this.sliceHeightResize.count == 9) {
                    sliceLists(9);
                }

                if (windowWidth < 1089 && this.sliceHeightResize.count !== 3) {
                    sliceLists(6);
                }
                if (windowWidth < 820) {
                    sliceLists(3);
                }

                if (windowWidth < 768 && this.sliceHeightResize.count !== 3) {
                    sliceLists(6);
                }
            }

        }

        // Just cause the dom isnt ready right away and able to get the position and width of our placeholder right away
        window.setTimeout(fixSidebar, 400);


        // Resets sidebar and rightpanel position when window is resized
        $(window).resize(function () {
            fixSidebar();
        });

        // Make sidebars scroll with page then become fixed when they reach the top
        $(window).scroll(function() {
            let wScroll = $(window).scrollTop();
            let windowWidth = $(window).width();
            let sdbPos = $('.sdbHolder').offset();
            let rpnPos = $('.rpnHolder').offset();

            if (windowWidth > 767 && sdbPos) {
                let navHeight = $('.navbar').height() + 8;

                if (navHeight < sdbPos.top - 8 - wScroll) {
                    $('#sdb').css({
                        'top': sdbPos.top - 8 - wScroll,
                    });

                    $('#rightPanel').css({
                        'top': rpnPos.top - 8 - wScroll,
                    });
                } else {
                    $('#sdb').css({
                        'top': 52
                    });

                    $('#rightPanel').css({
                        'top': 52
                    });
                }
            }
        });
    }
}
