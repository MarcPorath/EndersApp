sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller) {
	"use strict";

	return Controller.extend("EndersApp.controller.detCreateOrder", {

		onInit: function() {

		},

		avCheck: function() {
			sap.m.MessageToast.show("XX St verfügbar zum Wunschlieferdatum!");
		},

		confirmSave: function() {
			var that = this;
			sap.m.MessageBox.confirm(
				'{i18n>confirmCO}', {
					icon: sap.m.MessageBox.Icon.SUCCESS,
					title: '{i18n>confirm}',
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {
						if (oAction === sap.m.MessageBox.Action.YES) {
							sap.ui.getCore().byId("__component0---Master").byId("masterView").setBusy(false);
							var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
							oRouter.navTo("mainDetail");
							sap.m.MessageToast.show("{i18n>crOrderDone}");
						}

					}
				}
			);
		},
		goBackAndReject: function(oEvent) {
			var that = this;
			sap.m.MessageBox.confirm(
				'{i18n>cancelCO}', {
					icon: sap.m.MessageBox.Icon.WARNING,
					title: '{i18n>abort}',
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {
						if (oAction === sap.m.MessageBox.Action.YES) {
							sap.ui.getCore().byId("__component0---Master").byId("masterView").setBusy(false);
							var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
							oRouter.navTo("mainDetail");
						}

					}
				}
			);
		}

		//	onExit: function() {
		//
		//	}

	});

});