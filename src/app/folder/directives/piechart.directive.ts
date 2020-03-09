import { Directive, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Directive({
  selector: '[appPiechart]'
})
export class PiechartDirective {
  // @Input() chartConfig: any;
  @Output() chartClick = new EventEmitter();
  hostElement: any;
  myChart: any;
  randomColorPlugin = {
    beforeUpdate: (chart) => {
      const backgroundColor = [];
      const hoverBackgroundColor = [];
      for (const i of chart.config.data.datasets[0].data) {
        // tslint:disable-next-line: max-line-length
        const randomColor = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',';
        backgroundColor.push(randomColor + '0.2)');
        hoverBackgroundColor.push(randomColor + '1)');
      }
      chart.config.data.datasets[0].backgroundColor = backgroundColor;
      chart.config.data.datasets[0].hoverBackgroundColor = hoverBackgroundColor;
    }
  };

  constructor(element: ElementRef) {
    this.hostElement = element.nativeElement;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.generatePieChart();
  }

  @HostListener('mouseup', ['$event'])
  clickOnGraph(evt: any) {
    this.chartClick.emit({chart: 'doughnut', data: this.myChart.getElementAtEvent(evt)});
  }

  private generatePieChart() {
    this.myChart = new Chart(this.hostElement, {
      plugins: [this.randomColorPlugin],
      type: 'doughnut',
      data: {
        labels: ['BJP', 'Congress', 'AAP', 'CPM', 'SP'],
        datasets: [{
          label: '# of Votes',
          data: [50, 29, 15, 10, 7],
        }]
      },
      options: {
        legend: {
          align: 'center',
          position: 'right',
          labels: {
            boxWidth: 20,
            fontSize: 10,
            padding: 10
          }
        },
        layout: {
          padding: {
            left: 3,
            right: 3,
            top: 10,
            bottom: 0
          }
        }
      }
    });
  }

}
