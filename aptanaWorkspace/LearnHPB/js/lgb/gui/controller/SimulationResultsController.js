/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.gui.controller.SimulationResultsController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.SimulationResultsGUI');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.SimulationResultsController = function() {

  lgb.core.BaseController.call(this);
  

};
goog.inherits(lgb.gui.controller.SimulationResultsController, lgb.core.BaseController);


lgb.gui.controller.SimulationResultsController.prototype.bind_ = function() {
    this.listen(e.LayoutChange, this.onLayoutChange_);
};




lgb.gui.controller.SimulationResultsController.prototype.init = function(simulationDataModel) {
  
  this.dataModel = simulationDataModel;
  this.guiView = new lgb.gui.view.SimulationResultsGUI (this.dataModel, this.TITLE_);
  
  this.guiView.init();
  this.bind_();
  
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
};



lgb.gui.controller.SimulationResultsController.prototype.onLayoutChange_ = function(event) {

  this.guiView.calculateLayout(event.payload);

};

