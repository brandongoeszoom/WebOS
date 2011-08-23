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
ParseBoundContentSourceUsersResponse = Class.create(Parse, {
	parse: function(data) {
		var users = [];
		if (!data.response.usersResponse) {return users;}
		var contentSources = data.response.usersResponse.contentSource;
		if (!contentSources.length) {
			users.push(this.convertToContentSourceUser(contentSources));
	    } else {
			users = contentSources.map(function(contentSource) {
				return this.convertToContentSourceUser(contentSource);
			}.bind(this));
		}
		return users;
	},

	convertToContentSourceUser: function(contentSource) {
		var users = [];
		if (contentSource.users && contentSource.users.user) {
			if (contentSource.users.user.length) {
				users = contentSource.users.user.map(function(user) {
					return user.accountName;
				});
			} else {
				users.push(contentSource.users.user.accountName);
			}
		}
		return new ContentSourceUserModel({
			slug: contentSource.slug,
			users: users
		});
	}
});
