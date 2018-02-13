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
					serviceUrl: "/"
					}
			}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			var mConfig = this.getMetadata().getConfig();
			// create and set the ODataModel
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			var sServiceUrl = mConfig.serviceConfig.serviceUrl;	
			var oAppModel = new sap.ui.model.odata.ODataModel(sServiceUrl, {
				json: true,
				loadMetadataAsync: true
			});
			oAppModel.attachMetadataFailed(function() {
				this.getEventBus().publish("Component", "MetadataFailed");
			}, this);
			// var oAppModel = models.createODataModel({
			// 	urlParametersForEveryRequest: [
			// 			"sap-server",
			// 			"sap-client",
			// 			"sap-language"
			// 		],
			// 	url: mConfig.serviceConfig.serviceUrl,
			// 	config: {
			// 		metadataUrlParams: {
			// 		},
			// 		json: true,
			// 		defaultBindingMode: "TwoWay",
			// 		defaultCountMode: "Inline",
			// 		useBatch: true
			// 	}
			// });
			this.setModel(oAppModel);	
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// Routerinitialize
			this.getRouter().initialize();
		}
	});
});