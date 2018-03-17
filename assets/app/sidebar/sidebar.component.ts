import { Component, Input, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import {Router, Routes, ActivatedRoute} from "@angular/router";
import { CommunityListComponent } from "../communityContainer/community.list.component";
import { CommunityModel } from "../communityContainer/community.model";
import { NetworkModel } from "../networkContainer/network.model";


// import { UserService } from "../user.service";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class Sidebar implements OnInit {
    @Input() loggedin: boolean;
    @Input() user: String;
    @Input() friends: any;

    communities: Object[];
    users : Object[];
    networklist: NetworkModel[];
    communitylist: CommunityModel[] = [];
    randomlist: CommunityModel[] = [];
    data: Object[];
    randomlistdata: Object[];
    

    constructor(private http: Http, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {  
        this.users = [];
        this.networklist = [];

        // window.console.log("Official NEtwork list: ", this.friends, "its type is:", typeof this.friends);
     }

    ngOnInit() {
        
        window.setTimeout(() => { 
            if(this.friends) {
                for (let obj of this.friends) {
                    this.networklist.push(new NetworkModel(obj));
                }
                window.console.log("Friend data:", this.networklist);
            } 
        }, 1000);


        this.http.get('/users/feedlist')
            .toPromise()
            .then(response => {
                this.users = this.users.concat(response.json().data);
            });



        // this.http.post(`/community/list`, { user: this.user }).toPromise()
        // .then(res => {
        //     if (res.json().status == 1) {
        //         this.communities = res.json().data;
        //     }
        // }).catch(error => alert("Error retrieving form: " + error));


            this.http.post(`/community/list`, { user: this.user }).toPromise()
            .then(res => {
                if (res.json().status == 1) {
                    this.data = res.json().data;
                    this.randomlistdata = res.json().random;

                    for (let obj of this.data) {
                        this.communitylist.push(new CommunityModel(obj));
                    }

                    if (this.randomlistdata != null) {
                        for (let obj of this.randomlistdata) {
                            this.randomlist.push(new CommunityModel(obj));
                        }
                    }
                }

            })
            .catch(error => alert("Error retrieving form: " + error));


        this.route.params.subscribe(params => {
            this.id = params.id;
        }); 

}
