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
Widget.Shared.Header = Class.create({
	initialize: function(assistant, options) {
		this.assistant = assistant;
		this.options = options;

		this.title = assistant.controller.get('title');
		this.description = assistant.controller.get('description');
		this.brandHeader = assistant.controller.get('brandHeader');

		if (this.title) {this.title.innerHTML = options.title || '';}
		if (this.description) {this.description.innerHTML = options.description || '';}

		if (options.title && !options.description) {
			this.title.style.fontSize = '16px';
		}

		if (options.contentSource && options.contentSource.mcode &&
			BrandPrefs.AutoRegMCode.lastIndexOf(options.contentSource.mcode) === -1) {
			this.brandHeader.hide();
			this.setHeader();
		} else {
			this.defaultFont();
		}
	},

	defaultFont: function() {
		if (this.title) {this.title.style.color = BrandPrefs.DefaultFont;}
		if (this.description) {this.description.style.color = BrandPrefs.DefaultFont;}
	},

	setHeader: function() {
		var base = 'http://static.mediafly.com/webos/configs/' + this.options.contentSource.slug;
		var imgUrl = base + '/topbanner-320px.png';
		// set the header image
		var req = new Ajax.Request(imgUrl, {
			method: "get",
			evalJSON : "false",
			evalJS : "false",
			onFailure: function() {
				this.brandHeader.show();
				this.defaultFont();
			}.bind(this),
			onSuccess: function() {
				this.brandHeader.setStyle({backgroundImage: "url(" + imgUrl + ")"});
				this.setFont();
				this.brandHeader.show();
			}.bind(this)
		});
	},

	setFont: function() {
		var base = 'http://static.mediafly.com/webos/configs/' + this.options.contentSource.slug;
		var fontUrl = base + '/bannerfont.config';
		// get the font color for the title & description
		req = new Ajax.Request(fontUrl, {
			method: "get",
			evalJSON : "false",
			evalJS : "false",
			onFailure: function() {},
			onSuccess: function(transport) {
				if (this.title) {this.title.style.color = transport.responseText;}
				if (this.description) {this.description.style.color = transport.responseText;}
			}.bind(this)
		});
	}
});
