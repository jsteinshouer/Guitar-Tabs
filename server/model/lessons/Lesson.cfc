
/**
*
* @file  model.lessons.Lesson
* @author  Jason Steinshouer
* @description Lesson object
*
*/component output="false" persistent="true" table="Lesson" extends="Model.Base"
{
	/*** Define properties ***/
	property name="LessonId" ormType="int" fieldtype="id" generator="increment";
	property name="Title" ormType="string" setter="false";
	property name="UrlSlug" ormType="string" setter="false";
	property name="Url" ormtype="string";
	property name="Song" fieldtype="many-to-one" cfc="model.songs.Song" fkcolumn="SongId";
	property name="Tags" singularname="Tag" cfc="model.tags.Tag" fieldtype="many-to-many" linktable="TABS_TagLesson" fkcolumn="TagId" inversejoincolumn="LessonId";

	/*** Populate UrlSlug property when name is set ***/
	public void function setTitle(title="") {
		if (len(arguments.title)) {
			variables.Title = arguments.Title;
			variables.UrlSlug = createSlug(arguments.title);
		}
	}

	/*** validate attributes ***/
	public void function validate()
	{	
		/*** Title is required ***/
		if (trim(this.getTitle()) == ""){
			this.addError("A Title is required!");
		}

		/*** Url is required  ***/
		if (trim(this.getUrl()) == ""){
			this.addError("A Url is required!");
		}
	}
}