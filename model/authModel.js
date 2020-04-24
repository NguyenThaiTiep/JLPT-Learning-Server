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
module.exports.login = async(req, res) => {

    var body = req.body;
    if (body.length == 0) res.json({ status: "fails" })
    var email = body.email;
    var password = md5(body.password);


    var qr = "SELECT u.name FROM users AS u WHERE u.email =\'" + email + "\' AND  u.password = \'" + password + "\'";
    var result = await queryFunc(qr);
    if (result.length === 0) {
        res.json({
            status: "fail"
        })
        return;
    }

    var token = generateToken(result.id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + 24 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.cookie('login', token, cookieOptions);

    res.json({
        status: "ok",
        cookies: token
    })
}
module.exports.logout = async(req, res) => {
    res.clearCookie("login");
    res.send("redirect login");
}
module.exports.create = async(req, res) => {
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
    if (errArr.length > 0) {
        res.send({ "err": errArr });
        return;
    }
    var qr = "SELECT u.name FROM users AS u WHERE u.email =\'" + email + "\'";
    var resultUser = await queryFunc(qr);
    if (resultUser.length > 0) {
        res.send("user already exists ");
        return;
    }
    var qr = "INSERT INTO `users` (`name`, `email`, `password`, `id`) VALUES ('" +
        name + "\', \'" + email + "\', \'" + password + "\', NULL);";
    var user = await queryFunc(qr);
    res.send("create user success");
}
module.exports.checkLogin = (req, res, next) => {
    if (req.cookies.login) {
        next();
    } else {
        res.send('you need login');
    }
}