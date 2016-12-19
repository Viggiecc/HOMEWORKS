
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
// app.controller('userCtrl', function($scope) {



  

//   $scope.hideform = true;
//   $scope.edit = true;
//   $scope.error = false;
//   $scope.incomplete = false; 
//   $scope.createUser = false;
//   $scope.editUser = false;
//   $scope.currentPage = 1;
//   $scope.numPerPage = 2;
//   $scope.maxSize = 5;
//   $scope.pages = [];
//   $scope.groupedUser = $scope.users.slice(0, $scope.numPerPage);
//   console.log($scope.groupedUser);
//   $scope.curUsersSize = Math.ceil($scope.users.length / $scope.numPerPage);
//   console.log($scope.curUsersSize);
//   for (var i = 0 ; i < $scope.curUsersSize; i++) {
//         $scope.pages[i] = i + 1;
//   }
//   console.log($scope.pages);


//   var getUserById = function(id) {
//     var start = 0;
//     var end = $scope.users.length - 1;
//     console.log("end:" + end);
//     var result = {
//       indexOfUser: 0, 
//       user: {}
//     };
//     while (start + 1 < end) {
//       var mid = Math.floor(start + (end - start) / 2);
//       if ($scope.users[mid].id == id) {
//         result.indexOfUser = mid;
//         result.user = $scope.users[mid];
//         return result;
//       } else if ($scope.users[mid].id > id) {
//         end = mid;
//       } else {
//         start = mid;
//       }
//     }
//     if ($scope.users[start].id == id) {
//       result.indexOfUser = start;
//       result.user = $scope.users[start];
//       return result;
//     }
//     if ($scope.users[end].id == id) {
//       result.indexOfUser = end;
//       result.user = $scope.users[end];
//       return result;
//     }
//     return result;
//   }
//   $scope.$watch('newpassw1',function() {$scope.test();});
//   $scope.$watch('newpassw2',function() {$scope.test();});
//   $scope.$watch('newfName',function() {$scope.test();});
//   $scope.$watch('newlName',function() {$scope.test();});
//   // $scope.$watch('currentPage + numPerPage', function() {
//   //     var begin = (($scope.currentPage - 1) * $scope.numPerPage)
//   //     , end = begin + $scope.numPerPage;
      
//   //     $scope.users = $scope.users.slice(begin, end);
//   //   });

//   $scope.editUser = function(id) {
//     $scope.hideform = false;
//     if (id == 'new') {
//       $scope.edit = true;
//       $scope.createUser = true;
//       $scope.incomplete = true;
//       $scope.newfName = "";
//       $scope.newlName = ""; 
//       $scope.newTitle = ""; 
//       $scope.newSex = ""; 
//       $scope.newAge = "";
//       $scope.newpassw1 = "";
//       $scope.newpassw2 = "";

//     } else {
//       $scope.edit = true;
//       $scope.editUser = true;
//       $scope.incomplete = true;
//       $scope.newfName = getUserById(id).user.fName;
//       $scope.newlName = getUserById(id).user.lName; 
//       $scope.newTitle = getUserById(id).user.title; 
//       $scope.newSex = getUserById(id).user.sex; 
//       $scope.newAge = getUserById(id).user.age; 
//       $scope.curId = id;
//     }
//   }





//   $scope.showPage = function(num) {
//     // $scope.groupedUser = $scope.users.slice(0, $scope.numPerPage);
//     $scope.groupedUser = $scope.users.slice((num-1) * $scope.numPerPage, num * $scope.numPerPage);
//     console.log($scope.groupedUser);
//   }

//   // $scope.getPageNum = function() {
//   //   var curUsersSize = $scope.users.length;
//   //   var pageNum = curUsersSize / $scope.numPerPage;
//   //   return pageNum;
//   // }

//   // $scope.isActive = function(num) {
//   //   return num ? 'active' : '';
//   // }

//   $scope.test = function() {
//   if ($scope.passw1 !== $scope.passw2) {
//     $scope.error = true;
//     } else {
//     $scope.error = false;
//     }
//     $scope.incomplete = false;
//     if ($scope.edit && (!$scope.newfName.length ||
//     !$scope.newlName.length || !$scope.newpassw1.length || !$scope.newpassw2.length || !$scope.newTitle.length || !$scope.newSex.length || !$scope.newAge.length)) {
//         $scope.incomplete = true;
//     }
//   };
// })