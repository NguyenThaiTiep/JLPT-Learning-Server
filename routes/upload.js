var express = require('express');
var json = require('res-json');

var router = express.Router();
router.use(json())

var uploadModel = require('./../model/uploadModel')
var isLogin = require('./../model/authModel').checkLogin;

router.post('/', isLogin, uploadModel.uploadFile);
router.get('/:type/:name', uploadModel.getFile);

module.exports = router;