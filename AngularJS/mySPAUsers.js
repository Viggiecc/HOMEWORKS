
var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "main.html",
    controller: "mainCtrl"
  })
  .when("/newUser", {
    templateUrl: "createNewUser.html",
    controller: "newUserCtrl"
  })
  .when("/editUser", {
    templateUrl: "editUser.html"
  });
});

app.controller('mainCtrl', function($scope) {
  $scope.users = [
    {id:1, fName:'Hege', lName:"Pege", title:"Manager", sex:"Male", age:"43"},
    {id:2, fName:'Kim', lName:"Pim", title:"Senior Engineer", sex:"Female", age:"34" },
    {id:3, fName:'Sal', lName:"Smith", title:"Junior Engineer", sex:"Male", age:"24" },
    {id:4, fName:'Jack', lName:"Jones", title:"Product Manager", sex:"Male", age:"33" },
    {id:5, fName:'John', lName:"Doe", title:"UI Designer", sex:"Male", age:"26" },
    {id:6, fName:'Peter', lName:"Pan", title:"UX Designer", sex:"Male", age:"28"}
  ];  

  $scope.editUser = function(id) {
    // $scope.hideform = false;
    if (id == 'new') {
      $scope.edit = true;
      $scope.createUser = true;
      $scope.incomplete = true;
      $scope.newfName = "";
      $scope.newlName = ""; 
      $scope.newTitle = ""; 
      $scope.newSex = ""; 
      $scope.newAge = "";
      $scope.newpassw1 = "";
      $scope.newpassw2 = "";

    } else {
      $scope.edit = true;
      $scope.editUser = true;
      $scope.incomplete = true;
      for(var i = 0; i < $scope.users.length; i++) {
        if($scope.users[i].id == id) {
          $scope.newfName = $scope.users[i].user.fName;
          $scope.newlName = $scope.users[i].user.lName; 
          $scope.newTitle = $scope.users[i].user.title; 
          $scope.newSex = $scope.users[i].user.sex; 
          $scope.newAge = $scope.users[i].user.age; 
        }
      }
      
    }
  }

  $scope.orderByParemeter = function(p) {
    $scope.myOrderBy = p;
  }

  var getUserById = function(id) {
    var start = 0;
    var end = $scope.users.length - 1;
    console.log("end:" + end);
    var result = {
      indexOfUser: 0, 
      user: {}
    };
    while (start + 1 < end) {
      var mid = Math.floor(start + (end - start) / 2);
      if ($scope.users[mid].id == id) {
        result.indexOfUser = mid;
        result.user = $scope.users[mid];
        return result;
      } else if ($scope.users[mid].id > id) {
        end = mid;
      } else {
        start = mid;
      }
    }
    if ($scope.users[start].id == id) {
      result.indexOfUser = start;
      result.user = $scope.users[start];
      return result;
    }
    if ($scope.users[end].id == id) {
      result.indexOfUser = end;
      result.user = $scope.users[end];
      return result;
    }
    return result;
  }

  $scope.deleteUser = function(id) {
    var userIndex = getUserById(id).indexOfUser;
    $scope.users.splice(userIndex, 1);
  }
});

app.controller('newUserCtrl', function($scope) {
  $scope.newfName = '';
  $scope.newlName = '';
  $scope.newTitle = '';
  $scope.newSex = '';
  $scope.newAge = '';
  $scope.newpassw1 = '';
  $scope.newpassw2 = '';

  $scope.saveUser = function() {
    console.log($scope.users);
    var curSize = $scope.users.length;
    if ($scope.createUser) {
      $scope.users.splice(curSize, 0, {});
      $scope.users[curSize].id = curSize+1;
      console.log($scope.users[curSize].id);
      $scope.users[curSize].fName = $scope.newfName;
      $scope.users[curSize].lName = $scope.newlName;
      $scope.users[curSize].title = $scope.newTitle;
      $scope.users[curSize].sex = $scope.newSex;
      $scope.users[curSize].age = $scope.newAge;
      $scope.hideform = true;
    } 
  }

});

app.controller('editUserCtrl', function($scope) {
  $scope.newfName = '';
  $scope.newlName = '';
  $scope.newTitle = '';
  $scope.newSex = '';
  $scope.newAge = '';
  $scope.newpassw1 = '';
  $scope.newpassw2 = '';
});
