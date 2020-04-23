var express = require('express');
var router = express.Router();
var practiceModel = require('./../model/practiceModel')
var isLogin = require('./../model/authModel').checkLogin;

/* GET users listing. */
router.get('/:level', isLogin, practiceModel.getAllByLevel);
router.get('/:level/:type', isLogin, practiceModel.getAll);
router.get('/:level/:type/:id', isLogin, practiceModel.getPracticeById);


router.post('/', isLogin, practiceModel.add);
router.delete('/', isLogin, practiceModel.remove);

module.exports = router;