var express = require('express');
var router = express.Router();
var ExamsModel = require('./../model/examModel')
var isLogin = require('./../model/authModel').checkLogin;


/* GET users listing. */
router.get('/', isLogin, ExamsModel.getAll);
router.get('/:id', isLogin, ExamsModel.getExamById);

router.post('/add', isLogin, ExamsModel.add)
router.delete('/id', isLogin, ExamsModel.remove)
module.exports = router;