import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, Routes } from "@angular/router";
import { CommunityListComponent } from "../communityContainer/community.list.component";

// import { UserService } from "../user.service";

@Component({
    selector: 'right-panel',
    templateUrl: './rightPanel.component.html',
    styleUrls: ['./rightPanel.component.scss']
})
export class RightPanel implements OnInit {
    @Input() loggedin: boolean;
    @Output() toggledCat: EventEmitter<string> = new EventEmitter<string>();
    currentCat: string;
    communities: Object[];
    users: Object[];
    postResults: Array<Object>;
    currentEmo: string = null;
    categories: Array<string> = ["Automotive", "Business", "Cooking", "Education", "Entertainment", "Fashion", "Food", "Fitness", "Health", "Home Improvement", "Sports", "Technology"]


    constructor(private http: Http, private fb: FormBuilder, private router: Router) {
        this.users = [];
        this.postResults = []

        // TO-DO: fetch first batch of top posts
    }

    ngOnInit() {

        this.currentCat = null;

        this.http.get('/users/feedlist')
            .toPromise()
            .then(response => {
                this.users = this.users.concat(response.json().data);
            }

        this.http.post(`/community/list`, { user: this.user }).toPromise()
                    .then(res => {
                        if (res.json().status == 1) {
                            this.communities = res.json().data;
                        }
                    }).catch(error => alert("Error retrieving form: " + error));




    }

    setAsTouched(group) {
        group.markAsTouched();
        for (let i in group.controls) {
            if (group.controls[i] instanceof FormControl) {
                group.controls[i].markAsTouched();
            } else {
                this.setAsTouched(group.controls[i]);
            }
        }
    }


    chooseReaction(reaction: string): void {
        if (this.currentEmo === reaction) {
            this.currentEmo = null;
            return;
        }
        this.currentEmo = reaction;
    }

    toggleCategory(cat: string): void {
        if (this.currentCat === cat) {
            this.currentCat = null;
            this.toggledCat.emit(null);
        } else {
            this.currentCat = cat;
            this.toggledCat.emit(cat);
        }

    }


}
