/**
*
* @file  base.cfc
* @author  Jason Steinshouer
* @description Base controller
*
*/
component output="false" 
{
	property name="securityService" inject="model.security.SecurityService";


	/**
	* Executes before all handler actions
	*/
	public function preHandler(event,rc,prc){
		
		/* default format for all methods in this handler */	
		event.paramValue("fields","");
		event.paramValue("expand","");
		event.paramValue("offset",0);
		event.paramValue("limit",10);
		event.paramValue("statusCode","200");
		event.paramValue("statusText","OK");

		/* Security check */
		event.paramValue("authToken","");

		try {
			rc.authToken = event.getHTTPHeader("auth-token");
		}
		catch(e) {}

		var validToken = securityService.validateToken(rc.authToken);
	
		if(!validToken)
		{
			
			// event.renderData( 
			// 	data={"code"="401","message"="The authorization token is not valid!"}, 
			// 	type="json", 
			// 	statusCode="401", 
			// 	statusText="Unauthorized"
			// );
			throw(type="Unauthorized",message="The authorization token is not valid!",errorcode="401");
		}
		else {

			/* Only accept application/json for content body on posts */
			if (event.getHTTPMethod() eq "POST" or event.getHTTPMethod() eq "PUT") {
				if (listFindNoCase(event.getHTTPHeader("Content-Type"),"application/json",";") eq false) {
					throw(type="Bad Request",message="Content-Type application/json is required!",errorcode="400");
				}
		
				//local.content = charsetEncode(event.getHTTPContent(),"UTF-8");
				var content = event.getHTTPContent();


				try {
					rc.contentBody = deserializeJSON(content);
				}
				catch (e) {
					throw(type="Bad Request",message="Invalid JSON Format!",errorcode="400");
				}
			}
		}
	}

	/**
	* Executes after all handler actions
	*/
	public function postHandler(event,rc,prc){

		/* render data */
		event.renderData(data=rc.response, type="json",statusCode=rc.statusCode,statusText=rc.statusText);
	
	}

	public function onError(event,rc,prc) {

		var response = {};
		rc.debug = true;

		if ( Find("JSON parsing failure",exception.message)) {
			rc.statusCode = "400";
			rc.statusText = "BAD REQUEST";
			response.status = "400";
			response.message = "Invalid JSON Format!";
		}
		else if (listFindNoCase("400,401", exception.errorCode)) {
			rc.statusCode = exception.errorCode;
			rc.statusText = exception.type;
			response.status = exception.errorCode;
			response.message = exception.message;
		}	
		else if (structKeyExists(rc, "debug") and rc.debug) {
			rc.statusCode = "500";
			rc.statusText = "SERVER ERROR";
			response.type = exception.type;
			response.type = exception.type;
			response.code = exception.errorCode;
			response.message = exception.message;
			response.template = exception.tagcontext[1].template;
			response.line = exception.tagcontext[1].line;
		}
		/* Default error response */
		else {
			rc.statusCode = "500";
			rc.statusText = "SERVER ERROR";
			response.status = "500";
			response.message = "There was a problem processing this request. Please try again.";
		}
		event.renderData( data=response,type="json", statusCode=rc.statusCode, statusText=rc.statusText);
	}


	public any function getCollection(data, fields, offset=0, limit=10) {
		
		var local = structNew();
		local.collection = structNew();
		local.items = arrayNew(1);

		local.collection["limit"] = arguments.limit;
		local.collection["offset"] = arguments.offset;
		local.collection["total"] = arrayLen(arguments.data);

		if (arguments.offset != 0) {
			local.start = (arguments.offset * arguments.limit) + 1;
		}
		else {
			local.start = 1;
			local.collection["offset"] = 0;
		}
		
		local.stop = local.start + arguments.limit - 1;

		if (local.stop > arrayLen(arguments.data)) {
			local.stop = arrayLen(arguments.data);
		}

		for (local.index=local.start; local.index <= local.stop; local.index=local.index+1) {
			arrayAppend(local.items, getMember(arguments.data[local.index],arguments.fields));
		}

		local.collection["items"] = local.items;

		return local.collection;
	}
	
	
}