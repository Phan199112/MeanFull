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
            // append (%) signs to the labels such that the interpretation of the hoover tooltip is clear
            this.doughnutChartLabels = this.dataLabels;
            //
            for (let i = 0; i < this.doughnutChartLabels.length; i++) {
                this.doughnutChartLabels[i] = this.doughnutChartLabels[i]+" (%)";
            }

            // the data
            this.doughnutChartData = this.dataValues;
        }
    }
}