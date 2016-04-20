var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = require('../db/connection');
var connectionString = connection.connectionString;

// matches /people because of how this is mounted in index.js
router.post('/', function(req, res){
  console.log(req.body);
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      var name = req.body.name;
      var address = req.body.address;
      var city = req.body.city;
      var state = req.body.state;
      var zip_code = req.body.zip_code;

      // store all the rows here
      var results = [];

      var query = client.query('INSERT INTO people (name, address, city, state, zip_code)' +
                               ' VALUES ($1, $2, $3, $4, $5) RETURNING id, name, address, city, state, zip_code',
                                [name, address, city, state, zip_code]);

      query.on('error', function(error){
        console.log(error);
        done();
        res.sendStatus(500);
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        done();
        res.send(results);
      });
    }
  });
});

router.get('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM people');
      var results = [];

      query.on('error', function(error){
        console.log(error);
        done();
        res.sendStatus(500);
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        done();
        res.send(results);
      });
    }
  });
});

// router.get('/all', function(req, res){
//   pg.connect(connectionString, function(err, client, done){
//     if(err){
//       console.log(err)
//       res.sendStatus(500);
//     } else {
//       var query = client.query('SELECT')
//     }
//   })
// })

module.exports = router;
