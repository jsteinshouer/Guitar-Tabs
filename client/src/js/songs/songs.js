songs = angular.module('songs', [
	'songs.service',
	'songs.pods',
	'spotify',
	'navigation',
	'mgcrea.ngStrap'
]);
	

songs.controller('SongListCtrl', ['$scope','Song','navigation',function($scope,Song,navigation) {
	$scope.navigation = navigation;
	$scope.pagination = {};
	Song.getItems({limit: 10},function(response) {
		$scope.songs = response.data.items;
		$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
		$scope.pagination.current = parseInt(response.data.offset,8) + 1;
	});

	$scope.changePage = function(page) {
		var offset = page - 1;

		Song.getItems({offset: offset},function(response) {
			$scope.songs = response.data.items;
		});
	};
}]);

songs.controller('SongDetailCtrl', ['$scope','Song','Track','$routeParams','navigation', function($scope,Song,Track,$routeParams,navigation) {

	$scope.navigation = navigation;

	Song.get($routeParams.id,function(response) {
		$scope.song = new Song(response.data);
		$scope.tabs = $scope.song.getTabs(function(tabs) {
			console.log(tabs);
		});
		navigation.title = $scope.song.title;
		//navigation.editUrl = "/tabs/edit/" + $scope.tab.id;

		Track.get($scope.song.spotifyId,function(track,spotifyData) {
			$scope.track = track;
			$scope.spotifyData = spotifyData;
		});
	});

}]);

songs.controller('SongEditCtrl', ['$scope','Song','$routeParams','navigation','$alert', function($scope,Song,$routeParams,navigation,$alert) {
	
	$scope.song = {};	
	$scope.tags = [];

	if ($routeParams.id) {
		Song.get($routeParams.id,function(response) {
			$scope.song = new Song(response.data);

			angular.forEach($scope.song.tags, function(item) {
				$scope.tags.push({"text": item});
			});

			navigation.title = $scope.song.title;
			navigation.editUrl = "/songs/edit/" + $scope.song.id;
		});
	}
	else {
		$scope.song = new Song();

		navigation.title = "New Song";
	}

	$scope.save = function() {
		$scope.song.tags = [];

		angular.forEach($scope.tags, function(item) {
			$scope.song.tags.push(item.text);
		});

		$scope.song.save(function() {

			navigation.title = $scope.song.title;

			/* Show success message */	
			$alert({
				title: 'Saved!', 
				content: 'The song was saved successfully.',
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