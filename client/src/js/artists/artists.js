artists = angular.module('artists', [
	'artists.service',
	'spotify',
	'navigation',
	'mgcrea.ngStrap'
]);
	

artists.controller('ArtistListCtrl', ['$scope','Artist','navigation', function($scope, Artist, navigation) {
	$scope.pagination = {};
	$scope.go = navigation.go;
	Artist.getItems({limit: 10}, function(response) {
		$scope.artists = response.data.items;
		$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
		$scope.pagination.current = parseInt(response.data.offset,8) + 1;
	});

	$scope.changePage = function(page) {
		var offset = page - 1;

		Artist.getItems({offset: offset},function(response) {
			$scope.artists = response.data.items;
		});
	};
}]);

artists.controller('ArtistDetailCtrl', ['$scope','Artist','SpotifyArtist','$routeParams','navigation', function($scope,Artist,SpotifyArtist,$routeParams,navigation) {

	$scope.navigation = navigation;

	Artist.get($routeParams.id,function(response) {
		$scope.artist = new Artist(response.data);
		navigation.title = $scope.artist.name;
		//navigation.editUrl = "/tabs/edit/" + $scope.tab.id;

		// SpotifyArtist.get($scope.artist.spotifyData.id,function(spotifyArtist,spotifyData) {
		// 	$scope.spotifyArtist = spotifyArtist;
		// })
	});

}]);