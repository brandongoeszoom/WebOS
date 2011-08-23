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
Widget.Search.TextField = Class.create(BaseWidget, {
	getAttributes: function() {
		var attributes = {
			hintText: $L('... search for content'),
			multiline: false,
			enterSubmits: false,
      autoFocus: true,
      requiresEnterKey: true
		};
		return attributes;
	},

	getModel: function() {
		var model = {
			value: "",
			disabled: false
		};
		return model;
	},

  attachListeners: function() {
     this.assistant.controller.listen("searchFieldWidget", Mojo.Event.propertyChange, function(event) {
       this.assistant.clearList();
       this.assistant.spinnerWidget.start();
       $('noSearchResults').hide();
       request = new GetSearchResults(this.assistant, { term: event.value }, null, new GetSearchResultsResponseHandler(this.assistant, this.assistant.spinnerWidget));

     }.bind(this));
    }
});
