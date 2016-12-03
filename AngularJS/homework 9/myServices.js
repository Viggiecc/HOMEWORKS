var serviceApp = angular.module('myService', []);
serviceApp.factory("myUserService", function() {
  var service = {};
  service.users = [
    {id:1, fName:'Hege', lName:"Pege", title:"Manager", sex:"Male", age:"43"},
    {id:2, fName:'Kim', lName:"Pim", title:"Senior Engineer", sex:"Female", age:"34" },
    {id:3, fName:'Sal', lName:"Smith", title:"Junior Engineer", sex:"Male", age:"24" },
    {id:4, fName:'Jack', lName:"Jones", title:"Product Manager", sex:"Male", age:"33" },
    {id:5, fName:'John', lName:"Doe", title:"UI Designer", sex:"Male", age:"26" },
    {id:6, fName:'Peter', lName:"Pan", title:"UX Designer", sex:"Male", age:"28"},
    {id:7, fName:'Peter', lName:"Pan", title:"UX Designer", sex:"Male", age:"28"}

  ];  
  return service;
});