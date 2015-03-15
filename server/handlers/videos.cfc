/**
*
* @file  handlers/videos.cfc
* @author  Jason Steinshouer
* @description Coldbox Handler for video requests
*/
component extends="handlers.base"
{
	/*** Required model services ***/
	property name = "videosService" inject="model.videos.VideosService";
	property name = "songsService" inject="model.songs.SongsService";

	public any function index(event,rc,prc) {
		
		var videos = videosService.getAll();

		rc.response = getCollection(videos,"id,title,song,song.album,tags",rc.offset,rc.limit);

	}


	public any function read(event,rc,prc) {
		
		var video = videosService.get(rc.id);

		if (rc.fields == "") {
			rc.fields = "title,code,key,tags,song,song.album";
		}

		rc.response = getMember(video,rc.fields);
	}


	public function create(event,rc,prc) {

		prc.debug=true;
		
		var args = rc.contentBody;

		args.video = videosService.get();
		videosService.populate(argumentCollection=args);

		/*** try to save the video ***/
		if (!videosService.save(args.video))
		{
			/*** failure - show errors ***/
			rc.message = arraytolist(args.video.getErrors(),",");
			throw(type="Bad Request",message=rc.message,errorcode="400");
		}
		else {
			rc.statusCode = 201;
			rc.statusText = "Created";
			rc.response = {"msg" = "Created", "id"=args.video.getUrlSlug()};
		}
	}

	public function update(event,rc,prc) {
		
		event.paramValue( name="id", value=0 );

		if (len(rc.id)) {
			var args = rc.contentBody;

			// writeDump(rc);abort;
						
			args.video = videosService.get(rc.id);
			videosService.populate(argumentCollection=args);

			/*** try to save the video ***/
			if (!videosService.save(args.video))
			{
				/*** failure - show errors ***/
				rc.message = arraytolist(rc.video.getErrors(),",");
				throw(type="Bad Request",message=rc.message,errorcode="400");
			}
			else {
				rc.statusCode = 200;
				rc.statusText = "OK";
				rc.response = {"msg" = "OK", "id"=rc.id};
			}
		}
		else {
			throw(type="Bad Request",message="Id is required!",errorcode="400");
		}

	}
	

	private any function getMember(video,fields) {

		var resource = structNew();
		resource["uri"] = "/videos/#video.getUrlSlug()#";
		resource["id"] = video.getUrlSlug();

		if (listFindNoCase(arguments.fields,"title")) {
			resource["title"] = video.getTitle();
		}

		if (listFindNoCase(arguments.fields,"code")) {
			resource["code"] = video.getCode();
		}


		if (listFindNoCase(arguments.fields,"tags")) {
			resource["tags"] = listToArray(video.getTagsAsList());
		}

		if (listFindNoCase(arguments.fields,"song") && video.hasSong()) {
			resource["song"] = {
				"uri" = "/songs/#video.getSong().getUrlSlug()#", 
				"id" = video.getSong().getUrlSlug(),
				"title" = video.getSong().getTitle(),
				"spotifyId" = video.getSong().getSpotifyId()
			};

			if (listFindNoCase(arguments.fields,"song.album")) {
				resource.song["album"] = video.getSong().getAlbum();
			}

			if(video.getSong().hasArtist()) {
				resource.song["artist"] = {
					"uri" = "/artists/#video.getSong().getArtist().getUrlSlug()#", 
					"id" = video.getSong().getArtist().getUrlSlug(),
					"name" = video.getSong().getArtist().getName()
				};
			}
		}

		return resource;
	}



}