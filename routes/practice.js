var express = require('express');
var router = express.Router();
var practiceModel = require('./../model/practiceModel')


/* GET users listing. */
router.get('/:level/:type', practiceModel.getAll);
router.get('/:level/:type/:id', practiceModel.getPracticeById);

router.post('/', practiceModel.add);
router.delete('/', practiceModel.remove);

module.exports = router;