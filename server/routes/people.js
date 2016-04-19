var router = require('express').Router();
var pg = require('pg');

var connectionString = require ('../db/connection').connectionString;

router.post('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var result = [];
      var name = req.body.name;
      var address = req.body.address;

      var query = client.query('INSERT INTO people (name, address) VALUES ($1, $2) ' +
                                'RETURNING id, name, address', [name, address]);

      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        done();
        res.send(result);
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        done();
        res.status(500).send(error);
      });
    }
  });
});

module.exports = router;
