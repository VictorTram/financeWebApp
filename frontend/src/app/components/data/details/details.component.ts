import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../../transaction.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: String;
  transaction: any = {};

  constructor(private transactionService: TransactionService, private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    console.log('ngOnItList');
    this.route.params.subscribe( params => {
      this.id=params.id;
      this.transactionService.getTransactionById(this.id).subscribe(res => {
        this.transaction = res[0];
        console.log(this.transaction);
      })
    })
  }

  
}
