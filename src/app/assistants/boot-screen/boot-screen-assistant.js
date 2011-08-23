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
function BootScreenAssistant() {

}

BootScreenAssistant.prototype.setup = function() {

	$('buildNumber').innerHTML = "created for Mediafly by Jamie Hatfield (v" + Mojo.Controller.appInfo.version + ")";
	this.databaseSetup();
	BrandPrefs.AutoRegMCode.each(function(code) {
		var parameters = {contentSource: {mcode:code}};
		this.defaultMcode = code;
		request = new AddContentSource(this, parameters, null, new AddContentSourceSilentResponseHandler(this));
	}.bind(this));
};

BootScreenAssistant.prototype.databaseSetup = function() {
  var assistant = this;

  var db = new Database("boot_check");
  db.handleFirstTimers(function() {
    assistant.waitAndSwapTo("welcome1");
  }, function() {
    assistant.waitAndSwapTo("content-sources");
  });

};

BootScreenAssistant.prototype.waitAndSwapTo = function(scene) {
  setTimeout(function() {
    this.controller.stageController.swapScene(scene, this.defaultMcode);
  }.bind(this), 3000);
};

BootScreenAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

BootScreenAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

BootScreenAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
