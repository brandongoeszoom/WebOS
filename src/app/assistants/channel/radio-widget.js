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
Widget.Channel.Radio = Class.create(BaseWidget, {
	getAttributes: function() {
		var attributes = {
			choices: [
				{ label: "Audio", value: "audio" },
				{ label: "Video", value: "video" },
				{ label: "All", value: "all" }
			]
		};
		return attributes;
	},
	
	getModel: function () {
		var episodes = this.assistant.episodes;
		var model = {
			value: 'all',
			disabled: false
		};
		return model;	
	},
	
	attachListeners: function() {
		this.assistant.controller.listen(this.elementId, Mojo.Event.propertyChange, function(event) {
			this.assistant.clearList();

			if(event.value == 'audio') {
				this.assistant.loadChannel('audio');
			} else if(event.value == 'video') {
				this.assistant.loadChannel('video');			
			} else {
				this.assistant.loadChannel();
			}
		}.bind(this));
	}
});
