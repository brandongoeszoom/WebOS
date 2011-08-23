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
var EpisodeModel = Class.create({
	initialize: function (properties) {
		// REFACTOR loop, eliminate label duplication
		this.title = properties.title;
		this.description = properties.description;
		this.url = properties.url;
		this.slug = properties.slug;
		this.showSlug = properties.showSlug;
		this.imageUrl = properties.imageUrl;
		this.published = properties.published;
		this.mediaType = properties.mediaType;
		this.userRating = properties.userRating;
		this.bookmark = properties.bookmark;
	},

	getShortDescription: function() {
		var truncatedDescription;
		// SMELL null check
		if(this.description) {
			truncatedDescription = this.description.substring(0,75) + '...';
		}
		return truncatedDescription;
	},

	getListProperties: function() {
		var formattedDate = this.formatDate(this.published);
		var properties = {
			title: this.title,
			slug: this.slug,
			imageUrl: this.imageUrl,
			published: formattedDate,
			mediaType: this.mediaType,
			userRating: this.userRating,
			bookmark: this.bookmark
		};
		return properties;
	},

	getShowListProperties: function() {
		var shortDescription = this.getShortDescription();
		var formattedDate = this.formatDate(this.published);
		var properties = {
			title: this.title,
			slug: this.slug,
			published: formattedDate,
			shortDescription: shortDescription
		};
		return properties;
	},

	// REFACTOR formatDate not good here, library?
	formatDate: function(date) {
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var formattedDate = months[date.getMonth()];
		formattedDate += ' ' + date.getDate() + ', ' + date.getFullYear();
		return formattedDate;
	},

	isVideo: function() {
		return (/video/i).test(this.mediaType);
	},

	isAudio: function() {
		return (/audio/i).test(this.mediaType);
	}
});
