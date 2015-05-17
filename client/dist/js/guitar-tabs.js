/*! guitar-tabs - v0.8.0 - 2015-05-17*/
angular.module('templates-main', ['artists/artist-detail.tpl.html', 'artists/artist-list.tpl.html', 'common/templates/login-form.tpl.html', 'common/templates/main-menu.tpl.html', 'common/templates/pods.tpl.html', 'common/templates/tag-list.tpl.html', 'songs/song-detail.tpl.html', 'songs/song-form.tpl.html', 'songs/song-list.tpl.html', 'spotify/spotify-artist-search.tpl.html', 'spotify/spotify-search.tpl.html', 'tabs/tab-detail.tpl.html', 'tabs/tab-form.tpl.html', 'tabs/tab-fullscreen.tpl.html', 'tabs/tab-list.tpl.html', 'tags/tag-detail.tpl.html', 'tags/tag-list.tpl.html', 'videos/video-detail.tpl.html', 'videos/video-form.tpl.html', 'videos/video-list.tpl.html', 'videos/video-modal.tpl.html']);

angular.module("artists/artist-detail.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("artists/artist-detail.tpl.html",
    "<div style=\"margin: 40px\">\n" +
    "	<h1>{{artist.name}} <small>{{artist.spotifyData.genres.join(\",\")}}</small></h1>\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-lg-3 col-md-4 list-col\">\n" +
    "			<img ng-src=\"{{artist.spotifyData.images[0].url}}\" height=\"{{artist.spotifyData.images[0].height}}\" width=\"{{artist.spotifyData.images[0].width}}\" alt=\"{{artist.name}}\">\n" +
    "		</div>\n" +
    "		<!-- <div class=\"col-lg-6 col-md-6 list-col\">\n" +
    "			<div class=\"well\">\n" +
    "				<ul class=\"list-unstyled\">\n" +
    "					<li><strong>Genres:</strong> {{artist.spotifyData.genres.join(\",\")}}</li>\n" +
    "				</ul>\n" +
    "			</div>\n" +
    "		</div>\n" +
    " -->	</div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- <pre>{{artist | json}}</pre> -->\n" +
    "<!-- <pre>{{spotifyArtist | json}}</pre>\n" +
    "<pre>{{spotifyData | json}}</pre> -->");
}]);

angular.module("artists/artist-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("artists/artist-list.tpl.html",
    "<div class=\"container\">\n" +
    "	<pagination num-pages=\"pagination.count\" current-page=\"pagination.current\" on-select-page=\"changePage(page)\"></pagination>\n" +
    "	<div class=\"list-group\">\n" +
    "		<div class=\"list-group-item\" ng-repeat=\"artist in artists\" ng-click=\"go('/artists/' + artist.id)\">\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"col-lg-3 col-md-3 list-col\">\n" +
    "					<div ng-show=\"!artist.spotifyData.images[2].url\" class=\"list-icon\">\n" +
    "					<span class=\"glyphicon glyphicon-user\"></span>\n" +
    "					</div>\n" +
    "					<img src=\"{{artist.spotifyData.images[2].url}}\" alt=\"{{artist.name}}\" class=\"list-image\" ng-show=\"artist.spotifyData.images[2].url\">\n" +
    "				</div>\n" +
    "				<div class=\"col-lg-8 col-md-8 list-col\">\n" +
    "					<h4>{{artist.name}}</h4>\n" +
    "					<p ng-bind=\"artist.spotifyData.genres.join()\"></p>\n" +
    "					<p ng-bind=\"artist.tags.join()\"></p>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<pagination num-pages=\"pagination.count\" current-page=\"pagination.current\" on-select-page=\"changePage(page)\"></pagination>\n" +
    "</div>");
}]);

angular.module("common/templates/login-form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/login-form.tpl.html",
    "<div class=\"container\" style=\"margin-top: 30px\">\n" +
    "<form class=\"form-signin\" role=\"form\">\n" +
    "    <h2 class=\"form-signin-heading\">Please sign in</h2>\n" +
    "    <div class=\"alert alert-warning\" ng-show=\"authError\">{{authError}}</div>\n" +
    "    <input type=\"text\" class=\"form-control input-lg\" ng-model=\"user.id\" placeholder=\"Username\" required autofocus>\n" +
    "    <input type=\"password\" class=\"form-control input-lg\" placeholder=\"Password\" ng-model=\"user.password\" required>\n" +
    "    <button class=\"btn btn-lg btn-primary btn-block\" ng-click=\"login()\" ng-disabled='form.$invalid'>Sign in</button>\n" +
    "  </form>\n" +
    "</div>");
}]);

angular.module("common/templates/main-menu.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/main-menu.tpl.html",
    "<div ng-controller=\"MenuCtrl\">\n" +
    "	<div class=\"list-group\">\n" +
    "		<a href=\"#/browse/tabs\" class=\"list-group-item-block\" ng-click=\"navigation.menu.close()\">Tabs</a>\n" +
    "		<a href=\"#/browse/videos\" class=\"list-group-item-block\" ng-click=\"navigation.menu.close()\">Videos</a>\n" +
    "		<a href=\"#/browse/songs\" class=\"list-group-item-block\" ng-click=\"navigation.menu.close()\">Songs</a>\n" +
    "		<a href=\"#/browse/artists\" class=\"list-group-item-block\" ng-click=\"navigation.menu.close()\">Artists</a>\n" +
    "		<a href=\"#/browse/tags\" class=\"list-group-item-block\" ng-click=\"navigation.menu.close()\">Tags</a>\n" +
    "		<a href=\"#{{navigation.newUrl}}\" ng-show=\"navigation.newUrl\" class=\"list-group-item-block\" ng-click=\"navigation.menu.close()\">New</a>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- <ul class=\"nav nav-pills nav-stacked\">\n" +
    "  <li><a href=\"#/browse/tabs\">Tabs</a></li>\n" +
    "	<li><a href=\"#/browse/songs\">Songs</a></li>\n" +
    "	<li><a href=\"#/browse/artists\">Artists</a></li>\n" +
    "	<li><a href=\"#{{navigation.newUrl}}\" ng-show=\"navigation.newUrl\">New</a></li>\n" +
    "</ul> -->");
}]);

