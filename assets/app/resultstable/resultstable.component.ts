import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'results-table-component',
    templateUrl: './resultstable.component.html',
    styleUrls: ['./resultstable.component.scss']
})
export class ResultsTableComponent implements OnInit{
    @Input() data: Object[];
    first: any[];
    visible: boolean = false;

    constructor() {

    }

    ngOnInit() {
        if (this.data != null) {
            this.first = this.data[0].answers;
            this.visible = true;
        }
    }
}