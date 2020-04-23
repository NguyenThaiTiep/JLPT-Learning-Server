var express = require('express');
var router = express.Router();
var ExamsModel = require('./../model/modelExam')
var isLogin = require('./../model/authModel').checkLogin;


/* GET users listing. */
router.get('/', isLogin, ExamsModel.getAll);
router.get('/exam/:id', isLogin, ExamsModel.getExamById);

router.post('/', isLogin, ExamsModel.update);
module.exports = router;