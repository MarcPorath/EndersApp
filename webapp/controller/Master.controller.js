sap.ui.define(["sap/ui/core/mvc/Controller"],
	function(Controller) {
		"use strict";
		 var filters = [];
		return Controller.extend("EndersApp.controller.Master", {

			onInit: function() {

				if (this.byId("kdNum").getText() === "") {
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
			closeSearchDialog: function() {
				this.getView().byId("searchDebDialog").close();

				if (this.byId("kdNum").getText() === "") {
					this.byId("ActionListMain").setVisible(false);
					this.byId("displayDeb").setVisible(false);
					this.byId("labSelDeb").setVisible(true);
				} else {
					this.byId("ActionListMain").setVisible(true);
					this.byId("displayDeb").setVisible(true);
					this.byId("labSelDeb").setVisible(false);
				}
			},
			selectDeb: function(string) {
				//////Test Code, mit dem ich erstmal die Auswahl simuliere
				//////////////////////////////////////////////////////////
				this.byId("kdNum").setText("1038901");
				this.byId("kdName").setText("Hotel Zur Kupferkanne GmbH");
				this.byId("kdAdress").setText("Lutzstr. 20");
				this.byId("Ort01").setText("56330 Kobern-Gondorf");
				this.byId("kdTel").setText("02607342");
				this.byId("mobTel").setText("015150610746");
				////////////////////////////////////////////////////////////
				
				this.getView().byId("searchDebDialog").close();

				if (this.byId("kdNum").getText() === "") {
					this.byId("ActionListMain").setVisible(false);
					this.byId("displayDeb").setVisible(false);
					this.byId("labSelDeb").setVisible(true);
				} else {
					this.byId("ActionListMain").setVisible(true);
					this.byId("displayDeb").setVisible(true);
					this.byId("labSelDeb").setVisible(false);
				}
				
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
			onItemPress: function(oEvent) {
				this.getView().byId("searchDebDialog").close();
				this.byId("kdNum").setText(oEvent.getParameter("listItem").getBindingContext().getObject().kunnr);
				this.byId("ActionListMain").setVisible(true);
				this.byId("displayDeb").setVisible(true);
				this.byId("labSelDeb").setVisible(false);				
			},
			filterData: function(oEvent) {
				this._filterData(oEvent.getParameter("newValue"), oEvent.getSource().getBindingInfo("placeholder").binding.sPath);
			},
			_filterData: function(str,spath){
				var i = 0;
				if (filters.length > 0) {
					for (var s in filters) {
						if (filters[s] === spath){
							filters.slice(s, 1, new sap.ui.model.Filter(spath, sap.ui.model.FilterOperator.Contains, str));
							i = 1;
						}
					}					
				}
				if ( i < 1 ){
					filters.push(new sap.ui.model.Filter(spath, sap.ui.model.FilterOperator.Contains, str));
				}
			}

		});
	});