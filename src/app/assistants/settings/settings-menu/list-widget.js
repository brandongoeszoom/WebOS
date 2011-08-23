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
Widget.SettingsMenu.List = Class.create(BaseListWidget, {
	getAttributes: function() {
		var attributes = {
			itemTemplate: "settings-menu/settings-menu-row-template",
			listTemplate: "settings-menu/settings-menu-template"
		};
		return attributes;
	},

	getModel: function () {
		var settings = this.assistant.settings;
		var listModel = [];

		settings.each(function(setting) {
			listModel.push(setting.getListProperties());
		});

		return { items:listModel };
	},

	attachListeners: function() {
		this.assistant.controller.listen(this.elementId, Mojo.Event.listTap, function(event) {
			var setting = this.getSelectedItem(this.assistant.settings, event.item.slug);

			// SMELL switch statement...
			switch(setting.slug) {
				case 'linked_accounts':
					this.assistant.loadLinkedAccounts();
					break;
				case 'email':
					this.assistant.loadEmailApp();
					break;
				case 'more_info':
				  this.assistant.loadMoreInfo();
				  break;
				case 'add_content':
				  this.assistant.addContent();
				  break;
			}
		}.bind(this));
	}
});
