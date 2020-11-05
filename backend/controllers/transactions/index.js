const Transaction = require('../../models/transactions');

var createTransaction = function(req,res){
    let transaction = new Transaction(req.body);
    transaction.save((err,transaction) =>{
        if(err){res.send(500,err);}
        res.json(200,transaction);
    })
}

module.exports = {
    createTransaction
};
