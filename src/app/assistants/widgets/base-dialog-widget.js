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
BaseDialogWidget = Class.create({
	initialize: function(assistant, title, message, choices, options) {
		this.assistant = assistant;
		this.title = title;
		this.message = message;
		this.choices = choices;
		this.options = options||{};
	},
	show: function() {
		var options = {
			onChoose: function(value) {
					this.onChoose(value);
				}.bind(this),
		    title: this.title,
		    message: this.message,
			choices: this.choices
		};
		for (var p in this.options) {
			if (this.options.hasOwnProperty(p)) {
				options[p] = this.options[p];
			}
		}

		this.dialog = this.assistant.controller.showAlertDialog(options);
	},
	onChoose: function() {
		// To be overwritten
	}
});
