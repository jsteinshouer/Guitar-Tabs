/**
********************************************************************************
Copyright 2005-2007 ColdBox Framework by Luis Majano and Ortus Solutions, Corp
www.coldboxframework.com | www.luismajano.com | www.ortussolutions.com
********************************************************************************
*/
component{
	// Application properties
	this.name = hash( getCurrentTemplatePath() );
	this.sessionManagement = false;
	this.setClientCookies = true;

	// COLDBOX STATIC PROPERTY, DO NOT CHANGE UNLESS THIS IS NOT THE ROOT OF YOUR COLDBOX APP
	COLDBOX_APP_ROOT_PATH = getDirectoryFromPath( getCurrentTemplatePath() );
	// The web server mapping to this application. Used for remote purposes or static purposes
	COLDBOX_APP_MAPPING   = "";
	// COLDBOX PROPERTIES
	COLDBOX_CONFIG_FILE 	 = "";
	// COLDBOX APPLICATION KEY OVERRIDE
	COLDBOX_APP_KEY 		 = "";
	// JAVA INTEGRATION: JUST DROP JARS IN THE LIB FOLDER
	// You can add more paths or change the reload flag as well.
	//this.javaSettings = { loadPaths = [ "lib" ], reloadOnChange = false };

	/* What is the database path */
	system = CreateObject("java", "java.lang.System");
	dataDir = system.getEnv().get("OPENSHIFT_DATA_DIR");
	if (isNull(dataDir)) {
		dbPath = "./db/tabs";
	}
	else {
		dbPath = "#dataDir#/tabs";
	}

	this.datasources["tabs"] = {
		  class: 'org.h2.Driver'
		, connectionString: 'jdbc:h2:#dbPath#;MODE=MySQL'
	};
	this.ormenabled=true;
	this.datasource="tabs";
	this.ormsettings.cfclocation="/model";
	this.ormsettings.dbcreate="update";
	this.ormsettings.logSQL=false;

	// application start
	public boolean function onApplicationStart(){
		application.cbBootstrap = new coldbox.system.Bootstrap( COLDBOX_CONFIG_FILE, COLDBOX_APP_ROOT_PATH, COLDBOX_APP_KEY, COLDBOX_APP_MAPPING );
		application.cbBootstrap.loadColdbox();
		return true;
	}

	// request start
	public boolean function onRequestStart(String targetPage){
		// Process ColdBox Request
		application.cbBootstrap.onRequestStart( arguments.targetPage );

		return true;
	}

	public void function onSessionStart(){
		application.cbBootStrap.onSessionStart();
	}

	public void function onSessionEnd( struct sessionScope, struct appScope ){
		arguments.appScope.cbBootStrap.onSessionEnd( argumentCollection=arguments );
	}

	public boolean function onMissingTemplate( template ){
		return application.cbBootstrap.onMissingTemplate( argumentCollection=arguments );
	}

}