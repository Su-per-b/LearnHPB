/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.gui.controller.SimulationInputController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.SimulationInputGUI');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.SimulationInputController = function() {

  lgb.core.BaseController.call(this);
  
};
goog.inherits(lgb.gui.controller.SimulationInputController, lgb.core.BaseController);


lgb.gui.controller.SimulationInputController.prototype.init = function(simulationDataModel) {
  
  this.dataModel = simulationDataModel;
  this.guiView = new lgb.gui.view.SimulationInputGUI (this.dataModel);
  
  this.bind_();
  
  this.triggerGUI();

  
};



lgb.gui.controller.SimulationInputController.prototype.bind_ = function() {

    this.listen(e.LayoutChange, this.onLayoutChange_);

};


lgb.gui.controller.SimulationInputController.prototype.onLayoutChange_ = function(event) {

  this.guiView.calculateLayout(event.payload);

};
