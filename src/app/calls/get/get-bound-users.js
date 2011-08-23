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
GetBoundUsersForSettingResponseHandler = Class.create(AjaxResponseHandler, {
	handleResponse: function(ajaxResponseData) {
		var users = new ParseBoundUsersResponse(ajaxResponseData.responseText).result;

		var userAccountNames = users.collect(function(user) {
			return user.accountName;
		});

		if(users.length > 0) {
			$('preview_linked_accounts').innerHTML = 'Linked Accounts: ' + userAccountNames.join(', ');
		} else {
			$('preview_linked_accounts').innerHTML = 'No linked users: click here to add';
		}
	}
});

GetBoundUsersForContentSourcesResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant, listWidget) {
		$super();
		this.assistant = assistant;
		this.listWidget = listWidget;
	},
	handleResponse: function(ajaxResponseData) {
		// parse response
		var boundUsers = new ParseBoundUsersResponse(ajaxResponseData.responseText).result;
		// update view
		var defaultUser = boundUsers.find(function(boundUser) {
			return boundUser.defaultUser;
		});

		if(boundUsers.length > 0) {
			boundUsers.push({
				accountName: 'add new account',
				defaultUser: false
			});
		}

		// debugging for setting up a delay at the beginning
		//window.setTimeout(function() {
		if(defaultUser) {
			this.assistant.contentSources[1].name = defaultUser.accountName + "'s Channels";
			this.assistant.boundUser = defaultUser.accountName;
			request = new BindUserAsDefault(this.assistant, defaultUser, null, new BindUserAsDefaultResponseHandler(defaultUser));
		}
		this.assistant.contentSources[1].slug = "my_channels";
		this.assistant.contentSources[1].updating = false;

		this.assistant.boundUsers = boundUsers;
		this.assistant.loadContentSources();

		this.listWidget.updateModel();
		//}.bind(this), 2000);
	}
});

GetBoundUsersForLinkedAccountsResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant, listWidget, spinnerWidget) {
		$super();
		this.assistant = assistant;
		this.listWidget = listWidget;
		this.spinnerWidget = spinnerWidget;
	},
	handleResponse: function(ajaxResponseData) {
		// parse response
		var users = new ParseBoundUsersResponse(ajaxResponseData.responseText).result;
		// update view
		this.assistant.users = users;
		this.spinnerWidget.stop();
		if(this.assistant.users.length === 0) {
			$('noLinkedAccountsMessage').show();
		} else {
			$('linkedAccountsMessage').show();
		}
		this.listWidget.updateModel();
	}
});

GetBoundUsers = Class.create(Get, {
	getUrl: function() {
		return Url.create("Mediafly.Authentication.GetBoundMFUsers");
	}
});
