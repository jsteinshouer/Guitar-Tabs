/**
*
* @file  model.tags.TagsService.cfc
* @author  Jason Steinshouer	
* @description Service object for Tags
*
*/
component output="false" displayname="TagsService" extends="model.BaseService" {

	public function init(){
		/*** Property used by BaseService parent object ***/
		variables.entityType = "Tag";

		return this;
	}

	
	public boolean function save(required tag)
	{

		var local = structnew();
		local.result = true;
		
		if (!arguments.tag.hasErrors()){
			if (!isnull(arguments.tag.getTagId()) && arguments.tag.getTagId()) {
				EntitySave(arguments.tag);
			}
			else {
				EntitySave(arguments.tag,true);
			}
		}
		else {
			local.result = false;
		}
		
		return local.result;
	}

	public void function delete(required tag) {
		EntityDelete(tag);
	}

	public any function getTagOptions() {
		var local = structNew();

		local.tags = getAll();
		local.tagOptions = arrayNew(1);

		for(var i=1; i <= ArrayLen(local.tags); i++){;
			arrayAppend(local.tagOptions,local.tags[i].getTitle());
		}

		return local.tagOptions;
	}

	/*** Search for entities using the hibernate api ***/
	public array function search(string term)
	{
		/*** Get hibernate objects for order and filtering ***/
		order = createObject("java","org.hibernate.criterion.Order");
		restrictions = createObject("java","org.hibernate.criterion.Restrictions");
		projections = createObject("java","org.hibernate.criterion.Projections");

		/*** Create hibernate query with filtering and ordering ***/
		search = ormGetSession().createCriteria("Tag");
		search.add(restrictions.like("Title","#arguments.term#%"));
		search.addOrder(order.asc("Title"));
		search.setMaxResults(10);

		/*** We only want these properties ***/
		pl = projections.projectionList();
		pl.add(projections.property("TagId"));
		pl.add(projections.property("Title"));
		pl.add(projections.property("UrlSlug"));
		search.setProjection(pl);

		return search.list();
	}

}