angular.module("common/templates/pods.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/pods.tpl.html",
    "<div>\n" +
    "	<div class=\"list-group\">\n" +
    "		<h4 class=\"list-group-item list-group-item-heading\">Tabs</h4>\n" +
    "		<a href=\"#\" class=\"list-group-item\">Test 1</a>\n" +
    "		<a href=\"#\" class=\"list-group-item\">Test 2</a>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("common/templates/tag-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/tag-list.tpl.html",
    "<div>\n" +
    "	<h3>Tags</h3>\n" +
    "	<div class=\"list-group\">\n" +
    "	<a href=\"#/tags/{{tag.id}}\" class=\"list-group-item\" ng-repeat=\"tag in tags\">\n" +
    "	  <span class=\"badge\" ng-bind=\"tag.count\"></span>\n" +
    "	  <h4 class=\"list-group-item-heading\" ng-bind=\"tag.id\"></h4>\n" +
    "	</a>\n" +
    "</div>");
}]);

angular.module("songs/song-detail.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("songs/song-detail.tpl.html",
    "<div style=\"margin: 40px\">\n" +
    "	<div class=\"row\">\n" +
    "		<h1>{{song.title}} <small>{{song.artist.name}}</small></h1>\n" +
    "	</div>\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-lg-3 col-md-3\">\n" +
    "			<img ng-src=\"{{track.album.images[1].url}}\" height=\"{{track.album.images[1].height}}\" width=\"{{track.album.images[1].width}}\" alt=\"{{song.title}}\">\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-4 col-md-4\">\n" +
    "			<div class=\"well\" ng-if=\"track\">\n" +
    "				<ul class=\"list-unstyled\">\n" +
    "					<li><strong>Album:</strong> {{track.album.title}}</li>\n" +
    "					<li><strong>Track #: </strong>{{track.track_number}}</li>\n" +
    "					<li><strong>Duration: </strong>{{track.duration_ms | msToMinutes}}</li>\n" +
    "				</ul>\n" +
    "				<div><audio ng-src=\"{{track.preview}}\" controls></audio></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\">\n" +
    "			<div class=\"bs-sidebar\" data-offset-top=\"-60\" bs-affix>\n" +
    "				<div style=\"width: 220px\">\n" +
    "					<!-- List group -->\n" +
    "				<div class=\"panel panel-default\">\n" +
    "					<a class=\"btn btn-default btn-lg btn-block\" href=\"#/songs/edit/{{song.id}}\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</a>\n" +
    "				</div>\n" +
    "				\n" +
    "				<song-pods song-id=\"song.id\" />\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("songs/song-form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("songs/song-form.tpl.html",
    "<div class=\"container\" style=\"margin-top: 30px\">\n" +
    "<form role=\"form\" ng-submit=\"save()\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"title\">Title</label>\n" +
    "    <input type=\"text\" class=\"form-control input-lg\" name=\"title\" ng-model=\"song.title\" required>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"artist\">Artist</label><spotify-artist-search artist=\"song.artist\"></spotify-artist-search>\n" +
    "    <input type=\"text\" class=\"form-control input-lg\" name=\"artist\" ng-model=\"song.artist.name\" ng-options=\"artist as artist.name\" />\n" +
    "  </div>\n" +
    "  <button type=\"submit\" class=\"btn btn-default\">Save</button>\n" +
    "  <span style=\"margin-left: 5px\" id=\"message\"></span>\n" +
    "</form>\n" +
    "</div>");
}]);

angular.module("songs/song-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("songs/song-list.tpl.html",
    "<div class=\"container\">\n" +
    "	<input type=\"text\" class=\"form-control input-lg\" ng-model=\"filter\" placeholder=\"Search\">\n" +
    "	<pagination num-pages=\"pagination.count\" current-page=\"pagination.current\" on-select-page=\"changePage(page)\"></pagination>\n" +
    "	<div class=\"list-group\">\n" +
    "		<div class=\"list-group-item\" ng-repeat=\"song in songs\" ng-click=\"navigation.go('/songs/' + song.id)\">\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"col-lg-2 col-md-2 list-col\">\n" +
    "					<div ng-show=\"!song.album.image\" class=\"list-icon\">\n" +
    "					<span class=\"glyphicon glyphicon-music\"></span>\n" +
    "					</div>\n" +
    "					<img src=\"{{song.album.image}}\" alt=\"{{song.album.title || song.title}}\" class=\"list-image\" ng-show=\"song.album.image\">\n" +
    "				</div>\n" +
    "				<div class=\"col-lg-8 col-md-8 list-col\">\n" +
    "					<h4>{{song.title}}</h4>\n" +
    "					<p><a href=\"\">{{song.album.title}}</a></p>\n" +
    "					<p><a href=\"\">{{song.artist.name}}</a></p>\n" +
    "					<p ng-bind=\"song.tags.join()\"></p>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<pagination num-pages=\"pagination.count\" current-page=\"pagination.current\" on-select-page=\"changePage(page)\"></pagination>\n" +
    "</div>");
}]);

