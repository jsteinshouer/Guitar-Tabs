angular.module('navigation', ['mgcrea.ngStrap'])

	.factory('navigation',['$aside','$location', function($aside,$location) {
		
		var mainMenu = $aside({
			title: 'Main Menu',
			placement: 'left',
			contentTemplate: 'common/templates/main-menu.tpl.html',
			show: false,
			animation: 'am-fade-and-slide-left'
		});

		return {
			title: "",
			editUrl: "",
			newUrl: "",
			menu: {
				open: function() {
					mainMenu.$promise.then(function() {
						mainMenu.show();
					});
				},
				close: function() {
					mainMenu.$promise.then(function() {
						mainMenu.hide();
					});
				}
			},
			go: function(path) {
				$location.path(path);
			}
		};
	}]);