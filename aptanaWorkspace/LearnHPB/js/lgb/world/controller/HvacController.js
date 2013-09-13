/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.HvacController');

goog.require('lgb.core.BaseController');
goog.require('lgb.world.model.HvacModel');
goog.require('lgb.world.view.HvacView');
goog.require('lgb.world.model.BuildingHeightModel');
goog.require('lgb.world.model.vo.VisibilityNode');


/**
 * MVC controller for the Ductwork
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.HvacController = function() {
  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.world.controller.HvacController, lgb.core.BaseController);

/**
 * initializes the controller
 * @private
 */
lgb.world.controller.HvacController.prototype.init = function() {
  this.dataModel = new lgb.world.model.HvacModel();
  this.view = new lgb.world.view.HvacView(this.dataModel);
  this.bind_();
  this.view.init();
};




/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.world.controller.HvacController.prototype.bind_ = function() {
  
  
  this.relay(
    this.view, 
      [
        e.ViewpointNodesLoaded,
        e.VisibilityNodesLoaded,
        e.SelectableLoaded
      ]
    );
  
  this.relayLocal(this.view, e.AddToWorldRequest);

};






