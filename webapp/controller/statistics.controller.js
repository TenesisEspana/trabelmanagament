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
