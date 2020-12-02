import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  uri = 'http://localhost:3000';

  constructor( private http: HttpClient) { }

  getTransactions(){
    console.log(`Getting Transactions from ${this.uri}/api/ingredients`);
    return this.http.get(`${this.uri}/transactions/`);
  }

  getTransactionById(id){
    return this.http.get(`${this.uri}/transactions/${id}`);
  }

  createTransaction(name, purchaseDate, entryDate, category,necessary,price,description){
    const transaction = {
      name: name,
      purchaseDate: purchaseDate,
      entryDate: entryDate,
      necessary: necessary,
      price: price,
      description: description,
    }
    console.log('Creating new Transaction: ' + transaction.name);
    return this.http.post(`${this.uri}/transactions/create`, transaction);
  }

  updateTransaction(id, name, purchaseDate, category, necessary, price, description){
    const transaction = {
      name: name,
      purchaseDate: purchaseDate,
      category: category,
      necessary: necessary,
      price: price,
      description: description,
    }
    console.log(name);
    console.log('Updating Transaction: ' + transaction.name);
    console.log('Updating Necessary: ' + transaction.necessary);
    return this.http.put(`${this.uri}/transactions/${id}`, transaction);
  }

  deleteTransaction(id){
    //const transaction = this.getTransactionById(id);
    //console.log(`Deleting Transaction:  ${transaction.name}`)
    console.log(`Deleting Transaction: ${id}`);
    return this.http.delete(`${this.uri}/transactions/${id}`);
  }
}
