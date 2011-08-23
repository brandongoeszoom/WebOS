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
GetBoundContentSourceUsersForLoginResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant, parameters) {
		$super();
		this.assistant = assistant;
		this.parameters = parameters;
	},
	handleResponse: function(ajaxResponseData) {
		// parse response
		var users = new ParseBoundContentSourceUsersResponse(ajaxResponseData.responseText).result;
		// update view
		var loggedIn = false;
		if (users && users.length > 0 && users[0].slug === this.parameters.contentSource.slug) {
			if (users[0].users && users[0].users.length > 0) {
				loggedIn = true;
			}
		}

		if (loggedIn) {
			this.assistant.controller.stageController.pushScene('channels', this.parameters.contentSource, { withBoundUser: false});
		} else {
			this.assistant.controller.stageController.pushScene('login',
																'Login to ' + this.parameters.contentSource.provider,
																'BindContentSourceUser',
																'BindContentSourceUserResponseHandler',
																this.parameters.contentSource);
		}
	}
});

GetBoundContentSourceUsers = Class.create(Get, {
	getUrl: function() {
		return Url.create("Mediafly.ContentSources.GetBoundUsers", {
			contentSources: this.parameters.contentSource.slug
		});
	}
});
