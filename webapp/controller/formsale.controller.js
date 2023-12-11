sap.ui.define( ["sap/ui/core/mvc/Controller", 
                "sap/ui/core/routing/History",
				'sap/ui/model/json/JSONModel', 
				'sap/viz/ui5/data/FlattenedDataset', 
				'sap/viz/ui5/controls/common/feeds/FeedItem', 
				'sap/m/Label',
				'sap/m/ColumnListItem', 
				'sap/m/library', 
				'sap/m/MessageToast', 
				'sap/m/Column',
				'sap/ui/core/UIComponent',
				'sap/m/MessagePopover',
				'sap/m/MessageItem',
				'sap/ui/core/message/Message',
				'sap/ui/core/library',
				'sap/ui/core/Core',
				"sap/ui/dom/isBehindOtherElement",
				'sap/ui/core/Element'
], function (Controller, HistoryController, History, MessagePopover, MessageItem, MessageToast, Message, coreLibrary, Core, isBehindOtherElement, JSONModel, Element, UIComponent) {
	"use strict";

	var MessageType = coreLibrary.MessageType;

	return Controller.extend("sybcool.travelmanagement.controller.formsale", {
		onInit : function () {
			console.log("Entro es formsale");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
  			oRouter.getRoute("Targetformsale").attachMatched(this._onRouteMatched, this);

		},

		_onRouteMatched: function(oEvent) {
			let oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: `ventas>/ContentData/${oArgs.parameter}`
			});
		},
		
		onItemSelect : function (oEvent) {
			var oItem = oEvent.getParameter("item");
            if(this.getView().createId(oItem.getKey()) === "application-sybcooltravelmanagement-display-component---formsale--page2")
            {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("Targetestatistics");
            }else{
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Targetmain");
            }
		},

		onBack : function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				// There is no history!
				// replace the current hash with page 1 (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("Targetmain", null, true);
			}
		},

		onDateChange: function(oEvent) {
			var oDatePicker = oEvent.getSource();
			var oSelectedDate = oDatePicker.getDateValue();
		  
			// Realiza las operaciones necesarias con la fecha seleccionada
		},

		onInputChange: function(oEvent) {
			var oInput11 = this.getView().byId("_IDGenInput11");
			var oInput13 = this.getView().byId("_IDGenInput13");
			var oInput14 = this.getView().byId("_IDGenInput14");

			
			var nInput11 = parseFloat(oInput11.getValue());
			var nInput13 = parseFloat(oInput13.getValue());

			var result = nInput11 * nInput13;

			oInput14.setValue(result.toString());
		},
	});

});
