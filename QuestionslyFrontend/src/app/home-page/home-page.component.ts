import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: []
})
export class HomePageComponent implements OnInit {

    public isLoggedIn: boolean;
    public viewGroupId = '';
    public viewFilter = '';

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.isLoggedIn = this.userService.getUser() !== 0;

        this.route.queryParams.subscribe(params => {
            this.viewGroupId = params.group;
            this.viewFilter = params.filter;
        });
    }
}
