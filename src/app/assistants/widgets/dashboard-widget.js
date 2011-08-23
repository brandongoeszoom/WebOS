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
Widget.Shared.DashboardWidget = Class.create({
	singleton: undefined,
	stageName: "dashboard",

	initialize: function() {
		this.appController = Mojo.Controller.getAppController();
	},

	show: function(player, mainStageController) {
		if (Widget.Shared.DashboardWidget.dashboardAssistant) {
			// already have one, just leave and hope the one we have is good enough
			return;
		}

		if (!player) {
			return;
		}

		if (this.player) {
		}

		this.player = player;

		var callback = function(stageController) {
			Widget.Shared.DashboardWidget.dashboardController = stageController;
			stageController.pushScene('dashboard', this.player, mainStageController);
		}.bind(this);

		var params = {
			name: this.stageName,
			//htmlFileName: "dashboard",
			clickableWhenLocked: true, // might not be public API yet
			lightweight: true // necessary?
		};

		this.appController.createStageWithCallback(params, callback, this.stageName);
	},

	hide: function() {
		if (Widget.Shared.DashboardWidget.dashboardAssistant) {
			Widget.Shared.DashboardWidget.dashboardAssistant.close();
			Widget.Shared.DashboardWidget.dashboardAssistant = null;
		}
	}
});
