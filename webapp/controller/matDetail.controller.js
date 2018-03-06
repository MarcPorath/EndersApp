sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller) {
	"use strict";

	return Controller.extend("EndersApp.controller.matDetail", {

		onInit: function() {
		},
		
		goBack: function(oEvent) {
			var oMainView = sap.ui.getCore().byId("__xmlview0");
			var oSplitContainer = oMainView.byId("mainView");
			oSplitContainer.setMode(sap.m.SplitAppMode.StretchCompressMode);
			sap.ui.getCore().byId("__component0---Master").byId("masterView").setBusy(false);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("mainDetail");

		}

	});

});