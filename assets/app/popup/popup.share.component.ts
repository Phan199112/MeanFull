import { Component, OnInit } from '@angular/core';
import { PopupService } from "../popup.service";
import { UserService } from "../user.service";

@Component(
    {
        selector: 'popup-share',
        templateUrl: './popup.share.component.html',
        styleUrls: [],
        providers: [PopupService, UserService]
    }
)
export class PopupShareComponent implements OnInit {
    link: string;
    showComm: boolean = false;

    constructor(private popupService: PopupService,
                private userService: UserService) {

    }

    ngOnInit() {
        // generate the link
        this.link = this.popupService.getLink();

        // show communitites only if the user is logged in
        this.showComm = this.userService.getLoggedin() === true;
    }

}