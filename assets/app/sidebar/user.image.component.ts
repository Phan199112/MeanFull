import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
    selector: 'user-image',
    templateUrl: './user.image.component.html',
    styleUrls: ['./user.image.component.scss'],
})

export class UserImageComponent implements OnInit {
    @Input() data: Object;
    name: Array<string>;
    type: string;

    startingTime:any;

    ngOnInit() {
        this.startTime = Date.now();

        if (this.data && typeof this.data.name === "object") {
            this.type = 'network';
            this.name = this.data.name; 
        } else {
            this.type = 'users';
            this.name  = this.data.name.split(' ');
        }
    }

    clickedUser() {
        var startingTime = this.startingTime;

        window.mixpanel.track("Discovered User on Feed", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "userLink": this.data.link,
            "name": this.data.name,
            "timestamp": Date.now()
        });
    }
}