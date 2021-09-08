import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Metric } from '../../../metrics.model';
import { MetricsService } from '../../../metrics.service';
import { Transaction } from '../../../transaction.model';
import { TransactionService } from '../../../transaction.service';
import { SummaryComponent } from '../../analytics/summary/summary.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @ViewChild('SummaryComponent') summaryComponent:SummaryComponent;

  transactions: Transaction[];
  metrics: Metric[];
  displayedColumns = ['Name', 'Purchase Date', 'Category', 'Price','Necessary', 'Actions'];
  
  constructor(private transactionService: TransactionService, private metricsService: MetricsService, private router: Router) { }

  ngOnInit(): void {
    console.log('ngOnItList');
    this.fetchTransactions();
  }

  fetchTransactions= () => {
    console.log("Fetching Transactions");
    this.transactionService
    .getTransactions()
    .subscribe( (data: Transaction[]) => {
      console.log("Pulling Data");
      this.transactions = data;
      console.log("Requesting Data...");
      console.log(this.transactions[1]);
    })
    //this.summaryComponent.fetchTransactions();
  }

  // fetchMetrics = () => {
  //   console.log("Fetching Analytics");
  //   this.metricsService
  //   .getMetrics()
  //   .subscribe( (data: Metric[]) =>{
  //     console.log("Pulling Metrics");
  //     this.metrics = data;
  //     console.log("Requesting Metrics...");
  //   })
  // }

  detailsTransaction(id){
    console.log(`Getting Details for Transaction: ${id}`);
    this.router.navigate([`details/${id}`]);
  }

  editTransaction(id){
    console.log(`Editing ${id}`);
    this.router.navigate([`/edit/${id}`]);
  }

  deleteTransaction(id){
    console.log(`Deleting ${id}`);
    this.transactionService.deleteTransaction(id)
    .subscribe(() => {
      
      this.metricsService.getMetrics();
      this.fetchTransactions();
      location.reload();
      this.router.navigate([`/list`]);
      SummaryComponent ;
    });
    
  }

}
/*
Will need to figure out how to trigger the analytic's page to refresh

*/