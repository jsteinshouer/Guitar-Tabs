/**
*
* @file  model.artists.ArtistService
* @author  Jason Steinshouer
* @description Artist service object
*
*/
component singleton=true {
	/*** Load all artist entities ***/
	public array function getAll()
	{
		return entityload("artist");
	}
	
	/*** Get an Artist entity ***/
	public any function get(artistid=0,artistName="")
	{
		var local = structnew();
		/*** Check if id is numeric since the urlslug could be used ***/
		if (isNumeric(arguments.artistid)) {
			/*** Load entity by numeric id ***/
			if (arguments.artistid) {
				local.artist = EntityLoad("artist",arguments.artistid,true);	
			}
			else {
				if (len(arguments.artistName)) {
					/*** Search by title to make sure it does not already exist ***/
					local.artist = getByName(arguments.artistName);
				}
				else {
					/*** Return an new entity ***/
					local.artist = EntityNew("Artist");
				}
			}
		}
		/*** Load entity using the UrlSlug value ***/
		else {
			local.artist = getBySlug(arguments.artistid);
		}
		
		return local.artist;
	}

	/*** Populate a aritsts properties using params ***/
	public any function populate(required artist) {
		var local = structNew();

		param name="arguments.name" default="";

		if (len(arguments.name)) {
			arguments.artist.setName(arguments.name);
		}

		if (structKeyExists(arguments, "spotifyData")) {
			arguments.artist.setSpotifyData(serializeJSON(arguments.spotifyData));
		}
	}
	
	/*** Get entity by Name ***/
	public any function getByName(name)
	{
		var local = structnew();
		
		local.artist = EntityLoad("Artist",{name='#arguments.name#'}, true);
		
		/*** Entity was not found get a new one ***/
		if (!structkeyexists(local,"artist")) {
			local.artist = get();
		}
		
		return local.artist;
	}

	/*** Get entity by UrlSlug ***/
	public any function getBySlug(slug)
	{
		var local = structnew();
		
		local.artist = EntityLoad("Artist",{UrlSlug='#arguments.slug#'}, true);

		/*** Entity was not found get a new one ***/
		if (!structkeyexists(local,"artist")) {
			local.artist = get();
		}
		
		return local.artist;
	}
	
	/*** Add a new artist ***/
	public void function add(artist)
	{
		save(artist);
	}
	
	/*** Save an Artist to the database ***/
	public boolean function save(artist)
	{
		var local = structnew();
		local.result = true;
		
		/*** Check for errors ***/
		if (!arguments.artist.hasErrors()){
			/*** Insert or Update? ***/
			if (!isnull(arguments.artist.getArtistId()) && arguments.artist.getArtistId()) {
				EntitySave(arguments.artist);
			}
			else {
				EntitySave(arguments.artist,true);
			}
		}
		else {
			/*** Clear session if any errors occur otherwise coldfusion will save the bad data ***/
			OrmClearSession();
			local.result = false;
		}
		
		return local.result;
	}
	
	/*** Delete an artist from the database ***/
	public void function delete(artist)
	{
		EntityDelete(arguments.artist);
	}
	
	/*** Search for entities using the hibernate api ***/
	public array function search(string term)
	{
		/*** Get hibernate objects for order and filtering ***/
		order = createObject("java","org.hibernate.criterion.Order");
		restrictions = createObject("java","org.hibernate.criterion.Restrictions");
		projections = createObject("java","org.hibernate.criterion.Projections");

		/*** Create hibernate query with filtering and ordering ***/
		search = ormGetSession().createCriteria("Artist");
		search.add(restrictions.like("Name","#arguments.term#%"));
		search.addOrder(order.asc("Name"));
		search.setMaxResults(10);

		/*** We only want these properties ***/
		pl = projections.projectionList();
		pl.add(projections.property("ArtistId"));
		pl.add(projections.property("Name"));
		pl.add(projections.property("UrlSlug"));
		search.setProjection(pl);

		return search.list();
	}
	
	
}