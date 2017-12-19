import { Component, OnInit } from '@angular/core';
import { PopupService } from "../popup.service";

@Component(
    {
        selector: 'popup-invitecomm',
        templateUrl: './popup.invitecomm.component.html',
        styleUrls: [],
        providers: [PopupService]
    }
)
export class PopupInviteCommComponent implements OnInit {
    link: string;

    constructor(private popupService: PopupService) {

    }

    ngOnInit() {
        // generate the link
        this.link = this.popupService.getLink();
    }

}