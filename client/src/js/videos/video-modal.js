angular.module('videos.modal', ['mgcrea.ngStrap'])

.directive('videoModal',['$modal','$sce', function($modal,$sce) {
	return {
		restrict: 'A',
		scope: {
			video: '='
		},
		replace: false,
		link: function(scope, el, attrs) {

			var modal = $modal({
				scope: scope, 
				title: scope.video.title, 
				contentTemplate: 'videos/video-modal.tpl.html',
				show: false
			});

			scope.videoUrl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + scope.video.code);

			el.on("click", function(e) {
				e.preventDefault();
				modal.$promise.then(function() {
					modal.show();
				});
			});

		}
	};
}]);