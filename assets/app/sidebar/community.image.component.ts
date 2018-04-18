import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
    selector: 'community-image',
    templateUrl: './community.image.component.html',
    styleUrls: ['./community.image.component.scss'],
})

export class CommunityImageComponent implements OnInit {
    @Input() data: Object;
    title: string = "";

    ngOnInit() {
        this.title  = this.data.title;
        this.cropTitle();
    }


    cropTitle() {
        var index = 0;
        for (let i=0; i<3; i++) {
            index = this.title.indexOf(" ", index + 1);
            if (index === -1) {
                return;
            }
        }

        if (index !== -1) {
            this.title = this.title.substr(0,index) + "...";
        }
    }

    clickedCommunity() {
        window.mixpanel.track(`Discovered Community from Feed (${this.data.id}): ${this.data.title}`);
    }
}