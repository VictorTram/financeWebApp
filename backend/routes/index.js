var express = require('express');
var router = express.Router();
var transactions = require('../controllers/transactions');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/transactions', transactions.createTransaction);

module.exports = router;
