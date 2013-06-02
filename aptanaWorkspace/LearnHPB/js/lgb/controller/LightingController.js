/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.LightingController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.model.LightingModel');
goog.require('lgb.view.LightingView');
goog.require('lgb.view.LightingGUI');
goog.require('lgb.view.LightingAdminView');
goog.require('lgb.events.BuildingHeightChanged');
goog.require('lgb.model.BuildingHeightModel');

/**
 * MVC controller for the Ductwork
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.LightingController = function() {

  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.controller.LightingController, lgb.controller.BaseController);

/**
 * initializes the controller
 * @private
 */
lgb.controller.LightingController.prototype.init_ = function() {
 
  
  this.dataModel = new lgb.model.LightingModel();
  
  this.guiView = new lgb.view.LightingGUI(this.dataModel);
  this.view = new lgb.view.LightingView(this.dataModel);

  this.bind_();
  
  this.view.init();
  this.guiView.init();
  

};




/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.LightingController.prototype.bind_ = function() {

  this.relay(this.view, e.AddToWorldRequest);

  this.listen(
    lgb.events.BuildingHeightChanged.TYPE,
    this.onBuildingHeightChanged_
    );
    
    
  this.relay(
    this.view,
    e.VisibilityNodesLoaded
    );
    

  this.relay(
    this.guiView,
    e.RequestAddToGUI
    );
    
};


lgb.controller.LightingController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
  
};


/**
 * @private
 * @param {lgb.events.RequestDataModelChange} event The event.
 */
lgb.controller.LightingController.prototype.onRequestDataModelChange_ =
  function(event) {
    
  this.dataModel.changeProperty(event.payload.name, event.payload.value);
  
};



