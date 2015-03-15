component {

	variables.errors = ArrayNew(1);
	

	/*** Validation Methods ***/
	public any function hasErrors() 
	{
		var hasErrors = false;
		
		arrayclear(variables.errors);
		
		validate();
		
		if (arraylen(variables.errors)) {
			hasErrors = true;
		}
		
		return hasErrors;
	}
	
	public any function getErrors() 
	{
		return variables.errors;
	}
	
	
	public void function addError(error)
	{
		arrayappend(variables.errors, arguments.error);
	}

	public void function appendErrors(errors)
	{
		var i = 0;
		for(i=1; i <= ArrayLen(arguments.errors); i++){
			this.addError(arguments.errors[i]);
		}

	}
	
	private string function createSlug(required title,spacer="-") {
		var result = "";

		arguments.title = lCase(trim(arguments.title));
    	arguments.title = reReplace(arguments.title, "[^a-z0-9-]", arguments.spacer, "all");
    	result = reReplace(arguments.title, "#arguments.spacer#+", arguments.spacer, "all");
    
    	if (left(result, 1) == arguments.spacer) {
        	result = right(result, len(result)-1);
        }

    	if (right(result, 1) == arguments.spacer) {
    		result = left(result, len(result)-1);
    	}

    	var i = 0;
    	while (slugExists(result)) {
    		i = i + 1;
    		result = result & "-#i#";
    	}

		return result;
	}


	private any function slugExists(slug) {

		var local = structnew();

		local.type = listLast(getMetaData(this).fullname,".");
		
		local.entities = EntityLoad(local.type,{UrlSlug='#arguments.slug#'});
		
		return arraylen(local.entities);
	}
	
	
	
	/*** Tag Related Methods ***/

	public string function getTagsAsList() {
		var local = structNew();
		local.tagList = "";
		
		/*** Only implement if the entity has a tags property ***/
		if (structKeyExists(variables, "tags")) {

			local.tags = this.getTags();

			/*** Build list of tags ***/
			if (this.hasTag()) {
				for(var i=1; i <= ArrayLen(local.tags); i++){;
					local.tagList = listAppend(local.tagList,local.tags[i].getTitle());
				}
			}
		}

		return local.tagList;
	}

	public boolean function setTagsByList(string tagList) {
		var local = structNew();

		local.result = false;

		local.currentTags = this.getTags();
		local.currentTagList = "";
		local.tagArray = listToArray(arguments.tagList);

		if (!structKeyExists(local,"currentTags")) {
			local.currentTags = arrayNew(1);
		}

		/*** Remove current tags not in the tagList arg ***/
		for(var i=1; i <= ArrayLen(local.currentTags); i++){;
			if (listFindNoCase(arguments.tagList,local.currentTags[i].getTitle()) == false) {
				this.removeTag(local.currentTags[i]);
			}
			else {
				/*** Build current tag list to use for adding ***/
				local.currentTagList = listAppend(local.currentTagList,local.currentTags[i].getTitle());
			}
		}

		/*** Add new tags ***/
		for(var i=1; i <= ArrayLen(local.tagArray); i++){;
			if (listFindNoCase(local.currentTagList,local.tagArray[i]) == false) {
				
				/*** Load tag from db if it alreadt exists, otherwise create it ***/
				local.tag = EntityLoad("Tag",{title='#local.tagArray[i]#'}, true);
	
				if (!structkeyexists(local,"tag")) {
					local.tag = EntityNew("Tag");
					local.tag.setTitle(local.tagArray[i]);
					EntitySave(local.tag);
				}

				this.addTag(local.tag);
			}
		}

		local.result = true;

		return local.result;
	}

	
}
