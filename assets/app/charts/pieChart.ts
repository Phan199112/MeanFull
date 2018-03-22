import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'pie-chart',
    templateUrl: './pieChart.html',
    styleUrls: ['./pieChart.scss'],

})
export class PieChart implements OnInit {
    // inputs
    @Input() private qKind: string;
    @Input() private count: number;
    @Input() private dataLabels: Array<any>;
    @Input() private dataValues: Array<any>;
    @Input() private dataCounts: Array<any>;


    newData: Array<Object> = [];

    sampleOption: Object;

    // colorArray: Array<string> = ["#18663B", "#1C7745", "#20884F", "#249959", "#28AB63", "#28AB63", "#3DB372", "#53BB82", "#68C491", "#7ECCA1", "#93D5B1", "#A9DDC0", "#BEE5D0", "#D4EEDF", "#E9F6EF", "	#145531"]

    colorArray: Array<string> = ["#18663B", "#20884F", "#28AB63", "#53BB82", "#7ECCA1", "#A9DDC0", "#D4EEDF", "#145531", "#1C7745", "#249959", "#28AB63", "#3DB372", "#68C491", "#93D5B1", "#BEE5D0", "#E9F6EF"]


    constructor () {
    }

    ngOnInit() {
        this.parseChartData();
        this.newData.sort(function (a, b) { return a.value - b.value; })
        this.sampleOption = {
            // visualMap: {
            //     show: false,
            //     min:    10,
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
                    radius: '65%',
                    // minAngle: 180,
                    data: this.newData,
                    // roseType: 'area',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#999'
                            }
                        },
                        align: "center"
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#999'
                            },
                            smooth: 0.2,
                            length: 5,
                            length2: 5
                        }
                    },
                    // itemStyle: {
                    //     normal: {
                    //         // color: '#28ab64',
                    //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //     }
                    // },
                }
            ]
        }

    }

    parseChartData() : void {
        const items: number = this.dataLabels.length;
        const isMC : boolean = this.qKind === "Multiple Choice";

        for (let i=0; i< items; i++) {
            let temp = {};

            // Color array has length 16
            let j= i%16;

            temp = {
                name: this.dataLabels[i], 
                value: this.dataValues[0].data[i], 
                label: { 
                    show: true, 
                    position: "outside", 
                    formatter: `{b}: ${this.dataCounts[i]}\n({d}%)`, 
                    align: "center",
                    verticalAlign: "bottom",
                    rich: {
                        a: {
                            align: "center"
                        },
                        align: "center"
                    },
                    color: "#666", 
                    fontFamily: "Karla",
                    fontWeight: 700 }, 
                itemStyle: {
                    color: this.colorArray[j],
                    shadowBlur: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                } 
            };
            
            this.newData.push(temp);
        }
    }

}