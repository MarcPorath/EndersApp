sap.ui.define(["sap/ui/core/mvc/Controller"],
	function(Controller) {
	"use strict";
	return Controller.extend("EndersApp.controller.Master", {

		onInit: function() {
				
			if (this.byId("kdNum").getText() === ""){
				this.byId("ActionListMain").setVisible(false);
				this.byId("displayDeb").setVisible(false);
				this.byId("labSelDeb").setVisible(true); }	
			else{
				this.byId("ActionListMain").setVisible(true);
				this.byId("displayDeb").setVisible(true);
				this.byId("labSelDeb").setVisible(false);
				}



				},

		selectDebitor: function() {
		//////Hier kommt der Aufruf der Debitoren Auswahl, danach wird gecheckt ob einer selektiert wurde
		
		//////Test Code, mit dem ich erstmal die Auswahl simuliere
		//////////////////////////////////////////////////////////
		this.byId("kdNum").setText("1038901");
		this.byId("kdName").setText("Hotel Zur Kupferkanne GmbH");
		this.byId("kdAdress").setText("Lutzstr. 20");
		this.byId("Ort01").setText("56330 Kobern-Gondorf");
		this.byId("kdTel").setText("02607342");
		this.byId("mobTel").setText("015150610746");
		////////////////////////////////////////////////////////////
		//////Select-Check
			if (this.byId("kdNum").getText() === ""){
				this.byId("ActionListMain").setVisible(false);
				this.byId("displayDeb").setVisible(false);
				this.byId("labSelDeb").setVisible(true);
			} else {
				this.byId("ActionListMain").setVisible(true);
				this.byId("displayDeb").setVisible(true);
				this.byId("labSelDeb").setVisible(false);
			}
			
		},

		 //selectDebitor: function() {
		 ////////Hier kommt der Aufruf der Debitoren Auswahl, danach wird gecheckt ob einer selektiert wurde
		
		 ////////Test Code, mit dem ich erstmal die Auswahl simuliere
		 ////////////////////////////////////////////////////////////
		 //this.byId("kdNum").setText("1038901");
		 //this.byId("kdName").setText("Hotel Zur Kupferkanne GmbH");
		 //this.byId("kdAdress").setText("Lutzstr. 20");
		 //this.byId("Ort01").setText("56330 Kobern-Gondorf");
		 //this.byId("kdTel").setText("02607342");
		 //this.byId("mobTel").setText("015150610746");
		 //////////////////////////////////////////////////////////////
		 ////////Select-Check
		 //	if (this.byId("kdNum").getText() == ""){
		 //		this.byId("ActionListMain").setVisible(false);
		 //		this.byId("displayDeb").setVisible(false);
		 //		this.byId("labSelDeb").setVisible(true);}	
			// else{
		 //		this.byId("ActionListMain").setVisible(true);
		 //		this.byId("displayDeb").setVisible(true);
		 //		this.byId("labSelDeb").setVisible(false);
		 //		}			
		 //},

		toCreateOrder: function(oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detCreateOrder");
			this.byId("masterView").setBusy(true);
		},
		
		toShowOrder: function(oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("showOrderSelect");
		},
		
		navToDeb: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("showDebInf");	
		}
	});
});