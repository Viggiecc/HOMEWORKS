var app = angular.module('myApp', []);

app.controller('personCtrl', function($scope, $http) {
	$http.get('http://127.0.0.1:3030/person.json')
	.then(function mySuccess(response) {
		$scope.persons = response.data;
		console.log($scope.persons);
	}), function myError(response) {
		$scope.persons = [1,2,3];
	};
	// $http.get('http://rest-service.guides.spring.io/greeting').then(function(response) {
	//         $scope.greeting = response.data;
	//     });
});