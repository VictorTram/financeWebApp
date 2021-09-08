import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MetricsService } from './metrics.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  uri = 'http://localhost:3000';

  constructor( private http: HttpClient, private metricsService: MetricsService) { }

  getTransactions(){
    console.log(`Getting Transactions from ${this.uri}/transactions/`);
    return this.http.get(`${this.uri}/transactions/`);
  }

  getTransactionById(id){
    return this.http.get(`${this.uri}/transactions/${id}`);
  }

  getTransactionsAnnualy(year){
    return this.http.get(`${this.uri}/transactions/list/${year}`);

  }

  getTransactionsMonthly(year,month){
    return this.http.get(`${this.uri}/transactions/list/${year}/${month}`);

  }

  createTransaction(name, purchyear, purchmonth, purchday, entrydate, labels, necessary, price, description){
    const transaction = {
      name: name,
      purchyear: purchyear,
      purchmonth: purchmonth,
      purchday: purchday,
      entrydate: entrydate,
      labels: labels,
      necessary: necessary,
      price: price,
      description: description,
    }
    console.log('Creating new Transaction: ' + transaction.name);
    console.log(transaction);
    return this.http.post(`${this.uri}/transactions/create`, transaction);
  }

  updateTransaction(id, name, purchyear, purchmonth, purchday, labels, necessary, price, description){
    const transaction = {
      name: name,
      purchyear: purchyear,
      purchmonth: purchmonth,
      purchday: purchday,
      labels: labels,
      necessary: necessary,
      price: price,
      description: description,
    }
    console.log(name);
    console.log('Updating Transaction: ' + transaction.name);
    return this.http.put(`${this.uri}/transactions/${id}`, transaction);
  }

  deleteTransaction(id){
    console.log(`Deleting Transaction: ${id}`);
    console.log(`${this.uri}/transactions/${id}`);
    this.metricsService.getMetrics();
    return this.http.delete(`${this.uri}/transactions/${id}`);

  }
}
