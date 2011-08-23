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
function MoreInfoAssistant(options) {
	this.previousScene = options.previousScene;
}

MoreInfoAssistant.prototype.setup = function() {

};
MoreInfoAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	  $('moreInfoScene').observe('click', function(){
	    this.controller.stageController.pushScene(this.previousScene, {previousScene: 'linked-accounts'});
	  }.bind(this));

};

MoreInfoAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

MoreInfoAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};

