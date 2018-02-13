sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/resource/ResourceModel"
], function(JSONModel, Device, V2ODataModel, ResourceModel) {
	"use strict";
	function extendMetadataUrlParameters(aUrlParametersToAdd, oMetadataUrlParams, sServiceUrl) {
		var oExtensionObject = {},
			oServiceUri = new URI(sServiceUrl);

		aUrlParametersToAdd.forEach(function(sUrlParam) {
			var oUrlParameters,
				sParameterValue;

			if (sUrlParam === "sap-language") {
				var fnGetuser = jQuery.sap.getObject("sap.ushell.Container.getUser");

				if (fnGetuser) {
					// for sap-language we check if the launchpad can provide it.
					oMetadataUrlParams["sap-language"] = fnGetuser().getLanguage();
				}
			} else {
				oUrlParameters = jQuery.sap.getUriParameters();
				sParameterValue = oUrlParameters.get(sUrlParam);
				if (sParameterValue) {
					oMetadataUrlParams[sUrlParam] = sParameterValue;
					oServiceUri.addSearch(sUrlParam, sParameterValue);
				}
			}
		});

		jQuery.extend(oMetadataUrlParams, oExtensionObject);
		return oServiceUri.toString();
	}	

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createODataModel: function(oOptions) {
			var aUrlParametersForEveryRequest,
				sUrl,
				oConfig = {};

			oOptions = oOptions || {};

			if (!oOptions.url) {
				jQuery.sap.log.error("Please provide a url when you want to create an ODataModel",
					"nw.epm.refapps.ext.shop.model.models.createODataModel");
				return null;
			}
			// create a copied instance since we modify the config
			oConfig = jQuery.extend(true, {}, oOptions.config);

			aUrlParametersForEveryRequest = oOptions.urlParametersForEveryRequest || [];
			oConfig.metadataUrlParams = oConfig.metadataUrlParams || {};

			sUrl = extendMetadataUrlParameters(aUrlParametersForEveryRequest, oConfig.metadataUrlParams, oOptions.url);

			return this._createODataModel(sUrl, oConfig);

		},

		_createODataModel: function(sUrl, oConfig) {
			var oModel = new V2ODataModel(sUrl, oConfig);

			oModel.setDeferredBatchGroups(["ENDERS_basket"]);
			oModel.setChangeBatchGroups({
				"ENDERS_basket": {
					batchGroupId: "ENDERS_basket",
					single: true
				}
			});
			return oModel;
		}

	};
});