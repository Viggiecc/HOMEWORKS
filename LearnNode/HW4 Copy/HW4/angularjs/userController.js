var app = angular.module('myApp', []);

app.factory('userService', function($http, $httpParamSerializerJQLike ) {
  var userServ = {};

  userServ.createNewUser = function(myData) {
    return  $http({
	    url: 'http://localhost:3030/api/user',
	    method: 'POST',
	    data: $httpParamSerializerJQLike(myData),
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded'
	    }
  	});
  };

  userServ.getAllUsers = function() {
    return $http.get('http://localhost:3030/api/users');
  };

  userServ.getUsersById = function(id) {
    return $http.get('http://localhost:3030/api/user/' + id);
  };

  userServ.updateUsersById = function(id, myData) {
   
    var myUrl = 'http://localhost:3030/api/user' + id;

    return $http({
      url: myUrl,
      method: 'PUT',
      data: $httpParamSerializerJQLike(myData),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  };

  userServ.deleteUserById = function(id) {
    return $http.delete('http://localhost:3030/api/user/' + id);
  }

  return userServ; 
});

app.controller('userCtrl', function($scope, $http, userService, $httpParamSerializerJQLike, $window) {
  console.log("start--------");
  $scope.users = [];
  $scope.numPerPage = 3;
  $scope.currentPage = 1;
  $scope.hideForm = true;
  $scope.edit = false;
  var getAllUsersFromApi = function() {
    userService.getAllUsers()
      .then(function mySuccess(response) {
        $scope.users = response.data;
        console.log($scope.users);
        $scope.showPage($scope.currentPage);
      }, function myError(response){
        $scope.message = response.statusText;
      });
  };

  getAllUsersFromApi();
  console.log("current users: " + $scope.users);
  $scope.showPage = function(num) {
    // $scope.groupedUser = $scope.users.slice(0, $scope.numPerPage);
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
    userService.deleteUserById(id)
      .then( function mySuccess(response) {
          $scope.users = response.data;
          if ($scope.users.length == 0) {
            $scope.usersList = [];
          } 
          if ($scope.currentPage == $scope.totalPages) {
            $scope.showPage($scope.totalPages);
            $scope.currentPage--;
          } else {
            $scope.showPage($scope.currentPage);
          }
        }, function myError(response){
        $scope.message = response.statusText;
      });   
  };

  $scope.click = function() {
  	$scope.hideForm = false;
    $scope.edit = false;
    $scope.newfName = "";
    $scope.newlName = "";
    $scope.newTitle = "";
    $scope.newSex = "";
    $scope.newAge = "";
  }

  $scope.clickUsers = function() {
    $scope.hideForm = true;
  }

  $scope.maxId = 6;
  console.log("create+333");
  $scope.createNewUser = function() {
    var myData = {
      id: $scope.maxId + 1,   
      fName: $scope.newfName,
      lName: $scope.newlName,
      title: $scope.newTitle,
      sex: $scope.newSex,
      age: $scope.newAge
    }

    userService.createNewUser(myData)
      .success(function(response) {
        alert("New user created!" + response.data);
        $scope.maxId++;
        $window.location.reload();
        }
      )
      .error(function(response) {
        alert("something wrong" + response.data);
      });
    $scope.hideForm = true;
  };

  $scope.showChoosenUser = function(id) {
    console.log(id);
    $scope.hideForm = false;
    console.log($scope.hideForm);
    $scope.edit = true;
    userService.getUsersById(id)
      .then(function mySuccess(response) {
        $scope.choosenUser = response.data;
        $scope.newfName = $scope.choosenUser.fName;
        $scope.newlName = $scope.choosenUser.lName; 
        $scope.newTitle = $scope.choosenUser.title; 
        $scope.newSex = $scope.choosenUser.sex; 
        $scope.newAge = $scope.choosenUser.age;
        $scope.newpassw1 = "";
        $scope.newpassw2 = ""; 
        $scope.curId = id;     
      }, function myError(response){
        $scope.message = response.statusText;
      });
  };

  $scope.saveEditedUser = function() {
    var myData = {
      id: $scope.curId,   
      fName: $scope.newfName,
      lName: $scope.newlName,
      title: $scope.newTitle,
      sex: $scope.newSex,
      age: $scope.newAge
    }
    console.log("save" + myData.id);
    console.log("save" + myData.age);
    console.log(myData);
    userService.updateUsersById($scope.curId, myData)
      .success(function(response) {
         alert("update the user");
        $window.location.reload();
        }
      )
      .error(function(response) {
        alert("Error");
      });
    $scope.hideForm = true;
  }

  $scope.error = false;
  $scope.incomplete = true;

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

