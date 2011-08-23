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
Widget.Episode.Media = Class.create({
	initialize: function(assistant, episode) {
		var parameters = this.formatParameters(episode);
		// based on wifi availability, we need to launch the appropriate url, so
		// let's have a Widget.Episode.BitrateSelector class that will call a callback
		// with a mediaModel that matches the current connection (or an optionally specified bitrate)
		if(episode.isVideo()) {
			this.player = new VideoPlayer(assistant, parameters);
		} else {
			this.player = new AudioPlayer(assistant, parameters);
		}
	},

	play: function() {
		this.player.play();
	},

	pause: function() {
		this.player.pause();
	},

	skip: function(secs) {
		this.player.skip(secs);
	},

	sliderStart: function() {
		this.player.sliderStart();
	},

	sliderEnd: function() {
		this.player.sliderEnd();
	},

	propertyChange: function(event) {
		this.player.propertyChange(event);
	},

	getProgress: function() {
		return this.player.getProgress();
	}
});
