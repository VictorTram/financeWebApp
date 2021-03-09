const {response} = require('../../app');

const pool = require('../../config').pool;
const analytics = require('../analytics/index');
//const transUpdates = require('/transactionUpdates');

var updateAnalytics = (date) => new Promise ((resolve) =>{
    resolve(analytics.updateAnalytics(date));
    //resolve("Done");
})

var getDates = (trans) => new Promise (resolve => {
    var oldDate= {};
    var newDate= {};

    pool.query('SELECT purchyear, purchmonth FROM transactions WHERE id = $1',
        [trans.id],
        (error, results) => {
            if (error) {
                throw error;
            }
            console.log("Breakpoint 1", results.rows[0]);
            date = results.rows[0];       
    });

    pool.query('UPDATE transactions SET name=$1, purchyear=$2, purchmonth = $3, purchday = $4, necessary = $5, labels = $6, price = $7, description = $8 WHERE id = $9',
        [trans.name, trans.year, trans.month, trans.day, trans.necessary, trans.labels, trans.price, trans.description, trans.id,],
        (error, results) => {
            if(error){
                throw error;
            }
            console.log("breakpoint 2");
            newDate.year = trans.year;
            newDate.month = trans.month;
            console.log(newDate);
    });
  
    resolve( [oldDate,newDate]);
})

var createTransaction = function (req,res){
    var date={};
    var name = req.body.name;
    var year = req.body.purchyear;
    var month = req.body.purchmonth;
    var day = req.body.purchday;
    var entrydate = req.body.entrydate;
    var necessary = req.body.necessary;
    var labels = req.body.labels;
    var price = req.body.price;
    var description = req.body.description;

    date.year = year;
    date.month = month;

    //console.log("Creating a new Transaction");
    pool.query(
        'INSERT INTO transactions (name, purchyear, purchmonth, purchday, entrydate, necessary, labels, price, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [name, year, month, day, entrydate, necessary, labels, price, description],
        (error, results) => {
            if(error){
                throw error;
            }
            console.log("test",date.year);
            
            
            //console.log("Creating Transaction");
            updateAnalytics(date)
            .then((result) =>{
                console.log(result);
                res.status(200).send({message: `Transaction with Name: ${name} has been created`});
            })
            .catch((result)=>{
                res.status(400).send({message: 'Encountered issue in creating transaction', error: error});
            });    
        }
    )
}


var updateTransactions = function(req, res){
    var trans = {
        id: req.params.id,
        name: req.body.name,
        year: req.body.purchyear,
        month: req.body.purchmonth,
        day: req.body.purchday,
        necessary: req.body.necessary,
        labels: req.body.labels,
        price: req.body.price,
        description: req.body.description,
    }
    
    getDates(trans)
    .then( async (result)=>{
        console.log(result);
        await updateAnalytics(result[0]);
        await updateAnalytics(result[1]);
    })
    .then( (result)=>{
        console.log("breakpoint 3: Then");
        res.status(200).send({message: `Transaction with Id: ${trans.id} has been modified`, status: result});
    })
    .catch( ( error)=>{
        console.log("breakpoint 4?: Catch");
        res.status(400).send({message: `Error occurred while updating: ${error}`})
    })
    .finally( ()=> {
        //Might not need
    })  

}

var deleteTransactions = function(req, res){
    var date ={};
    pool.query('SELECT purchyear, purchmonth FROM transactions WHERE id=$1',
    [req.params.id],
    (error, results) => {
        if(error){
            throw error;
        }
        console.log("results: ", results)
        date.year = results.rows[0].purchyear;
        date.month = results.rows[0].purchmonth;
    })

    pool.query('DELETE FROM transactions WHERE id = $1',
    [req.params.id],
    (error, results) => {
        if(error){
            throw error;
        }
        console.log("Something", req.params);
        console.log(`Deleted transaction with ID: ${req.params.id}`);
        updateAnalytics(date)
        .then( (result) =>{
            res.status(200).send({message: `Transaction with Id: ${req.params.id} has been deleted`});
        });  
    })
}



// Is this even necessary?
var updates = async(oldDate, newDate) => {
    console.log("breakpoint 3: Update old");
    await updateAnalytics(oldDate);
    console.log("breakpoint 4: Update new");
    await updateAnalytics(newDate);
    return;
}



var getTransaction = function(req, res){
    console.log(`Getting transaction by ID ${req.params.id}`);
    pool.query('SELECT * FROM transactions WHERE id = $1',
    [req.params.id],
    (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

var getTransactions = function(req, res){
    pool.query('SELECT * FROM transactions Order BY id ASC',
    (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

var getTransactionsYearly = function(req, res){
    pool.query('SELECT * FROM transactions WHERE purchyear = $1',
    [req.params.year],
    (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

var getTransactionsMonthly = function(req, res){
    pool.query('SELECT * FROM transactions WHERE purchyear = $1 AND purchmonth = $2',
    [req.params.year, req.params.month],
    (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

module.exports = {
    createTransaction,
    getTransaction,
    getTransactions,
    getTransactionsYearly,
    getTransactionsMonthly,
    updateTransactions,
    deleteTransactions,
};