/**
*
* @file  handlers/tags.cfc
* @author  Jason Steinshouer
* @description Coldbox Handler for tag requests
*/
component extends="handlers.base"
{
	/*** Required model services ***/
	property name = "tagsService" inject="model.tags.TagsService";

	public any function index(event,rc,prc) {

		event.paramValue("rc.fields","id,title,total,tabs,videos");
		
		var tags = tagsService.getAll();

		rc.response = getCollection(tags,rc.fields,rc.offset,rc.limit);

	}


	public any function read(event,rc,prc) {
		
		var tag = tagsService.get(rc.id);

		if (rc.fields == "") {
			rc.fields = "id,title,tabs,videos";
		}

		rc.response = getMember(tag,rc.fields);
	}

	public void function search(event,rc,prc)
	{
		event.paramValue("term","");

		var tags = tagsService.search(rc.term);

		rc.response = getCollection(tags,"id,title,total",rc.offset,rc.limit);

	}
	

	private any function getMember(tag,fields) {

		var resource = structNew();

		if (isValid("component", arguments.tag)) {

			resource["uri"] = "/tags/#tag.getUrlSlug()#";
			resource["id"] = tag.getUrlSlug();

			if (listFindNoCase(arguments.fields,"title")) {
				resource["title"] = tag.getTitle();
			}

			if (listFindNoCase(arguments.fields,"tabs")) {

				resource["tabs"] = [];
				var tab = "";

				for (tab in tag.getTabs()) {
					arrayAppend(resource["tabs"],{
						"id" = tab.getUrlSlug(),
						"title" = tab.getTitle()
					});
				}
			}

			if (listFindNoCase(arguments.fields,"total")) {
				resource["total"] = ArrayLen(tag.getTabs()) + ArrayLen(tag.getVideos());
			}

			if (listFindNoCase(arguments.fields,"videos")) {

				resource["videos"] = [];
				var video = "";

				for (video in tag.getVideos()) {
					arrayAppend(resource["videos"],{
						"id" = video.getUrlSlug(),
						"title" = video.getTitle(),
						"code" = video.getCode()
					});
				}
			}

		}
		else {
			resource["uri"] = "/tags/#tag.UrlSlug#";
			resource["id"] = tag.UrlSlug;

			if (listFindNoCase(arguments.fields,"title")) {
				resource["title"] = tag.Title;
			}

			if (listFindNoCase(arguments.fields,"total")) {
				resource["total"] = ArrayLen(tag.Tabs) + ArrayLen(tag.Videos);
			}

		}

		return resource;
	}



}