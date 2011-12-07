goog.provide('lgb.controller.FloorController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.view.FloorView');

/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.FloorController = function() {

  lgb.controller.ControllerBase.call(this);
  this.init();
};
goog.inherits(lgb.controller.FloorController, lgb.controller.ControllerBase);


/**
 * Initialized the controller.
 */
lgb.controller.FloorController.prototype.init = function() {

  this.view = new lgb.view.FloorView();

  this.makeAddToWorldRequestGlobal();
};
