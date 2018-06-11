import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, Routes } from "@angular/router";
import { UserService } from "../user.service";
import { CommunityListComponent } from "../communityContainer/community.list.component";

// import { UserService } from "../user.service";

@Component({
    selector: 'right-panel',
    templateUrl: './rightPanel.component.html',
    providers: [UserService],
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
    locationForm: FormGroup;
    feedbackForm: FormGroup;
    noLocation: boolean = false;
    submittedLocation = false;
    showFeedbackForm: boolean = false;
    sentFeedback: boolean = false;
    fbError: boolean = false;


    constructor(private http: Http, private fb: FormBuilder, private router: Router, private userService: UserService) {
        this.users = [];
        this.postResults = []
    }

    ngOnInit() {
        this.checkLocation();
        
        this.locationForm = this.fb.group({
            city: ["", Validators.required],
            state: ["", Validators.required],
            country: ["", Validators.required]
        })  

        this.feedbackForm = this.fb.group({
            feedback: ["", [Validators.required, Validators.minLength(1)]]
        })  

        this.http.post('/tags/list')
        // Display the top tags + their counts
            .toPromise()
            .then(res => {
                let tags = res.json().data;
                // console.log(tags);
                for (let i=0; i<tags.length; i++) {
                    let t = tags[i];
                    this.topTags.push(t.tag + " (" + t.count + ")");
                    // this.topTags.push(t.tag);
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
            }).catch(error => console.log("Error retrieving form: " + error));
    }

    checkLocation() {
        this.userService.afterLoginCheck().then(userData => {
            if (userData != 0) {
                if (userData.location.city == "") {
                    this.noLocation = true;
                }
            });
    };

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

    toggleTag(tag: string): void {
        if (this.currentTag === tag) {
            this.currentTag = null;
            this.toggledTag.emit(null);            
        } else {
            this.currentTag = tag;
            this.toggledTag.emit(tag);
        }
    }

    updateLocation() {
        this.http.post('/users/updateLocation', {location: this.locationForm.value})
            .toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    this.locationReceived();
                }
            })
        // console.log(this.locationForm.value);
    }

    locationReceived() {
        this.submittedLocation = true;

        window.setTimeout(() => {
            this.noLocation = false;
         }, 2500);
        
    }

    toggleFb() {
        this.showFeedbackForm = !this.showFeedbackForm;
        this.fbError = false;
    }


    sendFeedback() {
        const feedback = this.feedbackForm.value.feedback;

        if(this.feedbackForm.valid) {
            this.fbError = false;
            this.sentFeedback = true;
    
            // Reset Feedback form
            const resetFb = () => {
                this.toggleFb();
                this.sentFeedback = false;
                this.feedbackForm.get('feedback').setValue("");
            }
    
            window.setTimeout(resetFb, 2000);
    
            this.http.post('/savefeedback', { feedback })
                .toPromise()
                .then(response => {
                })

        } else {
            this.fbError = true;
        }
    }
}
