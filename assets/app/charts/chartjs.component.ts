import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-chartjs',
    templateUrl: './chartjs.component.html'
})
export class ChartJSComponent implements OnInit {
    // inputs
    @Input() private dataLabels: Array<any>;
    @Input() private dataValues: Array<any>;
    @Input() private questionkind: string;

    // chart
    public ChartLabels:string[];
    public ChartData:number[];
    public ChartType:string;
    public ChartOptions:any;
    public ChartLegend:boolean;

    constructor () {
    }

    ngOnInit() {
        if (this.dataLabels) {
            // set the type
            // if (this.dataValues.length == 1) {
            this.dataValues.splice(1, this.dataValues.length -1);
                this.ChartType = "doughnut";
                this.ChartLegend = true;

            // } 
            // else {
            //     // alter graph type depending on no groups
            //     if (this.dataValues[0].data.length > 2) {
            //         this.ChartType = "radar";
            //         this.ChartLegend = false;

            //     } else {
            //         this.ChartType = "bar";
            //         this.ChartLegend = false;
            //     }

            // }


            this.ChartLabels = this.dataLabels;

            // append (%) signs to the labels such that the interpretation of the hoover tooltip is clear

            // for (let i = 0; i < this.ChartLabels.length; i++) {
            //     this.ChartLabels[i] = this.ChartLabels[i]+" (%)";
            // }

            // the data
            this.ChartData = this.dataValues;

            //options
            // depends on the chart type
            if (this.ChartType == "bar") {
                this.ChartOptions = {
                    scaleShowVerticalLines: false,
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 10,
                                max: 100
                            }
                        }]
                    }
                };

            } else if (this.ChartType == "radar") {
                this.ChartOptions = {
                    scale: {
                        ticks: {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 10,
                            max: 100
                        },
                        display: true
                    }
                };

            } else if (this.ChartType == "pie" {
                this.ChartOptions = {
                    cutoutPercentage: 45,
                    animation {
                        animateScale: true
                    }
                }
            })


        }
    }
}