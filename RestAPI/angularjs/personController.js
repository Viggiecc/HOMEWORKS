var app = angular.module('myApp', []);

app.factory('personHttpServ', function($http) {
	var personData = {};
	personData.getFromJson = function () {
		return $http.get('person.json');
	}

	personData.getFromXML = function () {
		return $http.get('person.xml');
	}

	return personData;
} );

app.controller('personCtrl', function($scope, personHttpServ) {
	$scope.personsFromJson;
	$scope.personsFromXML = [];
	$scope.mergedPersons;
	$scope.message;

	var getPersonsFromXML = function() {
		personHttpServ.getFromXML()
			.success(function(person) {
				console.log("xml");
				var personsXML = person;
				console.log(person);
				console.log(typeof person);
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(personsXML, "text/xml");
				console.log(typeof xmlDoc);
				var personSize = xmlDoc.getElementsByTagName("person").length;
				for (var i = 0; i < personSize; i++) {
					var obj = {};
					obj.id = Number(xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue);
					console.log(typeof obj.id);
					obj.firstName = xmlDoc.getElementsByTagName("firstName")[i].childNodes[0].nodeValue;
					obj.lastName = xmlDoc.getElementsByTagName("lastName")[i].childNodes[0].nodeValue;
					$scope.personsFromXML.push(obj);
				}
				$scope.mergedPersons = $scope.personsFromJson.concat($scope.personsFromXML);
			})
			.error(function(error){
				$scope.message = "Could not load person from XML" + error.message;
			})
	}

	var getPersonsFromJson = function() {
		personHttpServ.getFromJson()
			.success(function(person) {
				console.log("json");
				var personsJson = person;
				$scope.personsFromJson = personsJson.person;
				getPersonsFromXML();
			})
			.error(function (error) {
				$scope.message = "Could not load person data from JSON" + error.message;
			})
	};
	
	getPersonsFromJson();
	
	// getPersonsFromXML();
	
});