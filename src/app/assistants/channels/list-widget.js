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
Widget.Channels.List = Class.create(BaseListWidget, {
  initialize: function($super, id, assistant, parameters) {
		$super(id, assistant);
		this.parameters = parameters;

	},

	getAttributes: function() {
		var attributes = {
			itemTemplate: "channels/channels-row-template",
			listTemplate: "channels/channels-template"
		};
		return attributes;
	},

	getModel: function () {
		var channels = this.assistant.channels;
		var model = [];

		channels.each(function(channel) {
			model.push(channel.getListProperties());
		});

		return { items:model };
	},

	attachListeners: function() {
		this.assistant.controller.listen(this.elementId, Mojo.Event.listTap, function(event) {
			this.assistant.controller.stageController.pushScene('channel', event.item, this.parameters);
		}.bind(this));
	}
});
