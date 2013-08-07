/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.HvacController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.events.SelectableLoaded');
goog.require('lgb.model.HvacModel');
goog.require('lgb.view.HvacView');


goog.require('lgb.model.BuildingHeightModel');

goog.require('lgb.model.vo.VisibilityNode');



/**
 * MVC controller for the Ductwork
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.HvacController = function() {
  lgb.controller.BaseController.call(this);
};
goog.inherits(lgb.controller.HvacController, lgb.controller.BaseController);

/**
 * initializes the controller
 * @private
 */
lgb.controller.HvacController.prototype.init = function() {
  this.dataModel = new lgb.model.HvacModel();
  this.view = new lgb.view.HvacView(this.dataModel);
  this.bind_();
  this.view.init();
};




/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.HvacController.prototype.bind_ = function() {
  
  
  this.relay(
    this.view, 
      [
        e.ViewPointNodesLoaded,
        e.VisibilityNodesLoaded,
        lgb.events.SelectableLoaded.TYPE
      ]
    );
  
  this.relayLocal(this.view, e.AddToWorldRequest);

};









