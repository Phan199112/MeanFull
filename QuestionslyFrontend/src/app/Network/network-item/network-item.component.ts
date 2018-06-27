import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
    selector: 'app-network-item',
    templateUrl: './network-item.component.html',
    styleUrls: ['./network-item.component.scss'],
})

export class NetworkItemComponent implements OnInit {
    @Input() data: any;
    name: Array<string>;

    ngOnInit() {
        // this.name  = this.data.name.split(' ');
    }
    
}