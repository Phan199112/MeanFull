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
    @Output() toggledTag: EventEmitter<string> = new EventEmitter<string>();
    currentTag: string;
    communities: Object[];
    users: Object[];
    postResults: Array<Object>;
    currentEmo: string = null;
    topTags: Array<string> = [];


    constructor(private http: Http, private fb: FormBuilder, private router: Router) {
        this.users = [];
        this.postResults = []
    }

    ngOnInit() {

        this.http.post('/tags/list')
        // Display the top tags + their counts
            .toPromise()
            .then(res => {
                let tags = res.json().data;
                console.log(tags);
                for (let i=0; i<tags.length; i++) {
                    let t = tags[i];
                    this.topTags.push(t.tag + " (" + t.count + ")");
                }
            })

        this.currentTag = null;

        this.http.get('/users/feedlist')
            .toPromise()
            .then(response => {
                this.users = this.users.concat(response.json().data);
            })

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

    toggleTag(tag: string): void {
        console.log("Anyone there?");
        if (this.currentTag === tag) {
            this.currentTag = null;
            this.toggledTag.emit(null);
            console.log("toggleTag, currTag" + tag);
        } else {
            this.currentTag = tag;
            this.toggledTag.emit(tag);
            console.log("toggleTag, else" + tag);
        }
    }

}
