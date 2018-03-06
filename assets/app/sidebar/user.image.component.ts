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

    ngOnInit() {
        this.name  = this.data.name.split(' ');
    }
    
}