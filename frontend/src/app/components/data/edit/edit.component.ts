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
  purchDate: String; 

  constructor(private transactionService: TransactionService, private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      this.id=params.id;
      this.transactionService.getTransactionById(this.id).subscribe(res =>{
        this.transaction = res[0];
        if(this.transaction.purchmonth<10)
          this.transaction.purchmonth = '0' + this.transaction.purchmonth; 
        if(this.transaction.purchday<10)
          this.transaction.purchday = '0' + this.transaction.purchday;
        this.purchDate = this.transaction.purchyear + '-' + this.transaction.purchmonth + '-' + this.transaction.purchday;
      })
    })
  }

  updateTransaction(){
    console.log(this.transaction);
    console.log("necessary: " + this.transaction.necessary);
    console.log("Updating Transaction");
    console.log(this.purchDate);
    var date = this.purchDate.split('-');
    this.transactionService.updateTransaction(
      this.transaction.id,
      this.transaction.name,
      date[0],
      date[1],
      date[2],
      this.transaction.labels,
      this.transaction.necessary,
      this.transaction.price,
      this.transaction.description)
      .subscribe( () =>{
      console.log("Updated Successfully");
      this.router.navigate(['/list']);
    })
  }

}
