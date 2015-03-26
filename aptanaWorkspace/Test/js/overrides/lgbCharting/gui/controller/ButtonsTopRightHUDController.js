/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgbCharting.gui.controller.ButtonsTopRightHUDController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.model.BaseGuiModel');
goog.require('lgb.gui.view.ButtonsTopRightHUD');
goog.require('lgb.gui.controller.SimulationStateController');
goog.require('lgbCharting.gui.controller.SimulationStateController');

/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */
lgbCharting.gui.controller.ButtonsTopRightHUDController = function( ) {

  lgb.core.BaseController.call(this);
  
};
goog.inherits(lgbCharting.gui.controller.ButtonsTopRightHUDController, lgb.core.BaseController);


/**
 * Initialized the controller.
 */
lgbCharting.gui.controller.ButtonsTopRightHUDController.prototype.init = function() {
  
  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.ButtonsTopRightHUD (this.dataModel);

  this.guiView.init();
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  this.bind_();
  
  this.makeChildGUIcontroller_(lgbCharting.gui.controller.SimulationStateController, {});
  
};



lgbCharting.gui.controller.ButtonsTopRightHUDController.prototype.bind_ = function() {


};



lgbCharting.gui.controller.ButtonsTopRightHUDController.prototype.onSimulationEngineLoaded_ = function(event) {

  var simulationMainController = event.payload;

};


