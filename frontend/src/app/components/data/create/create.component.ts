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

  // constructor(
  //   private transactionService: TransactionService, 
  //   private fb: FormBuilder, 
  //   private router: Router) { 
  //     this.createForm = this.fb.group({
  //       name: ['', Validators.required],
  //       purchaseDate: ['', Validators.required],
  //       entryDate: Date.now,
  //       category: '',
  //       necessary: '',
  //       price: '',
  //       description: ''
  //     });
  //   }
  constructor(private transactionService: TransactionService, private router: Router){}

  name = "";

  transaction = {
    name: "",
    purchaseDate: "",
    entryDate: Date.now,
    category: '',
    necessary: false,
    price: '',
    description: ''
  };
  
  test(name){
    console.log("Output " + this.transaction.name);
  } 

  createTransaction(){
    const transaction = this.transaction;
    console.log(`Adding entry ${name}`);
    this.transactionService.createTransaction(transaction.name, transaction.purchaseDate, transaction.entryDate, transaction.category,transaction.necessary,transaction.price,transaction.description).subscribe(()=>{
      // Maybe add a notification when you go back to the List page, that says:
      // 'Transaction: "Something" has been added.
      this.router.navigate(['/list']);
    })
  }

  ngOnInit(): void {
  }
}