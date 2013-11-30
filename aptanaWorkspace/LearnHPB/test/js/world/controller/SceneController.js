/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.world.controller.SceneController');

goog.require('lgb.core.BaseController');
goog.require('test.world.model.TestModel');
goog.require('test.world.view.SceneView');




/**
 * @constructor
 * @extends lgb.core.BaseController
 */
test.world.controller.SceneController = function(sceneFolder, sceneFile) {
  lgb.core.BaseController.call(this);
  
  this.sceneFolder_ = sceneFolder;
  this.sceneFile_ = sceneFile;

  
};
goog.inherits(test.world.controller.SceneController, lgb.core.BaseController);



/**
 * @private
 */
test.world.controller.SceneController.prototype.init = function() {

  this.dataModel = new test.world.model.TestModel();
  this.view = new test.world.view.SceneView(this.dataModel, this.sceneFolder_, this.sceneFile_);
  
  this.bind_();
  this.view.init();
  
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
test.world.controller.SceneController.prototype.bind_ = function() {
  
  this.relay(this.view, e.AddToWorldRequest);
  
};




