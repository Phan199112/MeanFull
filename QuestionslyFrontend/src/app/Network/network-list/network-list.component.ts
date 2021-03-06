import { Component, OnInit, Input } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { NetworkModel} from "../network.model";

@Component({
    selector: 'app-network-list',
    templateUrl: './network-list.component.html',
    styleUrls: ['./network-list.component.scss'],
})

export class NetworkListComponent implements OnInit {
    networklist: NetworkModel[] = [];

    @Input() data: [any];
    @Input() user: string;

    constructor(private http: Http, private route: ActivatedRoute) {
    }

    
    ngOnInit() {
        // window.console.log("Network list: ", this.data);
        for (let obj of this.data) {
            this.networklist.push(new NetworkModel(obj));
        }
    }
}