import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  uri = 'http://localhost:3000';

  constructor( private http: HttpClient) { }

  getMetrics(){
    console.log(`Getting Analytics from ${this.uri}/analytics`);
    return this.http.get(`${this.uri}/analytics/`);
  }

  getMetricsByYear(year){
    return this.http.get(`${this.uri}/analytics/${year}}`);
  }

  getMetricsByYearAndMonth(year,month){
    return this.http.get(`${this.uri}/analytics/${year}/${month}`);
  }

}
