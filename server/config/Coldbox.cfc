<cfcomponent output="false" hint="My App Configuration">
<cfscript>
/**
structures to create for configuration

- coldbox (struct)
- settings (struct)
- conventions (struct)
- environments (struct)
- wirebox (struct)
- ioc (struct)
- debugger (struct)
- mailSettings (struct)
- i18n (struct)
- webservices (struct)
- datasources (struct)
- layoutSettings (struct)
- layouts (array of structs)
- cacheBox (struct)
- interceptorSettings (struct)
- interceptors (array of structs)
- modules (struct)
- logBox (struct)
- flash (struct)
- orm (struct)

Available objects in variable scope
- controller
- logBoxConfig
- appMapping (auto calculated by ColdBox)

Required Methods
- configure() : The method ColdBox calls to configure the application.
Optional Methods
- detectEnvironment() : If declared the framework will call it and it must return the name of the environment you are on.
- {environment}() : The name of the environment found and called by the framework.

*/
	
// Configure ColdBox Application
function configure(){

	// coldbox directives
	coldbox = {
		//Application Setup
		appName 				= "guitar-tabs",
		
		//Development Settings
		debugMode				= false,
		debugPassword			= "",
		reinitPassword			= "",
		handlersIndexAutoReload = false,
		
		//Implicit Events
		defaultEvent			= "main.index",
		requestStartHandler		= "main.onRequestStart",
		requestEndHandler		= "",
		applicationStartHandler = "main.onApplicationStart",
		applicationEndHandler	= "",
		sessionStartHandler 	= "",
		sessionEndHandler		= "",
		missingTemplateHandler	= "",
		
		//Error/Exception Handling
		exceptionHandler		= "",
		onInvalidEvent			= "",
		customErrorTemplate		= "",
			
		//Application Aspects
		handlerCaching 			= true,
		eventCaching			= true
	};

	flash = {
		scope = "cache"
	};

	settings = {
		baseUrl = "/",
		useSSL = true,
		tokenSecret = "34rFChP5$sWw@70Lk^%kJi"
	};
	
	// environment settings, create a detectEnvironment() method to detect it yourself.
	// create a function with the name of the environment so it can be executed if that environment is detected
	// the value of the environment is a list of regex patterns to match the cgi.http_host.
	environments = {
		//development = "^cf8.,^railo."
		development = ".dev"
	};
	
	// Module Directives
	modules = {
		//Turn to false in production
		autoReload = false,
		// An array of modules names to load, empty means all of them
		include = [],
		// An array of modules names to NOT load, empty means none
		exclude = [] 
	};
	
	//Layout Settings
	layoutSettings = {
		defaultLayout = "main.cfm"
	};
	
	//Register interceptors as an array, we need order
	interceptors = [
		 //SES
		 {class="coldbox.system.interceptors.SES"}
	];

	
}

public void function development() {
	//Development Settings
	coldbox.debugMode				= false;
	coldbox.debugPassword			= "";
	coldbox.reinitPassword			= "";
	coldbox.handlersIndexAutoReload = true;
	coldbox.handlerCaching 			= false;
	coldbox.eventCaching			= false;
	coldbox.customErrorTemplate		= "/coldbox/system/includes/BugReport.cfm";
	settings.baseUrl				= "/index.cfm/";
	settings.useSSL					= false;
}
	
</cfscript>
</cfcomponent>