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
function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
	this.controller.pushScene("boot-screen");
};

StageAssistant.prototype.handleCommand = function(event) {
  this.controller = Mojo.Controller.stageController.activeScene();
  if(event.type == Mojo.Event.command) {
		switch(event.command) {
			case 'home':
				this.controller.stageController.popScenesTo('content-sources');
				break;
			case 'search':
				this.controller.stageController.pushScene("search");
				break;
			case 'settings':
				this.controller.stageController.pushScene("settings-menu");
				break;
			case 'about':
				this.controller.stageController.pushScene("about");
				break;
			case 'help':
				this.controller.stageController.pushScene("help");
				break;
		}
    }
};

StageAssistant.prototype.playEpisode = function(episode) {
	Mojo.Controller.stageController.activate();

	var scenes = Mojo.Controller.stageController.getScenes();
	var hasEpisodeScene = false;
	for (var i=0; i<scenes.length; i++) {
		if (scenes[i].sceneName === 'episode') {
			hasEpisodeScene = true;
			break;
		}
	}

	if (hasEpisodeScene) {
		Mojo.Controller.stageController.popScenesTo("episode");
	} else {
		Mojo.Controller.stageController.pushScene("episode", episode, true);
	}
};

var Global = {subscribedContentSources: []};
