/**
*
* @file  model.tags/Tag.cfc
* @author  Jason Steinshouer	
* @description Tag ORM Entity definition
*
*/
component output="true" persistent="true" table="Tag" extends="model.Base"
{
	property name="TagId" ormType="int" fieldtype="id" generator="increment";
	property name="Title" ormType="string" setter="false";
	property name="UrlSlug" ormType="string" setter="false";
	property name="Tabs" singularname="Tab" cfc="model.tabs.Tab" fieldtype="many-to-many" linktable="TagTab" fkcolumn="TabId" inversejoincolumn="TagId";
	property name="Videos" singularname="Video" cfc="model.videos.Video" fieldtype="many-to-many" linktable="TagVideo" fkcolumn="VideoId" inversejoincolumn="TagId";
	property name="Lessons" singularname="Lesson" cfc="model.lessons.Lesson" fieldtype="many-to-many" linktable="TagLesson" fkcolumn="LessonId" inversejoincolumn="TagId";
	property name="Songs" singularname="Song" cfc="model.songs.Song" fieldtype="many-to-many" linktable="TagSong" fkcolumn="SongId" inversejoincolumn="TagId";

	public void function setTitle(required title) 
	{
		variables.Title = arguments.title;
		variables.UrlSlug = createSlug(arguments.title);
	}

	public void function validate()
	{	
		
		if (trim(this.getTitle()) == ""){
			this.addError("Tag title is required!");
		}
	}

}