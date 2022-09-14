import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [],
})
export class DonutComponent implements OnInit {
  @Input()
  title = 'No Title';

  @Input()
  labels: string[] = ['Label1', 'Label2', 'Label3'];

  @Input()
  data: number[] = [];

  barChartData?: ChartData<'doughnut'>;

  ngOnInit(): void {
    this.barChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
        },
      ],
    };
  }
}
