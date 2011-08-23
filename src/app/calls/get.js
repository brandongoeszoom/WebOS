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
AjaxResponseHandler = Class.create({
	handleResponse: function(ajaxResponseData) {
		// Subclass responsibility
	}
});

// You can't get much more reusable than this.
UpdatesModelAndViewResponseHandler = Class.create(AjaxResponseHandler, {
	initialize: function($super, modelToUpdate, viewToUpdate, parameters) {
		this.modelToUpdate = modelToUpdate;
		this.viewToUpdate = viewToUpdate;
		this.parameters = parameters;
		$super();
	},

	handleResponse: function(ajaxResponseData) {
		this.modelToUpdate.updateModel(this.parameters);
		this.viewToUpdate.updateView(this.parameters);
	}
});

Get = Class.create({
	initialize: function(assistant, parameters, callback, responseHandler) {
		this.invalidTokenCounter = 0;
		this.assistant = assistant;
		this.parameters = parameters;
		this.responseHandler = responseHandler;

		// SMELL constructor doing more work than it should
		// REFACTOR Turn this into the factory method...?
		if ((Url.globalParameters.token === undefined) && !Url.globalParameters.gettingToken) {
			this.getToken(); // return new GetTokenRequest(originalRequest);
		} else {
			this.makeRequest(); // return originalRequest;
		}
	},

	// SMELL make = bad name
	makeRequest: function() {
		if (Url.globalParameters.gettingToken) {
			setTimeout(this.makeRequest.bind(this), 1000);
			return;
		}
		var url = this.getUrl();

		try {
			var parts = url.match('(.*token=....)[^&]*([^&]{4}&.*)');
			if (parts) {
				Mojo.Log.error("Url request: %s...%s", parts[1], parts[2]);
			} else {
				Mojo.Log.error("Url request: %s", url);
			}
		} catch (e) {
			Mojo.Log.error("error parsing url");
			Mojo.Log.error("e=%o", e);
		}

		request = new Ajax.Request(url, {
			onException: function(requester, data) {
				try {Mojo.Log.error("request duration: %s", data.responseJSON.response.duration);} catch (e) {}
				Mojo.Log.error("request returned exception: %j", data);
				this.responseHandler.handleResponse(data);
			}.bind(this),
			onSuccess: function(data) {
				try {Mojo.Log.error("request duration: %s", data.responseJSON.response.duration);} catch (e) {}
				Mojo.Log.error("request returned: %j", data);
				if (data.responseJSON &&
				    data.responseJSON.response &&
					data.responseJSON.response.status === 'fail' &&
					data.responseJSON.response.err &&
					data.responseJSON.response.err.message === 'Token invalid.' &&
					this.invalidTokenCounter < 1) {
					this.invalidTokenCounter++;
					this.getToken();
				} else {
					this.responseHandler.handleResponse(data);
				}
			}.bind(this)
		});
	},

	getUrl: function() {
		// Intentionally do nothing -- subclass responsibillity
	},

	// SMELL more duplication, look into
	getToken: function() {
		Url.globalParameters.gettingToken = true;
		this.getDeviceId(function(deviceId) {
			// SMELL same intent as getUrl in makeRequest
			var url = Url.create("Mediafly.Authentication.GetToken", {
				thirdPartyUserID: deviceId
			});
			Mojo.Log.error("token request: %s", url);

			// SMELL same intent as ajax request in makeRequest
			request = new Ajax.Request(url, {
				onException: function(requester, data) {
					try {Mojo.Log.error("token request duration: %s", data.responseJSON.response.duration);} catch (e) {}
					Mojo.Log.error("token request returned exception: %j", data);
					Url.globalParameters.gettingToken = false;
				}.bind(this),
				onSuccess: function(data) {
					Url.globalParameters.gettingToken = false;
					try {Mojo.Log.error("token request duration: %s", data.responseJSON.response.duration);} catch (e) {}
					Mojo.Log.error("token request returned data: %j", data);
					if (data.transport.status === 0) {
						// there was some error getting the token, so the request will probably fail as well
						// just fail quickly
						this.responseHandler.handleResponse(data);
					} else {
						this.storeTokenAndCallback(data);
					}
				}.bind(this)
			});

		}.bind(this));
	},

	// REFACTOR Introduce CompositeRequest that does GetTokenRequest, followed by the original request
	storeTokenAndCallback: function(data) {
		var parsedResponse = new ParseTokenResponse(data.responseText).result;
		this.invalidTokenCounter = 0;
		Url.globalParameters.token = parsedResponse;
		this.makeRequest();
	},

	// SMELL Feels like this should be on another class; not related to generic 'Get' operations
	getDeviceId: function(callback) {
		this.assistant.controller.serviceRequest('palm://com.palm.preferences/systemProperties', {
		    method: "Get",
		    parameters: {
				"key": "com.palm.properties.nduid"
			}, onSuccess: function(response) {
				callback(response["com.palm.properties.nduid"]);
		    }
		});
	}

});
