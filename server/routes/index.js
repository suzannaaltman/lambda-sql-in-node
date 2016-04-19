var express = require('express');
var router = express.Router();
var path = require('path');
var people = require('./people');

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.use('/people', people);

module.exports = router;
