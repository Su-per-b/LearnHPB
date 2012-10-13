/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.controller.UtilityController');

goog.require('lgb.view.UtilityAxisView');
goog.require('lgb.view.UtilityGridView');
goog.require('lgb.Config');


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

  if (lgb.Config.UTILITY_SHOW_GRID) {
    this.gridView = new lgb.view.UtilityGridView();
    this.makeAddToWorldRequestGlobal(this.gridView);
    this.gridView.init();
  }

  if (lgb.Config.UTILITY_SHOW_AXIS) {

    this.axisView = new lgb.view.UtilityAxisView();
    this.makeAddToWorldRequestGlobal(this.axisView);
    this.axisView.init();

  }

};

