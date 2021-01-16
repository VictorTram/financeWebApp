import { Component, OnInit } from '@angular/core';
import { Metric } from '../../../metrics.model';
import { MetricsService } from '../../../metrics.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  metrics: Metric[];
  displayedColumns = ['year', 'month', 'totalspent', 'numtrans', 'totalnec', 'numnec', 'totalunnec', 'numunnec', 'average'];

  constructor(private metricsService: MetricsService) { }

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(){
    console.log("Fetching Transactions");
    this.metricsService
    .getMetrics()
    .subscribe( (data: Metric[]) => {
      console.log("Pulling Data");
      this.metrics = data;
      console.log("Requesting Data ...");
      console.log(this.metrics);

      
    })
  }
}

/*
Biggest challenge of this project....
1) First pull the data in? We're looking at populating the data Array with all the transaction datas.
2) Then we're to calculate the main stuff we need... We could have something like a monthly average? Or even a 2D array Average[year][month]
Our MVP requires us to have a Table with the Averages... Maybe no averages yet? This could be an additional metric at the bottom
              | January | February | March |...?
--------------------------
Rent          |
Grocery Spend |
Snack Spend   |
--------------------------
Total Spend   |
--------------------------
Remaining     |


- Remaining would require us to input how much I'm making... Seems like a Non-Functional Req...
- Since the only definer we have at the moment is Necessary/Unecessary, we just need 2 categories
- Do we need months? I'd say we do...
              | January | February | March |...?
--------------------------
Necess. Spend |
Unneces Spend |
--------------------------
Total Spend   |
--------------------------
Remaining     |


So for above We'd first need to sort things by year, then month into a 2D array
then those transactions will then be filtered through a 'result' array which is for the table above^ This might even be a 3D array?

purchDate:{
  year: String,
  month: String,
  day: String
}

We're gonna want to have 2 sets of averages or analytics?
Annual

year: String ,
monthlyStats: {
  date:{
    month: String,
    day: String
  },
  average: int,
  totalNec: int,
  totalUn: int,
  totalSpent: int,
}





yearlyStats: {
  year: String,
  average: integer,
  totalNec: integer,
  totalUn: integer,
  totalSpent: integer,
}

Given: a List wil ALL transactions
Res: 1 List that has the above parameters


1) Get first transaction
 - Look at Date:
  - If analytics[]


var annualAnalytics = [];

someFunction(){



}

1)
annualMonthly: {
  year: String ,
  monthlyStats: []
}

2)
monthlyStats = {
  month: String/Int,
  average: int,
  totalNec: int,
  totalUn: int,
  totalSpent: int,
}

3)
annualStat = {
  year: String,
  average: int,
  totalNec: int,
  totalUn: int,
  totalSpent: int,
  numTrans: int,
}

> Get 2020

for( this.transactions[0->10]){
  var trans = this.transaction[i];
  var monthlyStats =[];
  // Just like in create.component.ts, we'd need to initialize an empty set.
  // So initialize an empty set for January(01) -> Dec(12);
  var months = ["01","02",....,"12"];
  months.forEach(function(month){
    var set = {};
    set["month"]=month;
    set["average"] = 0;
    set["totalNecSum"] = 0;
    set["numNecTrans"] = 0;
    set["totalUnSum"] = 0;
    set["numUnTrans"] = 0;
    set["totalSpent"] = 0;
    set["numTrans"] = 0;
    monthlyStat.push(set);
  }
  
  
  {
    stats = {};
    stats["month"] = month;
    if(this.trans.necessary)
      stats["totalNec"]+=this.trans.price
    else
      stats["totalUn"]+=this.trans.price
    stats["totalSpent"]+=this.trans.price.
    stats["numTrans"]++;
  })
}
this.annualStat[1] ; // This is January
  if()
)

First we'd need to get a list of all the years?
for( this.transaction [0 ->10] ){
  
}


This is where the limitations of a NoSQL DB occur.

It would be simplier if we could just return a table of
SQL> SELECT * FROM transaction_table WHERE YEAR = "2020"

PostgresSQL
Database




CREATE TABLE transactions (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
)



INSERT INTO users (name, email)
  VALUES ('Jerry', 'jerry@example.com'), ('George', 'george@example.com');

INSERT INTO transactions 
  VALUES (1, 'Freshco', 2020,12,24, '2020-12-26', True, 'Groceries, food, snacks', 43.98);

INSERT INTO transactions VALUES (2, 'T&T', 2020,12,16, '2020-12-26', False, 'Groceries, snacks', 63.98);
INSERT INTO transactions(name,purchyear,purchmonth,purchday,entrydate,necessary,labels,price ) VALUES ('Rexall', 2020,12,05, '2020-12-26', True, 'toiletries', 13.98);
  */