angular.module("spotify/spotify-artist-search.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("spotify/spotify-artist-search.tpl.html",
    "\n" +
    "<div class=\"row\">\n" +
    "	  <div class=\"col-lg-12 col-md-12\">\n" +
    "	\n" +
    "			<form class=\"form-horizontal\">			\n" +
    "				<div class=\"spotify-search-form\">\n" +
    "				<input type=\"text\" class=\"form-control\" ng-model=\"search.artist\" placeholder=\"Artist\">				\n" +
    "				<button class=\"btn btn-default\" type=\"button\" ng-click=\"search.find()\">Search</button>\n" +
    "				</div>\n" +
    "			</form>\n" +
    "			\n" +
    "	</div><!-- /.col-lg-6 -->\n" +
    "</div>\n" +
    "<div style=\"margin-top: 20px\">\n" +
    "	<div class=\"list-group\">\n" +
    "	<div class=\"list-group-item\" ng-repeat=\"artist in artists\">\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-lg-4 col-md-4\">\n" +
    "			<img src=\"{{artist.images[0].url}}\" alt=\"{{artist.name}}\" width=\"100px\">\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-8 col-md-8\">\n" +
    "			<h4 class=\"list-group-item-heading\"><a ng-click=\"search.selectArtist(artist)\" data-dismiss=\"modal\">{{artist.name}}</a></h4>\n" +
    "			<p class=\"list-group-item-text\">{{artist.genres.join(\", \")}}</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("spotify/spotify-search.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("spotify/spotify-search.tpl.html",
    "\n" +
    "<div class=\"row\">\n" +
    "	  <div class=\"col-lg-12 col-md-12\">\n" +
    "	\n" +
    "			<form class=\"form-horizontal\">\n" +
    "				\n" +
    "				<div class=\"spotify-search-form\">\n" +
    "				<input type=\"text\" class=\"form-control\" ng-model=\"search.track\" placeholder=\"Track\">\n" +
    "				\n" +
    "		\n" +
    "				<input type=\"text\" class=\"form-control\" ng-model=\"search.artist\" placeholder=\"Artist\">\n" +
    "				\n" +
    "				<button class=\"btn btn-default\" type=\"button\" ng-click=\"search.findTracks()\">Search</button>\n" +
    "				</div>\n" +
    "			</form>\n" +
    "			\n" +
    "	</div><!-- /.col-lg-6 -->\n" +
    "</div>\n" +
    "<div style=\"margin-top: 20px\">\n" +
    "	<div class=\"list-group\">\n" +
    "	<div class=\"list-group-item\" ng-repeat=\"track in tracks\">\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-lg-4 col-md-4\">\n" +
    "			<img src=\"{{track.album.image.url}}\" alt=\"{{track.album.title}}\" width=\"100px\">\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-8 col-md-8\">\n" +
    "			<h4 class=\"list-group-item-heading\"><a ng-click=\"search.selectTrack(track)\" data-dismiss=\"modal\">{{track.title}}</a></h4>\n" +
    "			<p class=\"list-group-item-text\"><strong>Album:</strong> {{track.album.title}}</p>\n" +
    "			<p class=\"list-group-item-text\"><strong>Artist:</strong> {{track.artist.name}}</p>\n" +
    "			<p class=\"list-group-item-text\"><strong>Uri: </strong> {{track.uri}}</p>\n" +
    "			<div>\n" +
    "			<audio ng-src=\"{{track.preview}}\" controls></audio>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("tabs/tab-detail.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tabs/tab-detail.tpl.html",
    "<div class=\"container-fluid\">\n" +
    "  <!-- <h1>{{tab.title}}</h1> -->\n" +
    "	<div class=\"row-fluid\">\n" +
    "		<div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\">\n" +
    "			<!-- <p class=\"text-muted\">{{tab.tags.join()}}</p> -->\n" +
    "\n" +
    "			<pre class=\"tab-fullscreen\">{{tab.content}}</pre>\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\">\n" +
    "			<!-- <div class=\"btn-group-vertical bs-sidebar\" role=\"group\" aria-label=\"\" data-offset-top=\"-65\" bs-affix style=\"margin-top:20px;\">\n" +
    " 				<button type=\"button\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    " 				<button type=\"button\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-edit\"></span></button>\n" +
    "			</div> -->\n" +
    "\n" +
    "			<div class=\"bs-sidebar\" data-offset-top=\"-60\" bs-affix>\n" +
    "				<div style=\"width: 220px\">\n" +
    "					<!-- List group -->\n" +
    "				<div class=\"panel panel-default\">\n" +
    "					<a class=\"btn btn-default btn-lg btn-block\" href=\"#/tabs/edit/{{tab.id}}\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</a>\n" +
    "					<a class=\"btn btn-default btn-lg btn-block\" href=\"#/tabs/{{tab.id}}/fullscreen\"><span class=\"glyphicon glyphicon-resize-full\"></span> Fullscreen</a>\n" +
    "					\n" +
    "				</div>\n" +
    "				\n" +
    "				<!-- <div ng-include=\"'tabs/tab-pod.tpl.html'\"></div> -->\n" +
    "				<song-pods song-id=\"tab.song.id\" />\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("tabs/tab-form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tabs/tab-form.tpl.html",
    "<div class=\"container\" style=\"margin-top: 30px\">\n" +
    "<form role=\"form\" ng-submit=\"save()\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"title\">Title</label>\n" +
    "    <input type=\"text\" class=\"form-control input-lg\" name=\"title\" ng-model=\"tab.title\" required>\n" +
    "  </div>\n" +
    "    <div class=\"form-group\">\n" +
    "    <label for=\"song\">Song</label><spotify-search song=\"tab.song\"></spotify-search>\n" +
    "    <input type=\"text\" class=\"form-control input-lg\" ng-model=\"tab.song\" ng-options=\"song as song.title for song in getSongs($viewValue)\" data-min-length=\"2\" placeholder=\"Enter Song\" bs-typeahead>\n" +
    "    <!-- <input type=\"text\" class=\"form-control input-lg\" ng-model=\"tab.song.title\" > -->\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"artist\">Artist</label>\n" +
    "    <input type=\"text\" class=\"form-control input-lg\" name=\"artist\" ng-model=\"tab.song.artist.name\" />\n" +
    "  </div>\n" +
    "  <!-- <div class=\"form-group\">\n" +
    "    <label for=\"key\">Key</label>\n" +
    "    <input type=\"text\" class=\"form-control input-lg\" name=\"key\" ng-model=\"tab.key\" />\n" +
    "  </div> -->\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"content\">Tab</label>\n" +
    "    <textarea name=\"content\" ng-model=\"tab.content\" class=\"form-control input-lg tab-field\" rows=\"14\"></textarea>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"tags\">Tags</label>\n" +
    "    <tags-input ng-model=\"tags\"></tags-input>\n" +
    "  </div>\n" +
    "  <!-- <div><pre>{{tab | json}}</pre></div> -->\n" +
    "  <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n" +
    "  <span style=\"margin-left: 5px\" id=\"message\"></span>\n" +
    "</form>\n" +
    "</div>");
}]);

