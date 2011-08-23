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
BindUserAsDefaultWhenLinkingResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant) {
		this.assistant = assistant;
		$super();
	},
	handleResponse: function(ajaxResponseData) {
		this.assistant.controller.stageController.popScenesTo('content-sources');
	}
});

BindUserAsDefaultResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, parameters) {
		$super();
		this.parameters = parameters;
	},
	handleResponse: function(ajaxResponseData) {
		// parse response
		var parsedResponse = new ParseBindUserAsDefaultResponse(ajaxResponseData.responseText).result;
		// update view
		Url.setBoundUser(this.parameters.accountName);
	}
});

BindUserAsDefaultAndUpdateLinkedListResponseHandler = Class.create(BindUserAsDefaultResponseHandler, {
	handleResponse: function($super, ajaxResponseData) {
		$super(ajaxResponseData);
		this.parameters.assistant.users.forEach(function(u) {
			if (u.accountName === this.parameters.accountName) {
				u.checked = 'checkmark';
			} else {
				u.checked = '';
			}
		}.bind(this));
		this.parameters.assistant.spinnerWidget.stop();
		$('linkedAccountsListWidget').show();
		this.parameters.listWidget.updateModel();
	}
});

BindUserAsDefault = Class.create(Get, {
	getUrl: function() {
		return Url.create("Mediafly.Authentication.SetMFUserAsDefault", {
			accountName:this.parameters.accountName
		});
	}
});
