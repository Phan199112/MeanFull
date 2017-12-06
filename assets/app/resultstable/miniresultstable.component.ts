import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'miniresults-table-component',
    templateUrl: './miniresultstable.component.html',
    styleUrls: ['./resultstable.component.scss']
})
export class MiniResultsTableComponent implements OnInit {
    @Input() data;
    labels: string[];
    counts: string[];
    show: boolean = false;

    constructor() {

    }

    ngOnInit() {
        if (this.data[0][0] != null) {
            this.labels = this.data[0];
            this.counts = this.data[1];
            this.show = true;
        }
    }
}