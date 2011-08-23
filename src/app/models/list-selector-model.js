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
var ListSelectorModel = Class.create({
	initialize: function (choiceModels, labelProperty, defaultChoiceFinder) {
		this.choices = this.mapModelsToChoices(choiceModels, labelProperty);
		this.value = this.pickDefaultValue(choiceModels, labelProperty, defaultChoiceFinder);
		Url.setBoundUser(this.value);
	},

	pickDefaultValue: function(choiceModels, labelProperty, defaultChoiceFinder) {
		var defaultChoice = this.findDefaultChoice(choiceModels, defaultChoiceFinder);
		return (defaultChoice ? defaultChoice[labelProperty] : '');
	},

	findDefaultChoice: function(choiceModels, defaultChoiceFinder) {
	 	return choiceModels.find(function(model) {
			return defaultChoiceFinder(model);
		});
	},

	mapModelsToChoices: function(choiceModels, labelProperty) {
		return choiceModels.map(function(model) {
			return {
				label:model[labelProperty],
				value:model[labelProperty]
			};
		});
	}
});
