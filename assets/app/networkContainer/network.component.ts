import { Component, Input } from '@angular/core';

@Component({
    selector: 'network-item',
    templateUrl: './network.component.html',
    styleUrls: ['./network.component.scss'],
})

export class NetworkComponent {
    @Input() data: [Object];

}