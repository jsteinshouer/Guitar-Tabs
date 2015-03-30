var tagService = angular.module('tags.service', []);


tagService.factory('Tag', ['$http', '$q', function ($http, $q) {

	var url = '/index.cfm/tags';

	var Tag = function (data) {
		angular.extend(this, data);
	};

	Tag.get = function(id,cb,errcb) {
		$http.get('/index.cfm/tags/' + id).then(cb,errcb);
	};

	Tag.getItems = function(options,cb,errcb) {
		var defaults = {
			limit: 10,
			offset: 0,
			fields: 'id,title,total',
			expand:0,
			filter: ""
		};

		options = angular.extend(defaults,options);

		$http.get('/index.cfm/tags?limit='+options.limit+'&offset='+options.offset+'&expand='+options.expand+'&fields='+options.fields+'&filter='+options.filter).then(cb,errcb);
	};

	return Tag;

}]);
		
	 