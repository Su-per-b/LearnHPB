/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.input.BuildingGuiSubController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.model.BaseInputModel');

goog.require('lgb.scenario.view.System');
goog.require('lgb.scenario.model.Bs2');
goog.require('lgb.gui.view.GUI');


/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.input.BuildingGuiSubController = function( title ) {
  
  this.TITLE_ = title;
  lgb.core.BaseController.call(this);
  
};
goog.inherits(lgb.world.controller.input.BuildingGuiSubController, lgb.core.BaseController);


/**
 * Initialized the controller.
 */
lgb.world.controller.input.BuildingGuiSubController.prototype.init = function() {
  
  this.dataModel = new lgb.gui.model.BaseInputModel();
  this.guiView = new lgb.gui.view.GUI (this.dataModel, this.TITLE_);
  this.bind_();
  this.guiView.init();
  
};


lgb.world.controller.input.BuildingGuiSubController.prototype.bind_ = function() {
  
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    
  
  this.listen(
    e.ScenarioParsed2,
    this.onScenarioParsed2_
  );

};


lgb.world.controller.input.BuildingGuiSubController.prototype.onScenarioParsed2_ = function(event) {
  
  var systemList = event.payload;
  var system = systemList.getSystem(this.TITLE_);
  
  var systemView = new lgb.scenario.view.System (system);
  this.guiView.add(systemView);
};

