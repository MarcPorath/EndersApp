sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller) {
	"use strict";

	var selectedCust;
	var _oRouter;
	var filled;
	var hide = false;

	return Controller.extend("EndersApp.controller.detCreateOrder", {

		onInit: function() {
			this.filled = [];
			this.selectedCust = this.getOwnerComponent().selectedCust;
		},
		onPersoPress: function() {
			var oPersonalizationDialog = sap.ui.xmlfragment("EndersApp.view.orderPersonalizationDialog", this);
			//this.oJSONModel.setProperty("/ShowResetEnabled", this._isChangedSortItems() || this._isChangedColumnsItems());
			var oModel = this.getOwnerComponent().getModel();
			oPersonalizationDialog.setModel(oModel);

			this.getView().addDependent(oPersonalizationDialog);
			oPersonalizationDialog.open();
		},
		onOK: function(oEvent) {
			this.oDataBeforeOpen = {};
			oEvent.getSource().close();
		},

		onCancel: function(oEvent) {
			this.oDataBeforeOpen = {};
			oEvent.getSource().close();
		},
		onReset: function() {
			this.oJSONModel.setProperty("/", jQuery.extend(true, [], this.oDataInitial));
		},
		onClear: function(oEvent) {
			var oTable = this.getView().byId("productsTable");
			var oItems = oTable.getItems();			
			for (var s in oItems) {
				var key = oTable.getItems()[s].getBindingContext().sPath;
				for (var t in this.filled) {
					if (this.filled[t].__metadata.id === key ){
						for ( var j in oTable.getItems()[s].getCells()){
							if (oTable.getItems()[s].getCells()[j].getId().substring(31,35) === "meng"){
								oTable.getItems()[s].getCells()[j].setValue("");
							}
						}
					}
				}
			}
			this.filled = [];
			oEvent.getSource().getParent().getParent().getModel().refresh(true); 
		},
		onChanged: function() {
			// Fill meng values if empty
			var oTable = this.getView().byId("productsTable");
			var oItems = oTable.getItems();
			if ( this.filled.length > 0 ) {
			for (var s in oItems) {
				var key = oTable.getItems()[s].getBindingContext().sPath;
				for (var t in this.filled) {
					if (this.filled[t].__metadata.id === key ){
						for ( var j in oTable.getItems()[s].getCells()){
							if (oTable.getItems()[s].getCells()[j].getId().substring(31,35) === "meng"){
								oTable.getItems()[s].getCells()[j].setValue(this.filled[t].meng);
							}
						}
					}
				}
			}}
			
		},
		onHide: function(oEvent) {
			var filters = [];
			var oTable = oEvent.getSource().getParent().getParent();
			var item = oTable.getItems()[0];
			var oItemTemplate = item.clone();
			if (this.filled.length > 0) {
				if (hide === false) {
					oEvent.getSource().setIcon("sap-icon://show");
					oEvent.getSource().setTooltip("Gesamten Warenkorb einblenden");
					for (var s in this.filled) {
						filters.push(new sap.ui.model.Filter("MATNR", sap.ui.model.FilterOperator.Contains, this.filled[s].MATNR));
					}
					oTable.unbindAggregation("items");
					oTable.bindAggregation("items", {
						path: "/Basket",
						template: oItemTemplate,
						filters: filters
					});
					// Filterfunktion
					hide = true;
				} else {
					oEvent.getSource().setIcon("sap-icon://hide");
					oEvent.getSource().setTooltip("Nur gefüllte Positionen anzeigen");
					oTable.getBinding("items").sFilterParams = null;
					oTable.getBinding("items").aApplicationFilters = [];
					oTable.getModel().refresh();
					hide = false;
				}
			}
		},
		onMengChange: function(oEvent) {
			var i = 0;
			var entry = oEvent.getSource().getBindingContext().getObject();
			entry.meng = oEvent.getParameters().newValue;

			if (this.filled.length > 0) {
				for (var s in this.filled) {
					if (this.filled[s].MATNR === entry.MATNR) {
						if (entry.meng === "") {
							this.filled.splice(s, 1);
						} else {
							this.filled.splice(s, 1, entry);
						}
						i = 1;
					}
				}
			}
			if (i < 1) {
				this.filled.push(entry);
			}
		},
		/*		onAfterRendering: function() {
					this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
				},
				handleRouteMatched: function(evt) {
					//Check whether is the detail page is matched.

					if (evt.getParameter("name") === "detCreateOrder") {
						var filters = [];
						var s = this.getView().byId("warenkorbTable");
						try {
							filters.push(new sap.ui.model.Filter("KUNNR", sap.ui.model.FilterOperator.Contains, this.getOwnerComponent().selectedCust.kunnr));
							s.getTable().getBinding("items").filter(filters, sap.ui.model.FilterType.Application);
						} catch (err) {
							// do nothing
						}
					}

				},

				formatRowHighlight: function(oValue) {
					if (oValue.substring(0, 2) === "11") {
						return "Success";
					} else if (oValue.substring(0, 2) === "12") {
						return "Warning";
					}
				},

				onTableRebind: function(oControlEvent) {
					var filters = [];
					filters.push(new sap.ui.model.Filter("KUNNR", sap.ui.model.FilterOperator.Contains, this.getOwnerComponent().selectedCust.kunnr));
					oControlEvent.getParameters().bindingParams.filter = filters;
				},*/

		// 	avCheck: function() {
		// 		sap.m.MessageToast.show("XX St verfügbar zum Wunschlieferdatum!");
		// 	},

		confirmSave: function() {
			var that = this;
			sap.m.MessageBox.confirm(
				this.getView().getModel("i18n").getResourceBundle().getText("confirmCO"), {
					icon: sap.m.MessageBox.Icon.SUCCESS,
					title: this.getView().getModel("i18n").getResourceBundle().getText("confirm"),
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === sap.m.MessageBox.Action.YES) {

							var oMainView = sap.ui.getCore().byId("__xmlview0");
							var oSplitContainer = oMainView.byId("mainView");
							oSplitContainer.setMode(sap.m.SplitAppMode.StretchCompressMode);

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
				this.getView().getModel("i18n").getResourceBundle().getText("cancelCO"), {
					icon: sap.m.MessageBox.Icon.WARNING,
					title: this.getView().getModel("i18n").getResourceBundle().getText("abort"),
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
		setPrice: function(oEvent) {
			var oModel = new sap.ui.model.json.JSONModel();
			debugger;
			this.getOwnerComponent().getModel().read(oEvent.getSource().getBindingContext().getPath(), null, null, false, function(oData,
				oResponse) {
				oModel.setData(oData);
			}, null);

			this.getOwnerComponent().setModel(oModel, "data");

		},
		detailPage: function(oEvent) {
			debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("matDetail");
		}

		// 	matDetail: function(oEvent) {
		// 					if (!this._oPopover) {
		// 			this._oPopover = sap.ui.xmlfragment("EndersApp.view.matDetailPop", this);
		// 			this.getView().addDependent(this._oPopover);

		// 		}

		// 		this._oPopover.openBy(oEvent.getSource());
		// 	},

		// 	delDateChange: function(oEvent) {

		// 								if (!this._oPopover) {
		// 									debugger;
		// 			this._oPopover = sap.ui.xmlfragment("EndersApp.view.delDateChange", this);
		// 			this.getView().addDependent(this._oPopover);

		// 		}

		// 		this._oPopover.openBy(oEvent.getSource());
		// 	},

		// 	onComboBoxSelectionChange: function(oEvent){

		// //		var key =	oEvent.getSource().getSelectedKey();
		// //		var check = "anDate";
		// //			if(key == check){
		// //			var cal = sap.ui.getCore("EndersApp.view.delDateChange");
		// //		
		// //			console.log(cal);
		// //				//sap.m.MessageToast.show("passt");
		// //				
		// //			}

		// 	sap.m.MessageToast.show("Funktion muss noch implementiert werden!");
		// 	},

		// 	selOrderType: function(oEvent){

		// 									if (!this._oPopover) {

		// 			this._oPopover = sap.ui.xmlfragment("EndersApp.view.changeAuart", this);

		// 			this.getView().addDependent(this._oPopover);

		// 		}

		// 		this._oPopover.openBy(oEvent.getSource());

		// 	}

		// 	//	onExit: function() {
		// 	//
		// 	//	}

	});

});