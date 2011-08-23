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
BrowseContentSourcesResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant, listWidget, spinnerWidget) {
		$super();
		this.assistant = assistant;
		this.listWidget = listWidget;
		this.spinnerWidget = spinnerWidget;
	},
	handleResponse: function(ajaxResponseData) {
		// parse response
		var contentSources = new ParseContentSourcesResponse(ajaxResponseData.responseText).result;
		var subscribed = {};

		Global.subscribedContentSources.each(function(contentSource) {
			subscribed[contentSource.slug] = "checkmark";
		});

		contentSources.each(function(contentSource) {
			contentSource.subscribed = subscribed[contentSource.slug];
		});
		// update view
		this.assistant.contentSources = contentSources;
		this.spinnerWidget.stop();
		this.listWidget.updateModel();
	}
});

BrowseContentSources = Class.create(Get, {
	getUrl: function() {
		return Url.create("Mediafly.ContentSources.Browse", {
			user_context:'app_context_system'
		});
	}
});
