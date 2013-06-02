/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.PropertiesView');
goog.require('lgb.view.DialogView');
goog.require('lgb.component.FaultWidget');
goog.require('lgb.component.InputWidget');

/**
 * @constructor
 * @param {lgb.model.scenario.Base} dataModel The data model to display.
 * @extends {lgb.view.DialogView}
 */
lgb.view.PropertiesView = function(dataModel) {

  
  this.layoutID = lgb.Config.LAYOUT_ID.PropertiesView;
   
  lgb.view.DialogView.call(this, dataModel, 'propertiesView', lgb.Config.HUD_CONTAINER_STR);
  
  this.currentSelectionIdx = -1;
  this.title = 'Properties';

  /** @type {*} */
  this.kendoDropDownList = null;

  /** @type {*} */
  this.kendoTabStrip_ = null;



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
  
  this.triggerLocal(e.ViewClosed);
};

/**
 * injects HTML into the DOM
 * @private
 */
lgb.view.PropertiesView.prototype.inject = function(parentElement) {
  
  goog.base(this, 'inject', parentElement);
  
  this.makeDialog_();
  this.makeListBox_();
  this.makeTabs_();
  
  this.showNode(this.dataModel.selectedSystemNode);
  this.setDropDownSelection(this.dataModel.selectedSystemNode);
};



/**
 *
 * injects the dialog panel into the DOM
 * @private
 */
lgb.view.PropertiesView.prototype.makeDialog_ = function() {

    var el = this.getMainElement();
    el.direction = 'left';

    this.dialog = el.dialog({
      title: this.title,
      dialogClass: this.htmlID + '-dialog',
      hide: 'fade',
      width: 500,
      height: 500,
      position: ['right', 'bottom'],
      autoOpen: false
    });
    
    el.bind('dialogclose', this.d(this.onCloseButtonClicked));
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

  var el = this.getMainElement();

  el.append(htmlTabs);
  
  this.kendoTabStrip_ = $('#tabstrip').kendoTabStrip(
    {animation: false}
  ).data('kendoTabStrip');

  this.kendoTabStrip_.append(
      [
        {text: 'Input'},
        {text: 'Faults'},
        {text: 'I2'},
        {text: 'F2'}
      ]
  );

  this.kendoTabStrip_.select(this.kendoTabStrip_.tabGroup[0].children[0]);
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
    var widget = new lgb.component.InputWidget(sysVar);
      widget.injectHtml('#tabstrip-1', j);
  }



  var faults = systemNode.getFaults();
  var i = faults.length;

  while (i--) {
    var sysVar = faults[i];

    if (sysVar.faultWidgetType == 'CHECKBOX') {


    } else {
    var f = new lgb.component.FaultWidget(sysVar);
      f.injectHtml('#tabstrip-2', i);
    }

  }



};
