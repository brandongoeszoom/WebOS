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
function SettingsMenuAssistant() {
	var settings = [];

	// REFACTOR into a pseudo request?
	settings.push(
		new SettingModel({
			name:'Linked Accounts',
			slug:'linked_accounts'
		})
	);
	settings.push(
	  new SettingModel({
	    name:'What is Linking?',
	    slug:'more_info'
	  })
	);
	settings.push(
	  new SettingModel({
	    name:'Add More Content',
	    slug:'add_content'
	  })
	);
	settings.push(
		new SettingModel({
			name:'Feedback & bugs',
			slug:'email'
		})
	);

	this.settings = settings;
}

SettingsMenuAssistant.prototype.setup = function() {
	this.databaseSetup();
	var parameters = {title: "Settings"};
	widget = new Widget.Shared.Header(this, parameters);
	widget = new Widget.Shared.Menu(this, {disabled: ['settings']});
	this.listWidget = new Widget.SettingsMenu.List('settingsListWidget', this);
	this.newUser = false;
};

SettingsMenuAssistant.prototype.databaseSetup = function() {
  var assistant = this;

  var db = new Database("linkview_check");
  db.handleFirstTimers(function() {
    assistant.newUser = true;
  }, function() {
    assistant.newUser = false;
  });
};

SettingsMenuAssistant.prototype.activate = function(event) {
	request = new GetBoundUsers(this, {}, null, new GetBoundUsersForSettingResponseHandler());
};
SettingsMenuAssistant.prototype.loadEmailApp = function() {
	this.controller.serviceRequest('palm://com.palm.applicationManager', {
		method: 'open',
		parameters: {
			id: 'com.palm.app.email',
			params: {
				summary: 'Pre App Feedback',
				recipients: [{
					value:'contact@mediafly.com',
					contactDisplay:'Mediafly Support',
					type:'email'
				}]
			}
		}
	});
};
SettingsMenuAssistant.prototype.loadLinkedAccounts = function(setting) {
  if(this.newUser){
    this.controller.stageController.pushScene('more-info', {previousScene: 'linking-methods'});
  }else{
	  this.controller.stageController.pushScene('linked-accounts');
  }
};

SettingsMenuAssistant.prototype.loadMoreInfo = function(setting){
  this.controller.stageController.pushScene('more-info', { previousScene: "settings-menu" });
};

SettingsMenuAssistant.prototype.addContent = function(setting){
  this.controller.stageController.pushScene('add-content', { previousScene: "settings-menu" });
};

SettingsMenuAssistant.prototype.handleCommand = function(event) {
	if(event.type == Mojo.Event.back) {
	  this.controller.stageController.popScenesTo('content-sources');
	}
};

SettingsMenuAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

SettingsMenuAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
