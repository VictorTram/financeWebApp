var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var TransactionSchema = new mongoose.Schema({
    name: String,
    purchaseDate: String,
    entryDate: {
        type:
            Date,
            default: Date.now
    },
    category: String,
    necessary: Boolean,
    price: String,
    description: String,
});

module.exports = mongoose.model('Transaction', TransactionSchema);
