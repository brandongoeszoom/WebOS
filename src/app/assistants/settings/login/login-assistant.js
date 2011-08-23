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
function LoginAssistant(loginTitle, bindActionClass, bindResponseHandlerClass, contentSource) {
	/* this is the creator function for your scene assistant object. It will be passed all the
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	this.loginTitle = loginTitle;
	this.contentSource = contentSource;
	this.bindActionClass = bindActionClass;
	this.bindResponseHandlerClass = bindResponseHandlerClass;
}

LoginAssistant.prototype.setup = function() {
	var parameters = {
		title: this.loginTitle,
		contentSource: this.contentSource
	};
	widget = new Widget.Shared.Header(this, parameters);
	widget = new Widget.Shared.Menu(this);
	this.usernameTextField = new Widget.Login.UsernameTextField('usernameTextFieldWidget', this);
	this.passwordTextField = new Widget.Login.PasswordTextField('passwordTextFieldWidget', this);
	this.loginButton = new Widget.Login.LoginButton('loginButtonWidget', this);
	this.spinner = new Widget.Shared.Spinner('spinnerWidget', this);
	this.spinner.stop();
};

LoginAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

LoginAssistant.prototype.bindUser = function(username, password) {
	$('result').hide();
	$('loginButtonWidget').hide();
	this.spinner.start();

	var parameters = {
		contentSource: this.contentSource,
		accountName: username,
		password: password
	};

	//request = new BindUser(this, parameters, null, new BindUserResponseHandler(this, parameters));
	request = new (window[this.bindActionClass])(this, parameters, null, new (window[this.bindResponseHandlerClass])(this, parameters));
};


LoginAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

LoginAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
