var pg = require('pg');

var connectionString = 'postgres://localhost:5432/lecture';

var initialize = function() {
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      // create initial schema
      var query = client.query('CREATE TABLE IF NOT EXISTS people (' +
      'id serial PRIMARY KEY,' +
      'name varchar(80) NOT NULL,' +
      'address text)');

      query.on('end', function(){
        console.log('Successfully created schema');
        done();
      });

      query.on('error', function(error){
        console.log('Error creating schema', error);
        process.exit(1);
      });
    }
  });
};

module.exports.connectionString = connectionString;
module.exports.initialize = initialize;
