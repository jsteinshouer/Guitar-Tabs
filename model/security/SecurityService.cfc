/**
*
* @file  /model/SecurityService.cfc
* @author  Jason Steinshouer
* @description Security methods and utilities
*
*/

component output="false" displayname="SecurityService"  {

	property name = "usersService" inject="model.users.UsersService";
	property name = "jwt" inject="id:jwt";


	public function init(){
		return this;
	}

	/* hash a password */
	public any function hashPassword(password, salt = createUUID(), hashCount = randRange(1000,1050)) {

		var result = structNew();
		var i = 0;

		/* initial hash */
		result.password = hash(arguments.password & arguments.salt, "sha-512");

		/* hash the hash as many times as specified by the hashCount param */
		for(i=1; i < arguments.hashCount; i++){
			result.password = hash(result.password & arguments.salt, "sha-512");
		}

		result.salt = arguments.salt;
		result.hashCount = arguments.hashCount;

		
		return result;
	}


	public any function authenticateUser(username,password) {


			var auth = structNew();
			auth.isAuthenticated = false;
			var local = structNew();

			/*** Execute query to get user account ***/
			local.user = usersService.getUser(arguments.username);
					
			/* Make sure username matches and hashed input password matches stored password hash */
			if (local.user.getUsername() == arguments.username
			 	&& hashPassword(arguments.password,local.user.getSalt(),local.user.getHashCount()).password == local.user.getPassword())
			{
				
				
				auth.username = local.user.getUsername();
				auth.isAuthenticated = true;
				auth.isAdmin = local.user.isAdmin();

			}
				
		
		return auth;
	}


	public any function grantToken(username) {

		var payload = {
			"ts" = now(),
			"userid" = arguments.username
		};

		<!--- Encode the data structure as a json web token --->
		return jwt.encode(payload);
	}
	
	

	/* Validate the auth token */
	public any function validateToken(accessToken) {

		var validToken = false;

		try {
			var data = jwt.decode(accessToken);
			validToken = true
		}
		catch(e) {}

		if (structKeyExists(local, "data")) {
			var currentTs = now();
			var tokenTs = data.ts;
			
			/* Check if token has expired. ttl is 4 hours */
			if (dateDiff("h",tokenTs,currentTs) > 3) {
				validToken = false;
			}
		}
		
		return validToken;
	}
	
	
	
	
	
	
	
	
	
}


