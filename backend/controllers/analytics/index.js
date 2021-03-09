const { response} = require('../../app');

const pool = require('../../config').pool;

var date = {
    year: 0,
    month: 0
};


var collectTransactions = (date) => new Promise( (resolve, reject)=>{ 
    var calculations = {
        totalspent: 0,
        numtrans: 0,
        totalnec: 0,
        numnec: 0,
        totalunnec: 0,
        numunec: 0,
        avg: 0
    }; 
    console.log('Collecting transactions for ', date);
    pool.query('SELECT * FROM transactions WHERE purchyear = $1 AND purchmonth = $2',
    [date.year,date.month],
    (error,results)=>{
        if(error){
            throw error;
        }
        if( results.rows.length == 0){
            reject({
                message: 'Zero Transactions identified',
                date: date
            });
        }
        console.log("Transactions");
        console.log(results.rows[0]);
        results.rows.forEach(trans => {
            console.log(`Adding key: ${trans.id}`);
            calculations.totalspent += trans.price;
            calculations.numtrans++;
            if(trans.necessary){
                calculations.totalnec += trans.price;
                calculations.numnec ++;
            }
            else{
                calculations.totalunnec += trans.price;
                calculations.numunec ++;
            }
        });
        calculations.avg = calculations.totalspent/calculations.numtrans;
        
        resolve(calculations); 
    });
});

var ifEmpty= (date) => new Promise((resolve,reject) => {
    console.log('==> ifEmpty()');

    console.log("date: ", date);
    pool.query('SELECT * FROM monthlymetric WHERE year = $1 AND month = $2',
    [date.year, date.month],
    (error, results)=>{
        if(error){
            throw error;
        }
        console.log("Inside ifEmpty()");
        console.log("ifEmpty() results: " ,results.rows);
        console.log('==> ifEmpty() pool.query. Select * from monthlymetric where DATE');
        if(results.rows.length == 0){
            console.log("results empty");
            reject(date)
        }
        resolve(date);
    })
});


var createMetric = function(date){
    console.log(`Creating new metric for ${date.year} - ${date.month}`);
    pool.query('INSERT into monthlymetric(year,month) VALUES ($1,$2)',
    [date.year, date.month],
    (error, results)=>{
        if(error){
            throw error;
        }
        console.log("---CREATED METRIC ---", date);
        return date;
    })
}

var updateMetrics = async(date, calculations) =>{
    // console.log("---UPDATE METRICS in TABLE ---");
    // console.log(calculations);

    // pool.query('UPDATE monthlymetric set totalspent = $3,numtrans = $4, totalnec =$5,numnec=$6,totalunnec=$7,numunnec=$8,average=$9 WHERE year = $1 AND month = $2',[date.year, date.month, calculations.totalspent, calculations.numtrans, calculations.totalnec, calculations.numnec, calculations.totalunnec, calculations.numunec, calculations.avg],
    // (error, results) => {
    //     if(error){
    //         throw error;
    //     }
    //     console.log(calculations);
    //     console.log(`----Updated Metrics ${date.year} - ${date.month}`); 
    // });
    console.log("---UPDATE METRICS in TABLE ---");
    console.log(date);
    console.log(calculations);

    return new Promise ((resolve, reject)=>{
        pool.query('INSERT into monthlymetric(year,month,totalspent,numtrans,totalnec,numnec,totalunnec,numunnec,average) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',[date.year, date.month, calculations.totalspent, calculations.numtrans, calculations.totalnec, calculations.numnec, calculations.totalunnec, calculations.numunec, calculations.avg])
        .then( (result)=>{
            console.log("Created new Entry");     
            resolve("Update Completed - INSERT");   
            //return "Update completed";
        })
        .catch( (error) => {
            //console.log(error);
            //console.log(result);
            pool.query('UPDATE monthlymetric set totalspent = $3,numtrans = $4, totalnec =$5,numnec=$6,totalunnec=$7,numunnec=$8,average=$9 WHERE year = $1 AND month = $2',[date.year, date.month, calculations.totalspent, calculations.numtrans, calculations.totalnec, calculations.numnec, calculations.totalunnec, calculations.numunec, calculations.avg])
            .then( ()=>{
                console.log("Update Completed");
                resolve("Update Completed");   
            })
            .catch((error)=> console.log);     
        });
    })
    
}

var deleteMetric = (date) => new Promise( (resolve,reject)=>{
    console.log("Deleting Metrics ", date);

    pool.query('DELETE FROM monthlymetric WHERE year=$1 AND month=$2',
    [date.year, date.month])
    .then( ()=>{
        console.log(`Deleted Metric, due to no existing transactions in ${date.year} - ${date.month}`);
        resolve("Deletion completed");
    })
});

var updateAnalytics =  async(date) => {
    this.date =date; 
    console.log('---UPDATE METRIC ----', date);
    await collectTransactions(date)
    .then( async(result) =>{
        console.log("First Then ", result);
        await updateMetrics(date, result);
        console.log("Finishing Then");
    })
    .catch( async(result) =>{
        console.log("First Catch ", result);
        await deleteMetric(date);
    })
    console.log("Finishing Promise");
    return "Completed";
}

var getAnalyticForMonth = function(req, res){
    pool.query('SELECT * FROM monthlymetric WHERE year=$1 AND month=$2',
    [req.params.year, req.params.month],
    (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

var getAnalyticForYear = function(req, res){
    pool.query('SELECT * FROM monthlymetric WHERE year=$1',
    [req.params.year],
    (error, results) => {
        if(error){
            throw errorl
        }
        res.status(200).json(results.rows);
    })
}

var getAllAnalytics = function(req, res){
    pool.query('SELECT * FROM monthlymetric', 
    (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })

}

module.exports = {
    updateAnalytics,
    getAllAnalytics,
    getAnalyticForMonth,
    getAnalyticForYear,
}
/*
What goes on here

When updating a transaction, we will need to check if the date changed. If the date changed, then we will need to update both the metric entry that the old transaction date applied for, as well as the new

ie.
if (oldDate == newDate )
 // No need to update both
    updateQuery(newDate)
        SELECT * FROM transactions WHERE purchyear=year AND purchmonth=month => results
        results.rows.forEach(trans =>{
            calculateMetrics()
        })
        // If monthly metric does NOT exist in metrics, then












*/