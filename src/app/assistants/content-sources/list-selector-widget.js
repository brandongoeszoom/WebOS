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
Widget.ContentSources.ListSelector = Class.create(BaseListWidget, {
	getAttributes: function() {
		var attributes = {
			label:"change",
			labelPlacement:Mojo.Widget.labelPlacementRight // SMELL depends on Mojo
		};
		return attributes;
	},

	getModel: function () {
		var model = new ListSelectorModel(this.assistant.boundUsers, 'accountName', function(boundUser) {
			return boundUser.defaultUser;
		});
		return model;
	},

	attachListeners: function() {
		this.assistant.controller.listen(this.elementId, Mojo.Event.propertyChange, function(event) {
			if(event.value == 'add new account') {
				this.assistant.controller.stageController.pushScene('linking-methods', {previousScene: 'content-sources'});
			} else {
				var parameters = {
					accountName: event.value
				};
				this.request = new BindUserAsDefault(this.assistant, parameters, null, new BindUserAsDefaultResponseHandler(parameters));
			}
		}.bind(this));
	}
});
