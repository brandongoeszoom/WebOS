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
// SMELL slider base class!
Widget.Show.RatingSlider = Class.create(BaseWidget, {
	initialize: function($super, id, assistant, preselectedOptions) {
		this.preselectedOptions = preselectedOptions;
		$super(id, assistant);
	},

    getAttributes: function() {
		var attributes = {
			minValue: 1,
			maxValue: 5,
			round: true,
			updateInterval: 3
		};
        return attributes;
    },

    getModel: function() {
		var model = {
			value: this.defaultRating()
		};
        return model;
    },

    attachListeners: function() {
		this.assistant.controller.listen(this.elementId, Mojo.Event.propertyChange, function(event) {
			$('ratingResult').innerHTML = 'rating...';
			this.createAddEpisodeRatingListener(event.value);
		}.bind(this));
	},

	createAddEpisodeRatingListener: function(userRating) {
		var parameters = {
			show: this.assistant.show,
			rating: userRating
		};
		this.createActionRequest("AddShowRating", parameters, null, new AddShowRatingResponseHandler(this.assistant, this, parameters));
	},

	createActionRequest: function(actionName, parameters, callback, responseHandler) {
		request = new (window[actionName])(this.assistant, parameters, callback, responseHandler);
	},

	updateView: function(parameters) {
		$('ratingResult').show();
		$('ratingResult').innerHTML = "You've rated this episode.";
		this.model.value = parameters.rating;
		this.assistant.controller.modelChanged(this.model);
	},

	defaultRating: function() {
		return this.preselectedOptions.userRating === "" ? 3 : this.preselectedOptions.userRating;
	}
});
