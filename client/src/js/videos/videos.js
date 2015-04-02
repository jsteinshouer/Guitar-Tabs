var videos = angular.module('videos', [
	'videos.service',
	'videos.modal',
	'songs.service',
	'navigation',
	'mgcrea.ngStrap',
	'ngTagsInput',
	'spotify'
]);


videos.controller('VideoListCtrl', ['$scope','navigation','Video',function($scope,navigation,Video) {
	$scope.pagination = {};
	Video.getItems({limit: 10},function(response) {
		$scope.videos = response.data.items;
		$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
		$scope.pagination.current = parseInt(response.data.offset,8) + 1;
	});

	$scope.go = navigation.go;
	$scope.filter = "";

	$scope.changePage = function(page) {
		var offset = page - 1;

		Video.getItems({offset: offset},function(response) {
			$scope.videos = response.data.items;
		});
	};

	/* Search */
	$scope.$watch(function(scope) { return scope.filter },function(filterValue) {
		Video.getItems({limit: 10,filter: $scope.filter},function(response) {
			$scope.videos = response.data.items;
			$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
			$scope.pagination.current = parseInt(response.data.offset,8) + 1;
		});
	});

}]);

videos.controller('VideoDetailCtrl', ['$scope','Video','$routeParams','navigation','$sce', function($scope,Video,$routeParams,navigation,$sce) {

	Video.get($routeParams.id,function(response) {
		$scope.video = new Video(response.data);
		$scope.videoUrl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.video.code);
		navigation.title = $scope.video.title;
		navigation.editUrl = "/videos/edit/" + $scope.video.id;
	});

}]);


videos.controller('VideoEditCtrl', ['$scope','Video','Song','$routeParams','navigation','$alert', function($scope,Video,Song,$routeParams,navigation,$alert) {
	
	$scope.video = {};	
	$scope.tags = [];

	if ($routeParams.id) {
		Video.get($routeParams.id,function(response) {
			$scope.video = new Video(response.data);

			angular.forEach($scope.video.tags, function(item) {
				$scope.tags.push({"text": item});
			});

			navigation.title = $scope.video.title;
			navigation.editUrl = "/videos/edit/" + $scope.video.id;
		});
	}
	else {
		$scope.video = new Video();

		/* Populate the song if it was provided*/
		if ($routeParams.songId) {
			Song.get($routeParams.songId, function(response) {
				$scope.video.song = new Song(response.data);
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
		$scope.video.tags = [];

		angular.forEach($scope.tags, function(item) {
			$scope.video.tags.push(item.text);
		});


		$scope.video.save(function() {

			/* Show success message */	
			$alert({
				title: 'Saved!', 
				content: 'The video was saved successfully.',
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