sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"EndersApp/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("EndersApp.Component", {

		metadata: {
			manifest: "json",
			config: {
				serviceConfig: {
					name: "ENDERS_APP_SRV",
					serviceUrl: "/sap/odata/ENDERS_APP_SRV"
				}
			}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// Routerinitialize
			this.getRouter().initialize();
		}
	});
});