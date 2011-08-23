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
function ShowOptionsAssistant(show) {
	this.show = show;
}

ShowOptionsAssistant.prototype.setup = function() {
	$('showTitle').innerHTML = this.show.title;
	$('showImage').writeAttribute('src', this.show.imageUrl);

	widget = new Widget.Shared.Menu(this);
	widget = new Widget.Show.RateButton('rateButtonWidget', this);
	widget = new Widget.Show.InfoButton('infoButtonWidget', this);
};

ShowOptionsAssistant.prototype.loadShowInfoScene = function() {
	this.controller.stageController.pushScene('show-info', this.show);
};

ShowOptionsAssistant.prototype.loadRateShowScene = function() {
	this.controller.stageController.pushScene('rate-show', this.show);
};

ShowOptionsAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};


ShowOptionsAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

ShowOptionsAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
