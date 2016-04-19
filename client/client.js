var app = angular.module('myApp', []);

app.controller('PersonController', ['$http', function(bananaSandwich){
  var person = this;

  person.name = '';
  person.address = '';

  person.sendData = function() {
    bananaSandwich.post('/people',
      {name: person.name, address: person.address})
      .then(function(serverResponse){
        console.log('this: ', this);
        console.log('person: ', person);
        console.log(serverResponse);
      });
  };
}]);
