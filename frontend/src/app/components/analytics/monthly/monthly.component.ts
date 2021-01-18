import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Metric } from '../../../metrics.model';
import { MetricsService } from '../../../metrics.service';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css']
})
export class MonthlyComponent implements OnInit {

  metrics: Metric[];
  displayedColumns = ['year', 'month', 'totalspent', 'numtrans', 'totalnec', 'numnec', 'totalunnec', 'numunnec', 'average'];
  year: Number;
  month: Number;

  constructor(private metricsService: MetricsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      console.log(this.year);
      this.fetchMetrics(params.year, params.month);
    })

  }

  fetchMetrics(year,month){
    console.log(`Fetching Metrics for Year: ${year}`);
    this.metricsService
    .getMetricsByYearAndMonth(year,month)
    .subscribe( (data: Metric[]) => {
      console.log("Pulling Data");
      this.metrics = data;
      console.log("Requesting Data ...");
      console.log(this.metrics); 
    })
  }

}

