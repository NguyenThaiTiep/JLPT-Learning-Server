var express = require('express');
var json = require('res-json');

var router = express.Router();
router.use(json())

var uploadModel = require('./../model/uploadModel')
var isLogin = require('./../model/authModel').checkLogin;

router.post('/img', isLogin, uploadModel.uploadImg);
// router.get('/img/:id', uploadModel.getImg);

module.exports = router;