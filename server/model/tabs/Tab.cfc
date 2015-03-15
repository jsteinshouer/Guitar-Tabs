/**
*
* @file  model.tabs.Tab
* @author  Jason Steinshouer
* @description Tab object
*
*/
component output="true" persistent="true" table="Tab" extends="model.Base"
{
	/*** Define properties ***/
	property name="TabId" ormType="int" fieldtype="id" generator="increment";
	property name="Title" ormType="string" setter="false";
	property name="UrlSlug" ormType="string" setter="false";
	property name="Content" ormType="text";
	property name="Key" ormtype="string";
	property name="Song" fieldtype="many-to-one" cfc="model.songs.Song" fkcolumn="SongId";
	property name="Tags" singularname="Tag" cfc="model.tags.Tag" fieldtype="many-to-many" linktable="TagTab" fkcolumn="TagId" inversejoincolumn="TabId";

	/*** Populate UrlSlug property when name is set ***/
	public void function setTitle(title="") {
		if (len(arguments.title)) {
			variables.Title = arguments.Title;
			variables.UrlSlug = createSlug(arguments.title);
		}
	}

	/*** validate properties ***/
	public void function validate()
	{	
		/*** Title is required ***/	
		if (trim(this.getTitle()) == ""){
			this.addError("A Title is required!");
		}

		/*** Content is required ***/	
		if (trim(this.getContent()) == ""){
			this.addError("Content is required!");
		}


		/*** If song exists check for errors ***/
		if (this.hasSong() && this.getSong().hasErrors()){
			this.appendErrors(this.getSong().getErrors());
		}
	}
}