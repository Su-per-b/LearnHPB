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

  this.TITLE_ = 'Output';
  lgb.core.BaseController.call(this);
  
  this.bind1_();

};
goog.inherits(lgb.gui.controller.SimulationOutputController, lgb.core.BaseController);


lgb.gui.controller.SimulationOutputController.prototype.bind1_ = function() {

    this.listen (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
};



lgb.gui.controller.SimulationOutputController.prototype.bind2_ = function() {

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    
  this.listen(e.LayoutChange, this.onLayoutChange_);
};


lgb.gui.controller.SimulationOutputController.prototype.onLayoutChange_ = function(event) {

  this.guiView.calculateLayout(event.payload);

};

lgb.gui.controller.SimulationOutputController.prototype.onSimulationEngineLoaded_ = function(event) {

  this.simMainController_ = event.payload;
  this.init_();

};


lgb.gui.controller.SimulationOutputController.prototype.init_ = function() {
  
  this.dataModel = this.simMainController_.getDataModel();
  this.guiView = new lgb.gui.view.SimulationOutputGUI (this.dataModel, this.TITLE_);

  this.bind2_();
  this.guiView.init();
  
};


lgb.gui.controller.SimulationOutputController.prototype.onRequestAddToParentGUI_ = function(event) {
  this.guiView.add(event.payload);
};


