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
Widget.Shared.Menu = Class.create({
	initialize: function(assistant, options) {
		this.options = options || {};
		var model = this.getModel();
		assistant.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, model);
	},

	getModel: function() {
		var disabled = this.options.disabled || [];
		var item = {'home':     {label: "Home",     command: 'home'},
		            'search':   {label: "Search",   command: 'search'},
		            'settings': {label: "Settings", command: 'settings'},
		            'about':    {label: "About",    command: 'about'},
		            'help':     {label: "Help",     command: 'help'}
		};

		disabled.each(function(m) {
			item[m].disabled = true;
		});

		return {
			visible: true,
			items: [
				item.home,
				item.search,
				item.settings,
				item.about,
				item.help
			  ]
		};
	}
});
