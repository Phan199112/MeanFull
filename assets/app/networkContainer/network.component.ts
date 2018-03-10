import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
    selector: 'network-item',
    templateUrl: './network.component.html',
    styleUrls: ['./network.component.scss'],
})

export class NetworkComponent implements OnInit {
    @Input() data: Object;
    name: Array<string>;

    ngOnInit() {
        // this.name  = this.data.name.split(' ');
    }
    
}