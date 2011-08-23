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
var ContentSourceModel = Class.create({
	initialize: function (properties) {
		this.name = properties.name;
		this.description = properties.description;
		this.image = properties.image;
		this.slug = properties.slug;
		this.mcode = properties.mcode;
		this.provider = properties.provider;
		this.subscribed = properties.subscribed;
		this.authentication = properties.authentication;
		this.supports = properties.supports;
		this.updating = properties.updating;
	},

	getListProperties: function() {
		var properties = {
			name:this.name,
			description:this.description,
			image:this.image,
			slug:this.slug,
			mcode:this.mcode,
			provider:this.provider,
			subscribed:this.subscribed,
			authentication:this.authentication,
			supports:this.supports,
			updating:this.updating
		};
		return properties;
	}
});
