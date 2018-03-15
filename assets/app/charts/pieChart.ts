import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'pie-chart',
    templateUrl: './pieChart.html',
    styleUrls: ['./pieChart.scss'],

})
export class PieChart implements OnInit {
    // inputs
    @Input() private qKind: string;
    // @Input() private question: string;
    @Input() private dataLabels: Array<any>;
    @Input() private dataValues: Array<any>;

    newData: Array<Object> = [];

    sampleOption: Object;

    alphabeth: string = "abcdefghijklmnopqrstuvwxyz";


    constructor () {
    }

    ngOnInit() {
        this.parseChartData();
        this.sampleOption = {
            // visualMap: {
            //     show: false,
            //     min: 0,
            //     max: 100,
            //     inRange: {
            //         colorLightness: [0, 1]
            //     }
            // },
            series: [
                {
                    name: 'Results',
                    center: ['50%', '50%'],
                    type: 'pie',
                    radius: '55%',
                    data: this.newData,
                    roseType: 'angle',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#999'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#999'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 15
                        }
                    },
                    itemStyle: {
                        normal: {
                            // color: '#28ab64',
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                }
            ]
        }

        if(this.qKind === 'Multiple Choice') window.console.log("DL: ",this.dataLabels);

    }

    parseChartData() : void {
        const items: number = this.dataLabels.length;
        // window.console.log("New Chart Data: ", this.data.plotdata);
        const isMC : boolean = this.qKind === "Multiple Choice";


        for (let i=0; i< items; i++) {
            let temp = {};
            // if (isMC) {
            //     temp = { name: this.alphabeth[i], value: this.dataValues[0].data[i] };
            // } else {
                temp = {name: this.dataLabels[i] , value: this.dataValues[0].data[i]};
            // }
            this.newData.push(temp);
        }
        // window.console.log("New Chart Data: ", this.newData);
    }

}




        // for (let i=0; i < data.questions.length; i++) {
        //     if (this.kindsWithOptions.indexOf(data.questions[i].kind) !== -1) {
        //         for (let j=0; j < data.questions[i].options.length; j++) {
        //             data.questions[i].options[j].label = this.alphabeth[j];
        //         }
        //     }
        // }