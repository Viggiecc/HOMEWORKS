
angular.module('myApp', []).controller('userCtrl', function($scope) {

  $scope.newfName = '';
  $scope.newlName = '';
  $scope.newTitle = '';
  $scope.newSex = '';
  $scope.newAge = '';
  $scope.newpassw1 = '';
  $scope.newpassw2 = '';
  $scope.users = [
    {id:1, fName:'Hege', lName:"Pege", title:"Manager", sex:"Male", age:"43"},
    {id:2, fName:'Kim', lName:"Pim", title:"Senior Engineer", sex:"Female", age:"34" },
    {id:3, fName:'Sal', lName:"Smith", title:"Junior Engineer", sex:"Male", age:"24" },
    {id:4, fName:'Jack', lName:"Jones", title:"Product Manager", sex:"Male", age:"33" },
    {id:5, fName:'John', lName:"Doe", title:"UI Designer", sex:"Male", age:"26" },
    {id:6, fName:'Peter', lName:"Pan", title:"UX Designer", sex:"Male", age:"28"},
    {id:7, fName:'Peter', lName:"Pan", title:"UX Designer", sex:"Male", age:"28"}

  ];
  
  $scope.hideform = true;
  $scope.edit = true;
  $scope.error = false;
  $scope.incomplete = false; 
  $scope.currentPage = 1;
  $scope.numPerPage = 3;
  $scope.usersList = $scope.users.slice(0, $scope.numPerPage);
  $scope.pages = [1, 2, 3];
  $scope.totalPages = Math.ceil($scope.users.length / $scope.numPerPage);

  $scope.orderByParemeter = function(p) {
    $scope.myOrderBy = p;
  }

  $scope.editUser = function(id) {
    $scope.hideform = false;
    if (id == 'new') {
      $scope.edit = true;
      $scope.incomplete = true;
      $scope.isCreate = true;
      $scope.newfName = "";
      $scope.newlName = ""; 
      $scope.newTitle = ""; 
      $scope.newSex = ""; 
      $scope.newAge = "";
      $scope.newpassw1 = "";
      $scope.newpassw2 = "";

    } else {
      $scope.edit = true;
      $scope.isCreate = false;
      $scope.isEdit = true; 
      for(var i = 0; i < $scope.users.length; i++) {
        if($scope.users[i].id == id) {
          $scope.newfName = $scope.users[i].fName;
          $scope.newlName = $scope.users[i].lName; 
          $scope.newTitle = $scope.users[i].title; 
          $scope.newSex = $scope.users[i].sex; 
          $scope.newAge = $scope.users[i].age; 
        }
      }
      $scope.curId = id;
    }
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
      console.log("currentPage" + $scope.currentPage);
      console.log("now" + $scope.totalPages)

    } else {
      $scope.showPage($scope.currentPage);
    }
    
  }

  $scope.saveUser = function() {
    var curSize = $scope.users.length;
    if ($scope.isCreate) {
      $scope.users.splice(curSize, 0, {});
      $scope.users[curSize].id = curSize+1;
      $scope.users[curSize].fName = $scope.newfName;
      $scope.users[curSize].lName = $scope.newlName;
      $scope.users[curSize].title = $scope.newTitle;
      $scope.users[curSize].sex = $scope.newSex;
      $scope.users[curSize].age = $scope.newAge;
      $scope.hideform = true;
    } 

    if ($scope.isEdit) {
      for (var i = 0; i < $scope.users.length; i++) {
        if ($scope.users[i].id == $scope.curId) {
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
  }

  $scope.showPage = function(num) {
    // $scope.groupedUser = $scope.users.slice(0, $scope.numPerPage);
    $scope.curPage= $scope.getPage($scope.users.length, num);
    console.log("length" + $scope.users.length);
    if (num < 1 || num > $scope.curPage.totalPages) {
      return;
    }
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
        console.log("total Pages" + $scope.totalPages);
 
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
})