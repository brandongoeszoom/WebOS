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
function ChannelsAssistant(contentSource, options) {
	this.contentSource = contentSource;
	this.options = options;
	this.channels = [];
}

ChannelsAssistant.prototype.setup = function() {
	var parameters = {
	  title: this.contentSource.name,
	  description: this.contentSource.description,
	  contentSource: this.contentSource
	};

	widget = new Widget.Shared.Header(this, parameters);

	widget = new Widget.Shared.Menu(this);
	this.spinnerWidget = new Widget.Shared.Spinner('spinnerWidget', this);
	this.listWidget = new Widget.Channels.List('channelsListWidget', this, {contentSource: this.contentSource, withBoundUser: this.options.withBoundUser});
	this.commandMenuWidget = new Widget.ContentSources.CommandMenu(this, [{}, {iconPath: 'icon32.png', command:'home'}]);
	this.loadChannels();

};

ChannelsAssistant.prototype.loadChannels = function() {
	var responseHandler = new GetChannelsResponseHandler(this, this.listWidget, this.spinnerWidget);

	if(this.options.withBoundUser) {
		request = new GetUserChannels(this, {contentSource:this.contentSource}, null, responseHandler);
	} else {
		request = new GetChannels(this, {contentSource:this.contentSource}, null, responseHandler);
	}
};

ChannelsAssistant.prototype.activate = function(event) {

};

ChannelsAssistant.prototype.deactivate = function(event) {

};

ChannelsAssistant.prototype.cleanup = function(event) {

};

/*
ChannelsAssistant.prototype.handleCommand = function(event) {
	if(event.type == Mojo.Event.command) {
		switch(event.command) {
			case 'home':
				this.controller.stageController.popScenesTo('content-sources');
				break;
		}
	}
};
*/
