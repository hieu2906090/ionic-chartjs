import { Directive, ElementRef, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Directive({
  selector: '[appBarchart]'
})
export class BarchartDirective {
  // @Input() chartConfig: any;
  @Output() chartClick = new EventEmitter();
  hostElement: any;
  myChart: any;
  randomColorPlugin = {
    beforeUpdate: (chart) => {
      const backgroundColor = [];
      const borderColor = [];
      const hoverBackgroundColor = [];
      for (const i of chart.config.data.datasets[0].data) {
        // tslint:disable-next-line: max-line-length
        const randomColor = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',';
        backgroundColor.push(randomColor + '0.2)');
        borderColor.push(randomColor + '1)');
        hoverBackgroundColor.push(randomColor + '1)');
      }
      chart.config.data.datasets[0].backgroundColor = backgroundColor;
      chart.config.data.datasets[0].borderColor = borderColor;
      chart.config.data.datasets[0].hoverBackgroundColor = hoverBackgroundColor;
    }
  };

  constructor(element: ElementRef) {
    this.hostElement = element.nativeElement;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.generateBarChart();
  }

  @HostListener('mouseup', ['$event'])
  clickOnGraph(evt: any) {
    this.chartClick.emit({chart: 'bar', data: this.myChart.getElementAtEvent(evt)});
  }

  private generateBarChart() {
    this.myChart = new Chart(this.hostElement, {
      plugins: [this.randomColorPlugin],
      type: 'bar',
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'], // #1. datalabel Trường này cần lưu ý
        datasets: [{
          label: '# of Votes', // #2. xlabel Trường này cần lưu ý
          data: [200, 50, 30, 15, 20, 34], // #3. xvalue Trường này cần lưu ý
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
