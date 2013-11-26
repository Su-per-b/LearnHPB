/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.world.controller.RoofTopController1');

goog.require('lgb.core.BaseController');
goog.require('test.world.model.TestModel');
goog.require('test.world.view.RoofTopView');



/**
 * @constructor
 * @extends lgb.core.BaseController
 */
test.world.controller.RoofTopController1 = function(viewClass) {
  lgb.core.BaseController.call(this);
  
  this.viewClass_ = viewClass;
  
};
goog.inherits(test.world.controller.RoofTopController1, lgb.core.BaseController);



/**
 * @private
 */
test.world.controller.RoofTopController1.prototype.init = function() {

  this.dataModel = new test.world.model.TestModel();
  this.view = new test.world.view.RoofTopView(this.dataModel);
  
  this.bind_();
  this.view.init();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
test.world.controller.RoofTopController1.prototype.bind_ = function() {
  
  this.relay(this.view, e.AddToWorldRequest);
  
};




