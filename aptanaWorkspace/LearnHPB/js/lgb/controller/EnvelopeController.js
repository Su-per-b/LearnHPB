/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.EnvelopeController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.model.EnvelopeModel');
goog.require('lgb.view.EnvelopeView');
goog.require('lgb.view.input.EnvelopeGUI');


/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.EnvelopeController = function() {
  lgb.controller.BaseController.call(this);
};
goog.inherits(lgb.controller.EnvelopeController, lgb.controller.BaseController);


/**
 * @private
 */
lgb.controller.EnvelopeController.prototype.init = function() {

  this.dataModel = new lgb.model.EnvelopeModel();
  this.view = new lgb.view.EnvelopeView(this.dataModel);
  this.guiView = new lgb.view.input.EnvelopeGUI(this.dataModel);
  
  this.bind_();
  
  this.view.init();
  this.guiView.init();
  
  this.trigger(e.EnvelopeModelChanged, this.dataModel);

};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.EnvelopeController.prototype.bind_ = function() {

  
  this.relay(this.view, e.AddToWorldRequest);
  
  this.listenTo(this.view,
    e.ViewInitialized,
    this.onViewInitialized_);

  this.listenTo(this.dataModel,
    e.DataModelChanged,
    this.onDataModelChanged_);
    
  this.relay(
    this.view,
    e.BuildingHeightChanged
  );
    
  this.relay(
    this.guiView,
    e.RequestAddToTestingInput
    );
    
  this.relay(
    this.view,
    e.VisibilityNodesLoaded
    );

    
};




lgb.controller.EnvelopeController.prototype.getTopFloor =
  function(event) {
      
  return this.view.getTopFloor();
  
};




/**
 * Event handler - whatches for when the datamodel changes and
 * repeats the event on the global event bus. This is used
 * so that the zones can be rebuilt when the floor size changes.
 * @private
 * @param {lgb.events.Event} event Fired by the data model.
 */
lgb.controller.EnvelopeController.prototype.onDataModelChanged_ =
  function(event) {

  this.trigger(e.EnvelopeModelChanged, this.dataModel);
};




lgb.controller.EnvelopeController.prototype.onViewInitialized_ =
  function(event) {

    
  this.listenTo(
    this.guiView,
    e.RequestDataModelChange,
    this.onRequestDataModelChange_
    );
    

    
};



lgb.controller.EnvelopeController.prototype.onRequestDataModelChange_ =
  function(event) {
    
  this.dataModel.changeProperty(event.payload.name, event.payload.value);
};



