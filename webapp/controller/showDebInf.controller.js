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
			this.getOwnerComponent().getModel().read(kunKey, null, null, false, function(oData, oResponse) {
				oModel.setData(oData);
			}, null);
			this.getView().setModel(oModel, "Customer");

			this.byId("l_kunnr").setText(oModel.getData().kunnr);
			this.byId("l_name1").setText(oModel.getData().name1);
			this.byId("l_name2").setText(oModel.getData().name2);
			this.byId("l_name3").setText(oModel.getData().name3);
			this.byId("l_name4").setText(oModel.getData().name4);
			this.byId("l_stras").setText(oModel.getData().stras);
			this.byId("l_plz01").setText(oModel.getData().plz01);
			this.byId("l_ort01").setText(oModel.getData().ort01);
			this.byId("l_tel01").setText(oModel.getData().tel01);
			this.byId("l_telfx").setText(oModel.getData().telfx);
			this.byId("l_mail").setText(oModel.getData().mail);
			this.byId("l_konda").setText(oModel.getData().konda);
			this.byId("l_optotal").setText(oModel.getData().optotal);
			this.byId("l_oldop").setText(oModel.getData().oldop);
			this.byId("l_olddate").setText(oModel.getData().olddate);
			this.byId("l_note").setValue(oModel.getData().note);

		}
	});

});