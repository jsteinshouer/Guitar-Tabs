/**
*
* @file  model.lessons.LessonService
* @author  Jason Steinshouer
* @description Lesson service object
*
*/
component singleton=true {
	
	/*** Load all lessons ***/
	public any function getAll()
	{
		return EntityLoad('Lesson');
	}
	
	/*** Load a lesson object ***/
	public any function get(lessonId=0)
	{
		var local = structnew();
		
		/*** Check if id is numeric since the urlslug could be used ***/
		if (isNumeric(arguments.lessonid)) {
			/*** Load entity by numeric id ***/
			if (arguments.lessonId) {
				local.lesson = EntityLoad("Lesson",arguments.lessonId,true);
			} 
			/*** Return an new entity ***/
			else {
				local.lesson = EntityNew("Lesson");
			}
		}
		/*** Load entity using the UrlSlug value ***/
		else {
			local.lesson = getBySlug(arguments.lessonid);
		}

		return local.lesson;
	}

	/*** Get a lesson by urlslug ***/
	public any function getBySlug(slug)
	{
		var local = structnew();
		
		local.lesson = EntityLoad("lesson",{UrlSlug='#arguments.slug#'}, true);

		if (!structkeyexists(local,"lesson")) {
			local.lesson = get();
		}
		
		return local.lesson;
	}

	/*** Populate a lesson's properties  ***/
	public any function populate(required lesson) {
		var local = structNew();

		param name="arguments.title" default="";
		param name="arguments.url" default="";
		param name="arguments.songid" default=0;
		param name="arguments.songTitle" default="";
		param name="arguments.tags" default="";

		/*** Populate associated song ***/
		if (arguments.songId || len(arguments.songTitle)) {
			/*** get existing or new song entity ***/
			local.song = songsService.get(arguments.songid,arguments.songTitle);
			/*** Populate and set the associated song ***/
			songsService.populate(
				song=local.song,
				title=arguments.songTitle
			);

			arguments.lesson.setSong(local.song);

		}

		if (len(arguments.title)) {
			arguments.lesson.setTitle(arguments.title);
		}

		if (len(arguments.url)){
			arguments.lesson.setUrl(arguments.url);
		}

		/*** Set from list rather than a array of tag objects ***/
		arguments.lesson.setTagsByList(arguments.tags);
	}

	/*** Save a lesson entity to the database ***/
	public boolean function save(required lesson)
	{
		
		var local = structnew();
		local.result = true;

		/*** Only save if there are no errors ***/
		if (!arguments.lesson.hasErrors()) {
			//save song before lesson
			if (lesson.hasSong()) {
				songsService.save(lesson.getSong());
			}	
			/*** Is it an update or insert? ***/
			if (!isnull(arguments.lesson.getLessonId()) && arguments.lesson.getLessonId())
			{
				EntitySave(arguments.lesson);
			}
			/*** force insert for new entity ***/
			else
			{
				EntitySave(arguments.lesson,true);
			}
		}
		else {
			local.result = false;
		}

		/*** Return boolean result ***/
		return local.result;
	}
	
	/*** Delete lesson ***/
	public void function delete(lesson)
	{
		EntityDelete(arguments.lesson);
	}

	/*** Search for entities using the hibernate api ***/
	public array function search(string term)
	{
		/*** Get hibernate objects for order and filtering ***/
		order = createObject("java","org.hibernate.criterion.Order");
		restrictions = createObject("java","org.hibernate.criterion.Restrictions");
		projections = createObject("java","org.hibernate.criterion.Projections");

		/*** Create hibernate query with filtering and ordering ***/
		search = ormGetSession().createCriteria("Lesson");
		search.add(restrictions.like("Title","#arguments.term#%"));
		search.addOrder(order.asc("Title"));
		search.setMaxResults(10);

		/*** We only want these properties ***/
		pl = projections.projectionList();
		pl.add(projections.property("LessonId"));
		pl.add(projections.property("Title"));
		pl.add(projections.property("UrlSlug"));
		search.setProjection(pl);

		return search.list();
	}
}