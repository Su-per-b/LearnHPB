/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.chart.controller.GraphController');

goog.require('lgb.core.BaseController');
goog.require('lgb.chart.view.GraphGUI_04');
goog.require('lgb.chart.model.GraphGUImodel');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.GraphController = function() {
  
  lgb.core.BaseController.call(this);
  

};
goog.inherits(lgb.chart.controller.GraphController, lgb.core.BaseController);




lgb.chart.controller.GraphController.prototype.init = function(simulationModel) {
  
  this.dataModel = simulationModel;
          
  var chartModel = new lgb.chart.model.GraphGUImodel();
  this.guiView = new lgb.chart.view.GraphGUI_04 ( this.dataModel, chartModel );

  this.triggerGUI();
  
};






