/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.SimulationTestController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.SimulationTestGUI');




/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.SimulationTestController = function() {

  this.TITLE_ = 'Output';
  lgb.core.BaseController.call(this);
  
  this.bind1_();

};
goog.inherits(lgb.gui.controller.SimulationTestController, lgb.core.BaseController);


lgb.gui.controller.SimulationTestController.prototype.bind1_ = function() {

    this.listen (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
    
};



lgb.gui.controller.SimulationTestController.prototype.bind2_ = function() {

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    
  this.listen(e.LayoutChange, this.onLayoutChange_);
  
};


lgb.gui.controller.SimulationTestController.prototype.onLayoutChange_ = function(event) {

  this.guiView.calculateLayout(event.payload);

};


lgb.gui.controller.SimulationTestController.prototype.onSimulationEngineLoaded_ = function(event) {

  this.simMainController_ = event.payload;
  this.init_();

};


lgb.gui.controller.SimulationTestController.prototype.init_ = function() {
  
  this.dataModel = this.simMainController_.getDataModel();
  this.guiView = new lgb.gui.view.SimulationTestGUI (this.dataModel, this.TITLE_);

  this.bind2_();
  this.guiView.init();
  
};

