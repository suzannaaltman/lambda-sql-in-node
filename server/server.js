var express = require('express');
var index = require('./routes/index');
var connection = require('./db/connection');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use('/', index);

connection.initialize();

var server = app.listen(port, function() {
  console.log('Listening for requests on port:', server.address().port);
});
