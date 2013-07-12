/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.input.TestLightingController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.model.LightingModel');
goog.require('lgb.view.LightingView');
goog.require('lgb.view.input.TestLightingGUI');
goog.require('lgb.view.LightingAdminView');

goog.require('lgb.model.BuildingHeightModel');

/**
 * MVC controller for the Ductwork
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.input.TestLightingController = function() {

  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.controller.input.TestLightingController, lgb.controller.BaseController);

/**
 * initializes the controller
 * @private
 */
lgb.controller.input.TestLightingController.prototype.init_ = function() {
 
  
  this.dataModel = new lgb.model.LightingModel();
  
  this.guiView = new lgb.view.input.TestLightingGUI(this.dataModel);
  this.view = new lgb.view.LightingView(this.dataModel);

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
lgb.controller.input.TestLightingController.prototype.bind_ = function() {

  this.relay(this.view, e.AddToWorldRequest);

  this.listen(
    e.BuildingHeightChanged,
    this.onBuildingHeightChanged_
    );
    
    
  this.relay(
    this.view,
    e.VisibilityNodesLoaded
    );
    

  this.relay(
    this.guiView,
    e.RequestAddToTestingInput
    );
    
};


lgb.controller.input.TestLightingController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
  
};





