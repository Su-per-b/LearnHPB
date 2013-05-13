/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.controller.VisibilityController');

goog.require('lgb.view.VisibilityView');



/**
 * MVC controller for the VisibilityController
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.VisibilityController = function() {
  this._NAME = 'lgb.controller.VisibilityController';
  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.controller.VisibilityController, lgb.controller.BaseController);



/**
 * initializes the controller
 * @private
 */
lgb.controller.VisibilityController.prototype.init_ = function() {

  this.view = new lgb.view.VisibilityView();
  this.view.show();
  this.bind_();
  
};

