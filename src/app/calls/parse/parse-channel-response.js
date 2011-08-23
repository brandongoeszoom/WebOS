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
ParseChannelResponse = Class.create(Parse, {
	parse: function(data) {
		var episodes = [];
		//var episodeData = data.response.channel.episode;
		if(data.response.channel && data.response.channel.episode) {
		  if(!data.response.channel.episode.length) {
		    data.response.channel.episode = [data.response.channel.episode];
	    }
		// create a media-model for the episode.media objects
		// pass in the episode object, it will use the media array to selects which ones match max (480x360@1500)
		// also it will save the episode.url in case there are no media objects
		// call getUrl and it will select the proper url based on connection
		//  (this will call getBitrateUrl with 1000 or 500 or 250 or something like that depending on connection)
		// also can call getBitrateUrl() and specify what we want our bitrate to be
		// "media": [{"audioCodec": "AAC", "bitRate": "500", "channels": "1",
		//            "contentType": "video/mp4", "frameRate": "14.98",
		//            "grouping": "H264_432x240", "height": "240", "samplingRate": "48",
		//            "url": "http://syndication.mediafly.com/redirect/podcast/e863846c0936485e8afd95cb2aa89470/H264_432x240_500/Windows_Weekly_Demo_Episode.mp4",
		//            "videoCodec": "H264", "width": "432"}
	  	$A(data.response.channel.episode).each(function(episode) {
				//Mojo.Log.error("EPISODE-----------------------------------------------------");
				//for (var p in episode) {Mojo.Log.error("episode.%s=%s", p, episode[p]);}
				try {
					var mArr = episode.media || [];
					var found;
					if (!mArr.length) {
						mArr = [mArr];
					}
					//Mojo.Log.error("%d media elements", mArr.length);
					mArr.each(function(m) {
						if (m.width <= 480 && m.height <= 360 && m.bitRate <= 1500) {
							//Mojo.Log.error("Valid: %j", m);
							if (!found || m.bitRate > found.bitRate ||
								m.height > found.height || m.width > found.width) {
								//Mojo.Log.error("Better: %j", m);
								found = m;
								episode.url = m.url;
							}
						}
					});
				} catch (e) {
					Mojo.Log.error("Error finding media info: %j", e);
				}
				var publishedAsDate = this.toDate(episode.published);
				var episodeModel = new EpisodeModel({
					title: episode.title,
					description: episode.description,
					url: episode.url,
					slug: episode.slug,
					showSlug: episode.showSlug,
					imageUrl: episode.imageUrl,
					mediaType: episode.mediaType,
					published: publishedAsDate,
					userRating: episode.userRating,
					bookmark: episode.bookmark
				});
				episodes.push(episodeModel);
			}.bind(this));
  	}
		return episodes;
	},

	// Open to better ways of determining "array-ness"
	isArray: function(object) {
	  return object.length !== undefined;
	}

});
