const { response } = require('../../app');

const pool = require('../../config').pool;

var updateMetrics = function(purchyear,purchmonth){
    var year = purchyear;
    var month = purchmonth;
    var totalspent = 0;
    var numtrans = 0;
    var totalnec = 0;
    var numnec = 0;
    var totalunnec = 0;
    var numunnec = 0;
    var average = 0;

    console.log("Updating Metric");

    pool.query('SELECT * FROM transactions WHERE purchyear=$1 AND purchmonth = $2', [purchyear, purchmonth], (error, results) =>{
        if(error){
            throw error;
        }
        this.transactions = results.rows;
        console.log("Getting Results from Month & Year: " + results.rows);
        results.rows.forEach(trans =>{
            console.log(trans);
            totalspent+=trans.price;
            numtrans++;
            if(trans.necessary){
                totalnec += trans.price;
                numnec++;
            } else{
                totalunnec += trans.price;
                numunnec++;
            }
        })
        average = totalspent/numtrans;
        if(numtrans == 0){
            pool.query('DELETE FROM monthlymetric WHERE year =$1 AND month=$2',
            [year,month],
            (error,result)=>{
                if(error){
                    throw error;
                }
                console.log("Deleted Metric, due to no existing transactions in the month");
            })
        }
    })

    pool.query('SELECT * FROM monthlymetric WHERE year=$1 AND month =$2',[year, month], (error, results) =>{
        if(error){
            throw error;
        }
        console.log(results.rows);
        if(results.rows.length == 0){
            pool.query(
                'INSERT into monthlymetric(year,month,totalspent, numtrans,totalnec,numnec, totalunnec, numunnec, average) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',
                [year,month,totalspent,numtrans,totalnec,numnec,totalunnec,numunnec,average],
                (error, results) => {
                    if(error) {
                        throw error;
                    }
                    console.log(`New Anayltic built`);
                }
            );
            
        } else{
            pool.query(
                'UPDATE monthlymetric set totalspent = $3,numtrans = $4, totalnec =$5,numnec=$6,totalunnec=$7,numunnec=$8,average=$9 where year=$1 AND month=$2',
                [year,month,totalspent,numtrans,totalnec,numnec,totalunnec,numunnec,average],
                (error, results) => {
                    if(error) {
                        throw error;
                    }
                    console.log(`Update Analytic`);
                    
                }
            );
        }
    })
}

var getAnalyticForMonth = function(req,res){
    pool.query('SELECT * FROM monthlymetric WHERE year = $1 AND month = $2',
    [req.params.year,req.params.month], 
    (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}
var getAnaylticForYear = function(req,res){
    pool.query('SELECT * FROM monthlymetric WHERE year = $1',
    [req.params.year], 
    (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

var getAllAnalytics = function(req,res){
    pool.query('SELECT * FROM monthlymetric',
    (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

module.exports = {
    updateMetrics,
    getAllAnalytics,
    getAnalyticForMonth,
    getAnaylticForYear,
};
