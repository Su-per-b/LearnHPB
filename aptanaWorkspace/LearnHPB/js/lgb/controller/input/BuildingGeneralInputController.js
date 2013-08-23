/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.input.BuildingGeneralInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.model.input.BaseInputModel');

goog.require('lgb.view.scenario.System');
goog.require('lgb.model.scenario.Bs2');
goog.require('lgb.view.input.BuildingGeneralInputGUI');



/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.input.BuildingGeneralInputController = function( ) {

  lgb.controller.BaseController.call(this);
  
  this.listen(
    e.ScenarioParsed2,
    this.onScenarioParsed2_
  );
  
};
goog.inherits(lgb.controller.input.BuildingGeneralInputController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.input.BuildingGeneralInputController.prototype.init = function() {
  
  this.dataModel = new lgb.model.input.BaseInputModel();
  
  this.guiView = new lgb.view.input.BuildingGeneralInputGUI (this.dataModel);
  this.bind_();
  this.guiView.init();
  
};


lgb.controller.input.BuildingGeneralInputController.prototype.bind_ = function() {
  
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);

};


lgb.controller.input.BuildingGeneralInputController.prototype.onScenarioParsed2_ = function(event) {
  

  var systemList = event.payload;
  var system = systemList.getSystem('General');
  
  var systemView = new lgb.view.scenario.System (system);
  
  this.guiView.add(systemView);
};

