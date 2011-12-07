goog.provide('lgb.view.PropertiesView');
goog.require('lgb.view.DialogView');
goog.require('lgb.view.component.FaultWidget');
goog.require('lgb.view.component.InputWidget');

/**
 * @constructor
 * @param {lgb.model.scenario.Base} dataModel The data model to display.
 * @extends {lgb.view.DialogView}
 */
lgb.view.PropertiesView = function(dataModel) {

  lgb.view.DialogView.call(this, dataModel);
  this.currentSelectionIdx = -1;
  this.htmlID = 'propertiesView';
  this.title = 'Properties';

  /** @type {*} */
  this.kendoDropDownList = null;

  /** @type {*} */
  this.kendoTabStrip = null;

  this.injectHtml_();
  this.showNode(this.dataModel.selectedSystemNode);
  this.setDropDownSelection(this.dataModel.selectedSystemNode);

  this._NAME = 'lgb.view.PropertiesView';
};
goog.inherits(lgb.view.PropertiesView, lgb.view.DialogView);

/**
 * Event handler triggered when the dataModel changes
 * @param {goog.events.Event} event The event received.
 */
lgb.view.PropertiesView.prototype.onChange = function(event) {
   this.setDropDownSelection(this.dataModel.selectedSystemNode);
   this.showNode(this.dataModel.selectedSystemNode);
};

/**
 * Event handler triggered when the user clicks the
 * close button (x) on the dialog.
 * @param {goog.events.Event} event The event received.
 */
lgb.view.PropertiesView.prototype.onCloseButtonClicked = function(event) {
  this.dispatchLocal(new lgb.events.ViewClosed());
};

/**
 * injects HTML into the DOM
 * @private
 */
lgb.view.PropertiesView.prototype.injectHtml_ = function() {
  this.makeDialog_();
  this.makeListBox_();
  this.makeTabs_();
};


/**
 * injects the tabs into the DOM
 * @private
 */
lgb.view.PropertiesView.prototype.makeTabs_ = function() {
  var htmlTabs =
  '<div id="tabstripContent" class="k-content">' +
    '<div id="tabstrip" />' +
  '</div>';

  this.jq().append(htmlTabs);
  this.kendoTabStrip = $('#tabstrip').kendoTabStrip(
    {animation: false}
  ).data('kendoTabStrip');

  this.kendoTabStrip.append(
      [
        {text: 'Input'},
        {text: 'Faults'},
        {text: 'I2'},
        {text: 'F2'}
      ]
  );

  this.kendoTabStrip.select(this.kendoTabStrip.tabGroup[0].children[0]);
};


/**
 * injects the dialog panel into the DOM
 * @private
 */
lgb.view.PropertiesView.prototype.makeDialog_ = function() {

    var jq = $('<div>')
    .attr('id', this.htmlID);
    jq.direction = 'left';
    jq.bind('dialogclose', this.d(this.onCloseButtonClicked));

    jq.appendTo('body');

    this.dialog = jq.dialog({
      title: this.title,
      dialogClass: this.htmlID + '-dialog',
      hide: 'fade',
      width: 500,
      height: 500,
      position: ['right', 'bottom'],
      autoOpen: false
    });
};

/**
 * injects the dropdown list box into the DOM
 * @private
 */
lgb.view.PropertiesView.prototype.makeListBox_ = function() {
    this.comboBoxId = this.htmlID + '-comboBox';

    $('<div>')
    .addClass('propertiesSubPanel')
    .append('<input>')
    .attr('id', this.comboBoxId)
    .attr('value', '1')
    .appendTo(this.jq());


    this.kendoDropDownList = $('#' + this.comboBoxId)
      .kendoDropDownList({
        dataSource: this.dataModel.systemNodeArray,
            dataTextField: 'name',
            dataValueField: 'id',
        change: this.d(this.onDropDownChange)
      }).data('kendoDropDownList');

};


/**
 * Event handler for when a user makes a selection
 * @param {goog.events.Event} event The Event that notifies us the
 * user has made a selection.
 */
lgb.view.PropertiesView.prototype.onDropDownChange = function(event) {
  var jq = $('#' + this.comboBoxId);
  var id = jq[0].value;

  this.dataModel.selectId(id);

};


/**
 * Changes the value selected in the dropdown list box.
 * @param {!lgb.model.scenario.SystemNode} systemNode  Used to
 * identify the value to select.
 */
lgb.view.PropertiesView.prototype.setDropDownSelection = function(systemNode) {

  if (systemNode.idx != this.currentSelectionIdx) {
      this.currentSelectionIdx = systemNode.idx;
      this.kendoDropDownList.select(this.currentSelectionIdx);
  }
};

/**
 * Displays the details of  the systemNode
 * @param {!lgb.model.scenario.SystemNode} systemNode Used to
 * populate the tabs.
 */
lgb.view.PropertiesView.prototype.showNode = function(systemNode) {
  $('#tabstrip-1').empty();
  $('#tabstrip-2').empty();
  $('#tabstrip-3').empty();
  $('#tabstrip-4').empty();

  var dataSources = systemNode.getDataSources();

  $('#tabstrip-3').kendoGrid({
       dataSource: dataSources.inputs,
     scrollable: false,
     sortable: false
   });

  $('#tabstrip-4').kendoGrid({
       dataSource: dataSources.faults,
     scrollable: false,
     sortable: false
   });

  //$('#tabstrip-3').text(systemNode.idx.toString());
  var inputs = systemNode.getInputs();
  var j = inputs.length;

  while (j--) {
      var sysVar = inputs[j];
    var widget = new lgb.view.component.InputWidget(sysVar);
      widget.injectHtml('#tabstrip-1', j);
  }



  var faults = systemNode.getFaults();
  var i = faults.length;

  while (i--) {
    var sysVar = faults[i];

    if (sysVar.faultWidgetType == 'CHECKBOX') {


    } else {
    var f = new lgb.view.component.FaultWidget(sysVar);
      f.injectHtml('#tabstrip-2', i);
    }

  }



};
