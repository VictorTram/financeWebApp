import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '../../../transaction.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

/*
This form doesn't require anything to be reactive[1], so we can just use template-driven forms[2] aka [ngModel] to pass values

[1] Direct access to formControl after link is created via [formControl]
[2] Indirect access to formControl. No direct programatic access to formControl.Pull data via ngModel
*/

export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private transactionService: TransactionService, private router: Router){}
  
  currentDate = new Date().toLocaleDateString(
    'en-CA'
  );

  transaction = {
    name: "",
    purchDate: this.currentDate,
    entryDate: this.currentDate,
    labels: '',
    necessary: false,
    price: '',
    description: ''
  };
  
  test(name){
    console.log("Output " + this.transaction.name);
  } 

  createTransaction(){
    console.log("Todays date: " + this.currentDate);
    var date = this.transaction.purchDate.split('-');
    console.log(this.transaction.purchDate);
    console.log(`Adding entry ${this.transaction.name}`);
    this.transactionService.createTransaction(
      this.transaction.name,
      date[0],
      date[1],
      date[2],
      this.transaction.entryDate,
      this.transaction.labels,
      this.transaction.necessary,
      this.transaction.price,
      this.transaction.description)
      .subscribe(()=>{
      this.router.navigate(['/list']);
    })
  }

  ngOnInit(): void {
  }
}