<cfscript>
	// Allow unique URL or combination of URLs, we recommend both enabled
	setUniqueURLS(true);
	// Auto reload configuration, true in dev makes sense to reload the routes on every request
	//setAutoReload(false);
	// Sets automatic route extension detection and places the extension in the rc.format variable
	// setExtensionDetection(true);
	// The valid extensions this interceptor will detect
	// setValidExtensions('xml,json,jsont,rss,html,htm');
	// If enabled, the interceptor will throw a 406 exception that an invalid format was detected or just ignore it
	// setThrowOnInvalidExtension(true);

	setValidExtensions("json,jsonp,html");
	
	// Base URL
	if( len(getSetting('AppMapping') ) lte 1){
		setBaseURL("http://#cgi.HTTP_HOST##getSetting('baseUrl')#");
	}
	else{
		setBaseURL("http://#cgi.HTTP_HOST#/#getSetting('AppMapping')##getSetting('baseUrl')#");
	}

	// Your Application Routes

	addRoute(pattern="/main/setup", handler="main", action="setup");
	
	addRoute(pattern="/authorize", handler="main", action={
	   POST = "authorize"
	});

	addRoute(pattern="/tabs/:id", handler="tabs", action={
	  GET = "read", POST = "update", PUT = "update", DELETE = "delete"
	});
	addRoute(pattern="/tabs", handler="tabs", action={
	  GET = "index", POST = "create"
	});

	addRoute(pattern="/videos/:id", handler="videos", action={
	  GET = "read", POST = "update", PUT = "update", DELETE = "delete"
	});
	addRoute(pattern="/videos", handler="videos", action={
	  GET = "index", POST = "create"
	});

	addRoute(pattern="/songs/search/:term", handler="songs", action={
	  GET = "search"
	});
	addRoute(pattern="/songs/:id/tabs", handler="songs", action={
	  GET = "tabs"
	});
	addRoute(pattern="/songs/:id", handler="songs", action={
	  GET = "read", POST = "update", PUT = "update", DELETE = "delete"
	});
	addRoute(pattern="/songs", handler="songs", action={
	  GET = "index", POST = "create"
	});

	addRoute(pattern="/artists/search/:term", handler="artists", action={
	  GET = "search"
	});
	addRoute(pattern="/artists/:id", handler="artists", action={
	  GET = "read", POST = "update", PUT = "update", DELETE = "delete"
	});
	addRoute(pattern="/artists", handler="artists", action={
	  GET = "index", POST = "create"
	});

	addRoute(pattern="/tags/:id", handler="tags", action={
	  GET = "read"
	});
	addRoute(pattern="/tags", handler="tags", action={
	  GET = "index"
	});

</cfscript>