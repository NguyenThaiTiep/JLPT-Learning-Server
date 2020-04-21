var express = require('express');
var router = express.Router();
var userModel = require('./../model/userModel')


/* GET users listing. */
router.get('/:id', userModel.getUserById);
router.post('/', userModel.update)
module.exports = router;