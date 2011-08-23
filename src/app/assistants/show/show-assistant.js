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
function ShowAssistant(episode) {
	this.episode = episode;
	this.episodes = [];
}

ShowAssistant.prototype.setup = function() {
	widget = new Widget.Shared.Menu(this);
	this.spinnerWidget = new Widget.Shared.Spinner('spinnerWidget', this);
	this.listWidget = new Widget.Show.List('showListWidget', this);
	widget = new Widget.Show.OptionsButton('optionsButtonWidget', this);
	widget = new Widget.Show.PlayButton('playButtonWidget', this);

	$('optionsButtonWidget').setStyle({visibility:'hidden'});
	$('playButtonWidget').setStyle({visibility:'hidden'});

	request = new GetShow(this, { episode: this.episode }, null,
	request = new GetShowResponseHandler(this, new GetEpisodesForShowResponseHandler(this, this.listWidget, this.spinnerWidget)));
};

ShowAssistant.prototype.insertShowData = function() {
	$('showTitle').innerHTML = this.show.title;
	$('showDescription').innerHTML = this.show.getShortDescription();
	$('showImage').writeAttribute('src', this.show.imageUrl);

	$('optionsButtonWidget').setStyle({visibility:'visible'});
	$('playButtonWidget').setStyle({visibility:'visible'});
};

ShowAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

ShowAssistant.prototype.loadShowOptions = function() {
	this.controller.stageController.pushScene('show-options', this.show);
};

ShowAssistant.prototype.loadPlayEpisode = function() {
	widget = new Widget.Shared.Video(this, this.episodes[0]);
};


ShowAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

ShowAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
