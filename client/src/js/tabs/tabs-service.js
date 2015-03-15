var tabService = angular.module('tabs.service', []);


tabService.factory('Tab', ['$http', '$q', function ($http, $q) {

	var url = '/index.cfm/tabs';

	var Tab = function (data) {
		this.song = {
			title: "",
			artist: {
				name: ""
			}
		};
		angular.extend(this, data);
	};

	Tab.get = function(id,cb,errcb) {
		$http.get('/index.cfm/tabs/' + id).then(cb,errcb);
	};

	Tab.getItems = function(options,cb,errcb) {
		var defaults = {
			limit: 10,
			offset: 0,
			fields: 'id,title,tags,song',
			expand:0
		};

		options = angular.extend(defaults,options);

		$http.get('/index.cfm/tabs?limit='+options.limit+'&offset='+options.offset+'&expand='+options.expand+'&fields='+options.fields).then(cb,errcb);
	};

	/*Tab.getItemsByTag = function(tag,options,cb,errcb) {
		var defaults = {
			limit: 10,
			offset: 0,
			fields: 'key,title,description',
			expand:0
		};

		options = angular.extend(defaults,options);

		$http.get('/tags/' + tag + '?limit='+options.limit+'&offset='+options.offset+'&expand='+options.expand+'&fields='+options.fields).then(cb,errcb);
	};*/

	/*Tab.getTags = function(cb,errcb) {
		$http.get('/tags').then(cb,errcb);
	};*/

	Tab.prototype.save = function(cb,errcb) {

		if (!errcb) {
			errcb = function(){};
		}
	 
		var self = this;
		if (this.id && this.id !== '') {
			$http.put(url + '/' + this.id, {
					id: this.id,
					title: this.title,
					key: this.key,
					content: this.content,
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
					key: this.key,
					content: this.content,
					song: this.song,
					tags: this.tags
			})
			.then(function(response) {
				self.id = response.data.id;
				cb(response);
			}, errcb);
		}
	};

	return Tab;

}]);
		
	 