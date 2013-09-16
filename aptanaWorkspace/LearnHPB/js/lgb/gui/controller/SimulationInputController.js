/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
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

  this.TITLE_ = 'Input';
  lgb.core.BaseController.call(this);
  
  this.bind1_();

};
goog.inherits(lgb.gui.controller.SimulationInputController, lgb.core.BaseController);


lgb.gui.controller.SimulationInputController.prototype.bind1_ = function() {

    this.listen (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
};



lgb.gui.controller.SimulationInputController.prototype.bind2_ = function() {

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    

};


lgb.gui.controller.SimulationInputController.prototype.onLayoutChange_ = function(event) {

  this.guiView.calculateLayout(event.payload);

};

lgb.gui.controller.SimulationInputController.prototype.onSimulationEngineLoaded_ = function(event) {

  this.simMainController_ = event.payload;
  this.init_();

};


lgb.gui.controller.SimulationInputController.prototype.init_ = function() {
  
  this.dataModel = this.simMainController_.getDataModel();
  this.guiView = new lgb.gui.view.SimulationInputGUI (this.dataModel, this.TITLE_);

  this.bind2_();
  this.guiView.init();
  
  this.listen(e.LayoutChange, this.onLayoutChange_);
  
};


lgb.gui.controller.SimulationInputController.prototype.onRequestAddToParentGUI_ = function(event) {
  this.guiView.add(event.payload);
};


