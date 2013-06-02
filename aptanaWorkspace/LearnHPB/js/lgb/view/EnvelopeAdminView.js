/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.EnvelopeAdminView');

goog.require('lgb.component.RadioButtonDataSource');
goog.require('lgb.component.RadioButtonGroup');



goog.require('lgb.view.BaseViewGUI');


/**
 * @constructor
 * @extends {lgb.view.BaseViewGUI}
 * @param {lgb.model.EnvelopeModel} dataModel the model to display.
 * @param {string} parentHtmlID The CSS id of the DOM parent.
 */
lgb.view.EnvelopeAdminView = function(dataModel, parentHtmlID) {
    

  lgb.view.BaseViewGUI.call(this, dataModel, 'envelopeAdminView', parentHtmlID);

  this.init_();

};
goog.inherits(lgb.view.EnvelopeAdminView, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 * @private
 */
lgb.view.EnvelopeAdminView.prototype.init_ = function() {
  this.injectHtml();
  this.bind_();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.view.EnvelopeAdminView.prototype.bind_ = function() {

  this.rbGroupFloorHeight.bind();
  this.rbGroupStories.bind();

  this.listenTo(this.dataSourceFloorHeight,
    e.DataSourceChanged,
    this.onFloorHeightChanged_
    );

  this.listenTo(this.dataSourceFloorCount,
    e.DataSourceChanged,
    this.onFloorCountChanged_
    );
};




lgb.view.EnvelopeAdminView.prototype.onFloorCountChanged_ = function(event) {

  this.requestDataModelChange('floorCount', this.dataSourceFloorCount.theSelectedOne.value);

};



lgb.view.EnvelopeAdminView.prototype.onFloorHeightChanged_ = function(event) {

  this.requestDataModelChange('floorHeight', this.dataSourceFloorHeight.theSelectedOne.value);

};


/**
 * injects the html into the DOM
 */
lgb.view.EnvelopeAdminView.prototype.injectHtml = function() {


  this.dataSourceFloorHeight = new lgb.component.RadioButtonDataSource(
      'Select Floor-To-ceiling height',
      this.htmlID + '-0',
      'floor-height');

  this.dataSourceFloorHeight.addItem('13 ft', 13);
  this.dataSourceFloorHeight.addItem('11 ft', 11, true);
  this.dataSourceFloorHeight.addItem('9 ft', 9);

  this.rbGroupFloorHeight = new lgb.component.RadioButtonGroup(
    this.dataSourceFloorHeight
  );

  this.dataSourceFloorCount = new lgb.component.RadioButtonDataSource(
      'Select Number of Stories',
      this.htmlID + '-1',
      'stories');

  this.dataSourceFloorCount.addItem('7', 7);
  this.dataSourceFloorCount.addItem('5', 5, true);
  this.dataSourceFloorCount.addItem('3', 3);

  this.rbGroupStories = new lgb.component.RadioButtonGroup(
    this.dataSourceFloorCount
  );


  var divHtml = '<div id="{0}" class="adminSubPanel">' +
          '<h3>{1}</h3>' +
      this.rbGroupFloorHeight.getHTML() +
      this.rbGroupStories.getHTML() +
        '</div>';

  divHtml = divHtml.format(
    this.htmlID,
    this.dataModel._TITLE
    );


  this.append(divHtml);

};
