/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.UtilityController');

goog.require('lgb.view.UtilityView');




/**
 * MVC controller for the UtilityController
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.UtilityController = function() {

  lgb.controller.ControllerBase.call(this);
  this.init_();
};
goog.inherits(lgb.controller.UtilityController, lgb.controller.ControllerBase);


/**
 * initializes the controller
 * @private
 */
lgb.controller.UtilityController.prototype.init_ = function() {

  this.view = new lgb.view.UtilityView();
  this.bind_();
  this.view.init();
  

};



/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.UtilityController.prototype.bind_ = function() {
  
  this.makeAddToWorldRequestGlobal();


};



