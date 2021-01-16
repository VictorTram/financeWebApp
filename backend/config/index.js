const Pool = require('pg').Pool;

var pool = new Pool ({
    user: 'me',
    host: 'localhost',
    database:'api',
    password: 'password',
    port: 5432
});

exports.pool = pool;