var express = require('express');
var router = express.Router();
var transactions = require('../controllers/transactions');
var analytics = require('../controllers/analytics');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Transactions
router.get('/transactions', transactions.getTransactions);
router.get('/transactions/:id', transactions.getTransaction);
router.post('/transactions/create', transactions.createTransaction);
router.put('/transactions/:id', transactions.updateTransactions);
router.delete('/transactions/:id', transactions.deleteTransaction);
//router.get('/transactions/year/:id', transactions.getYearly);
//router.get('/transactions/year/month/:id', transactions.getMonthly);
router.get('/analytics', analytics.getAllAnalytics);
router.get('/analytics/:year/:month', analytics.getAnalyticForMonth);
router.get('/analytics/:year', analytics.getAnaylticForYear);
/* 
router.get('/analytics', analytics.getAverages);

*/
module.exports = router;
