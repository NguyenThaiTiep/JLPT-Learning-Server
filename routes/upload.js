var express = require('express');
var json = require('res-json');

var router = express.Router();
router.use(json())

var uploadModel = require('./../model/uploadModel')

router.post('/img', uploadModel.uploadImg);
// router.get('/img/:id', uploadModel.getImg);

module.exports = router;