/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.FurnitureController');

goog.require('lgb.core.BaseController');

goog.require('lgb.world.model.FurnitureModel');
goog.require('lgb.world.view.FurnitureView');


goog.require('lgb.world.model.BuildingHeightModel');


/**
 * MVC controller for the Ductwork
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.FurnitureController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.world.controller.FurnitureController, lgb.core.BaseController);

/**
 * initializes the controller
 * @private
 */
lgb.world.controller.FurnitureController.prototype.init = function() {
 
  
  this.dataModel = new lgb.world.model.FurnitureModel();
  this.view = new lgb.world.view.FurnitureView(this.dataModel);

  this.bind_();
  this.view.init();

};




/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.world.controller.FurnitureController.prototype.bind_ = function() {

  this.relayLocal(this.view, e.AddToWorldRequest);
  
  this.relay(this.view,e.VisibilityNodesLoaded);
  this.relay(this.view, e.ViewpointNodesLoaded);
    
};



