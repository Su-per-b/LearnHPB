/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.gui.controller.SimulationOutputController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.SimulationOutputGUI');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.SimulationOutputController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.gui.controller.SimulationOutputController, lgb.core.BaseController);


lgb.gui.controller.SimulationOutputController.prototype.init = function(simulationDataModel) {

  this.dataModel = simulationDataModel;
  this.guiView = new lgb.gui.view.SimulationOutputGUI (this.dataModel);
  
  this.bind_();
  
  this.triggerGUI();


};


lgb.gui.controller.SimulationOutputController.prototype.bind_ = function() {

    this.listen(e.LayoutChange, this.onLayoutChange_);
    this.listen(e.IntegratedDataModelVariablesUpdated, this.onIntegratedDataModelVariablesUpdated_);

};


lgb.gui.controller.SimulationOutputController.prototype.onIntegratedDataModelVariablesUpdated_ = function(event) {


  var outputVariables = event.payload.getOutputVariables();
  
  this.guiView.updateIntegratedDataModelVariables(outputVariables);

};



lgb.gui.controller.SimulationOutputController.prototype.onLayoutChange_ = function(event) {

  this.guiView.calculateLayout(event.payload);

};

