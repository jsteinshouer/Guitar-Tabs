angular.module('directives.pagination', [])

.directive('pagination', function() {
  return {
    restrict: 'E',
    scope: {
      numPages: '=',
      currentPage: '=',
      onSelectPage: '&'
    },
    /*template:
      '<ul class="pagination pagination-lg">' +
        '<li ng-class="{disabled: noPrevious()}"><a ng-click="selectPrevious()">Previous</a></li>' +
        '<li ng-repeat="page in pages" ng-class="{active: isActive(page)}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
        '<li ng-class="{disabled: noNext()}"><a ng-click="selectNext()">Next</a></li>' +
      '</ul>',*/
    template: 
      '<div class="btn-group btn-group-lg pagination hidden">' +
        '<button type="button" class="btn btn-default" ng-class="{disabled: noPrevious()}" ng-click="selectPrevious()">Previous</button>' +
        '<button type="button" class="btn btn-default" ng-repeat="page in pages" ng-class="{active: isActive(page)}" ng-click="selectPage(page)">{{page}}</button>' +
        '<button type="button" class="btn btn-default" ng-class="{disabled: noNext()}" ng-click="selectNext()">Next</button>' +
      '</div>',
    replace: true,
    link: function(scope,el) {
      scope.$watch('numPages', function(value) {
        scope.pages = [];
        for(var i=1;i<=value;i++) {
          scope.pages.push(i);
        }
        if ( scope.currentPage > value ) {
          scope.selectPage(value);
        }

        // Unhide when there are pages
        if (scope.pages.length) {
        	el.removeClass("hidden");
        }

      });
      scope.noPrevious = function() {
        return scope.currentPage === 1;
      };
      scope.noNext = function() {
        return scope.currentPage === scope.numPages;
      };
      scope.isActive = function(page) {
        return scope.currentPage === page;
      };

      scope.selectPage = function(page) {
        if ( ! scope.isActive(page) ) {
          scope.currentPage = page;
          scope.onSelectPage({ page: page });
        }
      };

      scope.selectPrevious = function() {
        if ( !scope.noPrevious() ) {
          scope.selectPage(scope.currentPage-1);
        }
      };
      scope.selectNext = function() {
        if ( !scope.noNext() ) {
          scope.selectPage(scope.currentPage+1);
        }
      };
    }
  };
});