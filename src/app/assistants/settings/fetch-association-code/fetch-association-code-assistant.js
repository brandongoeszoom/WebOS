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
GetUserAssociationCodeResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant, spinnerWidget) {
		this.assistant = assistant;
		this.spinnerWidget = spinnerWidget;
		$super();
	},

	handleResponse: function(ajaxResponseData) {
		var associationCode = new ParseAssociationCodeResponse(ajaxResponseData.responseText).result;

		this.spinnerWidget.stop();
		$('loading').hide();
		$('success').show();
		$('associationCode').innerHTML = associationCode;

		var pollingIntervalInMilliseconds = 2000;
		var pollAssociationCodeResponseHandler = new PollAssociationCodeResponseHandler(this.assistant);

		this.assistant.interval = setInterval(function() {
			request = new PollAssociationCode(this.assistant, { associationCode: associationCode }, null, pollAssociationCodeResponseHandler);
		}.bind(this), pollingIntervalInMilliseconds);
	}
});

function FetchAssociationCodeAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

FetchAssociationCodeAssistant.prototype.setup = function() {
	var parameters = {title: "Get Association Code"};
	widget = new Widget.Shared.Header(this, parameters);
	$('success').hide();

	widget = new Widget.Shared.Menu(this);
	this.spinnerWidget = new Widget.Shared.Spinner('spinnerWidget', this);
};

FetchAssociationCodeAssistant.prototype.activate = function(event) {
	request = new GetUserAssociationCode(this, {}, null, new GetUserAssociationCodeResponseHandler(this, this.spinnerWidget));
};


FetchAssociationCodeAssistant.prototype.deactivate = function(event) {
	clearInterval(this.interval);
};

FetchAssociationCodeAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
