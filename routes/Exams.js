var express = require('express');
var router = express.Router();
var ExamsModel = require('./../model/modelExam')


/* GET users listing. */
router.get('/', ExamsModel.getAll);
router.get('/exam/:id', ExamsModel.getUserById);

router.post('/', ExamsModel.update);
module.exports = router;