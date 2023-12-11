sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/m/MessageToast",
    'sap/m/MessageBox',
    'sap/ui/core/UIComponent',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/Sorter',
    'sap/m/MenuItem',
	"sap/gantt/simple/GanttPrinting",
], function (Controller, JSONModel, Device, MessageToast, MessageBox, UIComponent, Filter, FilterOperator, Sorter, MenuItem, GanttPrinting) {
    "use strict";

    return Controller.extend("sybcool.travelmanagement.controller.main", {
        onInit: function () {

            /*var oModel = new JSONModel(sap.ui.require.toUrl("sybcool/travelmanagement/model/data.json"));
			this.getView().setModel(oModel);*/

            var oModel = this.getView().getModel("ventas");
            this.getView().setModel(oModel); 


			this._setToggleButtonTooltip(!Device.system.desktop);

			this.bGrouped = false;
			this.bDescending = false;
			this.sSearchQuery = 0;

        },

        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            if(this.getView().createId(oItem.getKey()) === "application-sybcooltravelmanagement-display-component---main--page2")
            {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Targetestatistics");
            }else{
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("Targetmain");
            }
        },

        handleUserNamePress: function (event) {
			var oPopover = new Popover({
				showHeader: false,
				placement: PlacementType.Bottom,
				content: [
					new Button({
						text: 'Feedback',
						type: ButtonType.Transparent
					}),
					new Button({
						text: 'Help',
						type: ButtonType.Transparent
					}),
					new Button({
						text: 'Logout',
						type: ButtonType.Transparent
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			oPopover.openBy(event.getSource());
		},

		onSideNavButtonPress: function () {
			var oToolPage = this.byId("toolPage");
			var bSideExpanded = oToolPage.getSideExpanded();

			this._setToggleButtonTooltip(bSideExpanded);

			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function (bLarge) {
			var oToggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				oToggleButton.setTooltip('Large Size Navigation');
			} else {
				oToggleButton.setTooltip('Small Size Navigation');
			}
		},

        press: function (oEvent) {
            var oNumericContent = oEvent.getSource();
            var oContext = oNumericContent.getBindingContext("ventas");
            var oData = oContext.getObject();

			console.log("boletos: " + oData.Cantidad_boletos)

            var idContentData = this.getView().getModel("ventas").getData().ContentData.indexOf(oData);
            console.log("idContentData:", idContentData);
            if (oData.Cantidad_boletos === "0"){
                MessageToast.show("No hay boletos disponible para " + oData.Country)
            }else{
                if (oData) {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("Targetformsale", {
                        parameter: idContentData
                    });
                } else {
                    console.error("La data seleccionada es undefined");
                }
            }
        },

        onScroll: function (evt) {
            /*var oModel = this.getView().getModel();
            var oData = oModel.getData(); */

            var oModel = this.getView().getModel("ventas");
            var oData = oModel.getData();
            for (var i = 0; i < 6; i++) {
                var oNumericContentData = {
                    value: "",
                    Country: "",
                    Siglas: "",
                    cantidad: "",
                    color: "",
                    growth: "",
                };
                oNumericContentData.value = (Math.random() * 10 + "").substring(0, 3);
                var randomNumber = Math.round((Math.random() * 10));
                switch (randomNumber % 6) {
                    case 0:
                        oNumericContentData.color = "Good";
                        break;
                    case 1:
                        oNumericContentData.color = "Error";
                        break;
                    default:
                        oNumericContentData.color = "Neutral";
                        break;
                }
                oNumericContentData.growth = randomNumber % 5 ? "Up" : "Down";
                oData.ContentData.push(oNumericContentData);
            }
            oModel.setData(oData);
            this.getView().setModel(oModel);
        },

        //-------------------------------------------------

        onSliderMoved: function (oEvent) {
			var iValue = oEvent.getParameter("value");
			this.byId("otbSubheader").setWidth(iValue + "%");
			this.byId("otbFooter").setWidth(iValue + "%");
		},

		_fnGroup : function (oContext){
			var sSupplierName = oContext.getProperty("identificacion");

			return {
				key : sSupplierName,
				text : sSupplierName
			};
		},

		onReset: function (oEvent){
			this.bGrouped = false;
			this.bDescending = false;
			this.sSearchQuery = 0;
			this.byId("maxPrice").setValue("");

			this.fnApplyFiltersAndOrdering();
		},

		onGroup: function (oEvent){
			this.bGrouped = !this.bGrouped;
			this.fnApplyFiltersAndOrdering();
		},

		onSort: function (oEvent) {
			this.bDescending = !this.bDescending;
			this.fnApplyFiltersAndOrdering();
		},

		onFilter: function (oEvent) {
			this.sSearchQuery = oEvent.getSource().getValue();
			this.fnApplyFiltersAndOrdering();
		},

		onTogglePress: function(oEvent) {
			var oButton = oEvent.getSource(),
				bPressedState = oButton.getPressed(),
				sStateToDisplay = bPressedState ? "Pressed" : "Unpressed";

			MessageToast.show(oButton.getId() + " " + sStateToDisplay);
		},

		onTableAfterRendering: function() {
			this.fnApplyFiltersAndOrdering();
		},

		fnApplyFiltersAndOrdering: function (oEvent){			

			var oTable = this.byId("idbusinessDataTable");
			console.log("oTable: " + oTable);
			if (oTable) {
			  var oBinding = oTable.getBinding("items");
			  if (oBinding) {
				console.log("oBinding"); 
				var aFilters = [];
				var aSorters = [];
		  
				if (this.bGrouped) {
					aSorters.push(new Sorter("identificacion", this.bDescending, this._fnGroup));
				} else {
					aSorters.push(new Sorter("nombre", this.bDescending));
				}
	
				console.log("sSearchQuery: " + this.sSearchQuery);
				if (this.sSearchQuery) {
					console.log("sSearchQuery: if");
					var oFilter = new Filter("nombre", FilterOperator.Contains, this.sSearchQuery);
					aFilters.push(oFilter);
				} 
		  
				oBinding.filter(aFilters).sort(aSorters);
			  }else{
				console.log("oBinding error"); 
			  }
			}else
				console.log("error en el filter"); 
		},

		onExportPDF: function () {
			var oGanttPrinting = new GanttPrinting({
				ganttChart: this.oGantt
			});

			var fnUpdateTable = function (oTable) {
				oTable.getColumns().forEach(function(oColumn){
					if (oColumn.getTemplate && oColumn.getTemplate() && oColumn.getTemplate().getText) {
						oColumn.getTemplate().setMaxLines(0);
					}
				});
			};
			oGanttPrinting.open(fnUpdateTable);
		},

		onDefaultActionAccept: function() {
			MessageToast.show("Default action triggered");
		},
		onBeforeMenuOpen: function (evt) {
			MessageToast.show("beforeMenuOpen is fired");
		},
		onPress: function (evt) {
			MessageToast.show(evt.getSource().getId() + " Pressed");
		},
		onMenuAction: function(oEvent) {
			var oItem = oEvent.getParameter("item"),
				sItemPath = "";

			while (oItem instanceof MenuItem) {
				sItemPath = oItem.getText() + " > " + sItemPath;
				oItem = oItem.getParent();
			}

			sItemPath = sItemPath.substring(0, sItemPath.lastIndexOf(" > "));

			MessageToast.show("Action triggered on item: " + sItemPath);
		}
    });        
});
