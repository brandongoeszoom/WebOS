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
ParseBoundUsersResponse = Class.create(Parse, {
	parse: function(data) {
		var users = [];
		if (!data.response.mfusers) {return users;}
		var mfusers = data.response.mfusers.mfuser;
		if (!mfusers.length) {
			users.push(this.convertMFUserToUser(mfusers));
	    } else {
			users = mfusers.map(function(mfuser) {
				return this.convertMFUserToUser(mfuser);
			}.bind(this));
		}
		return users;
	},

	convertMFUserToUser: function(mfuser) {
		return new UserModel({
			accountName: mfuser.accountName,
			defaultUser: mfuser['default']==='true',
			checked: mfuser['default']==='true'?'checkmark':''
		});
	}
});
