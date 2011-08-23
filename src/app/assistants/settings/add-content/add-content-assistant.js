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
function AddContentAssistant(options) {
	this.previousScene = options.previousScene;
	this.contentSources = [];
}

AddContentAssistant.prototype.setup = function() {
	var parameters = {title: "Add Content Providers"};
	widget = new Widget.Shared.Header(this, parameters);

	this.menuWidget = new Widget.Shared.Menu(this);
	this.listWidget = new Widget.AddContent.List('addContentListWidget', this);
	this.spinnerWidget = new Widget.Shared.Spinner('spinnerWidget', this);
	this.loadContentSources();
};

AddContentAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

AddContentAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

AddContentAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};

AddContentAssistant.prototype.loadContentSources = function() {
	var responseHandler = new BrowseContentSourcesResponseHandler(this, this.listWidget, this.spinnerWidget);

	request = new BrowseContentSources(this, {}, null, responseHandler);
};

AddContentAssistant.prototype.loadContentSourceHandler = function(contentSource) {
	if (contentSource.subscribed) {
		widget = new Widget.Dialog.Confirm(this, "Remove Content Provider",
										   "Do you want to remove " + contentSource.provider + "?  If yes, it will be removed from your Mediafly home screen.",
										   this.removeContentSource.bind(this, contentSource));
	} else {
		widget = new Widget.Dialog.Confirm(this, "Add Content Provider",
										   "Do you want to add " + contentSource.provider + "?  If yes, it will appear on your Mediafly home screen.",
										   this.addContentSource.bind(this, contentSource));
	}
	widget.show();
};

AddContentAssistant.prototype.addContentSource = function(contentSource) {
	this.waitingWidget = new Widget.Dialog.Waiting(this, "Please Wait",
									   "Adding Content Provider...");
	this.waitingWidget.show();
	var parameters = {contentSource: contentSource, action: "added"};
	var responseHandler = new AddContentSourceResponseHandler(this, parameters);

	request = new AddContentSource(this, parameters, null, responseHandler);
};

AddContentAssistant.prototype.removeContentSource = function(contentSource) {
	this.waitingWidget = new Widget.Dialog.Waiting(this, "Please Wait",
									   "Removing Content Provider...");
	this.waitingWidget.show();
	var parameters = {contentSource: contentSource, action: "removed"};
	var responseHandler = new RemoveContentSourceResponseHandler(this, parameters);

	request = new RemoveContentSource(this, parameters, null, responseHandler);
};

AddContentAssistant.prototype.updateView = function(parameters) {
	this.waitingWidget.close();
	widget = new Widget.Dialog.Message(this, "Success",
									   "The Content Provider has been successfully " + parameters.action + ".",
									   this.contentAddedCallback.bind(this),
									   this.contentAddedCallback.bind(this));
	widget.show();
};

AddContentAssistant.prototype.updateModel = function(parameters) {
	if (parameters.contentSource.subscribed) {
		for (var i=0, len=Global.subscribedContentSources.length; i<len; ++i) {
			var contentSource = Global.subscribedContentSources[i];
			if (contentSource && contentSource.slug === parameters.contentSource.slug) {
				delete Global.subscribedContentSources[i];
			}
		}
		parameters.contentSource.subscribed = undefined;
	} else {
		parameters.contentSource.subscribed = "checkmark";
		var newContentSource = new ContentSourceModel(parameters.contentSource);
		Global.subscribedContentSources.push(newContentSource);
	}
	this.loadContentSources();
};

AddContentAssistant.prototype.contentAddedCallback = function() {
};