angular.module("tabs/tab-fullscreen.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tabs/tab-fullscreen.tpl.html",
    "<div class=\"container-fluid\">\n" +
    "	<div class=\"row-fluid\">\n" +
    "		<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n" +
    "			<pre class=\"tab-fullscreen\">\n" +
    "				<a class=\"btn btn-default exit-fullscreen\" href=\"#/tabs/{{tab.id}}\"><span class=\"glyphicon glyphicon-resize-small\"></span></a>\n" +
    "				<div>{{tab.content}}</div>\n" +
    "			</pre>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("tabs/tab-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tabs/tab-list.tpl.html",
    "<div class=\"container\" ng-show=\"ready\">\n" +
    "	<input type=\"text\" class=\"form-control input-lg\" ng-model=\"filter\" placeholder=\"Search\">\n" +
    "	<pagination num-pages=\"pagination.count\" current-page=\"pagination.current\" on-select-page=\"changePage(page)\"></pagination>\n" +
    "	<div class=\"list-group\">\n" +
    "		<div class=\"list-group-item\" ng-repeat=\"tab in tabs\" ng-click=\"go('/tabs/' + tab.id)\">\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"col-lg-2 col-md-2 list-col\">\n" +
    "					<div ng-show=\"!tab.song.album.images[1].url\" class=\"list-icon\">\n" +
    "					<span class=\"glyphicon glyphicon-music\"></span>\n" +
    "					</div>\n" +
    "					<img class=\"media-object list-image\" src=\"{{tab.song.album.images[1].url}}\" alt=\"{{tab.song.album.title || tab.title}}\" ng-show=\"tab.song.album.images[1].url\">\n" +
    "				</div>\n" +
    "				<div class=\"col-lg-8 col-md-8 list-col\">\n" +
    "					<h4>{{tab.title}}</h4>\n" +
    "					<p><a ng-href=\"#/songs/{{tab.song.id}}\" >{{tab.song.title}}</a></p>\n" +
    "					<p><a >{{tab.song.album.title}}</a></p>\n" +
    "					<p><a ng-href=\"#/artists/{{tab.song.artist.id}}\">{{tab.song.artist.name}}</a></p>\n" +
    "					<p ng-bind=\"tab.tags.join()\"></p>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<pagination num-pages=\"pagination.count\" current-page=\"pagination.current\" on-select-page=\"changePage(page)\"></pagination>\n" +
    "</div>");
}]);

angular.module("tags/tag-detail.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tags/tag-detail.tpl.html",
    "<div class=\"container-fluid\">\n" +
    "	<div class=\"row-fluid\">\n" +
    "		<div class=\"list-group\">\n" +
    "			<div class=\"list-group-item\" ng-repeat=\"tab in tag.tabs\" ng-click=\"go('/tabs/' + tab.id)\">\n" +
    "					<span class=\"badge\">Tab</span>\n" +
    "					<h4>{{tab.title}}</h4>\n" +
    "			</div>\n" +
    "			<div class=\"list-group-item\" ng-repeat=\"video in tag.videos\" ng-click=\"go('/videos/' + video.id)\">\n" +
    "					<span class=\"badge\">Video</span>\n" +
    "					<h4>{{video.title}}</h4>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("tags/tag-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tags/tag-list.tpl.html",
    "<div class=\"container\">\n" +
    "	<input type=\"text\" class=\"form-control input-lg\" ng-model=\"filter\" placeholder=\"Search\">\n" +
    "	<pagination num-pages=\"pagination.count\" current-page=\"pagination.current\" on-select-page=\"changePage(page)\"></pagination>\n" +
    "	<div class=\"list-group\">\n" +
    "		<div class=\"list-group-item\" ng-repeat=\"tag in tags\" ng-click=\"go('/tags/' + tag.id)\">\n" +
    "				<span class=\"badge\">{{tag.total}}</span>\n" +
    "				<h4>{{tag.title}}</h4>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<pagination num-pages=\"pagination.count\" current-page=\"pagination.current\" on-select-page=\"changePage(page)\"></pagination>\n" +
    "</div>");
}]);

