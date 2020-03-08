import { Directive, ElementRef, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Directive({
  selector: '[appBarchart]'
})
export class BarchartDirective {
  @Input() chartConfig: any;
  @Output() barChartClick = new EventEmitter();
  hostElement: any;
  barChart: any;

  constructor(element: ElementRef) { 
    this.hostElement = element.nativeElement;
  }
  
  ngOnInit() {
    this.generateChart(); 
  }

  @HostListener('mouseup', ['$event'])
  clickOnGraph(evt: any) {
    this.barChartClick.emit(this.barChart.getElementAtEvent(evt));
  }

  private generateChart() {
    this.barChart = new Chart(this.hostElement, {
      type: 'bar',
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'], // #1. datalabel Trường này cần lưu ý
        datasets: [{
          label: '# of Votes', // #2. xlabel Trường này cần lưu ý
          data: [200, 50, 30, 15, 20, 34], // #2. xvalue Trường này cần lưu ý
          backgroundColor: [ // #4. key này cần làm random theo số lượng cột dữ liệu
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [ // #5. key này cần làm random theo số lượng cột dữ liệu
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
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
