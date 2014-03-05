/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.chart.controller.GraphController');

goog.require('lgb.core.BaseController');
goog.require('lgb.chart.view.GraphGUI_01');
goog.require('lgb.chart.view.GraphGUI_02');
goog.require('lgb.chart.view.GraphGUI_03');
goog.require('lgb.chart.view.GraphGUI_04');
goog.require('lgb.chart.view.GraphGUI_05');
goog.require('lgb.chart.model.GraphGUImodel');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.GraphController = function() {
  
  this.TITLE_ = 'GraphController';
  lgb.core.BaseController.call(this);
  

};
goog.inherits(lgb.chart.controller.GraphController, lgb.core.BaseController);




lgb.chart.controller.GraphController.prototype.init = function() {
  
  this.bind1_();

};


lgb.chart.controller.GraphController.prototype.init_ = function() {
  
  switch (lgb.chart.controller.GraphController.versionNumber) {
    case 1 : {
      this.dataModel = this.simMainController_.getDataModel();
      this.guiView = new lgb.chart.view.GraphGUI_01 (this.dataModel, this.TITLE_);
      break;
    }
    case 2 : {
      this.dataModel = this.simMainController_.getDataModel();
      this.guiView = new lgb.chart.view.GraphGUI_02 (this.dataModel, this.TITLE_);
      break;
    }
    case 3 : {
      this.dataModel = new lgb.chart.model.GraphGUImodel();
      this.guiView = new lgb.chart.view.GraphGUI_03 (this.dataModel, this.TITLE_);
      break;
    }
    case 4 : {
      this.dataModel = this.simMainController_.getDataModel();
      this.guiView = new lgb.chart.view.GraphGUI_04 (this.dataModel, this.TITLE_);
      this.guiView.chartModel = new lgb.chart.model.GraphGUImodel();
      break;
    }
    case 5 : {
      this.dataModel = this.simMainController_.getDataModel();
      this.guiView = new lgb.chart.view.GraphGUI_05 (this.dataModel, this.TITLE_);
      this.guiView.chartModel = new lgb.chart.model.GraphGUImodel();
      break;
    }
    default : {
      debugger;
    }
    
  }

  this.bind2_();
  this.guiView.init();

};


lgb.chart.controller.GraphController.prototype.bind1_ = function() {

    this.listen (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
};



lgb.chart.controller.GraphController.prototype.bind2_ = function() {

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI
    );
    
};



lgb.chart.controller.GraphController.prototype.onSimulationEngineLoaded_ = function(event) {

  this.simMainController_ = event.payload;
  this.init_();

};