angular.module("videos/video-detail.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("videos/video-detail.tpl.html",
    "<div class=\"container-fluid\">\n" +
    "  <!-- <h1>{{video.title}}</h1> -->\n" +
    "	<div class=\"row-fluid\">\n" +
    "		<div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\">\n" +
    "			<!-- <p class=\"text-muted\">{{video.tags.join()}}</p> -->\n" +
    "			<div class=\"embed-responsive embed-responsive-16by9\">\n" +
    "				<iframe width=\"853\" height=\"480\" ng-src=\"{{videoUrl}}\" class=\"embed-responsive-item\" allowfullscreen></iframe>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\">\n" +
    "			<div class=\"bs-sidebar\" data-offset-top=\"-60\" bs-affix>\n" +
    "				<div style=\"width: 220px\">\n" +
    "					<!-- List group -->\n" +
    "				<div class=\"panel panel-default\">\n" +
    "					<a class=\"btn btn-default btn-lg btn-block\" href=\"#/videos/edit/{{video.id}}\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</a>\n" +
    "				</div>\n" +
    "				\n" +
    "				<!-- <div ng-include=\"'videos/video-pod.tpl.html'\"></div> -->\n" +
    "				<song-pods song-id=\"video.song.id\" />\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("videos/video-form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("videos/video-form.tpl.html",
    "<div class=\"container\" style=\"margin-top: 30px\">\n" +
    "<form role=\"form\" ng-submit=\"save()\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"title\">Title</label>\n" +
    "    <input type=\"text\" class=\"form-control input-lg\" name=\"title\" ng-model=\"video.title\" required>\n" +
    "  </div>\n" +
    "    <div class=\"form-group\">\n" +
    "    <label for=\"code\">Code</label>\n" +
    "     <input type=\"text\" class=\"form-control input-lg\" name=\"code\" ng-model=\"video.code\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"song\">Song</label><spotify-search song=\"video.song\"></spotify-search>\n" +
    "    <input type=\"text\" class=\"form-control input-lg\" ng-model=\"video.song\" ng-options=\"song as song.title for song in getSongs($viewValue)\" data-min-length=\"2\" placeholder=\"Enter Song\" bs-typeahead>\n" +
    "    <!-- <input type=\"text\" class=\"form-control input-lg\" ng-model=\"video.song.title\" > -->\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"artist\">Artist</label>\n" +
    "    <input type=\"text\" class=\"form-control input-lg\" name=\"artist\" ng-model=\"video.song.artist.name\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"tags\">Tags</label>\n" +
    "    <tags-input ng-model=\"tags\"></tags-input>\n" +
    "  </div>\n" +
    "  <!-- <div><pre>{{video | json}}</pre></div> -->\n" +
    "  <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n" +
    "  <span style=\"margin-left: 5px\" id=\"message\"></span>\n" +
    "</form>\n" +
    "</div>");
}]);

angular.module("videos/video-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("videos/video-list.tpl.html",
    "<div class=\"container\">\n" +
    "	<input type=\"text\" class=\"form-control input-lg\" ng-model=\"filter\" placeholder=\"Search\">\n" +
    "	<pagination num-pages=\"pagination.count\" current-page=\"pagination.current\" on-select-page=\"changePage(page)\"></pagination>\n" +
    "	<div class=\"list-group\">\n" +
    "		<div class=\"list-group-item\" ng-repeat=\"video in videos\" ng-click=\"go('/videos/' + video.id)\">\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"col-lg-2 col-md-2 list-col\">\n" +
    "					<div ng-show=\"!video.song.album.images[1].url\" class=\"list-icon\">\n" +
    "					<span class=\"glyphicon glyphicon-music\"></span>\n" +
    "					</div>\n" +
    "					<img class=\"media-object list-image\" src=\"{{video.song.album.images[1].url}}\" alt=\"{{video.song.album.title || video.title}}\" ng-show=\"video.song.album.images[1].url\">\n" +
    "				</div>\n" +
    "				<div class=\"col-lg-8 col-md-8 list-col\">\n" +
    "					<h4>{{video.title}}</h4>\n" +
    "					<p><a ng-href=\"#/songs/{{video.song.id}}\" >{{video.song.title}}</a></p>\n" +
    "					<p><a >{{video.song.album.title}}</a></p>\n" +
    "					<p><a ng-href=\"#/artists/{{video.song.artist.id}}\">{{video.song.artist.name}}</a></p>\n" +
    "					<p ng-bind=\"video.tags.join()\"></p>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<pagination num-pages=\"pagination.count\" current-page=\"pagination.current\" on-select-page=\"changePage(page)\"></pagination>\n" +
    "</div>");
}]);

angular.module("videos/video-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("videos/video-modal.tpl.html",
    "<div class=\"embed-responsive embed-responsive-16by9\">\n" +
    "<iframe class=\"embed-responsive-item\" width=\"560\" height=\"315\" ng-src=\"{{videoUrl}}\" frameborder=\"0\" allowfullscreen></iframe>\n" +
    "</div>");
}]);

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
		when('/tabs/:id/fullscreen', {templateUrl: 'tabs/tab-fullscreen.tpl.html', controller:'TabFullscreenCtrl'}).
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
		
	 
artists = angular.module('artists', [
	'artists.service',
	'spotify',
	'navigation',
	'mgcrea.ngStrap'
]);
	

artists.controller('ArtistListCtrl', ['$scope','Artist','navigation', function($scope, Artist, navigation) {
	$scope.pagination = {};
	$scope.go = navigation.go;
	Artist.getItems({limit: 10}, function(response) {
		$scope.artists = response.data.items;
		$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
		$scope.pagination.current = parseInt(response.data.offset,8) + 1;
	});

	$scope.changePage = function(page) {
		var offset = page - 1;

		Artist.getItems({offset: offset},function(response) {
			$scope.artists = response.data.items;
		});
	};
}]);

