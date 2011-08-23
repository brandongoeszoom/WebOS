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
var Url = {
	create: function(method, parameters) {
		var baseUrl = "http://api.mediafly.com/api/rest/2.0/";
		var appId = "36383e73176d465f90d0e2474bfd6fb9";

		if(Url.isSecure(parameters)) {
			baseUrl = baseUrl.replace(/^http/, "https");
			delete parameters.secure;
		}

		var url = Url.buildBaseUrl(baseUrl, method, appId, parameters);

		if(Url.isUserBound(parameters)) {
			url += Url.formatParameters({ user_context: this.boundUser });
			delete parameters.bindUser;
		}

		url += Url.formatParameters(Url.globalParameters);
		url += Url.formatParameters(parameters);

		return url;
	},

	isSecure: function(parameters) {
		return (typeof parameters != "undefined") && (typeof parameters.secure != "undefined") && (parameters.secure);
	},

	isUserBound: function(parameters) {
		return (typeof parameters != "undefined") && (typeof parameters.bindUser != "undefined") && (parameters.bindUser);
	},

	formatParameters: function(parameters) {
		var formattedParameters = '&';
		for(var parameter in parameters) {
			if (parameters.hasOwnProperty(parameter)) {
				formattedParameters += parameter + '=' + parameters[parameter] + '&';
			}
		}
		formattedParameters = formattedParameters.substring(0, formattedParameters.length - 1);

		return formattedParameters;
	},

	buildBaseUrl: function(baseUrl, method, appId, parameters) {
		var url = baseUrl + method + '?';
		url += 'app_id=' + appId;
		url += '&formatType=json';

		return url;
	},

	addGlobalParameter: function(parameter, value) {
		Url.globalParameters[parameter] = value;
	},

	getGlobalParameter: function(parameter) {
		return Url.globalParameters[parameter];
	},

	removeGlobalParameter: function(parameter) {
		delete Url.globalParameters[parameter];
	},

	setBoundUser: function(user) {
		Url.boundUser = user;
	},

	globalParameters: {}
};
