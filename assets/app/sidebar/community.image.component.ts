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
    startingTime: any;

    ngOnInit() {
        this.startingTime = Date.now();
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
        var startingTime = this.startingTime;
        window.mixpanel.track("Discovered Community on Feed", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "communityId": this.data.id,
            "name": this.data.title,
            "timestamp": Date.now()
        });
    }
}