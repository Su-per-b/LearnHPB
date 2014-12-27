/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.EnvelopeController');

goog.require('lgb.core.BaseController');
goog.require('lgb.world.model.EnvelopeModel');
goog.require('lgb.world.view.EnvelopeView');
goog.require('lgb.gui.view.EnvelopeGUI');


/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.EnvelopeController = function() {
  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.world.controller.EnvelopeController, lgb.core.BaseController);


/**
 * @private
 */
lgb.world.controller.EnvelopeController.prototype.init = function() {

  this.dataModel = new lgb.world.model.EnvelopeModel();
  this.view = new lgb.world.view.EnvelopeView(this.dataModel);
  this.guiView = new lgb.gui.view.EnvelopeGUI(this.dataModel);
  
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
lgb.world.controller.EnvelopeController.prototype.bind_ = function() {

  
  this.relayLocal(this.view, e.AddToWorldRequest);
  
  this.listenToOnce(this.view,
    e.ViewInitialized,
    this.onViewInitialized_);

    
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



lgb.world.controller.EnvelopeController.prototype.getTopFloor =
  function(event) {
      
  return this.view.getTopFloor();
  
};


lgb.world.controller.EnvelopeController.prototype.onViewInitialized_ =
  function(event) {

  this.listenTo(
    this.guiView,
    e.RequestDataModelChange,
    this.onRequestDataModelChange_
    );
    
};



lgb.world.controller.EnvelopeController.prototype.onRequestDataModelChange_ =
  function(event) {
    
  this.dataModel.changePropertyEx(event.payload.property, event.payload.newValue);
};



