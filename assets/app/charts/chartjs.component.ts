import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-chartjs',
    templateUrl: './chartjs.component.html'
})
export class ChartJSComponent implements OnInit {
    // inputs
    @Input() private dataLabels: Array<any>;
    @Input() private dataValues: Array<any>;
    @Input() private dataType: String;

    // chart
    public ChartLabels:string[];
    public ChartData:number[];
    public ChartType:string;

    constructor () {
    }

    ngOnInit() {
        if (this.dataLabels) {
            this.ChartType = this.dataType;

            // append (%) signs to the labels such that the interpretation of the hoover tooltip is clear
            this.ChartLabels = this.dataLabels;
            //
            for (let i = 0; i < this.ChartLabels.length; i++) {
                this.ChartLabels[i] = this.ChartLabels[i]+" (%)";
            }

            // the data
            if (this.ChartType === 'doughnut' || this.ChartType === 'radar') {
                this.ChartData = [{data: this.dataValues, label: ''}];

            } else {
                this.ChartData = this.dataValues;

            }

        }
    }
}