artists.controller('ArtistDetailCtrl', ['$scope','Artist','SpotifyArtist','$routeParams','navigation', function($scope,Artist,SpotifyArtist,$routeParams,navigation) {

	$scope.navigation = navigation;

	Artist.get($routeParams.id,function(response) {
		$scope.artist = new Artist(response.data);
		navigation.title = $scope.artist.name;
		//navigation.editUrl = "/tabs/edit/" + $scope.tab.id;

		// SpotifyArtist.get($scope.artist.spotifyData.id,function(spotifyArtist,spotifyData) {
		// 	$scope.spotifyArtist = spotifyArtist;
		// })
	});

}]);
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
angular.module('security',[])

	.factory('authorizationProvider',['$http','$rootScope', function($http,$rootScope) {
	
		var self = JSON.parse(sessionStorage.getItem('auth')) || {isLoggedIn: false, token: ''};

		return {
			init: function() {
				$rootScope.auth = self;
			},
			login: function(username,password,cb,errcb) {
				$http.post('/index.cfm/authorize',{
					username: username,
					password: password
				})
				.success(function(data) {
					self.isLoggedIn = true;
					self.token = data.token;
					sessionStorage.setItem('auth',JSON.stringify(self));
					cb(data);
				})
				.error(function(data,status){
					self.isLoggedIn = false;
					self.token = '';
					sessionStorage.setItem('auth',JSON.stringify(self));
					errcb(data,status);
				});
			},
			logout: function() {
				self.isLoggedIn = false;
				self.token = '';
				sessionStorage.setItem('auth',JSON.stringify(self));
			},
			isLoggedIn: function() {
				return self.isLoggedIn;
			},
			token: self.token
		};
	}])

	.factory('securityInterceptor',['$q','$location','$rootScope', function($q,$location,$rootScope) {
		return {
			'request': function(config) {
				if ($rootScope.auth && $rootScope.auth.token && config.url !== '/index.cfm/authorize' && config.url.indexOf("api.spotify.com") === -1) {
					/* Add authorization header */
					config.headers['Auth-Token'] =  $rootScope.auth.token;
				}
				return config;
			},
			'responseError': function(response) {
				/* Check for 401 error */
				if (response.config.url !== '/index.cfm/authorize' && response.status === 401) {
					$rootScope.auth.isLoggedIn = false;
					$rootScope.auth.token = '';
					sessionStorage.setItem('auth',JSON.stringify($rootScope.auth));
					$location.path('/login');
				}
				
				return $q.reject(response);
				
			}	
		};
	}]);

angular.module('songs.pods', ['songs.service','videos.modal'])

.directive('songPods',['Song', function(Song) {
	return {
		restrict: 'E',
		scope: {
			songId: '='
		},
		template: 
			'<div>' +
				'<div class="list-group">' +
						'<h4 class="list-group-item list-group-item-heading">Tabs</h4>' +
						'<a ng-href="#/tabs/{{tab.id}}" class="list-group-item" ng-repeat="tab in tabs">{{tab.title}}</a>' +
						'<a ng-href="#/songs/{{songId}}/tabs/new" class="list-group-item">Add</a>' +
				'</div>' +
				'<div class="list-group">' +
						'<h4 class="list-group-item list-group-item-heading">Videos</h4>' +
						'<a ng-href="#" class="list-group-item" ng-repeat="video in videos" video="video" video-modal>{{video.title}}</a>' +
						'<a ng-href="#/songs/{{songId}}/videos/new" class="list-group-item">Add</a>' +
				'</div>' +
			'<div>',
		replace: true,
		link: function(scope, el, attrs) {

			var unwatch = scope.$watch('songId', function() {

				if (scope.songId) {

					var options = {
						id: scope.songId,
						fields: "id,title,tabs,videos"
					};

					Song.customGet(options, function(response) {
						scope.tabs = response.data.tabs;
						scope.videos = response.data.videos;
					});
					// Remove the watch since we dont need it anymore
					unwatch();
				}
			});
		}
	};
}]);
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
		
	 
songs = angular.module('songs', [
	'songs.service',
	'songs.pods',
	'spotify',
	'navigation',
	'mgcrea.ngStrap'
]);
	

songs.controller('SongListCtrl', ['$scope','Song','navigation',function($scope,Song,navigation) {
	$scope.navigation = navigation;
	$scope.pagination = {};
	$scope.filter = "";

	Song.getItems({limit: 10},function(response) {
		$scope.songs = response.data.items;
		$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
		$scope.pagination.current = parseInt(response.data.offset,8) + 1;
	});

	$scope.changePage = function(page) {
		var offset = page - 1;

		Song.getItems({offset: offset},function(response) {
			$scope.songs = response.data.items;
		});
	};

	/* Search */
	$scope.$watch(function(scope) { return scope.filter },function(filterValue) {
		Song.getItems({limit: 10,filter: $scope.filter},function(response) {
			$scope.songs = response.data.items;
			$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
			$scope.pagination.current = parseInt(response.data.offset,8) + 1;
		});
	});
}]);

songs.controller('SongDetailCtrl', ['$scope','Song','Track','$routeParams','navigation', function($scope,Song,Track,$routeParams,navigation) {

	$scope.navigation = navigation;

	Song.get($routeParams.id,function(response) {
		$scope.song = new Song(response.data);
		$scope.tabs = $scope.song.getTabs(function(tabs) {
			console.log(tabs);
		});
		navigation.title = $scope.song.title;
		//navigation.editUrl = "/tabs/edit/" + $scope.tab.id;

		Track.get($scope.song.spotifyId,function(track,spotifyData) {
			$scope.track = track;
			$scope.spotifyData = spotifyData;
		});
	});

}]);

