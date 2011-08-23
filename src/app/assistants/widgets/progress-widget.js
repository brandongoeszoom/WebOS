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
Widget.Shared.Progress = Class.create(BaseWidget, {
	initialize: function($super, elementId, assistant, player) {
		$super(elementId, assistant);
		this.player = player;
	},

	getAttributes: function() {
		var attributes = {
			sliderProperty: "value",
			progressStartProperty: "progressStart",
			progressProperty: "progressEnd",
			round: false,
			updateInterval: 0.5
		};
		return attributes;
	},

	getModel: function () {
		model = {
			value: 0,
			minValue: 0,
			maxValue: 1,
			progressStart: 0,
			progressEnd: 0
 		};

		return model;
	},

	updateProgress: function() {
		var params = this.player.getProgress();
		if (params) {
			if (params.value !== undefined) { this.model.value = params.value; }
			if (params.minValue !== undefined) { this.model.minValue = params.minValue; }
			if (params.maxValue !== undefined) { this.model.maxValue = params.maxValue; }
			if (params.progressStart !== undefined) { this.model.progressStart = params.progressStart; }
			if (params.progressEnd !== undefined) { this.model.progressEnd = params.progressEnd; }
			this.assistant.controller.modelChanged(this.model);
		}
		return params;
	},

	attachListeners: function() {
		this.assistant.controller.listen(this.elementId, Mojo.Event.sliderDragStart, function(event) {
			Mojo.Log.error("sliderDragStart");
			this.player.sliderStart();
		}.bind(this));
		this.assistant.controller.listen(this.elementId, Mojo.Event.sliderDragEnd, function(event) {
			Mojo.Log.error("sliderDragEnd");
			this.player.sliderEnd();
		}.bind(this));
		this.assistant.controller.listen(this.elementId, Mojo.Event.propertyChange, function(event) {
			Mojo.Log.error("propertyChange:%j", event);
			this.player.propertyChange(event);
		}.bind(this));
	}
});
