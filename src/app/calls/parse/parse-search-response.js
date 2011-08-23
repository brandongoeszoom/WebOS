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
ParseSearchResponse = Class.create(Parse, {
	parse: function(data) {
		var episodes = [];
		if (data.response.searchResults) {
			data.response.searchResults.show.each(function(show) {
				var published = this.toDate(show.episode.published);
				var episodeModel = new EpisodeModel({
					title: show.episode.title,
					description: show.episode.description,
					url: show.episode.url,
					slug: show.episode.slug,
					showSlug: show.episode.showSlug,
					imageUrl: show.episode.imageUrl,
					mediaType: show.episode.mediaType,
					published: published
				});
				episodes.push(episodeModel);
			}.bind(this));
		}
		return episodes;
	}
});
