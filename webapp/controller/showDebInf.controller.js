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
	//Ausbauen sobald binding erfolgt
	
	
	debugger;
	



	this.byId("l_kunnr").setText(window.selCustGlobal.kunnr);
		this.byId("l_name1").setText(window.selCustGlobal.name1);
		this.byId("l_name2").setText(window.selCustGlobal.name2);
		this.byId("l_name3").setText(window.selCustGlobal.name3);
		this.byId("l_name4").setText(window.selCustGlobal.name4);
		this.byId("l_stras").setText(window.selCustGlobal.stras);
		this.byId("l_plz01").setText(window.selCustGlobal.plz01);
		this.byId("l_ort01").setText(window.selCustGlobal.ort01);
		this.byId("l_tel01").setText(window.selCustGlobal.tel01);
		this.byId("l_telfx").setText(window.selCustGlobal.telfx);
		this.byId("l_mail").setText(window.selCustGlobal.mail);
		this.byId("l_konda").setText(window.selCustGlobal.konda);
		this.byId("l_optotal").setText(window.selCustGlobal.optotal);
		this.byId("l_oldop").setText(window.selCustGlobal.oldop);
		this.byId("l_olddate").setText(window.selCustGlobal.olddate);
		this.byId("l_note").setValue(window.selCustGlobal.note);
	
		
}
	});

});