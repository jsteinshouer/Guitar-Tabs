var videoService = angular.module('videos.service', []);


videoService.factory('Video', ['$http', '$q', function ($http, $q) {

	var url = '/index.cfm/videos';

	var Video = function (data) {
		this.song = {
			title: "",
			artist: {
				name: ""
			}
		};
		angular.extend(this, data);
	};

	Video.get = function(id,cb,errcb) {
		$http.get('/index.cfm/videos/' + id).then(cb,errcb);
	};

	Video.getItems = function(options,cb,errcb) {
		var defaults = {
			limit: 10,
			offset: 0,
			fields: 'id,title,code,tags,song',
			expand:0
		};

		options = angular.extend(defaults,options);

		$http.get('/index.cfm/videos?limit='+options.limit+'&offset='+options.offset+'&expand='+options.expand+'&fields='+options.fields).then(cb,errcb);
	};

	Video.prototype.save = function(cb,errcb) {

		if (!errcb) {
			errcb = function(){};
		}
	 
		var self = this;
		if (this.id && this.id !== '') {
			$http.put(url + '/' + this.id, {
					id: this.id,
					title: this.title,
					code: this.code,
					song: this.song,
					tags: this.tags
			})
			.then(function(response) {
				self.id = response.data.id;
				cb(response);
			},errcb);
		}
		
		else {
			$http.post(url, {
					id: this.id,
					title: this.title,
					code: this.code,
					song: this.song,
					tags: this.tags
			})
			.then(function(response) {
				self.id = response.data.id;
				cb(response);
			}, errcb);
		}
	};

	return Video;

}]);
		
	 