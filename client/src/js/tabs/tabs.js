var tabs = angular.module('tabs', [
	'tabs.service',
	'songs',
	'spotify',
	'navigation',
	'directives.pagination',
	'mgcrea.ngStrap',
	'ngTagsInput'
]);


tabs.controller('TabListCtrl', ['$scope','navigation','Tab',function($scope,navigation,Tab) {
	$scope.pagination = {};
	Tab.getItems({limit: 10},function(response) {
		$scope.tabs = response.data.items;
		$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
		$scope.pagination.current = parseInt(response.data.offset,8) + 1;
	});

	$scope.go = navigation.go;

	$scope.changePage = function(page) {
		var offset = page - 1;

		Tab.getItems({offset: offset},function(response) {
			$scope.tabs = response.data.items;
		});
	};

}]);

tabs.controller('TabDetailCtrl', ['$scope','Tab','$routeParams','navigation', function($scope,Tab,$routeParams,navigation) {

	Tab.get($routeParams.id,function(response) {
		$scope.tab = new Tab(response.data);
		navigation.title = $scope.tab.title;
		navigation.editUrl = "/tabs/edit/" + $scope.tab.id;
	});

}]);


tabs.controller('TabEditCtrl', ['$scope','Tab','Song','$routeParams', '$alert', function($scope,Tab,Song,$routeParams,$alert) {
	
	$scope.tab = {};	
	$scope.tags = [];

	if ($routeParams.id) {
		Tab.get($routeParams.id,function(response) {
			$scope.tab = new Tab(response.data);

			angular.forEach($scope.tab.tags, function(item) {
				$scope.tags.push({"text": item});
			});
		});
	}
	else {
		$scope.tab = new Tab();

		/* Populate the song if it was provided*/
		if ($routeParams.songId) {
			Song.get($routeParams.songId, function(response) {
				$scope.tab.song = new Song(response.data);
			});
		}
	}



	$scope.getSongs = function(viewValue) {
		if (viewValue !== "") {
			return Song.search(viewValue).then(function(res) {
				return res.data.items;
			});
		}
		else {
			return [];
		}
	};

	$scope.save = function() {
			$scope.tab.tags = [];

			angular.forEach($scope.tags, function(item) {
				$scope.tab.tags.push(item.text);
			});

		$scope.tab.save(function() {

		/* Show success message */	
		$alert({
			title: 'Saved!', 
			content: 'The tab was saved successfully.',
			placement: 'top-right', 
			type: 'success', 
			duration: 5,
			keyboard: true, 
			show: true
		});


		},function(response){
			
			var errorAlert = $alert({
				title: 'Error!', 
				placement: 'top-right', 
				type: 'danger', 
				duration: 5,
				keyboard: true, 
				show: false
			});

			if (response.status = 404) {
				errorAlert.content = 'Some required data was missing.';
			}
			else {
				errorAlert.content = 'An error occured while saving.';
			}

			errorAlert.show();

		});
	};
}]);