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
GetSearchResultsResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant, spinnerWidget) {
		this.assistant = assistant;
		this.spinnerWidget = spinnerWidget;
		$super();
	},
	handleResponse: function(ajaxResponseData) {
		// parse response
		var results = new ParseSearchResponse(ajaxResponseData.responseText).result;
		this.spinnerWidget.stop();
		if(results.length === 0) {
			$('noSearchResults').show();
		}
		else{
			this.assistant.updateList(results);
		}
	}
});

GetSearchResults = Class.create(Get, {
	getUrl: function() {
		return Url.create("Mediafly.Search.Query", {
			term:this.parameters.term
		});
	}
});
