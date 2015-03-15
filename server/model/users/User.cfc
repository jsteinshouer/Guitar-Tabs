
component output="false" persistent="true" table="User"
{
	property name="UserId" ormType="int" fieldtype="id" generator="increment";
	property name="UserName" ormType="string";
	property name="Password" ormType="string";
	property name="Salt" ormType="string";
	property name="HashCount" ormType="int";
	property name="isAdmin" type="Boolean" default=0;


	public any function isAdmin() {
		
		return this.isAdmin;
	}
	
	
}


