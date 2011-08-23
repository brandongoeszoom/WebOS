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
VideoPlayer = Class.create(Player, {
	initialize: function($super, assistant, episode) {
		$super(assistant, episode);

		this.player = VideoTag.extendElement("videoDiv");
		VideoPlayer.player = this.player;
		this.player.palm.audioClass = Media.AudioClass.MEDIA;
		/*
		this.player.palm._setFitMode('fill');
		this.player.palm.setWindowOrientation("up");
		this.player.palm._setVideoOrientation(270);
		this.player.palm._setWindowed(true);
		this.player.palm.setViewRectangle(25, 160, 192, 128);
		for (var p in this.player.palm) {
			try {
				Mojo.Log.error("player.palm.%s=%s", p, this.player.palm[p]);
			} catch (e) {
				Mojo.Log.error("player.palm.%s is not readable", p);
			}
		}
		*/

		this.initEvents();
	},
	play: function() {
		this.player.show();
		window.setTimeout(this.player.play.bind(this.player), 100);
	},
	pause: function() {
		this.player.pause();
		this.player.hide();
	}
});
