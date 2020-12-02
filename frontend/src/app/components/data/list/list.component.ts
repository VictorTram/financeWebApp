import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../../../transaction.model';
import { TransactionService } from '../../../transaction.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  transactions: Transaction[];
  displayedColumns = ['Name', 'Purchase Date', 'Category', 'Price','Necessary', 'Actions'];
  
  constructor(private transactionService: TransactionService, private router: Router) { }

  ngOnInit(): void {
    console.log('ngOnItList');
    this.fetchTransactions();
  }

  fetchTransactions(){
    console.log("Fetching Transactions");
    this.transactionService
    .getTransactions()
    .subscribe( (data: Transaction[]) => {
      console.log("Pulling Data");
      this.transactions = data;
      console.log("Requesting Data...");
      console.log(this.transactions);
    })
  }

  editTransaction(id){
    console.log(`Editing ${id}`);
    this.router.navigate([`/edit/${id}`]);
  }
}
