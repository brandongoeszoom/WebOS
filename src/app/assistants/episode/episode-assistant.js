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
function EpisodeAssistant(episode, showAllEpisodesButton, fromSearch) {
	this.episode = episode;
	this.showAllEpisodesButton = showAllEpisodesButton;
	this.fromSearch = fromSearch;
	this.lastTimeExperienced = 0;
}

EpisodeAssistant.prototype.setup = function() {
	this.insertEpisodeData();

	menuWidget = new Widget.Shared.Menu(this);
	//this.controller.setupWidget("infoScroller", {mode: "dominant"}, {});

	/*
	playButtonWidget = new Widget.Episode.PlayButton('playButtonWidget', this);
	infoButtonWidget = new Widget.Episode.InfoButton('infoButtonWidget', this);
	ratingButtonWidget = new Widget.Episode.RatingButton('ratingButtonWidget', this);
  if(!this.fromSearch){
    removeButtonWidget = new Widget.Episode.RemoveButton('removeButtonWidget', this);
  }
	if(this.showAllEpisodesButton) {
		showButtonWidget = new Widget.Episode.ShowButton('showButtonWidget', this);
	}
	*/

	this.player = new Player().getPlayer(this, this.episode);
	if (this.episode.isVideo()) {
		this.controller.stageController.setWindowOrientation("left");
		this.sliderDiv = this.controller.get("slider-div");
		this.sliderDiv.hide();
		this.playbackControlWidget = new Widget.Episode.VideoPlaybackControlWidget(this, this.player);
	} else {
		this.progressWidget = new Widget.Shared.Progress('progress', this, this.player);
		this.playbackControlWidget = new Widget.Episode.PlaybackControlWidget(this, this.player);
	}


	this.stageDocument = this.controller.stageController.document;

	this.activateStageHandler = this.activateStage.bindAsEventListener(this);
	this.stageDocument.addEventListener(Mojo.Event.stageActivate, this.activateStageHandler);

	this.deactivateStageHandler = this.deactivateStage.bindAsEventListener(this);
	this.stageDocument.addEventListener(Mojo.Event.stageDeactivate, this.deactivateStageHandler);

	this.activateStage();
};

EpisodeAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
	this.deactivateStage();
	if (!this.player.getStatus().playing) {
		this.player.stop();
	}

	this.stageDocument.removeEventListener(Mojo.Event.stageActivate, this.activateStageHandler);
	this.stageDocument.removeEventListener(Mojo.Event.stageDeactivate, this.deactivateStageHandler);
};

EpisodeAssistant.prototype.activateStage = function() {
	this.playbackControlWidget.updateGUI();
	var widget = new Widget.Shared.DashboardWidget().hide();
	if (this.episode.isVideo()) {
	} else {
		if (!this.updateProgressInterval) {
			this.updateProgressInterval = window.setInterval(this.updateProgress.bind(this), 500);
		}
	}
};

EpisodeAssistant.prototype.deactivateStage = function() {
	if (this.episode.isVideo()) {
		this.player.pause();
	} else {
		if (this.player.getStatus().playing) {
			var widget = new Widget.Shared.DashboardWidget().show(this.player, this.controller.stageController);
		}
	}
	if (this.updateProgressInterval) {
		window.clearInterval(this.updateProgressInterval);
		this.updateProgressInterval = null;
	}

};


EpisodeAssistant.prototype.handleCommand = function(event) {
	if (event.type === Mojo.Event.command) {
		this.playbackControlWidget.handleCommand(event);
	}
};

EpisodeAssistant.prototype.updateProgress = function() {
	var progress = this.progressWidget.updateProgress();
	//Mojo.Log.error('progress=%j', progress);
	var diff = 0;
	if (progress.currentTime) {
		$('playback-progress').innerHTML = this.formatTime(progress.currentTime);
		diff = progress.currentTime - this.lastTimeExperienced;
	}
	if (progress.duration) {
		$('playback-remaining').innerHTML = this.formatTime(progress.duration - progress.currentTime);
	}
};

EpisodeAssistant.prototype.formatTime = function(secs) {
	if (secs < 0) {
		return "00:00";
	}
	var mins = Math.floor(secs / 60);
	secs = Math.floor(secs % 60);
	if (mins<10) {mins = "0"+mins;}
	if (secs<10) {secs = "0"+secs;}
	return mins+":"+secs;
};

EpisodeAssistant.prototype.insertEpisodeData = function() {
	$('episodeTitle').innerHTML = this.episode.title.truncate(60);
	$('episodeImage').writeAttribute('src', this.episode.imageUrl);
	$('episodePublished').innerHTML = this.episode.formatDate(this.episode.published);
	$('episodeInfo').innerHTML = this.episode.description;
};

EpisodeAssistant.prototype.loadPlayEpisode = function() {
};
EpisodeAssistant.prototype.loadEpisodeInfo = function() {
	this.controller.stageController.pushScene('episode-info', this.episode);
};
EpisodeAssistant.prototype.loadRateEpisode = function() {
	this.controller.stageController.pushScene('rate-episode', this.episode);
};
EpisodeAssistant.prototype.loadShow = function() {
	this.controller.stageController.pushScene('show', this.episode);
};

EpisodeAssistant.prototype.showRemoveDialog = function() {
	removeEpisodeDialogWidget = new RemoveEpisodeDialogWidget(this).show();
};

EpisodeAssistant.prototype.removeEpisode = function() {
	removeEpisodeWidget = new RemoveEpisode(this, { episode:this.episode }, null, new RemoveEpisodeResponseHandler(this, this.episode));
};

EpisodeAssistant.prototype.popScene = function() {
	this.controller.stageController.popScene();
};

EpisodeAssistant.prototype.activate = function(event) {
	this.playbackControlWidget.updateGUI();
};

EpisodeAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

EpisodeAssistant.prototype.considerForNotification = function(params) {
	if (params) {
		switch (params.type) {
			case "bufferingEvent":
				this.playbackControlWidget.bufferingEvent();
				break;
			case "canPlayEvent":
				this.playbackControlWidget.canPlayEvent();
				break;
			case "playEvent":
				this.playbackControlWidget.playEvent();
				break;
			case "pauseEvent":
				this.playbackControlWidget.pauseEvent();
				break;
		}
	}
};