songs.controller('SongEditCtrl', ['$scope','Song','$routeParams','navigation','$alert', function($scope,Song,$routeParams,navigation,$alert) {
	
	$scope.song = {};	
	$scope.tags = [];

	if ($routeParams.id) {
		Song.get($routeParams.id,function(response) {
			$scope.song = new Song(response.data);

			angular.forEach($scope.song.tags, function(item) {
				$scope.tags.push({"text": item});
			});

			navigation.title = $scope.song.title;
			navigation.editUrl = "/songs/edit/" + $scope.song.id;
		});
	}
	else {
		$scope.song = new Song();

		navigation.title = "New Song";
	}

	$scope.save = function() {
		$scope.song.tags = [];

		angular.forEach($scope.tags, function(item) {
			$scope.song.tags.push(item.text);
		});

		$scope.song.save(function() {

			navigation.title = $scope.song.title;

			/* Show success message */	
			$alert({
				title: 'Saved!', 
				content: 'The song was saved successfully.',
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
var spotifySearch = angular.module('spotify.search', ['mgcrea.ngStrap','spotify.service']);

spotifySearch.directive('spotifySearch',['$modal','Track','SpotifyArtist', function($modal,Track,SpotifyArtist) {
	return {
		restrict: 'E',
		scope: {
			song: '='
		},
		template: '<a href="" style="margin-left: 10px" ng-click="openSearch()">Search</a>',
		replace: true,
		link: function(scope, el, attrs) {

			scope.search = {
				track: "",
				artist: ""
			};

			var searchModal = $modal({
				scope: scope, 
				title: 'Song Search', 
				contentTemplate: 'spotify/spotify-search.tpl.html',
				show: false
			});

			scope.openSearch = function() {
				searchModal.$promise.then(function() {
					searchModal.show();
					searchModal.$element.find("input[type='text']").get(0).focus();
				}); 
			};

			scope.search.findTracks =  function() {
				if (scope.track !== "") {
					Track.search(this.track, this.artist, function(tracks) {
						scope.tracks = tracks;
					});
				}
			};

			scope.search.selectTrack = function(track) {
				scope.song = {
					title: track.title,
					artist: {
						name: track.artist.name
					}
				};
				Track.get(track.id,function(data) {
					scope.song.spotifyId = data.id;
					scope.song.album = data.album;
				});
				SpotifyArtist.get(track.artist.id,function(artist) {
					scope.song.artist.spotifyData = artist;
				});
				searchModal.$promise.then(searchModal.hide);
			};

		}
	};
}]);

spotifySearch.directive('spotifyArtistSearch',['$modal','SpotifyArtist', function($modal,SpotifyArtist) {
	return {
		restrict: 'E',
		scope: {
			artist: '='
		},
		template: '<a href="" style="margin-left: 10px" ng-click="openSearch()">Search</a>',
		replace: true,
		link: function(scope, el, attrs) {

			scope.search = {
				artist: ""
			};

			var searchModal = $modal({
				scope: scope, 
				title: 'Artist Search', 
				contentTemplate: 'spotify/spotify-artist-search.tpl.html',
				show: false
			});

			scope.openSearch = function() {
				searchModal.$promise.then(function() {
					searchModal.show();
					searchModal.$element.find("input[type='text']").get(0).focus();
				}); 
			};

			scope.search.find =  function() {
				if (scope.artist !== "") {
					SpotifyArtist.search(this.artist, function(artists) {
						scope.artists = artists;
					});
				}
			};

			scope.search.selectArtist = function(artist) {
				scope.artist = {
					name: '',
					id: '',
					spotifyData:{}
				};
				SpotifyArtist.get(artist.id,function(artist) {
					scope.artist.name = artist.name
					scope.artist.spotifyData = artist;
				});
				searchModal.$promise.then(searchModal.hide);
			};

		}
	};
}]);
var spotify = angular.module('spotify.service', []);


spotify.factory('Track', ['$http', '$q', function ($http, $q) {

	var Track = function (data) {
		angular.extend(this, data);
	};

	Track.search = function(trackQuery,artistQuery,cb,errcb) {

		var tracks = [];
		var q = "track:" + trackQuery;

		if (artistQuery && artistQuery !== "") {
			q = q + "+artist:" + artistQuery;
		}

		$http.get('https://api.spotify.com/v1/search?q=' + q + '"&type=track').then(function(res) {

				angular.forEach(res.data.tracks.items,function(item) {
					var track = {
						title: item.name,
						uri: item.uri,
						id: item.id,
						preview: item.preview_url,
						artist: {
							name: item.artists[0].name,
							uri: item.artists[0].uri,
							id: item.artists[0].id
						},
						album: {
							title: item.album.name,
							uri: item.album.uri
						}
					};

					track.album.image = item.album.images[1] || item.album.images[0] || undefined;

					tracks.push(track);
				});

				cb(tracks);

			},errcb);
	};

	Track.get = function(id,cb,errcb) {

			$http.get('https://api.spotify.com/v1/tracks/' + id).then(function(res) {
				var item = res.data;

				var track = {
					title: item.name,
					uri: item.uri,
					id: item.id,
					preview: item.preview_url,
					duration_ms: item.duration_ms,
					track_number: item.track_number,
					artist: {
						name: item.artists[0].name,
						uri: item.artists[0].uri,
						id: item.artists[0].id
					},
					album: {
						title: item.album.name,
						uri: item.album.uri,
						images: item.album.images
					}
				};

				cb(track,item);
			},errcb);
	};

	return Track;

}]);

spotify.factory('SpotifyArtist', ['$http', '$q', function ($http, $q) {

	var Artist = function (data) {
		angular.extend(this, data);
	};

	Artist.search = function(term,cb,errcb) {

		var artists = [];

		$http.get('https://api.spotify.com/v1/search?q=artist:"' + term + '"&type=artist').then(function(res) {
				cb(res.data.artists.items);
		},errcb);
	};

	Artist.get = function(id,cb,errcb) {

		$http.get('https://api.spotify.com/v1/artists/' + id).then(function(res) {

			var artist = {
				name: res.data.name,
				uri: res.data.uri,
				id: res.data.id,
				genres: res.data.genres,
				images: res.data.images
			};
			
			cb(artist,res.data);
		},errcb);
	};

	return Artist;

}]);
angular.module('spotify',[
	'spotify.service',
	'spotify.search'
]);
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
			expand:0,
			filter: ''
		};

		options = angular.extend(defaults,options);

		$http.get('/index.cfm/tabs?limit='+options.limit+'&offset='+options.offset+'&expand='+options.expand+'&fields='+options.fields+'&filter='+options.filter).then(cb,errcb);
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
		
	 
var tabs = angular.module('tabs', [
	'tabs.service',
	'songs',
	'spotify',
	'navigation',
	'directives.pagination',
	'mgcrea.ngStrap',
	'ngTagsInput'
]);


tabs.controller('TabListCtrl', ['$scope','navigation','Tab',function($scope,navigation,Tab) {
	$scope.pagination = {};
	$scope.filter = "";

	Tab.getItems({limit: 10},function(response) {
		$scope.tabs = response.data.items;
		$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
		$scope.pagination.current = parseInt(response.data.offset,8) + 1;
		$scope.ready = true;
	});

	$scope.go = navigation.go;

	$scope.changePage = function(page) {
		var offset = page - 1;

		Tab.getItems({offset: offset,filter: $scope.filter},function(response) {
			$scope.tabs = response.data.items;
		});
	};

	/* Search */
	$scope.$watch(function(scope) { return scope.filter },function(filterValue) {
		Tab.getItems({limit: 10,filter: $scope.filter},function(response) {
			$scope.tabs = response.data.items;
			$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
			$scope.pagination.current = parseInt(response.data.offset,8) + 1;
		});
	});


}]);

tabs.controller('TabDetailCtrl', ['$scope','Tab','$routeParams','navigation', function($scope,Tab,$routeParams,navigation) {

	Tab.get($routeParams.id,function(response) {
		$scope.tab = new Tab(response.data);
		navigation.title = $scope.tab.title;
		navigation.editUrl = "/tabs/edit/" + $scope.tab.id;
	});

}]);

tabs.controller('TabFullscreenCtrl', ['$scope','Tab','$routeParams','navigation', function($scope,Tab,$routeParams,navigation) {

	Tab.get($routeParams.id,function(response) {
		$scope.tab = new Tab(response.data);
		navigation.title = $scope.tab.title;
		navigation.editUrl = "/tabs/edit/" + $scope.tab.id;
	});

}]);


tabs.controller('TabEditCtrl', ['$scope','Tab','Song','$routeParams', '$alert', function($scope,Tab,Song,$routeParams,$alert) {
	
	$scope.tab = {};	
	$scope.tags = [];

	if ($routeParams.id) {
		Tab.get($routeParams.id,function(response) {
			$scope.tab = new Tab(response.data);

			angular.forEach($scope.tab.tags, function(item) {
				$scope.tags.push({"text": item});
			});
		});
	}
	else {
		$scope.tab = new Tab();

		/* Populate the song if it was provided*/
		if ($routeParams.songId) {
			Song.get($routeParams.songId, function(response) {
				$scope.tab.song = new Song(response.data);
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
		$scope.tab.tags = [];

		angular.forEach($scope.tags, function(item) {
			$scope.tab.tags.push(item.text);
		});

		if (typeof($scope.tab.song) === "string") {
			$scope.tab.song = new Song({title: $scope.tab.song,tags: []});
		}

		$scope.tab.save(function() {

		/* Show success message */	
		$alert({
			title: 'Saved!', 
			content: 'The tab was saved successfully.',
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
		
	 
var tags = angular.module('tags', [
	'tags.service',
	'songs.service',
	'navigation'
]);


tags.controller('TagListCtrl', ['$scope','navigation','Tag',function($scope,navigation,Tag) {
	$scope.pagination = {};
	$scope.filter = "";

	Tag.getItems({limit: 10},function(response) {
		$scope.tags = response.data.items;
		$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
		$scope.pagination.current = parseInt(response.data.offset,8) + 1;
	});

	$scope.go = navigation.go;

	$scope.changePage = function(page) {
		var offset = page - 1;

		Tag.getItems({offset: offset},function(response) {
			$scope.tags = response.data.items;
		});
	};

	/* Search */
	$scope.$watch(function(scope) { return scope.filter },function(filterValue) {
		Tag.getItems({limit: 10,filter: $scope.filter},function(response) {
			$scope.tags = response.data.items;
			$scope.pagination.count = Math.ceil(response.data.total / response.data.limit);
			$scope.pagination.current = parseInt(response.data.offset,8) + 1;
		});
	});

}]);

tags.controller('TagDetailCtrl', ['$scope','Tag','$routeParams','navigation', function($scope,Tag,$routeParams,navigation) {
	$scope.go = navigation.go;
	
	Tag.get($routeParams.id,function(response) {
		$scope.tag = new Tag(response.data);
		navigation.title = $scope.tag.title;
		console.log($scope.tag);
	});

}]);
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
				modal.$promise.then(modal.show);
			});

		}
	};
}]);
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
			expand:0,
			filter: ''
		};

		options = angular.extend(defaults,options);

		$http.get('/index.cfm/videos?limit='+options.limit+'&offset='+options.offset+'&expand='+options.expand+'&fields='+options.fields+'&filter='+options.filter).then(cb,errcb);
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