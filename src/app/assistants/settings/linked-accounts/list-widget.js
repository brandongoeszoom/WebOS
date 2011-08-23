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
DoesNothingResponseHandler = Class.create(AjaxResponseHandler, {
	handleResponse: function(ajaxResponseData) {
		// This method intentionally does nothing
	}
});

Widget.LinkedAccounts.List = Class.create(BaseListWidget, {
	getAttributes: function() {
		var attributes = {
			itemTemplate: "linked-accounts/linked-accounts-row-template",
			listTemplate: "linked-accounts/linked-accounts-template",
			swipeToDelete: true
		};
		return attributes;
	},

	getModel: function () {
		var users = this.assistant.users;

		var listModel = users.map(function(user) {
			return user.getProperties();
		});

		return { items:listModel };
	},

	attachListeners: function() {
		this.assistant.controller.listen(this.elementId, Mojo.Event.listTap, function(event) {
			var parameters = {
				accountName: event.item.accountName,
				assistant: this.assistant,
				listWidget: this
			};
			$('linkedAccountsListWidget').hide();
			this.assistant.spinnerWidget.start();
			request = new BindUserAsDefault(this.assistant, parameters, null, new BindUserAsDefaultAndUpdateLinkedListResponseHandler(parameters));
		}.bind(this));
		// DoesNothingResponseHandler should actually check to see if we deleted the last entry, and if so, show the noLinkedAccountsMessage div
		// additionally, we should probably refresh the list in case we changed the default user by deleting the default
		this.assistant.controller.listen(this.elementId, Mojo.Event.listDelete, function(event) {
			var parameters = {
				accountName: event.item.accountName,
				assistant: this.assistant
			};
			$('linkedAccountsListWidget').hide();
			this.assistant.spinnerWidget.start();
			request = new UnbindUser(this.assistant, parameters, null, new UnbindUserUpdateListResponseHandler(parameters));
		}.bind(this));
	}
});
