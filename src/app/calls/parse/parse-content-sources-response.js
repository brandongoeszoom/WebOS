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
ParseContentSourcesResponse = Class.create(Parse, {
	parse: function(data) {
		var contentSources = [];
		var sources = (data.response.contentSources)?data.response.contentSources.contentSource:[];
		if (sources.length === undefined) {sources = [sources];}
		sources.each(function(contentSource) {
			//Mojo.Log.error("name: %s/%s", contentSource.title, contentSource.provider);
			//Mojo.Log.error("description: %s", contentSource.description);
			//Mojo.Log.error("mcode: %s", contentSource.mcode);
			//Mojo.Log.error("slug: %s", contentSource.slug);
			var contentSourceModel = new ContentSourceModel({
				name: contentSource.title,
				description: contentSource.description,
				image: contentSource.imageUrlAlt1,
				slug: contentSource.slug,
				mcode: contentSource.mcode,
				provider: contentSource.provider,
				authentication: {
					binding: contentSource.bindingMethods.bindingMethod.type,
					requiresAuthentication:(contentSource.requiresAuthentication==="true"),
					allowsUnboundUsers:(contentSource.allowsUnboundUsers==="true"),
					supportsUserBindings:(contentSource.supportsUserBindings==="true"),
					usernameRequired:(contentSource.usernameRequired==="true"),
					passwordRequired:(contentSource.passwordRequired==="true"),
					passwordEncryptionRequired:(contentSource.passwordEncryptionRequired==="true"),
					encryptionType:contentSource.encryptionType,
					encryptionKey:contentSource.encryptionKey,
					encryptionKeyType:contentSource.encryptionKeyType
				},
				supports: {
					ratings:(contentSource.supportsRatings==="true"),
					favorites:(contentSource.supportsFavorites==="true"),
					subscriptions:(contentSource.supportsSubscriptions==="true"),
					experiences:(contentSource.supportsExperiences==="true"),
					caching:(contentSource.supportsCaching==="true")
				}
			});
			contentSources.push(contentSourceModel);
		});

		return contentSources;
	}
});
