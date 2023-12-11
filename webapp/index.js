sap.ui.require([
	"sap/m/Shell",
	"sap/m/App",
	"sap/m/Page",
	"sap/ui/core/ComponentContainer",
	"sap/ui/core/Core"
], function(
	Shell, App, Page, ComponentContainer, Core) {
	"use strict";

	Core.attachInit(function() {
		new Shell ({
			app : new App ({
				pages : [
					new Page({
						title : "ChartContainer - Simple Toolbar with FixFlex Layout",
						enableScrolling : true,
						content : [
							new ComponentContainer({
								name : "sybcool.travelmanagement",
								settings : {
									id : "sybcool.travelmanagement"
								}
							})
						]
					})
				]
			})
		}).placeAt("content");
	});
});
