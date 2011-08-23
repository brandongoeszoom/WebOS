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
Player = Class.create({
	initialize:function(assistant, episode) {
		this.assistant = assistant;
		this.initPlayer(episode);
	},
	initPlayer: function(episode) {
		this.episode = episode;
		this.status = {};
		if (this.episode) {
			this.parameters = this.formatParameters(this.episode);
		}
	},
	formatParameters: function(episode) {
		if(episode.isVideo()) {
			return {
			 	target: episode.url,
				title: episode.title,
				thumbUrl: episode.imageUrl
			};
		} else {
			return {
			 	target: episode.url,
				bookmark: episode.bookmark
			};
		}
	},
	getPlayer: function(assistant, episode) {
		if(episode.isVideo()) {
			return new VideoPlayer(assistant, episode);
		} else {
			if (!AudioPlayer.singleton) {
				Mojo.Log.error("Creating new AudioPlayer");
				AudioPlayer.singleton = new AudioPlayer(assistant, episode);
			} else if (AudioPlayer.singleton.player.src !== episode.url) {
				Mojo.Log.error("Using existing AudioPlayer");
				AudioPlayer.singleton.initPlayer(episode);
				this.player.src = null;
				if (this.player.networkState !== HTMLMediaElement.NETWORK_EMPTY){
					this.player.load();
				}
				this.readyToPlayEvent();
			}
			return AudioPlayer.singleton;
		}
	},
	play: function() {
		this.player.play();
	},
	pause: function() {
		this.player.pause();
	},
	stop: function() {
		this.postExperience();
		this.player.pause();
		this.player.src = null;
		this.player.load();
	},
	skip: function(secs) {
		var wasPlaying = !this.player.paused;
		this.player.currentTime += secs;
		if (wasPlaying) {this.player.play();}
	},
	sliderStart: function() {
		this.wasPlaying = !this.player.paused;
		if (this.wasPlaying) {
			this.player.pause();
			this.player.autoplay = true;
		} else {
			this.player.autoplay = false;
		}
	},
	sliderEnd: function() {
		if (this.wasPlaying) {
			this.player.play();
		}
	},
	propertyChange: function(event) {
		this.player.currentTime = event.value * this.player.duration;
	},

	getProgress: function() {
		var progress = {};
		if (this.player &&
			!isNaN(this.player.currentTime) &&
			!isNaN(this.player.duration) &&
			this.player.duration !== Infinity &&
			this.player.duration !== 0) {
			progress.currentTime = this.player.currentTime;
			progress.duration = this.player.duration;
			progress.value = this.player.currentTime / this.player.duration;
		}
		if (this.player.mojo._media !== undefined && this.player.mojo._media !== null) {
			var buffered = this.player.mojo._media.buffered;
			if (buffered !== undefined && buffered !== null) {
				progress.progressStart = buffered.start(0)/this.player.duration;
				progress.progressEnd = buffered.end(0)/this.player.duration;
			}
		}

		return progress;
	},

	initEvents: function() {
		this.player.addEventListener(Media.Event.X_PALM_CONNECT, this.readyToPlayEvent.bind(this));
		this.player.addEventListener(Media.Event.ERROR, this.errorEvent.bind(this));

		this.player.addEventListener(Media.Event.PAUSE, this.pauseEvent.bind(this));
		this.player.addEventListener(Media.Event.PLAY, this.playEvent.bind(this));

		this.player.addEventListener(Media.Event.CANPLAY, this.canPlayEvent.bind(this));
		this.player.addEventListener(Media.Event.WAITING, this.waitingEvent.bind(this));
		this.player.addEventListener(Media.Event.ENDED, this.endEvent.bind(this));

		this.player.addEventListener(Media.Event.LOAD, this.audioEvent.bind(this));
	},

	readyToPlayEvent: function() {
		Mojo.Log.error("readyToPlayEvent: Playing URL: %s", this.parameters.target);
		this.player.src = this.parameters.target;
		this.player.autoplay = false; // must be set after the source, annoying
		this.player.hide();
	},
	errorEvent: function(event) {
		Mojo.Log.error("errorEvent called(%o)", event);
	},
	audioEvent: function(event) {
		Mojo.Log.error("audioEvent called(%s)", event.type);
	},
	playEvent: function(event) {
		Mojo.Log.error("playEvent called");
		Notify.send("playEvent");
		this.status.playing = true;
		this.status.paused = false;
		this.postExperience();
		if (!this.postExperienceInterval) {
			this.postExperienceInterval = window.setInterval(this.postExperience.bind(this), 30000);
		}
	},
	pauseEvent: function(event) {
		Mojo.Log.error("pauseEvent called");
		Notify.send("pauseEvent");
		this.status.playing = false;
		this.status.paused = true;
		this.postExperience();
		if (this.postExperienceInterval) {
			window.clearInterval(this.postExperienceInterval);
			this.postExperienceInterval = null;
		}
	},
	canPlayEvent: function(event) {
		Mojo.Log.error("canPlayEvent called");
		if (this.parameters.bookmark) {
			try {
				Mojo.Log.error("trying to set currentTime: %s", this.parameters.bookmark);
				this.player.currentTime = this.parameters.bookmark;
				this.parameters.bookmark = 0;
				Mojo.Log.error("currentTime set");
			} catch (e) {
				Mojo.Log.error("Error setting time: %j", e);
			}
		}
		if (this.player.autoplay) {
			this.player.play();
		}
		if (this.player.paused) {
			Notify.send("canPlayEvent");
		}
		this.status.canSeek = true;
	},

	waitingEvent: function(event) {
		Mojo.Log.error("waitingEvent called");
		Notify.send("waitingEvent");
	},

	endEvent: function(event) {
		Mojo.Log.error("endEvent called");
		Notify.send("endEvent");
	},

	postExperience: function() {
		var progress = this.getProgress();
		if (progress.currentTime) {
			Mojo.Log.error("lets post some experience! %d", progress.currentTime);
			var params = {episode: this.episode,
						position: progress.currentTime,
						episodeLength: progress.duration};
			var request = new PostExperienceForEpisode(this.assistant, params, null, new PostExperienceForEpisodeHandler(params));
			Mojo.Log.error("experience posted!");
		}
	},

	getStatus: function(event) {
		return this.status;
	}
});
