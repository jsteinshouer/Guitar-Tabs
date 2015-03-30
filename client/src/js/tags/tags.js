var tags = angular.module('tags', [
	'tags.service',
	'songs.service',
	'navigation'
]);


tags.controller('TagListCtrl', ['$scope','navigation','Tag',function($scope,navigation,Tag) {
	$scope.pagination = {};
	$scope.filter = "";

	Tag.getItems({limit: 10},function(response) {
		$scope.tags = response.data.items;
		$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
		$scope.pagination.current = parseInt(response.data.offset,8) + 1;
	});

	$scope.go = navigation.go;

	$scope.changePage = function(page) {
		var offset = page - 1;

		Tag.getItems({offset: offset},function(response) {
			$scope.tags = response.data.items;
		});
	};

	/* Search */
	$scope.$watch(function(scope) { return scope.filter },function(filterValue) {
		Tag.getItems({limit: 10,filter: $scope.filter},function(response) {
			$scope.tags = response.data.items;
			$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
			$scope.pagination.current = parseInt(response.data.offset,8) + 1;
		});
	});

}]);

tags.controller('TagDetailCtrl', ['$scope','Tag','$routeParams','navigation', function($scope,Tag,$routeParams,navigation) {
	$scope.go = navigation.go;
	
	Tag.get($routeParams.id,function(response) {
		$scope.tag = new Tag(response.data);
		navigation.title = $scope.tag.title;
		console.log($scope.tag);
	});

}]);