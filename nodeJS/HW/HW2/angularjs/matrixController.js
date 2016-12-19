var app = angular.module('myApp', []);

app.controller('myMatrixCtrl', function($scope, $http) {
		
	$scope.click = function() {
		$scope.matirx = [[1][2]];

		$http({
			method: 'GET',
			url: 'http://localhost:3000/matrix/' + $scope.dimension
		}).then(function mySuccess(response) {
			alert("call back");
			$scope.matrix = response.data;
			console.log(typeof response.data);
		}, function myError(response){
			$scope.message = response.statusText;
		});
	};

});