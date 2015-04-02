/**
*
* @file  model.songs.SongService
* @author  Jason Steinshouer
* @description SongService object
*
*/
component singleton=true {
	/*** Inject required properties ***/
	property name="ArtistsService" inject="model.artists.ArtistsService";
	
	/*** Get all songs ***/
	public array function getAll() 
	{
		return entityload("song", {},"Title Asc");
	}
	
	/*** Get a song by id, urlslug, or title ***/
	public any function get(songid="",songTitle="")
	{
		
		var local = structnew();
		if (len(arguments.songid)) {
			local.song = getBySlug(arguments.songid);
		}
		else if (len(arguments.songTitle)) {
			local.song = getByTitle(arguments.songTitle);
		}
		else if (isNumeric(arguments.songid)) {
			local.song = EntityLoad("Song",arguments.songid,true);
		}
		else {
			local.song = EntityNew("Song");
			local.song.setSongId(0);
		}
		
		return local.song;
	}
	
	/*** Save a song to the database ***/
	public boolean function save(song)
	{

		var local = structnew();
		local.result = true;

		/*** Check the song and an optional associated album has any errors ***/
		if (!arguments.song.hasErrors()){
			//save album before song
			if (song.hasArtist()) {
				artistsService.save(song.getArtist());
			}

			/*** All is good go ahead and save. update or insert? ***/
			if (!isnull(arguments.song.getSongId()) && arguments.song.getSongId()) {
				EntitySave(arguments.song);
			}
			else {
				EntitySave(arguments.song,true);
			}
		}
		else {
			/*** Clear session if any errors occur otherwise hibernate will save the bad data ***/
			OrmClearSession();
			local.result = false;
		}
		
		return local.result;
	}

	/*** Populate a song's properties using params ***/
	public any function populate(required song) {
		var local = structNew();

		param name="arguments.title" default="";
		param name="arguments.spotifyId" default="";
		param name="arguments.album" default="#{}#";
		param name="arguments.tags" default="";
		param name="arguments.artist.id" default="";
		param name="arguments.artist.name" default="";

		/*** Is this song associated with an artist? ***/
		if (len(arguments.artist.id) || len(arguments.artist.name)) {
			/*** get existing or new album entity ***/
			local.artist = artistsService.get(arguments.artist.id,arguments.artist.name);
			/*** Populate and set the associated album ***/
			if (structKeyExists(arguments.artist, "spotifyData")) {
				artistsService.populate(
					artist=local.artist,
					name=arguments.artist.name,
					spotifyData=arguments.artist.spotifyData
				);
			} else {
				artistsService.populate(
					artist=local.artist,
					name=arguments.artist.name
				);
			}


			arguments.song.setArtist(local.artist);

		}

		if (len(arguments.title)) {
			arguments.song.setTitle(arguments.title);
		}

		if (len(arguments.spotifyId)) {
			arguments.song.setSpotifyId(arguments.spotifyId);
		}
		
		if (!structIsEmpty(arguments.album)) {
			arguments.song.setAlbum(arguments.album);
		}	

		/*** Set from list rather than a array of tag objects ***/
		arguments.song.setTagsByList(arrayToList(arguments.tags));
	}

	/*** Get a song by title ***/
	public any function getByTitle(title)
	{
		var local = structnew();
		
		local.song = EntityLoad("Song",{title='#arguments.title#'}, true);
		/*** Get a new one if none were found ***/
		if (!structkeyexists(local,"song")) {
			local.song = get();
		}
		
		return local.song;
	}

	/*** Get a song by urlslug ***/
	public any function getBySlug(slug)
	{
		var local = structnew();
		
		local.song = EntityLoad("Song",{UrlSlug='#arguments.slug#'}, true);

		/*** Get a new one if none were found ***/
		if (!structkeyexists(local,"song")) {
			local.song = get();
		}
		
		return local.song;
	}
	

	/*** Search for entities using the hibernate api ***/
	public array function search(string term)
	{
		/*** Get hibernate objects for order and filtering ***/
		order = createObject("java","org.hibernate.criterion.Order");
		restrictions = createObject("java","org.hibernate.criterion.Restrictions");
		projections = createObject("java","org.hibernate.criterion.Projections");

		/*** Create hibernate query with filtering and ordering ***/
		search = ormGetSession().createCriteria("Song");
		search.add(restrictions.like("Title","#arguments.term#%").ignoreCase());
		search.addOrder(order.asc("Title"));
		//search.setMaxResults(10);

		/*** We only want these properties ***/
		// pl = projections.projectionList();
		// pl.add(projections.property("SongId"));
		// pl.add(projections.property("Title"));
		// pl.add(projections.property("UrlSlug"));
		// pl.add(projections.property("Artist"));
		// search.setProjection(pl);

		return search.list();
	}
	
}