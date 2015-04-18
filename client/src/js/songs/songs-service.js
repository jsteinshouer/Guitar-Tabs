var songService = angular.module('songs.service', []);


songService.factory('Song', ['$http', '$q', function ($http, $q) {

	var url = '/index.cfm/songs';

	var Song = function (data) {
		angular.extend(this, data);
	};

	Song.get = function(id,cb,errcb) {
		$http.get('/index.cfm/songs/' + id + "?fields=id,title,tags,spotifyId,artist,album").then(cb,errcb);
	};

	Song.customGet = function(options,cb,errcb) {
		var defaults = {
			id: 0,
			fields: 'id,title,tags,spotifyId,artist,album'
		};
		
		options = angular.extend(defaults,options);

		$http.get('/index.cfm/songs/' + options.id + "?fields=" + options.fields).then(cb,errcb);
	};

	Song.getItems = function(options,cb,errcb) {
		var defaults = {
			limit: 10,
			offset: 0,
			fields: 'id,title,tags,artist,album',
			expand:0,
			filter: ''
		};

		options = angular.extend(defaults,options);

		$http.get('/index.cfm/songs?limit='+options.limit+'&offset='+options.offset+'&expand='+options.expand+'&fields='+options.fields+'&filter='+options.filter).then(cb,errcb);
	};

	Song.search = function(term) {
		return $http.get('/index.cfm/songs/search/' + term);
	};

	Song.prototype.save = function(cb,errcb) {

		if (!errcb) {
			errcb = function(){};
		}
	 
		var self = this;
		if (this.id && this.id !== '') {
			$http.put(url + '/' + this.id, {
				title: this.title,
				spotifyData: this.spotifyData,
				artist: this.artist,
				tags: this.tags
			})
			.then(function(response) {
				self.id = response.data.id;
				cb(response);
			},errcb);
		}
		
		else {
			$http.post(url, {
				title: this.title,
				spotifyData: this.spotifyData,
				artist: this.artist,
				tags: this.tags
			})
			.then(function(response) {
				self.id = response.data.id;
				cb(response);
			}, errcb);
		}
	};

	Song.prototype.getTabs = function(cb,errcb) {
		$http.get('/index.cfm/songs/' + this.id + '/tabs').then(cb,errcb);
	};

	return Song;

}]);
		
	 