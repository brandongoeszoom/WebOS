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
RemoveEpisodeResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant, episode) {
		this.assistant = assistant;
		this.episode = episode;
		$super();
	},
	handleResponse: function(ajaxResponseData) {
		var parsedResponse = new ParseRemoveEpisodeResponse(ajaxResponseData.responseText).result;
		this.assistant.controller.stageController.popScene(this.episode.slug);
	}
});

RemoveEpisode = Class.create(Get, {
	getUrl: function() {
		return Url.create("Mediafly.Channels.RemoveEpisode", {
			episodeSlug:this.parameters.episode.slug
		});
	}
});
