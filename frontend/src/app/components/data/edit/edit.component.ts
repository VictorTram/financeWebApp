import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../../transaction.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  transaction: any = {};

  constructor(private transactionService: TransactionService, private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      this.id=params.id;
      this.transactionService.getTransactionById(this.id).subscribe(res =>{
        this.transaction = res;
      })
    })
  }

  updateTransaction(){
    console.log(this.transaction);
    console.log("necessary: " + this.transaction.necessary)
    console.log("Updating Transaction")
    this.transactionService.updateTransaction(this.transaction._id,this.transaction.name,this.transaction.purchaseDate,this.transaction.category,this.transaction.necessary,this.transaction.price,this.transaction.description).subscribe( () =>{
      console.log("Updated Successfully");
      this.router.navigate(['/list']);
    })
  }

}
