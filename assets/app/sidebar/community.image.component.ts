import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
    selector: 'community-image',
    templateUrl: './community.image.component.html',
    styleUrls: ['./community.image.component.scss'],
})

export class CommunityImageComponent implements OnInit {
    @Input() data: Object;
    title: Array<string>;

    ngOnInit() {
        this.title  = this.data.title;
    }

    // prepareTitle() {
    //     var split = this.data.title.split(" ");
    //     var temp = [];



    // }

    
}