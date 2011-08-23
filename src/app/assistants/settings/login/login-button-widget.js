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
Widget.Login.LoginButton = Class.create(BaseWidget, {
	getModel: function() {
		var model = {
			label:'Login',
			disabled:false
		};
		return model;
	},
	
	attachListeners: function() {
		this.assistant.controller.listen(this.elementId, Mojo.Event.tap, function(event) {
			var username = this.assistant.usernameTextField.widget.mojo.getValue();
			var password = this.assistant.passwordTextField.widget.mojo.getValue();
			this.assistant.bindUser(username, password);
		}.bind(this));
	}
});