/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.PropertiesController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.events.RequestActivateView');
goog.require('lgb.events.RequestWorldSelectionChange');
goog.require('lgb.events.ScenarioParsed');
goog.require('lgb.events.WorldSelectionChanged');
goog.require('lgb.view.PropertiesButtonView');
goog.require('lgb.view.PropertiesView');


/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.PropertiesController = function() {
  lgb.controller.ControllerBase.call(this);

  this.listen(lgb.events.ScenarioParsed.TYPE, this.onScenarioParsed);
};
goog.inherits(
  lgb.controller.PropertiesController,
  lgb.controller.ControllerBase);



/**
 * @param {lgb.events.ScenarioParsed} event The event fired when the XML
 * is parsed.
 */
lgb.controller.PropertiesController.prototype.onScenarioParsed =
  function(event) {

  this.buttonView = new lgb.view.PropertiesButtonView();
  this.buttonView.init();

  this.dataModel = event.payload;
  this.view = new lgb.view.PropertiesView(this.dataModel);

  this.buttonView.show();

  this.listenTo(this.view,
    lgb.events.ViewClosed.TYPE,
    this.onClosedPanel);

  this.listenTo(this.dataModel,
    lgb.events.DataModelChanged.TYPE,
    this.onDataModelChanged_);

  this.listenTo(this.buttonView,
    lgb.events.RequestActivateView.TYPE,
    this.onRequestActivateView);

  this.listen(lgb.events.WorldSelectionChanged.TYPE,
    this.onWorldSelectionChanged);

};



/**
 * @param {lgb.events.RequestActivateView} event The event.
 */
lgb.controller.PropertiesController.prototype.onRequestActivateView =
  function(event) {
  var makeActiveFlag = event.payload;

  this.buttonView.setSelected(makeActiveFlag);

  if (makeActiveFlag) {
    this.view.show(false);
  } else {
    this.view.hide();
  }

};


/**
 * @param {lgb.events.WorldSelectionChanged} event The event.
 */
lgb.controller.PropertiesController.prototype.onWorldSelectionChanged =
  function(event) {
  var id = event.payload;
  if (id == 'NONE') {
    //TODO (Raj) deslect all
  } else {
    this.dataModel.selectId(id);
  }

};


/**
 * @private
 * @param {lgb.events.DataModelChanged} event The event.
 */
lgb.controller.PropertiesController.prototype.onDataModelChanged_ =
  function(event) {

  var e = new lgb.events.RequestWorldSelectionChange(
    this.dataModel.selectedSystemNode.id);

  this.dispatch(e);
};


/**
 * @param {lgb.events.ViewClosed} event The event.
 */
lgb.controller.PropertiesController.prototype.onClosedPanel =
  function(event) {
  this.buttonView.setSelected(false);
};
