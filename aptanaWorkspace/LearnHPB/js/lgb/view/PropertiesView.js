/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.PropertiesView');
goog.require('lgb.view.input.DialogView');
goog.require('lgb.component.FaultWidget');
goog.require('lgb.component.InputWidget');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

/**
 * @constructor
 * @param {lgb.model.scenario.Base} dataModel The data model to display.
 * @extends {lgb.view.input.DialogView}
 */
lgb.view.PropertiesView = function(dataModel) {

  
  this.layoutID = lgb.Config.LAYOUT_ID.PropertiesView;
   
  lgb.view.input.DialogView.call(this, dataModel, 'propertiesView', lgb.Config.HUD_CONTAINER_STR);
  
  this.currentSelectionIdx = -1;
  this.title = 'Properties';
  this._TITLE = 'Properties';
  
  this.kendoDropDownList = null;
  this.kendoTabStrip_ = null;
  this.listenForChange_('selectedSystemNode');
};
goog.inherits(lgb.view.PropertiesView, lgb.view.input.DialogView);




lgb.view.PropertiesView.prototype.onChange_selectedSystemNode_ = function(selectedSystemNode) {
   this.setDropDownSelection(selectedSystemNode);
   this.showNode(selectedSystemNode);
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
  
  
  this.dataSource = new lgb.component.TabStripDataSource('PropertiesView-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabStrip1.setOptions({
    width : "100%"
  });
  
  var el = this.getMainElement();
  this.tabStrip1.inject(el);
  this.tabStrip1.injectCss();
  
  
  this.contentElementList_ = [];
  
  this.contentElementList_[0] = this.tabStrip1.addTab('Inputs');
  this.contentElementList_[1] = this.tabStrip1.addTab('Faults');
  this.contentElementList_[2] = this.tabStrip1.addTab('I2');
  this.contentElementList_[3] = this.tabStrip1.addTab('F2');

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

  this.triggerLocal(e.RequestSelectSystemNode, id);
  
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
  

  this.contentElementList_[0].empty();
  this.contentElementList_[1].empty();
  this.contentElementList_[2].empty();
  this.contentElementList_[3].empty();
  
  var dataSources = systemNode.getDataSources();

  this.contentElementList_[2].kendoGrid({
       dataSource: dataSources.inputs,
     scrollable: false,
     sortable: false
   });

  this.contentElementList_[3].kendoGrid({
       dataSource: dataSources.faults,
     scrollable: false,
     sortable: false
   });

  var inputs = systemNode.getInputs();
  var j = inputs.length;

  while (j--) {
    var sysVar = inputs[j];
    var widget = new lgb.component.InputWidget(sysVar);
    
    widget.inject(this.contentElementList_[0], j);
  }

  var faults = systemNode.getFaults();
  var i = faults.length;

  while (i--) {
    var sysVar = faults[i];

    if (sysVar.faultWidgetType == 'CHECKBOX') {


    } else {
    var f = new lgb.component.FaultWidget(sysVar);
      f.inject(this.contentElementList_[1], i);
    }

  }

};
