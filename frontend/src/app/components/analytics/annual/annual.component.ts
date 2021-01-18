import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Metric } from '../../../metrics.model';
import { MetricsService } from '../../../metrics.service';

@Component({
  selector: 'app-annual',
  templateUrl: './annual.component.html',
  styleUrls: ['./annual.component.css']
})
export class AnnualComponent implements OnInit {
  metrics: Metric[];
  displayedColumns = ['year', 'month', 'totalspent', 'numtrans', 'totalnec', 'numnec', 'totalunnec', 'numunnec', 'average'];
  year: Number;

  constructor(private metricsService: MetricsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.year = params.year;
      console.log(this.year);
      this.fetchMetrics(this.year);
    })

  }

  fetchMetrics(year){
    console.log(`Fetching Metrics for Year: ${year}`);
    this.metricsService
    .getMetricsByYear(year)
    .subscribe( (data: Metric[]) => {
      console.log("Pulling Data");
      this.metrics = data;
      console.log("Requesting Data ...");
      console.log(this.metrics); 
    })
  }

}
