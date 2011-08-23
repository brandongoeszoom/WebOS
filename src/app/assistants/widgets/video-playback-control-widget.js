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
Widget.Episode.VideoPlaybackControlWidget = Class.create({
	initialize: function(assistant, player) {
		this.assistant = assistant;
		this.player = player;
		this.model = this.getModel();
		var attributes = {menuClass:'palm-dark'};
		this.assistant.controller.setupWidget(Mojo.Menu.commandMenu, attributes, this.model);
	},

	menuCommandItems: {
		pause:       {iconPath: "images/mini-player-icon-pause.png", command: "pause-cmd"},
		play:        {iconPath: "images/mini-player-icon-play.png", command: "play-cmd"},
		skipForward: {iconPath: "images/menu-icon-music-forward.png", command: "skipForward-cmd"},
		skipBack:    {iconPath: "images/menu-icon-music-rewind.png", command: "skipBack-cmd"},
		nil:         {icon: "", command: "", label: " "}
	},

	getModel: function() {
		this.menuCommandItems.play.disabled = true;
		return {items: [this.menuCommandItems.play,
						this.menuCommandItems.skipForward]};
	},

	handleCommand: function(event) {
		if (event.type === Mojo.Event.command) {
			switch (event.command) {
				case "play-cmd":
					this.play();
					break;
				case "pause-cmd":
					this.pause();
					break;
				case "skipBack-cmd":
					this.player.skip(-60);
					break;
				case "skipForward-cmd":
					this.player.skip(60);
					break;
			}
		}
	},

	canPlayEvent: function() {
		this.playGUI();
		this.enableSkip();
	},

	bufferingEvent: function() {
		this.disablePlayPause();
	},

	play: function() {
		this.disablePlayPause();
		this.player.play();
	},

	playEvent: function() {
		this.pauseGUI();
	},

	pause: function() {
		this.disablePlayPause();
		this.player.pause();
	},

	pauseEvent: function() {
		this.playGUI();
	},

	enablePlayPause: function() {
		this.model.items[0].disabled = false;
		this.assistant.controller.modelChanged(this.model);
	},

	disablePlayPause: function() {
		this.model.items[0].disabled = true;
		this.assistant.controller.modelChanged(this.model);
	},

	playGUI: function() {
		this.model.items[0] = this.menuCommandItems.play;
		this.enablePlayPause();
	},

	pauseGUI: function() {
		this.model.items[0] = this.menuCommandItems.pause;
		this.enablePlayPause();
	},

	enableSkip: function() {
		this.model.items[1] = this.menuCommandItems.skipForward;
		this.model.items[1].disabled = false;
		this.assistant.controller.modelChanged(this.model);
	},

	disableSkip: function() {
		this.model.items[1] = this.menuCommandItems.skipForward;
		this.model.items[1].disabled = true;
		this.assistant.controller.modelChanged(this.model);
	},


	updateGUI: function() {
		var status = this.player.getStatus();
		if (status.playing) {
			this.pauseGUI();
		} else if (status.paused) {
			this.playGUI();
		}

		if (status.canSeek) {
			this.enableSkip();
		} else {
			this.disableSkip();
		}
	}
});
