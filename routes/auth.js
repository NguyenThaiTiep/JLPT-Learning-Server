var express = require('express');
var router = express.Router();
var authModel = require('./../model/authModel')

router.get('/login', authModel.login);
router.post('/login', authModel.login);
router.post('/create', authModel.create);

router.get('/', (req, res) => { res.send('Home') })

module.exports = router;