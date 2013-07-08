
goog.provide('lgb.controller.PropertiesController');


goog.require('lgb.controller.BaseController');
goog.require('lgb.view.PropertiesView');
goog.require('lgb.view.PropertiesButtonView');


/**@extends lgb.controller.BaseController
 */
lgb.controller.PropertiesController = function() {

  lgb.controller.BaseController.call(this);
    this.init_();
};
goog.inherits(
  lgb.controller.PropertiesController,
  lgb.controller.BaseController);


lgb.controller.PropertiesController.prototype.init_ = function() {
    this.bind_();
};



lgb.controller.PropertiesController.prototype.onScenarioParsed_ =
  function(event) {

  this.buttonView = new lgb.view.PropertiesButtonView();
  this.buttonView.init();
  
  this.dataModel = event.payload;
  this.view = new lgb.view.PropertiesView(this.dataModel);

  this.listenTo(this.view,
    e.ViewClosed,
    this.onClosedPanel);

  this.listenTo(this.dataModel,
    e.DataModelChanged,
    this.onDataModelChanged_);

  this.listenTo(this.buttonView,
    e.RequestActivateView,
    this.onRequestActivateView_);

  this.listen(lgb.events.WorldSelectionChanged.TYPE,
    this.onWorldSelectionChanged);
    
  this.trigger(e.RequestAddToLayout, this.buttonView);
  this.trigger(e.RequestAddToLayout, this.view);

};



lgb.controller.PropertiesController.prototype.bind_ = function() {
    
  this.listen(e.ScenarioParsed, this.onScenarioParsed_);
};



/**
 * @param {lgb.events.Event} event The event.
 */
lgb.controller.PropertiesController.prototype.onRequestActivateView_ =
  function(event) {
    
  var showFlag = event.payload;

  this.buttonView.setSelected(showFlag);
  this.view.show(showFlag);

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



lgb.controller.PropertiesController.prototype.onDataModelChanged_ =
  function(event) {

  var e = new lgb.events.RequestWorldSelectionChange(
    this.dataModel.selectedSystemNode.id);

  this.dispatch(e);
};


/**
 * @param {lgb.events.Event} event The event.
 */
lgb.controller.PropertiesController.prototype.onClosedPanel =
  function(event) {
    
  this.buttonView.setSelected(false);
  
};
