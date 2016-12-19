
var app = angular.module('myApp', ["ngRoute"]);

app.config(['$routeProvider',function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "list.html",
    controller: "mainCtrl"
  })
  .when("/newUser", {
    templateUrl: "create.html",
    controller: "newUserCtrl"
  })
  .when("/:num", {
    templateUrl: "list.html",
    controller: "mainCtrl"
  })
  .when("/editUser/:param", {
    templateUrl: "edit.html",
    controller: "editUserCtrl"
  });
}]);

app.factory('userService', function($http) {
  var userServ = {};
  userServ.getUsers = function() {
    return $http.get('http://localhost:3000/users');
  };

  return userServ; 
});

app.controller('mainCtrl', function($scope, $http, userService, $routeParams) {
  console.log("start");
  // $scope.users = userService.users;
  $scope.users = [];

  var getUsersFromServer = function() {
    userService.getUsers()
      .then(function mySuccess(response) {
        $scope.users = response.data;
        $scope.showPage($scope.currentPage);
      }, function myError(response){
        $scope.message = response.statusText;
      });
  };

  getUsersFromServer();
  // console.log("current users: " + $scope.users);
  $scope.currentPage = 1;
  $scope.numPerPage = 3;
  $scope.showPage = function(num) {
    // $scope.groupedUser = $scope.users.slice(0, $scope.numPerPage);
    // var num = $routeParams.param;
    $scope.curPage= $scope.getPage($scope.users.length, num, $scope.numPerPage);
    // get current page of items
    $scope.usersList = $scope.users.slice($scope.curPage.startIndex, $scope.curPage.endIndex + 1);
  }

  $scope.getPage = function(usersSize, currentPage, numPerPage) {
        // default to first page
        $scope.currentPage = currentPage || 1;
 
        // default page size is 3
        $scope.numPerPage = numPerPage || 3;
 
        // calculate total pages
        $scope.totalPages = Math.ceil(usersSize / $scope.numPerPage);
        
        var startPage, endPage;
        if ($scope.totalPages <= 3) {
            // less than 3 total pages so show all
            startPage = 1;
            endPage = $scope.totalPages;
        } else {
            // more than 3total pages so calculate start and end pages
            if ($scope.currentPage <= 2) {
                startPage = 1;
                endPage = 3;
            } else if ($scope.currentPage + 1 >= $scope.totalPages) {
                startPage = $scope.totalPages - 2;
                endPage = $scope.totalPages;
            } else {
                startPage = $scope.currentPage - 1;
                endPage = $scope.currentPage + 1;
            }
        }
 
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * $scope.numPerPage;
        var endIndex = Math.min(startIndex + $scope.numPerPage - 1, usersSize - 1);
 
        // create an array of pages to ng-repeat in the pager control
        var arr= [];
        for (var i = startPage; i <= endPage; i++) {
          arr.push(i);
        }
        $scope.pages = arr;
        // return object with all pager properties required by the view
        return {
            usersSize: usersSize,
            currentPage: $scope.currentPage,
            numPerPage: $scope.numPerPage,
            totalPages: $scope.totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: $scope.pages
        };
  }

  
  $scope.orderByParemeter = function(p) {
    $scope.myOrderBy = p;
  }

  $scope.deleteUser = function(id) {
    for (var i = 0; i < $scope.users.length; i++) {
      console.log(id);
      if ($scope.users[i].id == id) {
        $scope.users.splice(i, 1);
        console.log($scope.users);
      }
    }

    if ($scope.users.length == 0) {
      $scope.usersList = [];
    } 
    if ($scope.currentPage == $scope.totalPages) {
      $scope.showPage($scope.totalPages);
      $scope.currentPage--;
    } else {
      $scope.showPage($scope.currentPage);
    }
  };

});

app.controller('newUserCtrl', function($scope, userService) {
  // $scope.users = userService.users;
  var getUsersFromServer = function() {
    userService.getUsers()
      .then(function mySuccess(response) {
        $scope.users = response.data;
      }, function myError(response){
        $scope.message = response.statusText;
      })
  };

  getUsersFromServer();
  $scope.error = false;
  $scope.incomplete = true;
  var curSize = $scope.users.length;

  $scope.saveUser = function() {
    
    $scope.users.splice(curSize, 0, {});
    $scope.users[curSize].id = curSize+1;
    $scope.users[curSize].fName = $scope.newfName;
    $scope.users[curSize].lName = $scope.newlName;
    $scope.users[curSize].title = $scope.newTitle;
    $scope.users[curSize].sex = $scope.newSex;
    $scope.users[curSize].age = $scope.newAge;
    console.log($scope.users);
  }


  $scope.$watch('newpassw1',function() {$scope.test();});
  $scope.$watch('newpassw2',function() {$scope.test();});
  $scope.$watch('newfName',function() {$scope.test();});
  $scope.$watch('newlName',function() {$scope.test();});
  $scope.$watch('newTitle',function() {$scope.test();});
  $scope.$watch('newSex',function() {$scope.test();}); 
  $scope.$watch('newAge',function() {$scope.test();}); 


  $scope.test = function() {
  if ($scope.passw1 !== $scope.passw2) {
    $scope.error = true;
    } else {
    $scope.error = false;
    }
    $scope.incomplete = false;
    if ($scope.edit && (!$scope.newfName.length ||
    !$scope.newlName.length || !$scope.newpassw1.length || !$scope.newpassw2.length || !$scope.newTitle.length || !$scope.newSex.length || !$scope.newAge.length)) {
        $scope.incomplete = true;
    }
  };

});

app.controller('editUserCtrl', function($scope, userService, $routeParams) {
  // $scope.users = userService.users;
  var getUsersFromServer = function() {
    userService.getUsers()
      .then(function mySuccess(response) {
        $scope.users = response.data;
        showChoosenUser();
      }, function myError(response){
        $scope.message = response.statusText;
      })
  };

  getUsersFromServer();
  var showChoosenUser = function() {
    console.log("i'm here");
    for(var i = 0; i < $scope.users.length; i++) {
      if ($scope.users[i].id == $routeParams.param) {
         $scope.newfName = $scope.users[i].fName;
          console.log("firstName" + $scope.newfName);

         $scope.newlName = $scope.users[i].lName; 
         $scope.newTitle = $scope.users[i].title; 
         $scope.newSex = $scope.users[i].sex; 
         $scope.newAge = $scope.users[i].age; 
      }
    }
  }
  
  $scope.saveUser = function() {
    for (var i = 0; i < $scope.users.length; i++) {
      if ($scope.users[i].id == $routeParams.param) {
        $scope.users[i].fName = $scope.newfName;
        $scope.users[i].lName = $scope.newlName;
        $scope.users[i].title = $scope.newTitle;
        $scope.users[i].sex = $scope.newSex;
        $scope.users[i].age = $scope.newAge;
        $scope.hideform = true;
        break;
      }
    } 
  }
 
});
