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
Widget.Dialog.Confirm = Class.create(BaseDialogWidget, {
	initialize: function($super, assistant, title, message, chooseYes, chooseNo, chooseCancel) {
		var choices = [
		 {
				label:$L('Yes'),
				value:"yes",
				type:'affirmative'
			},
			{
				label:$L("no"),
				value:"no",
				type:'negative'
			}
		];

		this.chooseYes = chooseYes || function() {};
		this.chooseNo = chooseNo || function() {};
		this.chooseCancel = chooseCancel || function() {};

		$super(assistant, title, message, choices);
	},
	onChoose: function(value) {
		switch (value) {
			case "yes":
				this.chooseYes();
				break;
			case "no":
				this.chooseNo();
				break;
			default:
				this.chooseCancel();
				break;
		}
	}
});
