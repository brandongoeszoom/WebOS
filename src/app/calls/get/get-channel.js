/**
 * Copyright 2009-2011 Mediafly, Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 **/
GetChannelContentResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant, listWidget, spinnerWidget) {
		$super();
		this.assistant = assistant;
		this.listWidget = listWidget;
		this.spinnerWidget = spinnerWidget;
	},
	handleResponse: function(ajaxResponseData) {
		// parse response
		var episodes = new ParseChannelResponse(ajaxResponseData.responseText).result;

		// update view
		this.spinnerWidget.stop();

		if (episodes.length === 0) {
			$('noChannelEpisode').show();
		}else{
			this.assistant.episodes = episodes;
			this.listWidget.updateModel(episodes);
		}
	}
});

GetChannel = Class.create(Get, {
	getUrl: function() {
		return Url.create("Mediafly.Channels.GetChannel", {
			channelSlug:this.parameters.channel.slug,
			source:this.parameters.contentSource.slug,
			includeAttributes:'published,mediaType,showSlug,imageUrl,title,description,url,userRating,bookmark',
			user_context:'app_context_system'
		});
	}
});
