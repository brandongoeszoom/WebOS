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
GetChannelsResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant, listWidget, spinnerWidget) {
		$super();
		this.assistant = assistant;
		this.listWidget = listWidget;
		this.spinnerWidget = spinnerWidget;
	},
	handleResponse: function(ajaxResponseData) {
		// parse response
		var channels = new ParseChannelsResponse(ajaxResponseData.responseText).result;
	
		// update view
		this.spinnerWidget.stop();

		if (channels.length === 0) {
			$('noChannels').show();
		}else{
			this.assistant.channels = channels;
			this.listWidget.updateModel(channels);
		}
	}
});

GetChannels = Class.create(Get, {
	getUrl: function() {
		return Url.create("Mediafly.Channels.GetChannels", {
			source:this.parameters.contentSource.slug,
			user_context:'app_context_system'
		});
	}
});
