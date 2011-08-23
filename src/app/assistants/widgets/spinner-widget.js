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
Widget.Shared.Spinner = Class.create(BaseWidget, {
	getAttributes: function() {
		var attributes = {
			spinnerSize: 'large'
		};
		return attributes;
	},
	
	getModel: function () {
		var model = {
			spinning: true 
 		};

		return model;	
	},

	stop: function() {
		var model = { 
			spinning: false 
		};
		this.assistant.controller.setWidgetModel(this.elementId, model);	
	},
	
	start: function() {
		var model = { 
			spinning: true 
		};
		this.assistant.controller.setWidgetModel(this.elementId, model);	
	}
});

Widget.Shared.SpinnerSmall = Class.create(Widget.Shared.Spinner, {
	getAttributes: function() {
		var attributes = {
			spinnerSize: 'small'
		};
		return attributes;
	}
});
