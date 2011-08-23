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
BindContentSourceUserResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, assistant, parameters) {
		this.assistant = assistant;
		this.parameters = parameters;
		$super();
	},
	handleResponse: function(ajaxResponseData) {
		var parsedResponse = new ParseBindContentSourceUserResponse(ajaxResponseData.responseText).result;

		this.assistant.spinner.stop();
		$('result').show();
		$('loginButtonWidget').show();

		if(parsedResponse) {
			this.assistant.controller.stageController.swapScene('channels', this.parameters.contentSource, { withBoundUser: false});
		} else {
			$('result').addClassName('fail').removeClassName('success');
			$('result').innerHTML = "Check username or password.";
		}
	}
});

BindContentSourceUser = Class.create(Get, {
	getUrl: function() {
		return Url.create("Mediafly.ContentSources.BindUser", {
			secure:true,
			source:this.parameters.contentSource.slug,
			accountName:this.parameters.accountName,
			password:this.parameters.password
		});
	}
});
