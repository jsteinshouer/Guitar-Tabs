component output="false" persistent="true" table="Video" extends="Model.Base"
{
	property name="VideoId" ormType="int" fieldtype="id" generator="increment";
	property name="Title" ormtpye="string" setter="false";
	property name="UrlSlug" ormType="string" setter="false";
	property name="Code" ormtype="string";
	property name="Song" fieldtype="many-to-one" cfc="model.songs.Song" fkcolumn="SongId";
	property name="Tags" singularname="Tag" cfc="model.tags.Tag" fieldtype="many-to-many" linktable="TagVideo" fkcolumn="TagId" inversejoincolumn="VideoId";

	public void function setTitle(title="") {
		if (len(arguments.title)) {
			variables.Title = arguments.Title;
			variables.UrlSlug = createSlug(arguments.title);
		}
	}

	/*** validate attributes entities validate themselves ***/
	public void function validate()
	{	
			
		if (trim(this.getTitle()) == ""){
			this.addError("A Title is required!");
		}

		if (trim(this.getCode()) == ""){
			this.addError("A Code is required!");
		}
		
		/*** if (!this.hasSong()){
					this.addError("This video has no associated song!");
				} ***/
		if (this.hasSong() && this.getSong().hasErrors()) {
			this.appendErrors(this.getSong().getErrors());
		}
	}
}