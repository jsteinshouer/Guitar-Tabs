/**
*
* @file  /model/users/UserService.cfc
* @author  
* @description User service methods
*
*/

component output="false" displayname=""  {

	public function init(){
		return this;
	}


	public any function getUser(username) {

		var users = ORMExecuteQuery("FROM User WHERE Username = '#arguments.username#'");

		if (arrayLen(users) > 0) {
			var user = users[1];
		}
		else {
			var user = EntityNew("User");
		}
		
		return user;
	}


	public any function exists(username) {

		var users = ORMExecuteQuery("FROM User WHERE Username = '#arguments.username#'");

		if (arrayLen(users) > 0) {
			var result = true;
		}
		else {
			var result = false;
		}
		
		return result;
	}
	
	

	public void function createUser(user) {
		EntitySave(arguments.user,true);
	}
	
	public any function getAdminUsers() {

		var users = ORMExecuteQuery("FROM User WHERE isAdmin = 1");
		
		return users;
	}

	public any function hasAdminUsers() {
		return arraylen(getAdminUsers());
	}
	
}