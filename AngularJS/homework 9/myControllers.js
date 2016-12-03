
var app = angular.module('myApp', ["ngRoute", "myService"]);

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
  .when("/editUser:param", {
    templateUrl: "editUser.html",
    controller: "editUserCtrl"
  });
});

app.controller('mainCtrl', function($scope, myUserService) { 
  $scope.users = myUserService.users;

  $scope.edit = true;
  $scope.error = false;
  $scope.incomplete = false; 
  $scope.currentPage = 1;
  $scope.numPerPage = 3;
  $scope.usersList = $scope.users.slice(0, $scope.numPerPage);
  
  // $scope.usersList;
  $scope.pages = [1, 2];
  $scope.totalPages = Math.ceil($scope.users.length / $scope.numPerPage);

  $scope.orderByParemeter = function(p) {
    $scope.myOrderBy = p;
  }

  $scope.deleteUser = function(id) {
    for (var i = 0; i < $scope.users.length; i++) {
      if ($scope.users[i].id == id) {
        $scope.users.splice(i, 1);
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
  }

  $scope.showPage = function(num) {
    // $scope.groupedUser = $scope.users.slice(0, $scope.numPerPage);
    console.log("I am here" + num);
    $scope.curPage= $scope.getPage($scope.users.length, num);
    // get current page of items
    $scope.usersList = $scope.users.slice($scope.curPage.startIndex, $scope.curPage.endIndex + 1);
    console.log($scope.usersList);  
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

});

app.controller('newUserCtrl', function($scope, myUserService) {
  
  $scope.users = myUserService.users;
  $scope.saveUser = function() {
    var curSize = $scope.users.length;
    
    // $scope.users.splice(curSize, 0, {});
    $scope.users[curSize].id = curSize+1;
    $scope.users[curSize].fName = $scope.newfName;
    $scope.users[curSize].lName = $scope.newlName;
    $scope.users[curSize].title = $scope.newTitle;
    $scope.users[curSize].sex = $scope.newSex;
    $scope.users[curSize].age = $scope.newAge;
    $scope.hideform = true;

  }

  $scope.$watch('newpassw1',function() {$scope.test();});
  $scope.$watch('newpassw2',function() {$scope.test();});
  $scope.$watch('newfName',function() {$scope.test();});
  $scope.$watch('newlName',function() {$scope.test();});  

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

app.controller('editUserCtrl', function($scope, myUserService, $routeParams) {
  $scope.users = myUserService.users;
  for(var i = 0; i < $scope.users.length; i++) {
    if ($scope.users[i].id == $routeParams.param) {
       $scope.newfName = $scope.users[i].fName;
       $scope.newlName = $scope.users[i].lName; 
       $scope.newTitle = $scope.users[i].title; 
       $scope.newSex = $scope.users[i].sex; 
       $scope.newAge = $scope.users[i].age; 
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

  $scope.$watch('newpassw1',function() {$scope.test();});
  $scope.$watch('newpassw2',function() {$scope.test();});
  $scope.$watch('newfName',function() {$scope.test();});
  $scope.$watch('newlName',function() {$scope.test();});  

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
  console.log($scope.newTitle);

});
