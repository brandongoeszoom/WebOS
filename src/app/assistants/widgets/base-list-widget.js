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
BaseListWidget = Class.create(BaseWidget, {
	getSelectedItem: function(items, selectedSlug) {
		var selectedItem;
		items.each(function(item) {
			if(item.slug == selectedSlug) {
				selectedItem = item;
			}
		});

		return selectedItem;
	},

	updateModel: function(items) {
		var model = this.getModel(items);
		this.assistant.controller.setWidgetModel(this.elementId, model);
	},

	clearModel: function() {
		var model = this.getModel([]);
		this.assistant.controller.setWidgetModel(this.elementId, model);
	}
});
