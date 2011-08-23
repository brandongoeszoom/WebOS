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
function DashboardAssistant(player, mainStageController) {
	this.player = player;
	this.mainStageController = mainStageController;
	this.appController = Mojo.Controller.getAppController();
}

DashboardAssistant.prototype.setup = function() {
	Widget.Shared.DashboardWidget.dashboardAssistant = this;
	this.dashboardPlayer = this.controller.get("dashboard-player");
	this.tapHandler = this.tap.bindAsEventListener(this);
	this.dashboardPlayer.addEventListener(Mojo.Event.tap, this.tapHandler);
	this.init();

	this.stageDocument = this.controller.stageController.document;
	this.activateStageHandler = this.activateStage.bindAsEventListener(this);
	this.stageDocument.addEventListener(Mojo.Event.stageActivate, this.activateStageHandler);

	this.deactivateStageHandler = this.deactivateStage.bindAsEventListener(this);
	this.stageDocument.addEventListener(Mojo.Event.stageDeactivate, this.deactivateStageHandler);

};

DashboardAssistant.prototype.cleanup = function() {
	this.dashboardPlayer.removeEventListener(Mojo.Event.tap, this.tapHandler);
	this.stageDocument.removeEventListener(Mojo.Event.stageActivate, this.activateStageHandler);
	this.stageDocument.removeEventListener(Mojo.Event.stageDeactivate, this.deactivateStageHandler);
	if (!this.keepPlaying) {
		this.player.stop();
	}
	Widget.Shared.DashboardWidget.dashboardAssistant = null;
};

DashboardAssistant.prototype.close = function() {
	this.keepPlaying = true;
	this.controller.window.close();
};

DashboardAssistant.prototype.getPlaybackStatus = function() {
	var playbackStatus = "";
	var params = this.player.getProgress();
	if (params && params.currentTime) {
		playbackStatus = EpisodeAssistant.prototype.formatTime(params.currentTime);
		if (params.duration) {
			playbackStatus += "/" + EpisodeAssistant.prototype.formatTime(params.duration);
		}
	}

	return playbackStatus;
};

DashboardAssistant.prototype.init = function(event) {
	var status = this.player.getStatus();
	data = {};
	data.playbackStatus = this.getPlaybackStatus();
	data.episodeTitle = this.player.episode.title;
	data.albumArtUrl = "";
	data.showPlay = (status.playing)?"none":"block";
	data.showPause = (status.playing)?"block":"none";
	var renderedInfo = Mojo.View.render({object: data, template: 'dashboard/dashboard-player'});
	Element.update(this.dashboardPlayer, renderedInfo);

	this.playbackStatus = this.controller.get("playbackStatus");
	this.playButton = this.controller.get("play");
	this.pauseButton = this.controller.get("pause");
};

DashboardAssistant.prototype.activateStage = function() {
	Mojo.Log.error("dashboardAssistant activateStage");
	this.startTimer();
	// also check to see if pause/play need updating
	// afterwards, any play/pause event that comes in should be exposed to us
};

DashboardAssistant.prototype.deactivateStage = function() {
	Mojo.Log.error("dashboardAssistant deactivateStage");
	this.stopTimer();
};

DashboardAssistant.prototype.tap = function(event) {
	Mojo.Log.error("tap");
	var id = event.target.id;
	Mojo.Log.error("You tapped on %s", id);
	switch (id) {
		case "play":
			this.player.play();
			//this.showPause();
			break;
		case "pause":
			this.player.pause();
			//this.showPlay();
			break;
		case "prev":
			this.player.skip(-60);
			break;
		case "next":
			this.player.skip(60);
			break;
		default:
			this.mainStageController.assistant.playEpisode(this.player.episode);
			this.keepPlaying = true;
			this.controller.window.close();
			break;
	}
};

DashboardAssistant.prototype.startTimer = function() {
	this.interval = 1000;
	if (!this.timer) {
		this.timer = this.controller.window.setInterval(this.updatePlaybackStatus.bind(this), this.interval);
	}
};

DashboardAssistant.prototype.showPlay = function() {
	this.playButton.show();
	this.pauseButton.hide();
};

DashboardAssistant.prototype.showPause = function() {
	this.playButton.hide();
	this.pauseButton.show();
};

DashboardAssistant.prototype.stopTimer = function() {
	if (this.timer) {
		this.controller.window.clearInterval(this.timer);
		this.timer = undefined;
	}
};

DashboardAssistant.prototype.updatePlaybackStatus = function() {
	this.playbackStatus.update(this.getPlaybackStatus());
	var status = this.player.getStatus();
	if (status.playing) {
		this.showPause();
	} else {
		this.showPlay();
	}
};

DashboardAssistant.prototype.stopMessage = function() {
	if (this.timer) {
		this.controller.window.clearInterval(this.timer);
		this.timer = undefined;
	}
};

DashboardAssistant.prototype.handleCommand = function(event) {
};

DashboardAssistant.prototype.activate = function(event) {
};

DashboardAssistant.prototype.deactivate = function(event) {
	Mojo.Log.error("deactivate");
};

DashboardAssistant.prototype.considerForNotification = function(params) {
	if (params) {
		switch (params.type) {
			case "playEvent":
				this.showPause();
				break;
			case "pauseEvent":
				this.showPlay();
				break;
			case "endEvent":
				this.controller.window.close();
				break;
		}
	}
};
