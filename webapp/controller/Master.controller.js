sap.ui.define(["sap/ui/core/mvc/Controller"],
	function(Controller) {
		"use strict";
		 var filters = [];
		 var selectedCust = "";
		return Controller.extend("EndersApp.controller.Master", {

			onInit: function() {

				if (this.byId("kunnr_m").getText() === "") {
					this.byId("ActionListMain").setVisible(false);
					this.byId("displayDeb").setVisible(false);
					this.byId("labSelDeb").setVisible(true);
				} else {
					this.byId("ActionListMain").setVisible(true);
					this.byId("displayDeb").setVisible(true);
					this.byId("labSelDeb").setVisible(false);
				}

			},
			selectDebitor: function() {
				//////Hier kommt der Aufruf der Debitoren Auswahl, danach wird gecheckt ob einer selektiert wurde

				var oView = this.getView();
				var oDialog = oView.byId("searchDebDialog");

				if (!oDialog) {

					oDialog = sap.ui.xmlfragment(oView.getId(), "EndersApp.view.searchDebDialog", this);

					oView.addDependent(oDialog);
				}

				oDialog.open();



			},
			toCreateOrder: function(oEvent) {
				this.byId("masterView").setBusy(true);
			
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("detCreateOrder");
				
			},

			toShowOrder: function(oEvent) {

				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("showOrderSelect");
			},

			navToDeb: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("showDebInf");
			},
			
			entryDeb: function(oEvent){
				this.getView().byId("searchDebDialog").close();
				this.byId("kunnr_m").setText(selectedCust.kunnr);
				this.byId("name1_m").setText(selectedCust.name1);
				this.byId("name2_m").setText(selectedCust.name2);
				this.byId("tel01_m").setText(selectedCust.tel01);
				this.byId("ort01_m").setText(selectedCust.ort01);
				this.byId("plz01_m").setText(selectedCust.plz01);
				this.byId("ActionListMain").setVisible(true);
				this.byId("displayDeb").setVisible(true);
				this.byId("labSelDeb").setVisible(false);				
			},
			onItemPress: function(oEvent) {
				
				selectedCust = oEvent.getParameter("listItem").getBindingContext().getObject();
				this.entryDeb(oEvent);
				
			},
			selectItem: function(oControlEvent) {
				selectedCust = oControlEvent.getParameter("listItem").getBindingContext().getObject();
			},
			filterData: function(oEvent) {
				this._filterData(oEvent.getParameter("newValue"), oEvent.getSource().getBindingInfo("placeholder").binding.sPath);
			},
			_filterData: function(str,spath){
				var i = 0;
				if (filters.length > 0) {
					for (var s in filters) {
						if (filters[s].sPath === spath ){
							if ( str === "" ) {
								filters.splice(s, 1);	
							} else {
								filters.splice(s, 1, new sap.ui.model.Filter(spath, sap.ui.model.FilterOperator.Contains, str));
							}
							i = 1;
						}
					}					
				}
				if ( i < 1 ){
					filters.push(new sap.ui.model.Filter(spath, sap.ui.model.FilterOperator.Contains, str));
				}
				this._applyOnModel();
			},
			// filter OData with Filter Array
			_applyOnModel: function() {
				this.getView().byId("table_deb").getBinding("items").filter([]);
				if (filters.length > 0) {
					this.getView().byId("table_deb").getBinding("items").filter(filters, sap.ui.model.FilterType.Application);
				}
			}
			// _readSpecificCustomer: function(){
			// 	var aFilter = [];
			// 	var oBinding;
			// 	aFilter.push(new sap.ui.model.Filter("kunnr", sap.ui.model.FilterOperator.EQ, selectedCust));
			// 	oBinding = this.getView().getModel().bindList("/Customer");
			// 	oBinding.filter(aFilter);
			// }					
		});
	});