/**
*
* @file  handlers/tabs.cfc
* @author  Jason Steinshouer
* @description Coldbox Handler for tab requests
*/
component extends="handlers.base"
{
	/*** Required model services ***/
	property name = "tabsService" inject="model.tabs.TabsService";
	property name = "songsService" inject="model.songs.SongsService";

	public any function index(event,rc,prc) {
		
		var tabs = tabsService.getAll();

		rc.response = getCollection(tabs,"id,title,song,song.album,tags",rc.offset,rc.limit);

	}


	public any function read(event,rc,prc) {
		
		var tab = tabsService.get(rc.id);

		if (rc.fields == "") {
			rc.fields = "title,content,key,tags,song,song.album";
		}

		rc.response = getMember(tab,rc.fields);
	}


	public function create(event,rc,prc) {
		
		var args = rc.contentBody;
		args.tab = tabsService.get();
		tabsService.populate(argumentCollection=args);

		/*** try to save the tab ***/
		if (!tabsService.save(args.tab))
		{
			/*** failure - show errors ***/
			rc.message = arraytolist(rc.tab.getErrors(),",");
			throw(type="Bad Request",message=rc.message,errorcode="400");
		}
		else {
			rc.statusCode = 201;
			rc.statusText = "Created";
			rc.response = {"msg" = "Created", "id"=args.tab.getUrlSlug()};
		}
	}

	public function update(event,rc,prc) {
		
		event.paramValue( name="id", value=0 );

		if (len(rc.id)) {
			var args = rc.contentBody;

			// writeDump(rc);abort;
						
			args.tab = tabsService.get(rc.id);
			tabsService.populate(argumentCollection=args);

			/*** try to save the tab ***/
			if (!tabsService.save(args.tab))
			{
				/*** failure - show errors ***/
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
		}

	}
	

	private any function getMember(tab,fields) {

		var resource = structNew();
		resource["uri"] = "/tabs/#tab.getUrlSlug()#";
		resource["id"] = tab.getUrlSlug();

		if (listFindNoCase(arguments.fields,"title")) {
			resource["title"] = tab.getTitle();
		}

		if (listFindNoCase(arguments.fields,"content")) {
			resource["content"] = tab.getContent();
		}

		if (listFindNoCase(arguments.fields,"key")) {
			resource["key"] = tab.getKey();
		}

		if (listFindNoCase(arguments.fields,"tags")) {
			resource["tags"] = listToArray(tab.getTagsAsList());
		}

		if (listFindNoCase(arguments.fields,"song") && tab.hasSong()) {
			resource["song"] = {
				"uri" = "/songs/#tab.getSong().getUrlSlug()#", 
				"id" = tab.getSong().getUrlSlug(),
				"title" = tab.getSong().getTitle(),
				"spotifyId" = tab.getSong().getSpotifyId()
			};

			if (listFindNoCase(arguments.fields,"song.album")) {
				resource.song["album"] = tab.getSong().getAlbum();
			}

			if(tab.getSong().hasArtist()) {
				resource.song["artist"] = {
					"uri" = "/artists/#tab.getSong().getArtist().getUrlSlug()#", 
					"id" = tab.getSong().getArtist().getUrlSlug(),
					"name" = tab.getSong().getArtist().getName()
				};
			}
		}

		return resource;
	}



}