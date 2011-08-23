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
/*jslint evil: true */
Parse = Class.create({
	initialize: function(data) {
		this.result = this.toJson(data);
		if (!this.result.response) {
			this.result.response = {};
		}
		//Mojo.Log.error("Data returned: %j", this.result.response);
		this.result = this.parse(this.result);
	},

	parse: function(data) {
		return data;
	},

	toJson: function(data) {
		if(typeof data == 'object') {
			return data;
		} else if (data) {
			/*
			for (var i=0; i<data.length; i+=200) {
				Mojo.Log.error(data.substr(i, 200));
			}
			*/
			return eval('(' + data + ')');
		} else {
			return {};
		}
	},

	toDate: function(date) {
		var result = date.split('-');
		var months = ['jan','feb','march','april','may','june','july','aug','sept','oct','nov','dec'];
		var correctMonth = months[result[1] - 1];
		date = correctMonth + ' ' + result[2].split('T')[0] + ' ' + result[0] + ' ' + result[2].split('T')[1];
		date = date.replace(/T/, " ");

		return new Date(date);
	}
});
