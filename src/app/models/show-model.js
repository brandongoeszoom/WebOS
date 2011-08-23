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
var ShowModel = Class.create({
	initialize: function (properties) {
		this.slug = properties.slug;
		this.title = properties.title;
		this.description = properties.description;
		this.url = properties.url;
		this.urlOriginal = properties.urlOriginal;
		this.imageUrl = properties.imageUrl;
		this.averageRating = properties.averageRating;
		this.totalRatings = properties.totalRating;
		this.userRating = properties.userRating;
		this.favoriteType = properties.favoriteType;
	},

	getShortDescription: function() {
		var truncatedDescription;
		if(this.description) {
			truncatedDescription = this.description.substring(0,200) + '...';
		}
		return truncatedDescription;
	}
});
