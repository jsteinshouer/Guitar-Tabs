/**
*
* @file  handlers/artists.cfc
* @author  Jason Steinshouer
* @description Coldbox Handler for tab requests
*/
component extends="handlers.base"
{
	/*** Required model services ***/
	property name = "artistService" inject="model.artists.ArtistsService";

	public any function index(event,rc,prc) {

		event.paramValue("rc.fields","id,name,tags");
		
		var artists = artistService.getAll();

		rc.response = getCollection(artists,rc.fields,rc.offset,rc.limit);

	}


	public any function read(event,rc,prc) {
		
		var artist = artistService.get(rc.id);

		if (rc.fields == "") {
			rc.fields = "name,tags,spotifyData";
		}

		rc.response = getMember(artist,rc.fields);
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

		var artists = artistService.search(rc.term);

		// writeDump(rc.response);abort;

		rc.response = getCollection(songs,"id,name,tags",rc.offset,rc.limit);

	}
	

	private any function getMember(artist,fields) {

		var resource = structNew();

		if (isValid("component", arguments.artist)) {

			resource["uri"] = "/artists/#artist.getUrlSlug()#";
			resource["id"] = artist.getUrlSlug();

			if (listFindNoCase(arguments.fields,"name")) {
				resource["name"] = artist.getName();
			}

			if (listFindNoCase(arguments.fields,"spotifyData")) {
				resource["spotifyData"] = artist.getSpotifyData();
			}


			if (listFindNoCase(arguments.fields,"tags")) {
				resource["tags"] = listToArray(artist.getTagsAsList());
			}

		}
		else {
			resource["uri"] = "/artists/#artist.UrlSlug#";
			resource["id"] = artist.UrlSlug;

			if (listFindNoCase(arguments.fields,"name")) {
				resource["name"] = song.Name;
			}

			if (listFindNoCase(arguments.fields,"tags")) {
				resource["tags"] = listToArray(artist.getTagsAsList());
			}

			if (listFindNoCase(arguments.fields,"spotifyData")) {
				resource["spotifyData"] = artist.SpotifyData;
			}

		}

		return resource;
	}



}