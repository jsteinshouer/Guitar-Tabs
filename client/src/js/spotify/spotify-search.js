angular.module('spotify.search', ['mgcrea.ngStrap','spotify.service'])

.directive('spotifySearch',['$modal','Track','SpotifyArtist', function($modal,Track,SpotifyArtist) {
	return {
		restrict: 'E',
		scope: {
			song: '='
		},
		template: '<a href="" style="margin-left: 10px" ng-click="openSearch()">Search</a>',
		replace: true,
		link: function(scope, el, attrs) {

			scope.search = {
				track: "",
				artist: ""
			};

			var searchModal = $modal({
				scope: scope, 
				title: 'Song Search', 
				contentTemplate: 'spotify/spotify-search.tpl.html',
				show: false
			});

			scope.openSearch = function() {
				searchModal.$promise.then(function() {
					searchModal.show();
					searchModal.$element.find("input[type='text']").get(0).focus();
				}); 
			};

			scope.search.findTracks =  function() {
				if (scope.track !== "") {
					Track.search(this.track, this.artist, function(tracks) {
						scope.tracks = tracks;
					});
				}
			};

			scope.search.selectTrack = function(track) {
				scope.song = {
					title: track.title,
					artist: {
						name: track.artist.name
					}
				};
				Track.get(track.id,function(data) {
					scope.song.spotifyId = data.id;
					scope.song.album = data.album;
				});
				SpotifyArtist.get(track.artist.id,function(artist) {
					console.log(artist);
					scope.song.artist.spotifyData = artist;
				});
				searchModal.$promise.then(searchModal.hide);
			};

		}
	};
}]);