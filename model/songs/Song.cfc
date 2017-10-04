/**
*
* @file  model.songs.Song
* @author  Jason Steinshouer
* @description Song object
*
*/
component output="false" persistent="true" table="Song" extends="model.Base"
{
	/*** Define properties ***/
	property name="SongId" ormType="int" fieldtype="id" generator="increment";
	property name="Title" ormtype="string" setter="false";
	property name="UrlSlug" ormtype="string" setter="false";
	property name="SpotifyId" ormtype="string";
	property name="Album" ormtype="text" setter="false" getter="false";
	property name="Artist" fieldtype="many-to-one" cfc="model.artists.Artist" fkcolumn="ArtistId";
	property name="Tabs" singularname="Tab" fieldtype="one-to-many" cfc="model.tabs.Tab" fkcolumn="SongId";
	property name="Videos" singularname="Video" fieldtype="one-to-many" cfc="model.videos.Video" fkcolumn="SongId";
	property name="Lessons" singularname="Lesson" fieldtype="one-to-many" cfc="model.lessons.Lesson" fkcolumn="SongId";
	property name="Tags" singularname="Tag" cfc="model.tags.Tag" fieldtype="many-to-many" linktable="TagSong" fkcolumn="TagId" inversejoincolumn="SongId";

	/*** Populate UrlSlug property when name is set ***/
	public void function setTitle(required title) 
	{
		variables.Title = arguments.title;
		variables.UrlSlug = createSlug(arguments.title);
	}

	public struct function getAlbum() {
		var data = {};

		if(structKeyExists(variables, "Album") and len(variables.Album)) {
			data = deserializeJSON(variables.Album);
		}

		return data;
	}

	public void function setAlbum(required struct album) {

		variables.album = serializeJSON(arguments.album);
	}

	/*** validate properties ***/
	public void function validate()
	{	
		/*** Song title is requored ***/
		if (trim(this.getTitle()) == ""){
			this.addError("Song title is required!");
		}
		
		/*** Validate album if song is associated with an one ***/
		if (this.hasArtist() && this.getArtist().hasErrors()) {
			this.appendErrors(this.getArtist().getErrors());
		}
	}
}