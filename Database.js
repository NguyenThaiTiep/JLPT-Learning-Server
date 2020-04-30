var mysql = require('mysql');

var pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

pool.getConnection(function(err, connection) {
    console.log(err);
    connection.destroy();
});
//sao day
module.exports = pool;