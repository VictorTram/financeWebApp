const { response } = require('../../app');

const pool = require('../../config').pool;
const analytics = require('../analytics');

var createTransaction = function(req,res){
    var name = req.body.name;
    var purchyear = req.body.purchyear;
    var purchmonth = req.body.purchmonth;
    var purchday = req.body.purchday;
    var entrydate = req.body.entrydate;
    var necessary = req.body.necessary;
    var labels = req.body.labels;
    var price = req.body.price;
    var description = req.body.description;

    console.log("Creating a new Transaction");
    console.log(name);
    console.log(price);
    pool.query(
        'INSERT INTO transactions (name, purchyear, purchmonth, purchday, entrydate, necessary, labels, price, description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', 
        [name, purchyear, purchmonth, purchday, entrydate, necessary, labels, price, description],
        (error, results) => {
            if(error){
                console.log(req);
                throw error;
            }
            res.status(201).send({message: `Transaction added with name: ${name}`});
            analytics.updateMetrics(purchyear,purchmonth);
        }
    );
}

var getTransactions = function(req,res){
    pool.query('SELECT * FROM transactions ORDER BY id ASC', (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

var getTransaction = function(req,res){
    console.log(`Getting transaction by ID ${req.params.id}`);
    pool.query('SELECT * FROM transactions WHERE id=$1', [req.params.id], (error, results) =>{
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

var updateTransactions = function(req,res){
    console.log("Trying to update " + req.body.name);
    var name = req.body.name;
    var purchyear = req.body.purchyear;
    var purchmonth = req.body.purchmonth;
    var purchday = req.body.purchday;
    var necessary = req.body.necessary;
    var labels = req.body.labels;
    var price = req.body.price;
    var description = req.body.description;
    var id = req.params.id;
    console.log(req.params);
    pool.query(
        'UPDATE transactions SET name = $1, purchyear = $2, purchmonth = $3, purchday = $4, necessary = $5, labels = $6, price = $7, description = $8 WHERE id=$9',
        [name, purchyear, purchmonth, purchday, necessary, labels, price, description, id],
        (error, results) => {
            if(error) {
                throw error;
            }
            res.status(200).send({message: `Transaction modified with ID: ${id}`});
            analytics.updateMetrics(purchyear,purchmonth);
        }
    );
}

var deleteTransaction = function(req,res){
    console.log(req.params);
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM transactions WHERE id=$1', [id], (error, results) =>{
        if(error){
            throw error;
        }
        var year = results.rows[0].purchyear;
        var month = results.rows[0].purchmonth;
        

        pool.query('DELETE FROM transactions WHERE id = $1;', [id], (error, results) => {
            if(error){
                res.status(500).send(error);
                throw error;
            }
            res.status(200).json(`User deleted with  ID: ${id}`);
            console.log(`Deleting Transaction with ${year} and ${month}`);
            analytics.updateMetrics(year,month);
        })
        
    });
}


module.exports = {
    createTransaction,
    getTransaction,
    getTransactions,
    updateTransactions,
    deleteTransaction,
};

