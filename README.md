# **Gestión de listados de viajes**
### Descripción del problema: 
  * Realizar un sistema de gestión de listados de viajes utilizando SAP Fiori para simplificar y automatizar las ventas de boletos y estadísticas de ventas


![image](https://github.com/TenesisEspana/travelmanagament/assets/37408577/0d3599f4-63e2-465a-b67c-6afe43141b27)


## Creacion del proyecto

![image](https://github.com/TenesisEspana/travelmanagament/assets/37408577/27842dac-8eca-4756-bdba-4b52ec025581)

![image](https://github.com/TenesisEspana/travelmanagament/assets/37408577/73db387a-4ec2-41c2-b493-d32179f4a5b2)

![image](https://github.com/TenesisEspana/travelmanagament/assets/37408577/00fb386a-4180-4f56-992f-fa832c381a77)

![image](https://github.com/TenesisEspana/travelmanagament/assets/37408577/dbd0c6e9-4e43-478b-b1d4-74090deaf9a3)

![image](https://github.com/TenesisEspana/travelmanagament/assets/37408577/a66505b9-80fc-4551-ac63-0bfcb23670db)

![Alt text](284275354-c47252b2-5286-4eff-a932-b298d5ee1c5f.png)

* En el View Name se colocara el nombre de la vista en mi caso ***main***

![Alt text](284275417-f279b608-500a-46f0-9683-d443f4dcea1e.png)

![Alt text](284275529-459facf6-62d8-4d96-88ab-3cae4fcee50e.png)

![Alt text](284275579-930a6965-e82e-4545-b612-763e0655c36b.png)

### Ya creado el proyecto fiori, dentro de la carpeta de webapp se encuentra las subcarpetas View donde estan las vistas **main.view.xml, formsale.view.xml, statistics.view.xml**, en el controller se encuentran los archivos ***main.controller.js, formsale.controller.js, statistics.controller.js*** y en la raíz del proyecto el ***manifest.json***

![image](https://github.com/TenesisEspana/travelmanagament/assets/37408577/3cb032dc-24aa-48ee-8089-313f4c2318f9)

* Main.view.xml

```xml
<mvc:View controllerName="sybcool.travelmanagement.controller.main"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:tnt="sap.tnt"
    xmlns:layout="sap.ui.layout"
	xmlns:p13n="sap.m.p13n"
	xmlns:plugins="sap.m.plugins"
	xmlns:smartFilterBar="sap.ui.comp.smartfilterbar"
	xmlns:smartTable="sap.ui.comp.smarttable"
	xmlns:core="sap.ui.core"
	height="100%"
	>
    
	<tnt:ToolPage 
		id="toolPage" >
		<tnt:header>
			<tnt:ToolHeader id="_IDGenToolHeader1">
				<Button
					id="sideNavigationToggleButton"
					icon="sap-icon://menu2"
					type="Transparent"
					press=".onSideNavButtonPress">
					<layoutData>
						<OverflowToolbarLayoutData id="_IDGenOverflowToolbarLayoutData1" priority="NeverOverflow" />
					</layoutData>
				</Button>
				<ToolbarSpacer id="_IDGenToolbarSpacer1" width="20px" />
				
				<tnt:ToolHeaderUtilitySeparator id="_IDGenToolHeaderUtilitySeparator1" />
				<ToolbarSpacer id="_IDGenToolbarSpacer2">
					<layoutData>
						<OverflowToolbarLayoutData id="_IDGenOverflowToolbarLayoutData2" priority="NeverOverflow" minWidth="20px" />
					</layoutData>
				</ToolbarSpacer>
				
			</tnt:ToolHeader>
		</tnt:header>
		<tnt:sideContent>
			<tnt:SideNavigation id="_IDGenSideNavigation1"
				expanded="true"
				selectedKey="{ventas>/selectedKey}"
				itemSelect=".onItemSelect">
				<tnt:NavigationList id="_IDGenNavigationList1" items="{path: 'ventas>/navigation/'}">
					<tnt:NavigationListItem id="_IDGenNavigationListItem1"
						text="{ventas>title}"
						icon="{ventas>icon}"
						enabled="{ventas>enabled}"
						expanded="{ventas>expanded}"
						items="{ventas>items}"
						key="{ventas>key}">
						<tnt:NavigationListItem id="_IDGenNavigationListItem2"
							text="{ventas>title}"
							key="{ventas>key}"
							enabled="{ventas>enabled}" />
					</tnt:NavigationListItem>
				</tnt:NavigationList>
				
			</tnt:SideNavigation>
		</tnt:sideContent>
		<tnt:mainContents >
			<NavContainer id="pageContainer" initialPage="page2" >
				<pages >
					
					<ScrollContainer
						id="root1"
						horizontal="false"
						vertical="true"
						height="100%"
						class="sapUiContentPadding">
						<Text id="_IDGenText1" text="This is the root page" />
					</ScrollContainer>
					<ScrollContainer
						id="page1"
						horizontal="false"
						vertical="true"
						height="100%"
						class="sapUiContentPadding">
						<Text id="_IDGenText2" text="This is the first page" />
					</ScrollContainer>
					<ScrollContainer
						id="page2"
						horizontal="false"
						vertical="true"
						height="100%"
						class="sapUiContentPadding">

						<ObjectHeader
							id="oh1"
							responsive="true"
							binding="{ventas>/ProductCollection/}"
							intro="{ventas>Description}"
							title="{ventas>Name}"
							showMarkers="true"
							markFlagged="true"
							markFavorite="true"
							numberState="Success"
							backgroundDesign="Translucent">
							<attributes>
								<ObjectAttribute id="_IDGenObjectAttribute1"
									text="{ventas>SupplierName}"/>
							</attributes>
							<statuses>
								<ObjectStatus id="_IDGenObjectStatus1"
									title="Estado"
									text="Activo"
									state="Warning"/>
							</statuses>
							<headerContainer >
								<HeaderContainer scrollStep="200" id="headerContainer" content="{ventas>/ContentData/}">
									<TileContent id="_IDGenTileContent1" unit="{ventas>Siglas}" footer="{ventas>Country}">
									<content>
										<NumericContent id="_IDGenNumericContent2" value="{ventas>value}" icon="sap-icon://travel-expense" valueColor="{ventas>color}" indicator="{ventas>growth}" press="press"/>
									</content>
								</TileContent>
								</HeaderContainer>
							</headerContainer>
							
						</ObjectHeader>
						<HeaderContainer id="_IDGenHeaderContainer1" scrollStep="200">

							<content>
								<Label id="_IDGenLabel1"/>
								<Table
									id="idbusinessDataTable"
									items="{ventas>/businessData}">
									<headerToolbar>
										<OverflowToolbar id="otbSubheader">
											<ToolbarSpacer id="_IDGenToolbarSpacer3"/>
											<ToolbarSpacer id="_IDGenToolbarSpacer4"/>
											<SearchField ariaLabelledBy="text1" id="maxPrice" liveChange="onFilter">
												<layoutData>
													<OverflowToolbarLayoutData 
														id="_IDGenOverflowToolbarLayoutData3" 
														maxWidth="300px" 
														shrinkable="true" 
														priority="NeverOverflow"/>
												</layoutData>
											</SearchField>
											<OverflowToolbarButton id="_IDGenOverflowToolbarButton1" tooltip="Sort" type="Transparent" text="Sort" icon="sap-icon://sort" press="onSort"/>
											<OverflowToolbarButton id="_IDGenOverflowToolbarButton2" tooltip="Group" type="Transparent" text="Group" icon="sap-icon://group-2" press="onGroup"/>
											
										</OverflowToolbar>
									</headerToolbar>
									<columns>
										<Column id="_IDGenColumn6" width="12em"><Text id="_IDGenText12" text="Pais" /></Column>
										<Column id="_IDGenColumn1" width="12em"><Text id="_IDGenText5" text="Mes de ventas" /></Column>
										<Column id="_IDGenColumn2" minScreenWidth="Tablet" demandPopin="true"><Text id="_IDGenText6" text="Nombre" /></Column>
										<Column id="_IDGenColumn3" width="12em"><Text id="_IDGenText7" text="N° Pasaporte/Identificación" /></Column>
										<Column id="_IDGenColumn4" hAlign="Center"><Text id="_IDGenText8" text="Costo" /></Column>
										<Column id="_IDGenColumn5" hAlign="Center"><Text id="_IDGenText11" text="Precio Unitario" /></Column>
									</columns>
									<items>
										<ColumnListItem id="_IDGenColumnListItem1">
											<cells>
												<Text id="_IDGenText14" text="{ventas>Country}" />
												<ObjectIdentifier id="_IDGenObjectIdentifier1" title="" text="{ventas>Sales_Month}" />
												<Text id="_IDGenText9" text="{ventas>nombre}" />
												<Text id="_IDGenText10" text="{ventas>identificacion}" />
												<Text id="_IDGenText15" text="{ventas>Cost}" />
												<ObjectNumber id="_IDGenObjectNumber1"
														number="{
															parts:[{path:'Price'},{path:'CurrencyCode'}],
															type: 'sap.ui.model.type.Currency',
															formatOptions: {showMeasure: false}
														}"
														unit="{ventas>Unit Price}" />
											</cells>
										</ColumnListItem>
									</items>
								</Table>
							</content>

						</HeaderContainer>
					</ScrollContainer>
					<ScrollContainer
						id="root2"
						horizontal="false"
						vertical="true"
						height="100%"
						class="sapUiContentPadding">
						<Text id="_IDGenText4" text="This is the root page of the second element" />
					</ScrollContainer>
					
				</pages>
			</NavContainer>
		</tnt:mainContents>
	</tnt:ToolPage>
</mvc:View>
```

* Main.controller.xml

```javascript
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
```
* formsale.view.xml

```xml
<mvc:View controllerName="sybcool.travelmanagement.controller.formsale"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:tnt="sap.tnt"
    xmlns:l="sap.ui.layout"
	xmlns:f="sap.ui.layout.form"
	xmlns:core="sap.ui.core"
	height="100%">

    <tnt:ToolPage 
		id="toolPage" >
		<tnt:header>
			<tnt:ToolHeader id="_IDGenToolHeader1">
				<Button
					id="sideNavigationToggleButton"
					icon="sap-icon://menu2"
					type="Transparent"
					press=".onSideNavButtonPress">
					<layoutData>
						<OverflowToolbarLayoutData id="_IDGenOverflowToolbarLayoutData1" priority="NeverOverflow" />
					</layoutData>
				</Button>
				<ToolbarSpacer id="_IDGenToolbarSpacer1" width="20px" />
				
				<tnt:ToolHeaderUtilitySeparator id="_IDGenToolHeaderUtilitySeparator1" />
				<ToolbarSpacer id="_IDGenToolbarSpacer2">
					<layoutData>
						<OverflowToolbarLayoutData id="_IDGenOverflowToolbarLayoutData2" priority="NeverOverflow" minWidth="20px" />
					</layoutData>
				</ToolbarSpacer>

				
			</tnt:ToolHeader>
		</tnt:header>
		<tnt:sideContent>
			<tnt:SideNavigation id="_IDGenSideNavigation1"
				expanded="true"
				selectedKey="{ventas>/selectedKey}"
				itemSelect=".onItemSelect">
				<tnt:NavigationList id="_IDGenNavigationList1" items="{path: 'ventas>/navigation/'}">
					<tnt:NavigationListItem id="_IDGenNavigationListItem1"
						text="{ventas>title}"
						icon="{ventas>icon}"
						enabled="{ventas>enabled}"
						expanded="{ventas>expanded}"
						items="{ventas>items}"
						key="{ventas>key}">
						<tnt:NavigationListItem id="_IDGenNavigationListItem2"
							text="{ventas>title}"
							key="{ventas>key}"
							enabled="{ventas>enabled}" />
					</tnt:NavigationListItem>
				</tnt:NavigationList>
				
			</tnt:SideNavigation>
		</tnt:sideContent>
		<tnt:mainContents >
			<NavContainer id="pageContainer" initialPage="page2" >
				<pages >
					
					<ScrollContainer
						id="root1"
						horizontal="false"
						vertical="true"
						height="100%"
						class="sapUiContentPadding">
						<Text id="_IDGenText1" text="This is the root page" />
					</ScrollContainer>
					<ScrollContainer
						id="page1"
						horizontal="false"
						vertical="true"
						height="100%"
						class="sapUiContentPadding">
						<Text id="_IDGenText2" text="This is the first page" />
					</ScrollContainer>
					<ScrollContainer
						id="page2"
						horizontal="false"
						vertical="true"
						height="100%"
						class="sapUiContentPadding">
						
						<VBox id="_IDGenVBox1" class="sapUiSmallMargin">
							<f:SimpleForm id="SimpleFormToolbar"
								editable="true"
								title="Personal"
								layout="ResponsiveGridLayout"
								labelSpanXL="4"
								labelSpanL="3"
								labelSpanM="4"
								labelSpanS="12"
								adjustLabelSpan="false"
								emptySpanXL="0"
								emptySpanL="4"
								emptySpanM="0"
								emptySpanS="0"
								columnsXL="2"
								columnsL="1"
								columnsM="1"
								singleContainerFullSize="false"
								ariaLabelledBy="Title1" >
								<f:toolbar>
									<Toolbar id="TB1">
										<Title id="Title1" text="Datos de venta"/>
										<ToolbarSpacer id="_IDGenToolbarSpacer3" />
									</Toolbar>
								</f:toolbar>
								<f:content>
									<Toolbar id="_IDGenToolbar2" ariaLabelledBy="Title3">
										<Title id="Title4" text="Detalles del viaje"/>
										<ToolbarSpacer id="_IDGenToolbarSpacer5" />
									</Toolbar>
									<Label id="_IDGenLabel6"  text="Origen y destino del viaje" />
									<Input id="_IDGenInput6"  value="Venezuela" editable="false" />
									<Input id="_IDGenInput7"  value="{ventas>Country}" editable="false" />
									<Label id="_IDGenLabel7"  text="Fecha Salida/llegada" />
									<DatePicker id="_IDGenDatePicker1" value="{ventas>departureDate}" change="onDateChange" editable="false" />
									<DatePicker id="_IDGenDatePicker2" value="{ventas>arrivalDate}" change="onDateChange" editable="false" />
									<Label id="_IDGenLabel8"  text="Clase" />
									<Input id="_IDGenInput10"  value="{ventas>clase}" editable="false" />

									<Toolbar id="_IDGenToolbar4" ariaLabelledBy="Title3">
										<Title id="Title5" text="Información del boleto:"/>
										<ToolbarSpacer id="_IDGenToolbarSpacer6" />
									</Toolbar>
									<Label id="_IDGenLabel9"  text="Costo del boleto "  />
									<Input id="_IDGenInput11"  value="{ventas>value}" editable="false" liveChange="onInputChange" />
									<Label id="_IDGenLabel11"  text="Cantidad de boletos Disponibles" />
									<Input id="_IDGenInput13"  value="{ventas>Cantidad_boletos}" editable="false" liveChange="onInputChange" />
									<Label id="_IDGenLabel10"  text="Método de pago utilizado"  />
									<Input id="_IDGenInput12"  value="Dolar" editable="false" />
									

								</f:content>
							</f:SimpleForm>
						</VBox>


						
					</ScrollContainer>
					<ScrollContainer
						id="root2"
						horizontal="false"
						vertical="true"
						height="100%"
						class="sapUiContentPadding">
						<Text id="_IDGenText4" text="This is the root page of the second element" />
					</ScrollContainer>
					
				</pages>
			</NavContainer>
		</tnt:mainContents>
	</tnt:ToolPage>

</mvc:View>
```

* controlador de la vista formsale.view.xml
    * formsale.controller.js

```javascript
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
```

* vista statistics.view.xml

```xml
<mvc:View 
    controllerName="sybcool.travelmanagement.controller.statistics"
    xmlns="sap.suite.ui.commons"
	xmlns:m="sap.m"
	xmlns:mvc="sap.ui.core.mvc"
	xmlns:viz="sap.viz.ui5.controls"
	xmlns:layout="sap.ui.layout"
	height="100%">
    <m:Page id="_IDGenPage1"
		showNavButton="true"
		navButtonPress="onBack"
        class="sapDemokitSuiteChartContainerFixFlex" title="ChartContainer" enableScrolling="true">
        <layout:VerticalLayout id="_IDGenVerticalLayout1">
            <m:Button id="_IDGenButton1" text="To the first Page" press="onToPage1" visible="false"/>
            <m:Link id="link" text="A link to the first Page" visible="false"/>
        </layout:VerticalLayout>
		<m:content>
			<layout:FixFlex id="_IDGenFixFlex1">

				<layout:flexContent>
					<ChartContainer
						class="sapUiResponsiveContentPadding"
						id="chartContainer"
						showFullScreen="true"
						showPersonalization="false"
						autoAdjustHeight="true"
						personalizationPress="attachPersonalizationPress"
						contentChange="attachContentChange"
						title="Revenue">
						<content>
							<ChartContainerContent id="_IDGenChartContainerContent1"
								icon="sap-icon://line-chart"
								title="Line Chart">
								<content>
									<viz:VizFrame id="chartContainerVizFrame" height="100%" width="100%"
									              uiConfig="{applicationSet:'fiori'}"></viz:VizFrame>
								</content>
							</ChartContainerContent>
							<ChartContainerContent id="_IDGenChartContainerContent2"
								icon="sap-icon://table-view"
								title="Table">
								<content>
									<m:Table id="chartContainerContentTable"></m:Table>
								</content>
							</ChartContainerContent>
						</content>
					</ChartContainer>
				</layout:flexContent>
			</layout:FixFlex>
		</m:content>
	</m:Page>
</mvc:View>
```
* controlador de la vista statistics.view.xml
    * statistics.controller.js

```javascript
sap.ui.define( ["sap/ui/core/mvc/Controller", 
				"sap/ui/core/routing/History", 
				'sap/ui/model/json/JSONModel', 
				'sap/viz/ui5/data/FlattenedDataset', 
				'sap/viz/ui5/controls/common/feeds/FeedItem', 
				'sap/m/Label',
				'sap/m/ColumnListItem', 
				'sap/m/library', 
				'sap/m/MessageToast', 
				'sap/m/Column' 
], function (Controller, History, JSONModel, FlattenedDataset, FeedItem, Label, ColumnListItem, MobileLibrary, MessageToast, Column) {
	"use strict";

	return Controller.extend("sybcool.travelmanagement.controller.statistics", {
		onInit : function () {
			console.log("Entro es estadisticas");
			var oVizFrame = this.getView().byId(this._constants.vizFrame.id);
			var oTable = this.getView().byId(this._constants.table.id);

			this._updateVizFrame(oVizFrame);
			this._updateTable(oTable);

			var sUrl = "#" + this.getOwnerComponent().getRouter().getURL("Targetmain");
			this.byId("link").setHref(sUrl);
		},

		onToPage1 : function () {
			this.getOwnerComponent().getRouter().navTo("Targetmain");
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

		_constants: {
			sampleName: "sybcool/travelmanagement/controller",
			vizFrame: {
				id: "chartContainerVizFrame",
				dataset: {
					dimensions: [{
						name: 'Country',
						value: "{Country}"
					}],
					measures: [{
						group: 1,
						name: 'Profit',
						value: '{Revenue2}'
					}, {
						group: 1,
						name: 'Target',
						value: '{Target}'
					}, {
						group: 1,
						name: "Forcast",
						value: "{Forcast}"
					}, {
						group: 1,
						name: "Revenue",
						value: "{Revenue}"
					}, {
						group: 1,
						name: 'Revenue2',
						value: '{Revenue2}'
					}, {
						group: 1,
						name: "Revenue3",
						value: "{Revenue3}"
					}],
					data: {
						path: "/Products"
					}
				},
				modulePath: "ventas",
				type: "line",
				properties: {
					plotArea: {
						showGap: true
					}
				},
				feedItems: [{
					'uid': "primaryValues",
					'type': "Measure",
					'values': ["Revenue"]
				}, {
					'uid': "axisLabels",
					'type': "Dimension",
					'values': ["Country"]
				}, {
					'uid': "targetValues",
					'type': "Measure",
					'values': ["Target"]
				}]
			},
			table: {
				id: "chartContainerContentTable",
				itemBindingPath: "/businessData",
				columnLabelTexts: ["Sales Month", "Marital Status", "Customer Gender", "Sales Quarter", "Cost", "Unit Price", "Gross Profit", "Sales Revenue"],
				templateCellLabelTexts: ["{Sales_Month}", "{Marital Status}", "{Customer Gender}", "{Sales_Quarter}", "{Cost}", "{Unit Price}", "{Gross Profit}", "{Sales Revenue}"],
				modulePath: "ventas"
			}
		},
		/* ============================================================ */
		/* Life-cycle Handling                                          */
		/* ============================================================ */
		/**
		 * Method called when the application is initalized.
		 *
		 * @public
		 */
		/* ============================================================ */
		/* Helper Methods                                               */
		/* ============================================================ */
		/**
		 * Updated the Viz Frame in the view.
		 *
		 * @private
		 * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame that needs to be updated
		 */
		_updateVizFrame: function(vizFrame) {
			var oVizFrame = this._constants.vizFrame;
			var oVizFramePath = sap.ui.require.toUrl(this._constants.sampleName + oVizFrame.modulePath);
			var oModel = this.getOwnerComponent().getModel("ventas");
			//var oModel = new JSONModel(oVizFramePath);
			var oDataset = new FlattenedDataset(oVizFrame.dataset);

			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			vizFrame.setModel(oModel);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},
		/**
		 * Updated the Table in the view.
		 *
		 * @private
		 * @param {sap.m.table} table Table that needs to be updated
		 */
		_updateTable: function(table) {
			var oTable = this._constants.table;
			var oTablePath = sap.ui.require.toUrl(this._constants.sampleName + oTable.modulePath);
			var oTableModel = this.getOwnerComponent().getModel("ventas");
			//var oTableModel = new JSONModel(oTablePath);
			var aColumns = this._createTableColumns(oTable.columnLabelTexts);

			for (var i = 0; i < aColumns.length; i++) {
				table.addColumn(aColumns[i]);
			}

			var oTableTemplate = new ColumnListItem({
				type: MobileLibrary.ListType.Active,
				cells: this._createLabels(oTable.templateCellLabelTexts)
			});

			table.bindItems(oTable.itemBindingPath, oTableTemplate);
			table.setModel(oTableModel);
		},
		/**
		 * Adds the passed feed items to the passed Viz Frame.
		 *
		 * @private
		 * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame to add feed items to
		 * @param {Object[]} feedItems Feed items to add
		 */
		_addFeedItems: function(vizFrame, feedItems) {
			for (var i = 0; i < feedItems.length; i++) {
				vizFrame.addFeed(new FeedItem(feedItems[i]));
			}
		},
		/**
		 * Creates table columns with labels as headers.
		 *
		 * @private
		 * @param {String[]} labels Column labels
		 * @returns {sap.m.Column[]} Array of columns
		 */
		_createTableColumns: function(labels) {
			var aLabels = this._createLabels(labels);
			return this._createControls(Column, "header", aLabels);
		},
		/**
		 * Creates label control array with the specified texts.
		 *
		 * @private
		 * @param {String[]} labelTexts text array
		 * @returns {sap.m.Column[]} Array of columns
		 */
		_createLabels: function(labelTexts) {
			return this._createControls(Label, "text", labelTexts);
		},
		/**
		 * Creates an array of controls with the specified control type, property name and value.
		 *
		 * @private
		 * @param {sap.ui.core.Control} Control Control type to create
		 * @param {String} prop Property name
		 * @param {Array} propValues Value of the control's property
		 * @returns {sap.ui.core.Control[]} array of the new controls
		 */
		_createControls: function(Control, prop, propValues) {
			var aControls = [];
			var oProps = {};
			for (var i = 0; i < propValues.length; i++) {
				oProps[prop] = propValues[i];
				aControls.push(new Control(oProps));
			}
			return aControls;
		}

	});

});
```
* Docuemnto manifest.js
    * en este docuemnto se realizaron los target y se llamo al servicio Mock Server

```javascript
{
  "_version": "1.59.0",
  "sap.app": {
    "id": "sybcool.travelmanagement",
    "type": "application",
    "i18n": "i18n/i18n.properties",
    "applicationVersion": {
      "version": "0.0.1"
    },
    "title": "{{appTitle}}",
    "description": "{{appDescription}}",
    "resources": "resources.json",
    "sourceTemplate": {
      "id": "@sap/generator-fiori:basic",
      "version": "1.11.5",
      "toolsId": "5d73b43b-ffcd-4ee5-8f50-24a28253899c"
    },
    "crossNavigation": {
      "inbounds": {
        "travelmanagement-display": {
          "semanticObject": "travelmanagement",
          "action": "display",
          "title": "{{flpTitle}}",
          "subTitle": "{{flpSubtitle}}",
          "signature": {
            "parameters": {},
            "additionalParameters": "allowed"
          }
        }
      }
    }
  },
  "sap.ui": {
    "technology": "UI5",
    "icons": {
      "icon": "",
      "favIcon": "",
      "phone": "",
      "phone@2": "",
      "tablet": "",
      "tablet@2": ""
    },
    "deviceTypes": {
      "desktop": true,
      "tablet": true,
      "phone": true
    }
  },
  "sap.ui5": {
    "flexEnabled": true,
    "dependencies": {
      "minUI5Version": "1.120.1",
      "libs": {
        "sap.m": {},
        "sap.ui.core": {},
        "sap.f": {},
        "sap.suite.ui.generic.template": {},
        "sap.ui.comp": {},
        "sap.ui.generic.app": {},
        "sap.ui.table": {},
        "sap.ushell": {},
        "sap.tnt": {}
      }
    },
    "contentDensities": {
      "compact": true,
      "cozy": true
    },
    "models": {
      "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": {
          "bundleName": "sybcool.travelmanagement.i18n.i18n"
        }
      },
      "ventas":{
        "type": "sap.ui.model.json.JSONModel",
        "uri": "https://646f86fd-2388-4b6d-a69a-906964e500bb.mock.pstmn.io/v1/data"
      }
    },
    "resources": {
      "css": [
        {
          "uri": "css/style.css"
        }
      ]
    },
    "config": {
			"sample": {
				"stretch": true,
				"files": [
					"main.view.xml",
					"main.controller.js",
					"css/style.css",
					"manifest.json",
          "Component.js",
          "statistics.view.xml",
          "statistics.controller.xml",
          "App.view.xm",
          "index.html"
				]
			}
		},
    "routing": {
      "config": {
        "routerClass": "sap.m.routing.Router",
        "viewType": "XML",
        "async": true,
        "viewPath": "sybcool.travelmanagement.view",
        "controlAggregation": "pages",
        "clearControlAggregation": false,
        "controlId": "app",
        "clearTarget": false,
        "bypassed": {
          "target" : "TargetNotFound"
        }
      },
      "routes": [
        {
          "name": "Targetmain", 
          "pattern": ":?query:",
					"target": [
            "Targetmain"
          ]
        },
        {
          "name": "Targetestatistics",
          "pattern": "Targetestatistics",
          "target": [
            "Targetestatistics"
          ]
        },
        {
          "name": "Targetformsale",
          "pattern": "Targetformsale/{parameter}",
					"titleTarget": "",
					"greedy": false,
          "target": [
            "Targetformsale"
          ]
        }
      ],
      "targets": {
        "Targetmain": {
          "viewType": "XML",
          "transition": "slide",
          "clearControlAggregation": false,
          "viewId": "main",
          "viewName": "main",
          "level": 0
        },
        "Targetestatistics": {
          "viewType": "XML",
          "transition": "slide",
          "clearControlAggregation": false,
          "viewId": "statistics",
          "viewName": "statistics",
          "level": 1
        },
        "Targetformsale": {
          "viewType": "XML",
          "transition": "slide",
          "clearControlAggregation": false,
          "viewId": "formsale",
          "viewName": "formsale",
          "level": 3
        },
        "TargetNotFound": {
          "viewType": "XML",
          "transition": "slide",
          "clearControlAggregation": false,
          "viewId": "NotFound",
          "viewName": "NotFound"
        }
      }
    },
    "rootView": {
      "viewName": "sybcool.travelmanagement.view.App",
      "type": "XML",
      "async": true,
      "id": "App"
    }
  },
  "sap.cloud": {
    "public": true,
    "service": "sybcooltravelmanagement"
  }
}
```

Tarjetas a utilizar:
* [https://sapui5.netweaver.ondemand.com/sdk/#/entity/sap.tnt.ToolPage/sample/sap.tnt.sample.ToolPage/code](https://sapui5.netweaver.ondemand.com/sdk/#/entity/sap.tnt.ToolPage/sample/sap.tnt.sample.ToolPage/code)
* [https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.HeaderContainer/sample/sap.m.sample.HeaderContainerLazyLoading](https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.HeaderContainer/sample/sap.m.sample.HeaderContainerLazyLoading)
* [https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Table/sample/sap.m.sample.TableScrollToIndex/code](https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Table/sample/sap.m.sample.TableScrollToIndex/code)
* [https://sapui5.hana.ondemand.com/sdk/#/entity/sap.suite.ui.commons.ChartContainer/sample/sap.suite.ui.commons.sample.ChartContainerFixFlexLayout](https://sapui5.hana.ondemand.com/sdk/#/entity/sap.suite.ui.commons.ChartContainer/sample/sap.suite.ui.commons.sample.ChartContainerFixFlexLayout)
