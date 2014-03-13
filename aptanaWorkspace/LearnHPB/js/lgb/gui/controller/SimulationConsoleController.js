/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.gui.controller.SimulationConsoleController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.SimulationConsoleGUI');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.SimulationConsoleController = function() {
;
  lgb.core.BaseController.call(this);
  
};
goog.inherits(lgb.gui.controller.SimulationConsoleController, lgb.core.BaseController);



lgb.gui.controller.SimulationConsoleController.prototype.init = function(simulationDataModel) {

  this.dataModel = simulationDataModel;
  this.guiView = new lgb.gui.view.SimulationConsoleGUI (this.dataModel);
  
  this.bind_();
  
  this.triggerGUI();

};


lgb.gui.controller.SimulationConsoleController.prototype.bind_ = function() {

    this.listen(e.LayoutChange, this.onLayoutChange_);

};


lgb.gui.controller.SimulationConsoleController.prototype.onLayoutChange_ = function(event) {

  this.guiView.calculateLayout(event.payload);

};


