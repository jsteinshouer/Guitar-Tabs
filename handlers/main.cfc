/**
*
* @file  handlers/main.cfc
* @author  Jason Steinshouer
* @description Coldbox Handler - Contains application event handlers
*
*/	
component output="false" {

	property name = "securityService" inject="model.security.SecurityService";
	property name = "usersService" inject="model.users.UsersService";
	property name = "useSSL" inject="coldbox:setting:useSSL";


	public any function index(event,rc) {
		event.setView(view="index",noLayout=true);
	}
	
	/*** onRequestStart event handler ***/
	public void function onRequestStart(event,rc) {

		/* Force SSL  */
		if (event.isSSL() == false && useSSL) {
			location("https://#cgi.HTTP_HOST#/");
		}


		/* Run setup if no admin user exists */
		if (usersService.hasAdminUsers() == false && event.getCurrentEvent() neq "main.setup") {
			setNextEvent("main.setup");
		}
	}	

	/*** Application start handler ***/
	public void function onApplicationStart(event,rc) {
		/*** Reload ORM entites when app starts. This is used to promote changes in shared hosting environment ***/
		ORMReload();
		event.noRender();
	}
	

	/*** login request handler ***/
	public void function authorize(event,rc,prc) {
			
		event.paramValue("message","");

		if (listFindNoCase(event.getHTTPHeader("Content-Type"),"application/json",";") eq false) {
			event.renderData(data={message="Content-Type application/json is required!"}, type="json",statusCode="400",statusText="Bad Request");
		}
		else {
		
			//local.content = charsetEncode(event.getHTTPContent(),"UTF-8");
			var content = event.getHTTPContent();


			try {
				var data = deserializeJSON(content);
				rc.username = data.username;
				rc.password = data.password;
			}
			catch (e) {
				event.renderData(data={message="Invalid JSON Format!"}, type="json",statusCode="400",statusText="Bad Request");
			}

		
			/*** Make sure a username and password were provided ***/
			if (structkeyexists(rc,'username') and structkeyexists(rc,'password'))
			{
				var auth = securityService.authenticateUser(rc.username,rc.password);
						
				if (auth.isAuthenticated)
				{
					var token = {
						"token" = securityService.grantToken(rc.username)
					};

					/* render data */
					event.renderData(data=token, type="json",statusCode="200",statusText="OK");
				}
				else
				{
					event.renderData( 
						data={"code"="401","message"="The username and password combination is not valid!"}, 
						type="json", 
						statusCode="401", 
						statusText="Unauthorized"
					);
				}
			}
		}
			
	}

	// public any function onException(event,rc,prc) {
		
	// 	var response = {};

	// 	if ( Find("JSON parsing failure",rc.exceptionBean.getMessage())) {
	// 			rc.statusCode = "400";
	// 			rc.statusText = "BAD REQUEST";
	// 			response.status = "400";
	// 			response.message = "Invalid JSON Format!";
	// 	}
	// 	else if (rc.exceptionBean.getErrorCode()) {
	// 		rc.statusCode = rc.exceptionBean.getErrorCode();
	// 		rc.statusText = rc.exceptionBean.getType();
	// 		response.status = rc.statusCode;
	// 		response.message = rc.exceptionBean.getMessage();
	// 	}
	// 	/* Default error response */
	// 	else {
	// 		rc.statusCode = "500";
	// 		rc.statusText = "SERVER ERROR";
	// 		local.response.status = "500";
	// 		local.response.message = "There was a problem processing this request. Please try again.";
	// 	}

	// 	event.renderData( data=response,type="json", statusCode=rc.statusCode, statusText=rc.statusText);
	// }

	public void function setup(event,rc,prc) {
		event.paramValue("message","");

		/*** Only allow setup to run if no admin users exist ***/
		if (usersService.hasAdminUsers() == false) {
			/*** Are we creating the inital user ***/
			if (structkeyexists(rc,'username') and structkeyexists(rc,'password') and structkeyexists(rc,'passwordVerify')) {

				if (!len(rc.username) || !len(rc.password)) {
					rc.message = "Please enter a username and password!";
				}
				else if (rc.password != rc.passwordVerify) {
					rc.message = "Your password and verification do not match!";
				}
				else if (usersService.exists(rc.username)) {
					rc.message = "This user already exists!";
				}

				if (!len(rc.message)) {
					var user = usersService.getUser();
					
					user.setUsername(rc.username);
					var hash = securityService.hashPassword(rc.password);
					user.setPassword(hash.password);
					user.setSalt(hash.salt);
					user.setHashCount(hash.hashCount)
					user.setIsAdmin(1);

					usersService.createUser(user);
					
					/*** Redirect user ***/
					location("https://#cgi.HTTP_HOST#/");
				}
			}
		}
		else {
			/*** Only allow setup to run if no users exist ***/
			location("https://#cgi.HTTP_HOST#/");
		}

		event.setView(view="setup",noLayout=true);
	}

}