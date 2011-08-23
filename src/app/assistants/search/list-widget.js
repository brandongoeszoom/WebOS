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
Widget.Search.List = Class.create(BaseListWidget, {
	getAttributes: function() {
		var attributes = {
			itemTemplate: "search/search-results-row-template",
			listTemplate: "search/search-results-template"
		};
		return attributes;
	},

	getModel: function (results) {
		//TODO: Figure out why they aren't using the results coming in here
		var resultsLocal = this.assistant.results;
		var listModel = [];

		resultsLocal.each(function(result) {
			listModel.push(result.getListProperties());
		});

		return { items:listModel };
	},

	attachListeners: function() {
		this.assistant.controller.listen(this.elementId, Mojo.Event.listTap, function(event) {
			var selectedResult = this.getSelectedItem(this.assistant.results, event.item.slug);
			this.assistant.controller.stageController.pushScene('episode', selectedResult, false, true);
		}.bind(this));
	}
});
