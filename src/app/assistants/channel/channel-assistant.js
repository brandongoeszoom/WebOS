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
function ChannelAssistant(channel, options) {
  this.options = options;
  this.channel = channel;
  this.episodes = [];
}

ChannelAssistant.prototype.setup = function() {
	var parameters = {
	  title: this.channel.name,
	  description: this.options.contentSource.name,
	  contentSource: this.options.contentSource
	};

	widget = new Widget.Shared.Header(this, parameters);

	$('noChannelEpisode').hide();
	widget = new Widget.Shared.Menu(this);
	this.spinnerWidget = new Widget.Shared.Spinner('spinnerWidget', this);
	this.listWidget = new Widget.Channel.List('channelListWidget', this);
	this.radioWidget = new Widget.Channel.Radio('mediaRadioWidget', this);

	this.loadChannel();
};

ChannelAssistant.prototype.loadChannel = function(mediaType) {
	var parameters = {
	  channel: this.channel,
	  contentSource: this.options.contentSource
	};

	this.spinnerWidget.start();

	var responseHandler = new GetChannelContentResponseHandler(this, this.listWidget, this.spinnerWidget);
	if(this.options.withBoundUser){
  	if(mediaType == 'audio') {
    	request = new GetUserChannelAudioContent(this, parameters, null, responseHandler);
  	} else if(mediaType == 'video') {
  		request = new GetUserChannelVideoContent(this, parameters, null, responseHandler);
  	} else {
  		request = new GetUserChannel(this, parameters, null, responseHandler);
  	}
  }
  else {
    if(mediaType == 'audio') {
   		request = new GetChannelAudioContent(this, parameters, null, responseHandler);
  	} else if(mediaType == 'video') {
  		request = new GetChannelVideoContent(this, parameters, null, responseHandler);
  	} else {
  		request = new GetChannel(this, parameters, null, responseHandler);
  	}
  }
};

ChannelAssistant.prototype.clearList = function() {
	this.episodes = [];
	this.listWidget.clearModel();
};

ChannelAssistant.prototype.activate = function(episodeSlugToRemove) {
	if(episodeSlugToRemove) {
		var episodes = this.episodes.findAll(function(episode) {
			return episode.slug != episodeSlugToRemove;
		});
		this.episodes = episodes;
		this.listWidget.updateModel();
	}
    this.controller.stageController.setWindowOrientation("up");
};


ChannelAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

ChannelAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
