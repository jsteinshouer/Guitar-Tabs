/**
*
* @file  model.artists.Artist
* @author  Jason Steinshouer
* @description Artist object
*
*/
component output="false" persistent="true" table="Artist" extends="model.Base"
{
	/*** Define properties ***/
	property name="ArtistId" ormType="int" fieldtype="id" generator="increment";
	property name="Name" ormtpye="string" setter="false";
	property name="UrlSlug" ormtype="string" setter="false";
	property name="SpotifyData" ormtype="text";
	property name="Songs" singularname="Song" fieldtype="one-to-many" cfc="model.songs.Song" fkcolumn="ArtistId";
	
	/*** Populate UrlSlug property when name is set ***/
	public void function setName(required name) 
	{
		variables.Name = arguments.name;
		variables.UrlSlug = createSlug(arguments.name);
	}	

	public struct function getSpotifyData() {
		var data = {};

		if(structKeyExists(variables, "SpotifyData") and len(SpotifyData)) {
			data = deserializeJSON(SpotifyData);
		}

		return data;
	}
	

	/*** Validate entity properties ***/
	public void function validate()
	{	
		/*** NAme is required ***/
		if (trim(this.getName()) == ""){
			this.addError("Artist name is required!");
		}
	}
}
