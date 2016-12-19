var app = angular.module('myApp', []);

app.controller('myController', function($scope){
	$scope.votes = []; 
	$scope.count = 0;

	$scope.saveService = function() {
		var serviceList = {};
		serviceList.serviceName = $scope.serviceName;
		serviceList.serviceDescription = $scope.serviceDescription;
		serviceList.count = $scope.count;
		$scope.votes.push(serviceList);
		$scope.serviceName = "";
		$scope.serviceDescription="";
	}

	$scope.plusOne = function(serviceList) {
		serviceList.count++;
	}

	$scope.decreaseOne = function(serviceList) {
		serviceList.count--;
	}
});
