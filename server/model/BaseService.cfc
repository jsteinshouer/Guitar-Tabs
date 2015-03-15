/**
*
* @file  /model/BaseService.cfc
* @author  Jason Steinshouer
* @description Base component for service objects
*
*/

component output="false" displayname="BaseService"  {

	variables.entityType = "";

	public function init(){
		return this;
	}

	public any function get(id=0,title="",name="")
	{
		var local = structnew();

		/*** The tagid parameter can be either the numeric id or the url slug representation of the title ***/
		if (isNumeric(arguments.id)) {
		
			/*** Get an existing object or a empty one ***/
			if (arguments.id)
			{
				local.entity = EntityLoad(entityType,arguments.id,true);
			}
			else
			{
				/*** Entities can also be loaded by passing a title or name ***/
				if (len(arguments.title)) {
					local.entity = getByTitle(arguments.title);
				}
				else if (len(arguments.name)) {
					local.entity = getByName(arguments.name);
				}
				else {
					local.entity = EntityNew(entityType);
				}
			}

		}
		/*** Treat the id as url slug ***/
		else {
			local.entity = getBySlug(arguments.id);
		}
		
		return local.entity;
	}

	public array function getAll() 
	{
		return entityload(variables.entityType);
	}

	public any function getByTitle(title)
	{
		var local = structnew();
		
		local.entity = EntityLoad(entityType,{title='#arguments.title#'}, true);
		
		if (!structkeyexists(local,"entity")) {
			local.entity = get();
			local.entity.setTitle(arguments.title);
		}
		
		return local.entity;
	}

	public any function getByName(name)
	{
		var local = structnew();
		
		local.entity = EntityLoad(entityType,{name='#arguments.name#'}, true);
		
		/*** Get an empty object if name is not found ***/
		if (!structkeyexists(local,"entity")) {
			local.entity = get();
			local.entity.setName(arguments.name);
		}
		
		return local.entity;
	}

	public any function getBySlug(slug)
	{
		var local = structnew();
		
		local.entity = EntityLoad(entityType,{UrlSlug='#arguments.slug#'}, true);

		if (!structkeyexists(local,"entity")) {
			local.entity = get();
		}
		
		return local.entity;
	}


}