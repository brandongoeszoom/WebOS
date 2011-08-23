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
function LinkingMethodsAssistant(options) {
	this.previousScene = options.previousScene;

}

LinkingMethodsAssistant.prototype.setup = function() {
	var parameters = {title: "Link this device"};
	widget = new Widget.Shared.Header(this, parameters);

	widget = new Widget.Shared.Menu(this);
	this.loginButtonWidget = new Widget.LinkingMethods.LoginButton('loginButtonWidget', this);
	this.associationButtonWidget = new Widget.LinkingMethods.AssociationButton('associationButtonWidget', this);
	this.moreInfoButtonWidget = new Widget.LinkingMethods.moreInfoButton('moreInfoButtonWidget', this);
};

LinkingMethodsAssistant.prototype.loadAssociationCodeScene = function() {
	this.controller.stageController.pushScene('fetch-association-code');
};

LinkingMethodsAssistant.prototype.loadLoginScene = function() {
	this.controller.stageController.pushScene('login', 'Login to Mediafly', 'BindUser', 'BindUserResponseHandler');
};

LinkingMethodsAssistant.prototype.loadMoreInfoScene = function() {
	this.controller.stageController.pushScene('more-info', { previousScene: "linking-methods" });
};

LinkingMethodsAssistant.prototype.handleCommand = function(event) {

 if(event.type == Mojo.Event.back) {
   this.controller.stageController.pushScene(this.previousScene);
 }
};

LinkingMethodsAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};


LinkingMethodsAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

LinkingMethodsAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
