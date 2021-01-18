import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../../../transaction.model';
import { TransactionService } from '../../../transaction.service';

@Component({
  selector: 'app-list-annual',
  templateUrl: './list-annual.component.html',
  styleUrls: ['./list-annual.component.css']
})
export class ListAnnualComponent implements OnInit {

  transactions: Transaction[];
  displayedColumns = ['Name', 'Purchase Date', 'Category', 'Price','Necessary', 'Actions'];
  year: Number;
  month: Number;
  
  constructor(private transactionService: TransactionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('ngOnItList');
    this.route.params.subscribe( params => {
      console.log(params);
      this.year=params.year;
      this.month=params.month;
      this.fetchTransactions(this.year);
    })
  }

  fetchTransactions(year){
    console.log("Fetching Transactions");
    this.transactionService
    .getTransactionsAnnualy(year)
    .subscribe( (data: Transaction[]) => {
      console.log("Pulling Data");
      this.transactions = data;
      console.log("Requesting Data...");
      console.log(this.transactions[1]);
    })
  }

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
    this.transactionService.deleteTransaction(id);
    this.fetchTransactions(this.year);
  }

}


