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
function ShowInfoAssistant(show) {
	this.show = show;
}

ShowInfoAssistant.prototype.setup = function() {
	$('showTitle').innerHTML = this.show.title;
	$('showImage').writeAttribute('src', this.show.imageUrl);
	$('showInfo').innerHTML = this.show.description;
	widget = new Widget.Shared.Menu(this);
};


ShowInfoAssistant.prototype.activate = function(event) {

};


ShowInfoAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

ShowInfoAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
