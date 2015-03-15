var artistService = angular.module('artists.service', []);


artistService.factory('Artist', ['$http', '$q', function ($http, $q) {

	var url = '/index.cfm/artists';

	var Artist = function (data) {
		angular.extend(this, data);
	};

	Artist.get = function(id,cb,errcb) {
		$http.get('/index.cfm/artists/' + id).then(cb,errcb);
	};

	Artist.getItems = function(options,cb,errcb) {
		var defaults = {
			limit: 10,
			offset: 0,
			fields: 'id,name,tags,spotifyData',
			expand:0
		};

		options = angular.extend(defaults,options);

		$http.get('/index.cfm/artists/?limit='+options.limit+'&offset='+options.offset+'&expand='+options.expand+'&fields='+options.fields).then(cb,errcb);
	};

	Artist.search = function(term) {
		return $http.get('/index.cfm/artists/search/' + term);
	};

	Artist.prototype.save = function(cb,errcb) {

		if (!errcb) {
			errcb = function(){};
		}
	 
		var self = this;
		if (this.id && this.id !== '') {
			$http.put(url + '/' + this.id, {
					name: this.name,
					tags: this.tags
			})
			.then(function(response) {
				self.id = response.data.id;
				cb(response);
			},errcb);
		}
		
		else {
			$http.post(url, {
					name: this.name,
					tags: this.tags
			})
			.then(function(response) {
				self.id = response.data.id;
				cb(response);
			}, errcb);
		}
	};

	return Artist;

}]);
		
	 