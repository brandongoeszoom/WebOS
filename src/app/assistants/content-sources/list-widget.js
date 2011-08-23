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
Widget.ContentSources.List = Class.create(BaseListWidget, {
	getAttributes: function() {
		var attributes = {
			itemTemplate: "content-sources/content-sources-row-template",
			listTemplate: "content-sources/content-sources-template"
		};
		return attributes;
	},

	getModel: function () {
		var listModel = [];

		Global.subscribedContentSources.each(function(contentSource) {
			listModel.push(contentSource.getListProperties());
		});

		this.assistant.contentSources.each(function(contentSource) {
			listModel.push(contentSource.getListProperties());
		});

		return { items:listModel };
	},

	attachListeners: function() {
		this.assistant.controller.listen(this.elementId, Mojo.Event.listTap, function(event) {
			this.assistant.loadContentSourceScene(event.item);
		}.bind(this));
	}
});
