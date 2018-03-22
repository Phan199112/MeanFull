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
    

    constructor(private http: Http, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {  
        this.users = [];
        this.networklist = [];
     }

    ngOnInit() {
        this.communitylist = [];
        this.http.get('/users/feedlist')
            .toPromise()
            .then(response => {
                this.users = this.users.concat(response.json().data);
            });

    }

    ngOnChanges() {

        if (this.name) this.userName = this.name.split(' ')[0];

        this.networklist = [];
            if (this.friends) {
                for (let obj of this.friends) {
                    this.networklist.push(new NetworkModel(obj));
                }
            }



        this.http.post(`/community/list`, { user: this.user }).toPromise()
            .then(res => {
                if (res.json().status == 1) {
                    this.data = res.json().data;
                    this.randomlistdata = res.json().random;

                    this.communitylist = [];

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

    }

}