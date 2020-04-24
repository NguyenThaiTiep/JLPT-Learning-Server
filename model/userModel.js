const db = require('./../Database')
const md5 = require('md5');
const util = require('util');

var queryFunc = util.promisify(db.query).bind(db);
module.exports.getUserById = function(req, res) {
    var id = req.params.id;
    var qr = "SELECT * FROM users AS u WHERE u.id =\'" + id + "\'";
    console.log(qr);
    var result = queryFunc(qr);
    if (result.length == 0) {
        res.send({ status: "ok" });
        return;
    }
    res.send(result);
}
module.exports.update = (req, res) => {
    var id = req.params.id;
    var body = req.body;
    var name = body.name;
    var email = body.email;
    var password = md5(body.password);
    var qr = " UPDATE users " +
        "SET " +
        "name = \'" + name + "\', " +
        "email = \'" + email + "\', " +
        "password = \'" + password + "\' " +
        "WHERE " +
        "id = \'" + id + "\' ";
    var result = queryFunc(qr);
    res.send('Update');
}
module.exports.checkPassWord = (req, res) => {
    var body = req.body;
    var id = body.id;
    var password = md5(body.password);

    var qr = "SELECT u.password FROM users AS u WHERE u.id = \'" + id + "\'";
    db.query(qr, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.send("user doesn't exits");
            return;
        }
        if (result[0].password === password) {
            res.send("correct password");
        } else {
            res.send("incorrect password");
        }
    })
}