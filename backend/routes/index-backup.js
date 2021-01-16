var express = require('express');
var router = express.Router();
var transactions = require('../controllers/transactions');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/transactions', transactions.getTransactions);
router.get('/transactions/:id', transactions.getTransaction);
router.post('/transactions/create', transactions.createTransaction);
router.put('/transactions/:id', transactions.updateTransactions);
router.delete('/transactions/:id', transactions.deleteTransaction);

module.exports = router;
