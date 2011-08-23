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
function ContentSourcesAssistant(defaultMcode) {
	this.defaultMcode = defaultMcode;
	this.contentSources = [
		new ContentSourceModel({
			name:'Popular Channels',
			slug:'popular_channels',
			image:''
		}),
		new ContentSourceModel({
			name:'My Channels',
			slug:'_my_channels',
			updating:true,
			image:''
		}),
		new ContentSourceModel({
			name:'Search',
			slug:'search',
			image:''
		})
	];
}

ContentSourcesAssistant.prototype.setup = function() {
	$('buildNumber').innerHTML = Mojo.Controller.appInfo.version;

	widget = new Widget.Shared.Menu(this, {disabled: ['home']});
	this.listWidget = new Widget.ContentSources.List('contentSourcesListWidget', this);
	this.commandMenuWidget = new Widget.ContentSources.CommandMenu(this);
	this.spinnerWidget = new Widget.Shared.Spinner('spinnerWidget', this);
	if (this.defaultMcode) {
		this.listWidget.widget.hide();
	}
	this.controller.setupWidget("updateSpinnerWidget", {property: "updating"});
};

ContentSourcesAssistant.prototype.loadContentSourceScene = function(contentSource) {
	switch(contentSource.slug) {
		case 'popular_channels':
			this.controller.stageController.pushScene('channels', contentSource, { withBoundUser:false });
			break;
		case '_my_channels':
			// intentional do-nothing
			break;
		case 'my_channels':
			if(this.boundUser) {
				this.controller.stageController.pushScene('channels', contentSource, { withBoundUser:true });
			} else {
				this.controller.stageController.pushScene('linking-methods', {previousScene: 'content-sources'});
			}
			break;
		case 'search':
			this.controller.stageController.pushScene('search');
			break;
		default:
			// all non-mediafly contentSources will go through here
			if (contentSource.authentication.allowsUnboundUsers) {
				this.controller.stageController.pushScene('channels', contentSource, { withBoundUser: false});
			} else if (contentSource.authentication.supportsUserBindings) {
				var parameters = {
					contentSource: contentSource
				};
				var responseHandler = new GetBoundContentSourceUsersForLoginResponseHandler(this, parameters);
				request = new GetBoundContentSourceUsers(this, parameters, null, responseHandler);
			} else {
				widget = new Widget.Dialog.Message(this, "Unsupported Binding",
				                                   "Sorry, binding '" + contentSource.binding + "' is not yet supported.");
				widget.show();
			}
			break;
	}
};

ContentSourcesAssistant.prototype.activate = function(event) {
	this.resetBoundUser();
	this.request = new GetBoundUsers(this, {}, null, new GetBoundUsersForContentSourcesResponseHandler(this, this.listWidget));
	if (!this.defaultMcode) {
		this.spinnerWidget.stop();
		this.listWidget.widget.show();
	}
};

ContentSourcesAssistant.prototype.resetBoundUser = function() {
	this.contentSources[1].name = 'My Channels';
	this.boundUser = null;
	this.boundUsers = [];
};

ContentSourcesAssistant.prototype.deactivate = function(event) {

};

ContentSourcesAssistant.prototype.handleCommand = function(event) {
	if (event.type === Mojo.Event.command) {
		if (event.command == 'Settings') {
			this.controller.stageController.pushScene('settings-menu');
		}
	}

	if(event.type == Mojo.Event.back) {
	  event.stopPropagation();
	}
};

ContentSourcesAssistant.prototype.loadContentSources = function() {
	var responseHandler = new GetContentSourcesResponseHandler(this, this.listWidget, this.defaultMcode);
	this.defaultMcode = undefined;
	request = new GetContentSources(this, {}, null, responseHandler);
};

ContentSourcesAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
