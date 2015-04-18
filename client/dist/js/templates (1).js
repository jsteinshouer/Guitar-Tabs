angular.module('templates-main', ['artists/artist-detail.tpl.html', 'artists/artist-list.tpl.html', 'common/templates/login-form.tpl.html', 'common/templates/main-menu.tpl.html', 'common/templates/pods.tpl.html', 'common/templates/tag-list.tpl.html', 'songs/song-detail.tpl.html', 'songs/song-form.tpl.html', 'songs/song-list.tpl.html', 'spotify/spotify-artist-search.tpl.html', 'spotify/spotify-search.tpl.html', 'tabs/tab-detail.tpl.html', 'tabs/tab-form.tpl.html', 'tabs/tab-list.tpl.html', 'tags/tag-detail.tpl.html', 'tags/tag-list.tpl.html', 'videos/video-detail.tpl.html', 'videos/video-form.tpl.html', 'videos/video-list.tpl.html', 'videos/video-modal.tpl.html']);

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
    "			<!-- <p class=\"lead\">{{movie.Plot}}</p> -->\n" +
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
    "						<!-- <button type=\"button\" class=\"btn btn-primary btn-block\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</button> -->\n" +
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
