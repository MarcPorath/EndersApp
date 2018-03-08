sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var selectedVbeln;
	return Controller.extend("EndersApp.controller.showOrderDetail", {
		
	
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf EndersApp.view.showOrderDetail
		 */
			onInit: function() {
			
				selectedVbeln = this.getOwnerComponent().selectedVbeln;
	
			
			},
		onAfterRendering: function() {

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
		},
		handleRouteMatched: function(evt) {
			//Check whether is the detail page is matched.

			if (evt.getParameter("name") === "showOrderDetail") {
				var filters = [];
				var s = this.getView().byId("tableOrder");
				try {
					filters.push(new sap.ui.model.Filter("vbeln", sap.ui.model.FilterOperator.Contains, this.getOwnerComponent().selectedVbeln));
					s.getTable().getBinding("items").filters(filters, sap.ui.model.FilterType.Application);
				} catch (err) {
					// do nothing
				}
			}

		},

		formatRowHighlight: function(oValue,oEvent) {
			debugger;
			if (oValue.substring(0, 2) === "11") {
				return "Success";
			} else if (oValue.substring(0, 2) === "12") {
				return "Warning";
			}
		},

		onTableRebind: function(oControlEvent) {
		
			var filters = [];

			filters.push(new sap.ui.model.Filter("vbeln", sap.ui.model.FilterOperator.Contains, this.getOwnerComponent().selectedVbeln));
			var param = oControlEvent.getParameters();
			param.bindingParams.filters = filters;

		},

		 
		 goBackAndReject: function(oEvent) {
			var that = this;

							var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
							oRouter.navTo("showOrderSelect");



		},
		 
			onExit: function() {
		
		
			this.getOwnerComponent().selectedVbeln = "";
			}

	});

});