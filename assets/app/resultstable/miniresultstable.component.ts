import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'miniresults-table-component',
    templateUrl: './miniresultstable.component.html',
    styleUrls: ['./resultstable.component.scss']
})
export class MiniResultsTableComponent implements OnInit {
    @Input() data;
    labels: string[];
    counts: string[] = [];
    show: boolean = false;

    constructor() {

    }

    ngOnInit() {
        if (this.data[0][0] != null) {
            this.labels = this.data[0];
            for (let i = 0; i < this.labels.length; i++) {
                for (let k = 0; k < this.data[1].length; k++) {
                    if (this.data[1][k].label === "all") {
                        this.counts.push(this.data[1][k].data[i]);
                    }
                }

            }

            this.show = true;
        }
    }
}