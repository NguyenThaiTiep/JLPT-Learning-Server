const sql = require('mysql');
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

// var conn = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });

//kết nối.
// conn.connect(function(err) {
//     //nếu có nỗi thì in ra
//     if (err) throw err.stack;
//     //nếu thành công
//     console.log('connect database success');
// });

module.exports = pool;