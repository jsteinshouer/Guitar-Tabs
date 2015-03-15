angular.module('songs.pods', ['songs.service','videos.modal'])

.directive('songPods',['Song', function(Song) {
	return {
		restrict: 'E',
		scope: {
			songId: '='
		},
		template: 
			'<div>' +
				'<div class="list-group">' +
						'<h4 class="list-group-item list-group-item-heading">Tabs</h4>' +
						'<a ng-href="#/tabs/{{tab.id}}" class="list-group-item" ng-repeat="tab in tabs">{{tab.title}}</a>' +
						'<a ng-href="#/songs/{{songId}}/tabs/new" class="list-group-item">Add</a>' +
				'</div>' +
				'<div class="list-group">' +
						'<h4 class="list-group-item list-group-item-heading">Videos</h4>' +
						'<a ng-href="#" class="list-group-item" ng-repeat="video in videos" video="video" video-modal>{{video.title}}</a>' +
						'<a ng-href="#/songs/{{songId}}/videos/new" class="list-group-item">Add</a>' +
				'</div>' +
			'<div>',
		replace: true,
		link: function(scope, el, attrs) {

			var unwatch = scope.$watch('songId', function() {

				if (scope.songId) {

					var options = {
						id: scope.songId,
						fields: "id,title,tabs,videos"
					};

					Song.customGet(options, function(response) {
						scope.tabs = response.data.tabs;
						scope.videos = response.data.videos;
					});
					// Remove the watch since we dont need it anymore
					unwatch();
				}
			});
		}
	};
}]);