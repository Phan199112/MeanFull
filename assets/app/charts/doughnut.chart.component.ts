import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-doughnut-chart',
    templateUrl: './doughnut.chart.component.html'
})
export class DoughnutChartComponent implements OnInit {
    // inputs
    @Input() private dataLabels: Array<any>;
    @Input() private dataValues: Array<any>;

    // Doughnut
    public doughnutChartLabels:string[];
    public doughnutChartData:number[];

    constructor () {
    }

    ngOnInit() {
        if (this.dataLabels) {
            this.doughnutChartLabels = this.dataLabels;
            this.doughnutChartData = this.dataValues;
        }
    }
}