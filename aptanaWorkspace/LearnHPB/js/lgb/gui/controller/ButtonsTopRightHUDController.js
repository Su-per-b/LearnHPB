/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.ButtonsTopRightHUDController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.model.BaseGuiModel');
goog.require('lgb.gui.view.ButtonsTopRightHUD');


/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */
lgb.gui.controller.ButtonsTopRightHUDController = function( ) {

  lgb.core.BaseController.call(this);
  
};
goog.inherits(lgb.gui.controller.ButtonsTopRightHUDController, lgb.core.BaseController);


/**
 * Initialized the controller.
 */
lgb.gui.controller.ButtonsTopRightHUDController.prototype.init = function() {
  
  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.ButtonsTopRightHUD (this.dataModel);

  this.guiView.init();
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  this.bind_();
  
};




lgb.gui.controller.ButtonsTopRightHUDController.prototype.bind_ = function() {


  this.listenOnce (
      e.SimulationEngineLoaded,
      this.onSimulationEngineLoaded_
  );
    

};


lgb.gui.controller.ButtonsTopRightHUDController.prototype.onSimulationEngineLoaded_ = function(event) {

  var simulationMainController = event.payload;
  this.init3_(simulationMainController);
  
};


lgb.gui.controller.ButtonsTopRightHUDController.prototype.init3_ = function(simulationMainController) {
  
  this.makeChildGUIcontroller_(lgb.gui.controller.SimulationStateController, simulationMainController);

};
