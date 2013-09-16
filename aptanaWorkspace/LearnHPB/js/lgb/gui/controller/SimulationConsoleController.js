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

  this.TITLE_ = 'Console';
  lgb.core.BaseController.call(this);
  
  this.bind1_();

};
goog.inherits(lgb.gui.controller.SimulationConsoleController, lgb.core.BaseController);



lgb.gui.controller.SimulationConsoleController.prototype.bind1_ = function() {

    this.listen (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
    
    
};



lgb.gui.controller.SimulationConsoleController.prototype.bind2_ = function() {

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    
  this.listen(e.LayoutChange, this.onLayoutChange_);
    
};



lgb.gui.controller.SimulationConsoleController.prototype.onLayoutChange_ = function(event) {

  this.guiView.calculateLayout(event.payload);

};

lgb.gui.controller.SimulationConsoleController.prototype.onSimulationEngineLoaded_ = function(event) {

  this.simMainController_ = event.payload;
  this.init_();

};


lgb.gui.controller.SimulationConsoleController.prototype.init_ = function() {
  
  this.dataModel = this.simMainController_.getDataModel();
  this.guiView = new lgb.gui.view.SimulationConsoleGUI (this.dataModel, this.TITLE_);

  this.bind2_();
  this.guiView.init();
  
};


lgb.gui.controller.SimulationConsoleController.prototype.onRequestAddToParentGUI_ = function(event) {
  this.guiView.add(event.payload);
};


