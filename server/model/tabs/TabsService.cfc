/**
*
* @file  model.tabss.TabsService
* @author  Jason Steinshouer
* @description Tabs Service object
*
*/
component {
	/*** Required model services ***/
	property name = "songsService" inject="model.songs.SongsService";
	property name = "tagsService" inject="model.tags.TagsService";

	/*** Get all tabs ***/
	public array function getAll() 
	{
		return entityload("tab",{},"Title Asc");
	}

	/*** Populate a tab's properties  ***/
	public any function populate(required tab) {
		var local = structNew();

		param name="arguments.title" default="";
		param name="arguments.key" default="";
		param name="arguments.content" default="";
		param name="arguments.song.id" default="";
		param name="arguments.song.title" default="";
		param name="arguments.song.spotifyId" default="";
		param name="arguments.song.album" default="#{}#";
		param name="arguments.song.artist.id" default=0;
		param name="arguments.song.artist.name" default="";
		param name="arguments.tags" default="";

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

			arguments.tab.setSong(local.song);

		}

		if (len(arguments.title) and arguments.title neq arguments.tab.getTitle()) {
			arguments.tab.setTitle(arguments.title);
		}

		
		arguments.tab.setContent(arguments.content);
		arguments.tab.setKey(arguments.key);

		/*** Set from list rather than a array of tag objects ***/
		arguments.tab.setTagsByList(arrayToList(arguments.tags));

	}
	
	/*** Save a tab to the database ***/
	public boolean function save(tab)
	{
		
		var local = structnew();
		local.result = true;

		/*** Check for errors ***/
		if (!arguments.tab.hasErrors()) {	
			//save song before tab
			if (tab.hasSong()) {
				songsService.save(tab.getSong());
			}

			/*** Insert or update? ***/
			if (!isnull(arguments.tab.getTabId()) && arguments.tab.getTabId())
			{
				EntitySave(arguments.tab);
			}
			else
			{
				EntitySave(arguments.tab,true);
			}
		}
		else {
			local.result = false;
		}

		return local.result;
	}
	
	/*** Get tab by id ***/
	public any function getById(tabId)
	{
		return EntityLoad("tab",arguments.tabId,true);
	}
	
	/*** Get a tab by idor urlslug ***/
	public any function get(tabId=0)
	{
		var local = structnew();
		
		if (isNumeric(arguments.tabid)) {
			if (arguments.tabId)
			{
				local.tab = EntityLoad("tab",arguments.tabId,true);
			} else
			{
				local.tab = EntityNew("Tab");
			}
		}
		else {
			local.tab = getBySlug(arguments.tabid);
		}

		return local.tab;
	}

	/*** Get a tab by urlslug ***/
	public any function getBySlug(slug)
	{
		var local = structnew();
		
		local.tab = EntityLoad("Tab",{UrlSlug='#arguments.slug#'}, true);

		if (!structkeyexists(local,"tab")) {
			local.tab = get();
		}
		
		return local.tab;
	}
	
	/*** Delete a tab from the database ***/
	public void function delete(tab)
	{
		EntityDelete(arguments.tab);
	}
	
	/*** Search for entities matching the provided term ***/
	public array function search(string term)
	{
		/*** Get hibernate objects for order and filtering ***/
		order = createObject("java","org.hibernate.criterion.Order");
		restrictions = createObject("java","org.hibernate.criterion.Restrictions");
		projections = createObject("java","org.hibernate.criterion.Projections");

		/*** Create hibernate query with filtering and ordering ***/
		search = ormGetSession().createCriteria("Tab");
		search.add(restrictions.like("Title","#arguments.term#%").ignoreCase());
		search.addOrder(order.asc("Title"));
		//search.setMaxResults(10);

		return search.list();
	}
}