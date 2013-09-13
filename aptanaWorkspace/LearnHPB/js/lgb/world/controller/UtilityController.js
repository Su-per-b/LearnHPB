/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.world.controller.UtilityController');

goog.require('lgb.world.view.UtilityAxisView');
goog.require('lgb.world.view.UtilityGridView');
goog.require('lgb.core.Config');


/**
 * MVC controller for the UtilityController
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.UtilityController = function() {

  lgb.core.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.world.controller.UtilityController, lgb.core.BaseController);

/**
 * initializes the controller
 * @private
 */
lgb.world.controller.UtilityController.prototype.init_ = function() {

  if (lgb.core.Config.UTILITY_SHOW_GRID) {
    this.gridView = new lgb.world.view.UtilityGridView();
    
    
    this.relay(this.gridView, e.AddToWorldRequest);
    
    this.gridView.init();
  }

  if (lgb.core.Config.UTILITY_SHOW_AXIS) {
    this.axisView = new lgb.world.view.UtilityAxisView();
    
    this.relay(this.axisView, e.AddToWorldRequest);
    
    this.axisView.init();
  }
};

