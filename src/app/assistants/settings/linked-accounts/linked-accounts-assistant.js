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
function LinkedAccountsAssistant() {
	this.users = [];
}

LinkedAccountsAssistant.prototype.setup = function() {
	var parameters = {title: "Linked Accounts"};
	widget = new Widget.Shared.Header(this, parameters);
	widget = new Widget.Shared.Menu(this);
	this.listWidget = new Widget.LinkedAccounts.List('linkedAccountsListWidget', this);
	this.spinnerWidget = new Widget.Shared.Spinner('spinnerWidget', this);
	this.buttonWidget = new Widget.LinkedAccounts.Button('buttonWidget', this);
	this.loadBoundUsers();
};

LinkedAccountsAssistant.prototype.activate = function(event) {
	this.loadBoundUsers();
};

LinkedAccountsAssistant.prototype.loadLinkingMethodsScene = function(username, password) {
	this.controller.stageController.pushScene('linking-methods', {previousScene: 'linked-accounts'});
};

LinkedAccountsAssistant.prototype.loadBoundUsers = function() {
	$('noLinkedAccountsMessage').hide();
	$('linkedAccountsMessage').hide();
	this.users = [];
	this.listWidget.updateModel();
	this.spinnerWidget.start();

	request = new GetBoundUsers(this, {}, null, new GetBoundUsersForLinkedAccountsResponseHandler(this, this.listWidget, this.spinnerWidget));
};

LinkedAccountsAssistant.prototype.handleCommand = function(event) {
	if(event.type == Mojo.Event.back) {
	  this.controller.stageController.pushScene('settings-menu');
	}
};


LinkedAccountsAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

LinkedAccountsAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
