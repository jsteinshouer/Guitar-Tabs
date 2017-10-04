<!DOCTYPE html>
<html ng-app="app">
<head>
  <title></title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/assets/css/guitar-tabs.css" rel="stylesheet">
  <script type="text/javascript" src="./assets/js/jquery.min.js"></script>
  <script type="text/javascript" src="./assets/js/angular.min.js"></script>
  <script type="text/javascript" src="/assets/js/guitar-tabs.js"></script>
</head>
<body>

<nav class="navbar navbar-default navbar-fixed-top" ng-controller="HeaderCtrl" ng-show="auth.isLoggedIn">

		<div class="container">
			<!-- <a class="brand" href="" data-title="Main Menu" data-content-template="common/templates/main-menu.tpl.html" data-placement="left" data-animation="am-slide-left" bs-aside="aside" data-container="body">
				<img src="favicon.ico" style="margin: 10px;height: 30px">
			</a> -->
			<a class="brand" href="" ng-click="navigation.menu.open()">
				<img src="favicon.ico" class="favicon" />
			</a>
			<div class="title">{{navigation.title}}</div> 
			
			<ul class="nav navbar-nav navbar-right visible-md visible-lg">
				<li class="navbar-icon">
					<a href="#{{navigation.newUrl}}" ng-show="navigation.newUrl" style="border: 0">
					<span class="glyphicon glyphicon-plus navbar-icon" aria-hidden="true"></span>
					</a>
				</li>
			</ul>	
		</div>
		<!-- <div class="container">
			<ul class="nav navbar-nav">
				<li><a href="#/browse/tabs">Tabs</a></li>
				<li><a href="#/browse/songs">Songs</a></li>
				<li><a href="#/browse/artists">Artists</a></li>
				<li><a href="#{{navigation.newUrl}}" ng-show="navigation.newUrl">New</a></li>
			</ul>
		</div> -->
</nav>

<div class="container-fluid" style="margin-top: 100px" ng-view></div>

</body>
</html>