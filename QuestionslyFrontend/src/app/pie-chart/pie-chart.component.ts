import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']

})
export class PieChartComponent implements AfterViewInit {
    // inputs
    @Input() private qKind: string;
    @Input() private count: number;
    @Input() private dataLabels: Array<any>;
    @Input() private dataValues: Array<any>;
    @Input() private dataCounts: Array<any>;

    @ViewChild('pieChartDiv') pieChartDiv: ElementRef;

    newData: Array<any> = [];

    colorArray: Array<string> = [
        "#18663B",
        "#20884F",
        "#28AB63",
        "#53BB82",
        "#7ECCA1",
        "#A9DDC0",
        "#D4EEDF",
        "#145531",
        "#1C7745",
        "#249959",
        "#28AB63",
        "#3DB372",
        "#68C491",
        "#93D5B1",
        "#BEE5D0",
        "#E9F6EF",
    ];


    constructor () {
    }

    ngAfterViewInit() {
        this.parseChartData();
        this.newData.sort(function (a, b) { return a.value - b.value; });

        (window as any).echarts.init(this.pieChartDiv.nativeElement).setOption(this.getEchartsOptions());
    }

    getEchartsOptions() {
        return {
            series: [
                {
                    name: 'Results',
                    center: ['50%', '50%'],
                    type: 'pie',
                    radius: '55%',
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
                            length: 8,
                            length2: 8
                        }
                    },
                }
            ]
        };
    }

    parseChartData(): void {
        const items: number = this.dataLabels.length;
        const isMC: boolean = this.qKind === "Multiple Choice";

        for (let i = 0; i < items; i++) {
            let temp = {};

            // Color array has length 16
            let j = i % 16;

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
