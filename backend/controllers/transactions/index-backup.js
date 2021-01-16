const Transaction = require('../../models/transactions');

var createTransaction = function(req,res){
    let transaction = new Transaction(req.body);
    transaction.save((err,transaction) =>{
        if(err){res.send(500,err);}
        res.json(200,transaction);
    })
}

var getTransactions = function(req,res){
    Transaction.find(function(err,transactions){
        if(err){res.send(500,err);}
        res.json(200,transactions);
    });
}

var getTransaction = function(req,res){
    Transaction.findById(req.params.id, function(err,transaction){
        if(err){res.send(500,err);}
        if(transaction){res.json(200,transaction);}
    });
}

var updateTransactions = function(req,res){
    console.log("Trying to update \"" + req.body.name);
    Transaction.findById(req.params.id, function(err, transaction){
        if(err){res.send(500,err);}
        
        if(req.body.name){ transaction.name = req.body.name;}
        if(req.body.purchaseDate){ transaction.purchaseDate = req.body.purchaseDate};
        if(req.body.category){ transaction.category = req.body.category;}
        transaction.necessary = req.body.necessary;
        if(req.body.price){ transaction.price = req.body.price;}
        if(req.body.description){ transaction.description = req.body.description;}

        transaction.save((err,transaction)=> {
            if(err){res.send(500,err);}
            console.log("Am I successful?")
            res.status(200).json(transaction);
        });
    })
}

var deleteTransaction = function(req,res){
    Transaction.findByIdAndDelete(req.params.id, function(err,transaction){
        if(err){res.send(500,err);}
        if(transaction){
            console.log("Transaction \"" + transaction.name + "\" has been deleted");
            res.json(200, 'deleted: true');
        }
    })
}
module.exports = {
    createTransaction,
    getTransaction,
    getTransactions,
    updateTransactions,
    deleteTransaction,
};
