/**
*
* @file  handlers/songs.cfc
* @author  Jason Steinshouer
* @description Coldbox Handler for tab requests
*/
component extends="handlers.base"
{
	/*** Required model services ***/
	property name = "songsService" inject="model.songs.SongsService";

	public any function index(event,rc,prc) {

		event.paramValue("rc.fields","id,title,tags");
		
		var songs = songsService.getAll();

		rc.response = getCollection(songs,rc.fields,rc.offset,rc.limit);

	}


	public any function read(event,rc,prc) {
		
		var song = songsService.get(rc.id);

		if (rc.fields == "") {
			rc.fields = "title,artist";
		}

		rc.response = getMember(song,rc.fields);
	}

	public any function tabs(event,rc,prc) {
		
		var song = songsService.get(rc.id);

	
		rc.fields = "tabs";


		rc.response = getMember(song,rc.fields);
	}


	public function create(event,rc,prc) {
		
		/* var args = rc.contentBody;
		args.tab = tabsService.get(rc.id);
		tabsService.populate(argumentCollection=args); */

		/*** try to save the tab ***/
		/* if (!tabsService.save(args.tab))
	
			rc.message = arraytolist(rc.tab.getErrors(),",");
			throw(type="Bad Request",message=rc.message,errorcode="400");
		}
		else {
			rc.statusCode = 201;
			rc.statusText = "Created";
			rc.response = {"msg" = "Created", "id"=args.tab.getUrlSlug()};
		} */
	}

	public function update(event,rc,prc) {
		
		/* event.paramValue( name="id", value=0 );

		if (len(rc.id)) {
			var args = rc.contentBody;
			args.tab = tabsService.get(rc.id);
			tabsService.populate(argumentCollection=args);

			if (!tabsService.save(args.tab))
			{
				rc.message = arraytolist(rc.tab.getErrors(),",");
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
		} */

	}

	public void function search(event,rc,prc)
	{
		event.paramValue("term","");

		var songs = songsService.search(rc.term);

		// writeDump(rc.response);abort;

		rc.response = getCollection(songs,"id,title,tags,artist",rc.offset,rc.limit);

	}
	

	private any function getMember(song,fields) {

		var resource = structNew();

		if (isValid("component", arguments.song)) {

			resource["uri"] = "/songs/#song.getUrlSlug()#";
			resource["id"] = song.getUrlSlug();

			if (listFindNoCase(arguments.fields,"title")) {
				resource["title"] = song.getTitle();
			}

			if (listFindNoCase(arguments.fields,"album") and structIsEmpty(song.getAlbum()) eq false) {
				resource["album"] = {
					"image" = song.getAlbum().images[1].url,
					"title" = song.getAlbum().title
				}
			}

			if (listFindNoCase(arguments.fields,"tags")) {
				resource["tags"] = listToArray(song.getTagsAsList());
			}

			if (listFindNoCase(arguments.fields,"spotifyId")) {
				resource["spotifyId"] = song.getSpotifyId();
			}

			if (listFindNoCase(arguments.fields,"artist") && song.hasArtist()) {
			
				resource["artist"] = {
					"uri" = "/artists/#song.getArtist().getUrlSlug()#", 
					"id" = song.getArtist().getUrlSlug(),
					"name" = song.getArtist().getName()
				};
			}

			if (listFindNoCase(arguments.fields,"tabs")) {

				resource["tabs"] = [];
				var tab = "";

				for (tab in song.getTabs()) {
					arrayAppend(resource["tabs"],{
						"id" = tab.getUrlSlug(),
						"title" = tab.getTitle()
					});
				}
			}

			if (listFindNoCase(arguments.fields,"videos")) {

				resource["videos"] = [];
				var video = "";

				for (video in song.getVideos()) {
					arrayAppend(resource["videos"],{
						"id" = video.getUrlSlug(),
						"title" = video.getTitle(),
						"code" = video.getCode()
					});
				}
			}

		}
		else {
			resource["uri"] = "/songs/#song.UrlSlug#";
			resource["id"] = song.UrlSlug;

			if (listFindNoCase(arguments.fields,"title")) {
				resource["title"] = song.Title;
			}

			if (listFindNoCase(arguments.fields,"album") and structIsEmpty(song.getAlbum()) eq false) {
				resource["album"] = {
					"image" = song.Album.images[1].url,
					"title" = song.Album.title
				}
			}

			if (listFindNoCase(arguments.fields,"tags")) {
				resource["tags"] = listToArray(song.getTagsAsList());
			}

			if (listFindNoCase(arguments.fields,"artist") && song.Artist) {
			
				resource["artist"] = {
					"uri" = "/artists/#song.Artist.UrlSlug#", 
					"id" = song.Artist.UrlSlug,
					"name" = song.Artist.Name
				};
			}

		}

		return resource;
	}



}