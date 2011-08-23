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
GetContentSourcesResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant, listWidget, defaultMcode) {
		$super();
		this.assistant = assistant;
		this.listWidget = listWidget;
		this.defaultMcode = defaultMcode;
	},
	handleResponse: function(ajaxResponseData) {
		// parse response
		// we need to keep track of the deviceContentSources so that we can add/remove them
		Global.subscribedContentSources = new ParseContentSourcesResponse(ajaxResponseData.responseText).result;

		// update view
		this.listWidget.updateModel();

		if (this.defaultMcode) {
			Global.subscribedContentSources.each(function(contentSource) {
				if (this.defaultMcode === contentSource.mcode) {
					this.assistant.loadContentSourceScene(contentSource);
				}
			}.bind(this));
		}

	}
});

GetContentSources = Class.create(Get, {
	getUrl: function() {
		return Url.create("Mediafly.ContentSources.GetContentSources", {
			user_context:'app_context_system'
		});
	}
});
