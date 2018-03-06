sap.ui.define([
	"sap/ui/core/mvc/Controller"
	], function(Controller) {
	"use strict";
	return Controller.extend("EndersApp.controller.showOrderSelect", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf EndersApp.view.showOrderSelect
		 */
		onInit: function() {},
		goBackAndReject: function(oEvent) {
			var that = this;
			sap.m.MessageBox.confirm(
				this.getView().getModel("i18n").getResourceBundle().getText("beenden"), {
					icon: sap.m.MessageBox.Icon.WARNING,
					title: this.getView().getModel("i18n").getResourceBundle().getText("beenden"),
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {
						if (oAction === sap.m.MessageBox.Action.YES) {
							var oMainView = sap.ui.getCore().byId("__xmlview0");
							var oSplitContainer = oMainView.byId("mainView");
							oSplitContainer.setMode(sap.m.SplitAppMode.StretchCompressMode);
							sap.ui.getCore().byId("__component0---Master").byId("masterView").setBusy(false);
							var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
							oRouter.navTo("mainDetail");
						}

					}
				}
			);
		},		
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf EndersApp.view.showOrderSelect
		 */ //	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf EndersApp.view.showOrderSelect
		 */ //	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf EndersApp.view.showOrderSelect
		 */ //	onExit: function() {
		//
		//	}
		/**
		 *@memberOf EndersApp.controller.showOrderSelect
		 */
		showDetail: function() {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("showOrderDetail");

		}
	});
});