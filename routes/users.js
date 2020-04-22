var express = require('express');
var router = express.Router();
var userModel = require('./../model/userModel')


/* GET users listing. */
router.get('/:id', userModel.getUserById);
router.put('/:id', userModel.update)
router.post('/checkPassword', userModel.checkPassWord)
module.exports = router