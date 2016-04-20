var app = angular.module('myApp', []);

app.controller('PersonController', ['$http', function($http){
  var person = this;
  person.people = [];
  person.name = '';
  person.address = '';
  person.city = '';
  person.state = '';
  person.zip_code = '';

  person.sendData = function() {
    console.log('call sendData');
    $http.post('/people',
      {name: person.name, address: person.address, city: person.city, state: person.state, zip_code: person.zip_code})
      .then(function(serverResponse){
        person.getData();
        console.log('this: ', this);
        console.log('person: ', person);
        console.log(serverResponse);
      });
  };
  person.getData = function(){
    console.log('calling getData');
    $http.get('/people').then(function(response){
      console.log('response:',response);
      console.log('response.data',response.data);
       person.people  = response.data;
       console.log(person.people);


    })
  }
  person.getData();
}]);
