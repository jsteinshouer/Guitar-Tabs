/**
*
* @file  model.videos.VideosService.cfc
* @author  Jason Steinshouer
* @description Videos Service Object
*
*/	
component singleton=true
{
	/*** Required model services ***/
	property name = "songsService" inject="model.songs.SongsService";

	/*** Get all saved video entities ***/
	public array function getAll() 
	{
		return entityload("Video");
	}

	/*** Populate a video's properties  ***/
	public any function populate(required video) {
		var local = structNew();

		param name="arguments.title" default="";
		param name="arguments.code" default="";
		param name="arguments.song.id" default="";
		param name="arguments.song.title" default="";
		param name="arguments.song.spotifyId" default="";
		param name="arguments.song.album" default="#{}#";
		param name="arguments.song.artist.id" default=0;
		param name="arguments.song.artist.name" default="";
		param name="arguments.tags" default="";

		/*** Populate associated song ***/
				/*** Populate associated song ***/
		if (len(arguments.song.id) || len(arguments.song.title)) {
			/*** get existing or new song entity ***/
			local.song = songsService.get(arguments.song.id,arguments.song.title);
			/*** Populate and set the associated song ***/
			songsService.populate(
				song=local.song,
				title=arguments.song.title,
				artist=arguments.song.artist,
				spotifyId=arguments.song.spotifyId,
				album=arguments.song.album
			);

			arguments.video.setSong(local.song);

		}
		/*** Remove the existing song ***/
		else if (arguments.video.hasSong()) {
			arguments.video.removeSong();
		}

		if (len(arguments.title)) {
			arguments.video.setTitle(arguments.title);
		}

		if (len(arguments.code)){
			arguments.video.setCode(arguments.code);
		}


		/*** Set from list rather than a array of tag objects ***/
		arguments.video.setTagsByList(arrayToList(arguments.tags));

	}
	
	/*** Save a video entity to the database ***/
	public boolean function save(video)
	{
		
		var local = structnew();
		local.result = true;

		/*** Only save if there are no errors ***/
		if (!arguments.video.hasErrors()) {	
			//save song before video
			if (video.hasSong()) {
				songsService.save(video.getSong());
			}
			/*** Is it an update or insert? ***/
			if (!isnull(arguments.video.getVideoId()) && arguments.video.getVideoId())
			{
				EntitySave(arguments.video);
			}
			else
			{
				EntitySave(arguments.video,true);
			}
		}
		else {
			local.result = false;
		}

		/*** Return boolean result ***/
		return local.result;
	}
	
	public any function get(videoId=0)
	{
		var local = structnew();
		
		if (isNumeric(arguments.videoid)) {
			if (arguments.videoId)
			{
				local.video = EntityLoad("video",arguments.videoId,true);
			} else
			{
				local.video = EntityNew("video");
			}
		}
		else {
			local.video = getBySlug(arguments.videoid);
		}

		return local.video;
	}

	public any function getBySlug(slug)
	{
		var local = structnew();
		
		local.video = EntityLoad("video",{UrlSlug='#arguments.slug#'}, true);

		if (!structkeyexists(local,"video")) {
			local.video = get();
		}
		
		return local.video;
	}
	
	public void function delete(video)
	{
		EntityDelete(arguments.video);
	}

	/*** Search for entities using the hibernate api ***/
	public array function search(string term)
	{
		/*** Get hibernate objects for order and filtering ***/
		order = createObject("java","org.hibernate.criterion.Order");
		restrictions = createObject("java","org.hibernate.criterion.Restrictions");
		projections = createObject("java","org.hibernate.criterion.Projections");

		/*** Create hibernate query with filtering and ordering ***/
		search = ormGetSession().createCriteria("Video");
		search.add(restrictions.like("Title","#arguments.term#%").ignoreCase());
		search.addOrder(order.asc("Title"));
		//search.setMaxResults(10);

		return search.list();
	}
}