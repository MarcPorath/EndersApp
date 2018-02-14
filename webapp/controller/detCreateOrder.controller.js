sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller) {
	"use strict";

	return Controller.extend("EndersApp.controller.detCreateOrder", {

		onInit: function() {
			var oBSKTable = this.getView().byId("baskTable");
			
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
		},
		
		matDetail: function(oEvent) {
						if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("EndersApp.view.matDetailPop", this);
				this.getView().addDependent(this._oPopover);
				
			}

			this._oPopover.openBy(oEvent.getSource());
		},
		
		delDateChange: function(oEvent) {
			
									if (!this._oPopover) {
										debugger;
				this._oPopover = sap.ui.xmlfragment("EndersApp.view.delDateChange", this);
				this.getView().addDependent(this._oPopover);
				
			}

			this._oPopover.openBy(oEvent.getSource());
		},
		
		onComboBoxSelectionChange: function(oEvent){
			
	//		var key =	oEvent.getSource().getSelectedKey();
	//		var check = "anDate";
	//			if(key == check){
	//			var cal = sap.ui.getCore("EndersApp.view.delDateChange");
	//		
	//			console.log(cal);
	//				//sap.m.MessageToast.show("passt");
	//				
	//			}
			
			
		sap.m.MessageToast.show("Funktion muss noch implementiert werden!");
		},
		
		selOrderType: function(oEvent){
								
										if (!this._oPopover) {
			
			
				this._oPopover = sap.ui.xmlfragment("EndersApp.view.changeAuart", this);
			
				this.getView().addDependent(this._oPopover);
				
			}

			this._oPopover.openBy(oEvent.getSource());
			
		}
		
		//	onExit: function() {
		//
		//	}

	});

});