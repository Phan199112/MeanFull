import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { Http } from "@angular/http";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { RouterModule, Router, Routes, ActivatedRoute} from "@angular/router";
import { CommunityListComponent } from "../communityContainer/community.list.component";
import { CommunityModel } from "../communityContainer/community.model";
import { NetworkModel } from "../networkContainer/network.model";


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
    

    constructor(private http: Http, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {  
        this.users = [];
        this.networklist = [];
        this.mobWidth = (window.screen.width);
        // console.log(this.mobWidth)
     }

    ngOnInit() {
        this.communitylist = [];
        this.changeMobileFetchCount();

        this.http.get('/users/feedlist')
            .toPromise()
            .then(response => {
                this.users = this.users.concat(response.json().data);
                this.users = this.users.slice(0,this.amountToFetch);
            });
    }

    changeMobileFetchCount(){
        if (this.mobWidth <= 768) {
            this.amountToFetch = 6;
            this.amountArray = Array(6);
        }
    }

    ngOnChanges() {
        var searchUser = null;

        if (this.name) this.userName = this.name.split(' ')[0];

        this.networklist = [];
            if (this.friends) {
                
                var j = 0;
                for (let obj of this.friends) {
                    if (j < this.amountToFetch) {
                        this.networklist.push(new NetworkModel(obj));
                        j++;
                    }
                }
            }

        this.http.post(`/community/list`, { user: searchUser }).toPromise()
            .then(res => {
                if (res.json().status == 1) {
                    this.data = res.json().data;
                    
                    this.randomlistdata = res.json().random;

                    this.communitylist = [];

                    var k=0;
                    this.communitylist = [];
                    for (let obj of this.data) {
                        if (k < this.amountToFetch) {
                            // console.log("obj:", obj);
                            this.communitylist.push(new CommunityModel(obj));
                            k++;
                        }
                    }

                    var i = 0;
                    if (this.randomlistdata != null) {
                        this.randomlist = [];
                        for (let obj of this.randomlistdata) {
                            if (i < this.amountToFetch) {
                                this.randomlist.push(new CommunityModel(obj));
                                i++;
                            }
                        }
                    }
                }

            })
            .catch(error => alert("Error retrieving form: " + error));            
    }


}