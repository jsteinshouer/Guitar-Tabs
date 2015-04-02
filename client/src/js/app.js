app = angular.module('app', [
	'ngRoute',
	'tabs',
	'videos',
	'songs',
	'artists',
	'security',
	'tags',
	'templates-main'
]);

app.filter('msToMinutes', function() {
	return function(millseconds) {
		var seconds = Math.floor(millseconds / 1000);
		var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
		seconds = seconds - (minutes * 60);
		return minutes + ':' + seconds;
	};
});


/* Register security interceptor */
app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('securityInterceptor');
}]);

app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'https://p.scdn.co/**'
	]);
}]);

/* routing configuration */
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {templateUrl: 'common/templates/login-form.tpl.html',controller:'LoginCtrl'}).
		when('/browse/tabs', {templateUrl: 'tabs/tab-list.tpl.html', controller:'TabListCtrl'}).
		when('/browse/videos', {templateUrl: 'videos/video-list.tpl.html', controller:'VideoListCtrl'}).
		when('/browse/songs', {templateUrl: 'songs/song-list.tpl.html', controller:'SongListCtrl'}).
		when('/browse/artists', {templateUrl: 'artists/artist-list.tpl.html', controller:'ArtistListCtrl'}).
		when('/browse/tags', {templateUrl: 'tags/tag-list.tpl.html', controller:'TagListCtrl'}).
		when('/spotify/songs', {templateUrl: 'songs/spotify-search.tpl.html', controller:'SpotifySongSearchCtrl'}).
		when('/tabs/new', {templateUrl: 'tabs/tab-form.tpl.html', controller:'TabEditCtrl'}).
		when('/videos/new', {templateUrl: 'videos/video-form.tpl.html', controller:'VideoEditCtrl'}).
		when('/songs/new', {templateUrl: 'songs/song-form.tpl.html', controller:'SongEditCtrl'}).
		when('/tabs/edit/:id', {templateUrl: 'tabs/tab-form.tpl.html', controller:'TabEditCtrl'}).
		when('/songs/edit/:id', {templateUrl: 'songs/song-form.tpl.html', controller:'SongEditCtrl'}).
		when('/videos/edit/:id', {templateUrl: 'videos/video-form.tpl.html', controller:'VideoEditCtrl'}).
		when('/tabs/:id', {templateUrl: 'tabs/tab-detail.tpl.html', controller:'TabDetailCtrl'}).
		when('/videos/:id', {templateUrl: 'videos/video-detail.tpl.html', controller:'VideoDetailCtrl'}).
		when('/tags/:id', {templateUrl: 'tags/tag-detail.tpl.html', controller:'TagDetailCtrl'}).
		when('/songs/:songId/tabs/new', {templateUrl: 'tabs/tab-form.tpl.html', controller:'TabEditCtrl'}).
		when('/songs/:songId/videos/new', {templateUrl: 'videos/video-form.tpl.html', controller:'VideoEditCtrl'}).
		when('/songs/:id', {templateUrl: 'songs/song-detail.tpl.html', controller:'SongDetailCtrl'}).
		when('/artists/:id', {templateUrl: 'artists/artist-detail.tpl.html', controller:'ArtistDetailCtrl'}).
		otherwise({redirectTo: '/browse/tabs'});
}]);

/* initialize authorization service when app is loaded */
app.run(['authorizationProvider', function(auth) {
	auth.init();
}]);

app.controller('HeaderCtrl', ['$scope','$location','navigation', function($scope,$location,navigation) {

	$scope.menu = {};
	$scope.navigation = navigation;
	$scope.item = {};

	var toTitleCase = function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();};

	$scope.$watch(function() {
		return $location.path();
	}, function(path){

		var fragments = path.split("/");

		$scope.menu = {};
		$scope.item = {};
		var section;

		switch(fragments[1]) {
			case "browse":
				section = fragments[2];

				navigation.title = "Browse: " + section.charAt(0).toUpperCase() + section.substr(1).toLowerCase();
				navigation.newUrl = "/" + section + "/new";
				break;
			case "search":
				$scope.menu.type = "search";
				break;
			default:
				section = fragments[1];
				navigation.editUrl = null;
				navigation.newUrl = "/" + section + "/new";
		}			
	
	});

}]);

app.controller('MenuCtrl', ['$scope','navigation', function($scope,navigation) {
	$scope.navigation = navigation;
}]);

app.controller('LoginCtrl', ['$scope','$location','authorizationProvider', function($scope,$location,auth) {

	$scope.login = function() {
		auth.login(
			$scope.user.id,
			$scope.user.password,
			function(data) {
				$location.path('/tabs');
			},
			function(response){
				$scope.authError = "Logon failed! Please make sure your username and password are correct.";
			}
		);
	};

}]);

