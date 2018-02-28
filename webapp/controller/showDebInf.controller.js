sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("EndersApp.controller.showDebInf", {
		goToOP: function() {
			// muss noch abgeklärt werden, da hier ein Verstoß gegen die Richtlinien vorliegt
			window.open("http://saperp.enders.global:8000/sap/bc/gui/sap/its/webgui?~transaction=ZFI_OP_TOUR", "_blank");
		},
		onInit: function() {
	debugger;
			var oModel = new sap.ui.model.json.JSONModel();
			
			var kunKey = this.getOwnerComponent().selectedCust.kunnr;
			
			kunKey = "/Customer('" + kunKey + "')";
			this.getOwnerComponent().getModel().read(kunKey,null,null,false,function(oData, oResponse){
				oModel.setData(oData);
			},null);
			this.getView().setModel(oModel, "Customer");
			debugger;

		}
	});

});