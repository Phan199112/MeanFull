import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: []
})
export class HomePageComponent implements OnInit {

    public isLoggedIn: boolean;

    constructor(
        private userService: UserService,
    ) { }

    ngOnInit() {
        this.isLoggedIn = this.userService.getUser() !== 0;
    }

}
