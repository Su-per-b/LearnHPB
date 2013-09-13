/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.TestLightingController');

goog.require('lgb.core.BaseController');

goog.require('lgb.world.model.LightingModel');
goog.require('lgb.world.view.LightingView');
goog.require('lgb.gui.view.TestGUILighting');
goog.require('lgb.world.model.BuildingHeightModel');

/**
 * MVC controller for the Ductwork
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.TestLightingController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.gui.controller.TestLightingController, lgb.core.BaseController);

/**
 * initializes the controller
 * @private
 */
lgb.gui.controller.TestLightingController.prototype.init = function() {
 
  
  this.dataModel = new lgb.world.model.LightingModel();
  
  this.guiView = new lgb.gui.view.TestGUILighting(this.dataModel);
  this.view = new lgb.world.view.LightingView(this.dataModel);

  this.bind_();
  
  this.view.init();
  this.guiView.init();
  
};




/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.gui.controller.TestLightingController.prototype.bind_ = function() {


  this.relayLocal(this.view, e.AddToWorldRequest);

  this.relay(
    this.view,
    e.VisibilityNodesLoaded
    );
    

  this.relay(
    this.guiView,
    e.RequestAddToTestingInput
    );
    
};






