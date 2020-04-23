const db = require('./../Database')

const util = require('util');
const jwt = require('jsonwebtoken')
const md5 = require('md5');

const queryFunc = util.promisify(db.query).bind(db);
const generateToken = (id) => {
    return jwt.sign({
        id
    }, 'secret', { expiresIn: 60 * 60 });

}
module.exports.login = (req, res) => {
    // var body = req.body;
    // var email = body.email;
    // var password = md5(body.password);

    // var qr = "SELECT u.name FROM users AS u WHERE u.email =\'" + email + "\' AND  u.password = \'" + password + "\'";
    // var result = await queryFunc(qr);
    // if (result.length === 0) res.json({
    //     status: "fail"
    // })

    var token = generateToken("123");

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRED_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.cookie('jwt', token, cookieOptions);

    res.json({
        status: "ok",
        token
    })
}
module.exports.logout = (req, res) => {
    console.log(req.cookie);
}
module.exports.create = (req, res) => {
    var errArr = [];
    var body = req.body;
    var name = body.name;
    var email = body.email;
    var password = md5(body.password);
    if (!email) {
        errArr.push("invalid email");
    }
    if (!name) {
        errArr.push("invalid name");
    }
    if (!password) {
        errArr.push("invalid password");
    }
    // var ERR = {errArr};
    if (errArr.length > 0) {
        res.send({ "err": errArr });
        return;
    }
    var qr = "SELECT u.name FROM users AS u WHERE u.email =\'" + email + "\'";
    db.query(qr, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send("Account already exists");
        } else {
            addUser();
            res.send("created account success");
        }
    })

    function addUser() {
        var qr = "INSERT INTO `users` (`name`, `email`, `password`, `id`) VALUES ('" +
            name + "\', \'" + email + "\', \'" + password + "\', NULL);";
        console.log(qr);
        db.query(qr, (err, result) => {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) add");
        })
    }
}