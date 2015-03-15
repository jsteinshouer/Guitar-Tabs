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