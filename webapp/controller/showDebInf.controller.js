sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	
	return Controller.extend("EndersApp.controller.showDebInf", {
		goToOP: function(){
			// muss noch abgeklärt werden, da hier ein Verstoß gegen die Richtlinien vorliegt
			window.open("http://saperp.enders.global:8000/sap/bc/gui/sap/its/webgui?~transaction=ZFI_OP_TOUR", "_blank");
			}
,
onInit: function(){
	debugger;
		this.byId("l_kunnr").setText(this.getOwnerComponent().selectedCust.kunnr);
		this.byId("l_name1").setText(this.getOwnerComponent().selectedCust.name1);
		this.byId("l_name2").setText(this.getOwnerComponent().selectedCust.name2);
		this.byId("l_name3").setText(this.getOwnerComponent().selectedCust.name3);
		this.byId("l_name4").setText(this.getOwnerComponent().selectedCust.name4);
		this.byId("l_stras").setText(this.getOwnerComponent().selectedCust.stras);
		this.byId("l_plz01").setText(this.getOwnerComponent().selectedCust.plz01);
		this.byId("l_ort01").setText(this.getOwnerComponent().selectedCust.ort01);
		this.byId("l_tel01").setText(this.getOwnerComponent().selectedCust.tel01);
		this.byId("l_telfx").setText(this.getOwnerComponent().selectedCust.telfx);
		this.byId("l_mail").setText(this.getOwnerComponent().selectedCust.mail);
		this.byId("l_konda").setText(this.getOwnerComponent().selectedCust.konda);
		this.byId("l_optotal").setText(this.getOwnerComponent().selectedCust.optotal);
		this.byId("l_oldop").setText(this.getOwnerComponent().selectedCust.oldop);
		this.byId("l_olddate").setText(this.getOwnerComponent().selectedCust.olddate);
		this.byId("l_note").setValue(this.getOwnerComponent().selectedCust.note);
	
		
}
	});

});