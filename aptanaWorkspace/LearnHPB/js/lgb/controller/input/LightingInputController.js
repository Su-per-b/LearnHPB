/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.input.LightingInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.model.input.BaseInputModel');
goog.require('lgb.view.input.LightingInputGUI');
goog.require('lgb.view.input.GUI');

/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.input.LightingInputController = function( ) {

  lgb.controller.BaseController.call(this);
  

  
};
goog.inherits(lgb.controller.input.LightingInputController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.input.LightingInputController.prototype.init = function() {
  
  this.dataModel = new lgb.model.input.BaseInputModel();
  this.guiView = new lgb.view.input.GUI (this.dataModel);
  
  this.bind_();
  this.guiView.init();
  
};


lgb.controller.input.LightingInputController.prototype.bind_ = function() {
  
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    
  this.listen(
    e.ScenarioParsed2,
    this.onScenarioParsed2_
  );
  
};



lgb.controller.input.LightingInputController.prototype.onScenarioParsed2_ = function(event) {
  
  var systemList = event.payload;
  var system = systemList.getSystem('Envelope');
  
  var systemView = new lgb.view.scenario.System (system);
  this.guiView.add(systemView);
};






