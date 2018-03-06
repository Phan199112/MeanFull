import { Component, Input, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import {Router, Routes} from "@angular/router";
import { CommunityListComponent } from "../communityContainer/community.list.component";

// import { UserService } from "../user.service";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class Sidebar implements OnInit {
    @Input() loggedin: boolean;
    communities: Object[];
    searchbox: FormGroup;
    users : Object[];
    

    constructor(private http: Http, private fb: FormBuilder, private router: Router) {  
        this.users = [];
     }

    ngOnInit() {

        this.searchbox = this.fb.group({
            searchterm: ['', Validators.required]
        });


        this.http.get('/users/feedlist')
            .toPromise()
            .then(response => {
                this.users = this.users.concat(response.json().data);
                window.console.log(this.users);
            }

        this.http.post(`/community/list`, { user: this.user }).toPromise()
        .then(res => {
            if (res.json().status == 1) {
                this.communities = res.json().data;
                window.console.log(this.communities);

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


    checkSubmit(form) {
        this.setAsTouched(form);
        if (form.invalid) {
            form.wasChecked = true;
        } else {
            // submit
            this.submitSearch();
        }
    }

    submitSearch() {
        this.router.navigate(['/searchresults', { 'q': this.searchbox.value.searchterm }]);
    }


}
