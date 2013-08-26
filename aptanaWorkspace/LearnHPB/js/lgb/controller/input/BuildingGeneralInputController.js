/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.input.BuildingGeneralInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.model.input.BaseInputModel');

goog.require('lgb.view.scenario.System');
goog.require('lgb.model.scenario.Bs2');
goog.require('lgb.view.input.GUI');


/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.input.BuildingGeneralInputController = function( title ) {
  
  this.TITLE_ = title;
  lgb.controller.BaseController.call(this);
  
};
goog.inherits(lgb.controller.input.BuildingGeneralInputController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.input.BuildingGeneralInputController.prototype.init = function() {
  
  this.dataModel = new lgb.model.input.BaseInputModel();
  this.guiView = new lgb.view.input.GUI (this.dataModel, this.TITLE_);
  this.bind_();
  this.guiView.init();
  
};


lgb.controller.input.BuildingGeneralInputController.prototype.bind_ = function() {
  
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    
  
  this.listen(
    e.ScenarioParsed2,
    this.onScenarioParsed2_
  );

};


lgb.controller.input.BuildingGeneralInputController.prototype.onScenarioParsed2_ = function(event) {
  
  var systemList = event.payload;
  var system = systemList.getSystem(this.TITLE_);
  
  var systemView = new lgb.view.scenario.System (system);
  this.guiView.add(systemView);
};

