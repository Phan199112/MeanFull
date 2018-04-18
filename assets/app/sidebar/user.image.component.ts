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

    ngOnInit() {

        if (this.data && typeof this.data.name === "object") {
            this.type = 'network';
            this.name = this.data.name; 
        } else {
            this.type = 'users';
            this.name  = this.data.name.split(' ');
        }
    }

    clickedUser() {
        window.mixpanel.track(`Discovered User from Feed (${this.data.link}): ${this.data.name}`);
    }
}