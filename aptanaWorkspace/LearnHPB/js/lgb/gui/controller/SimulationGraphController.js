/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.gui.controller.SimulationGraphController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.SimulationGraphGUI');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.SimulationGraphController = function() {

  this.TITLE_ = 'Graph';
  lgb.core.BaseController.call(this);
  
  this.bind1_();

};
goog.inherits(lgb.gui.controller.SimulationGraphController, lgb.core.BaseController);


lgb.gui.controller.SimulationGraphController.prototype.bind1_ = function() {

    this.listen (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
};



lgb.gui.controller.SimulationGraphController.prototype.bind2_ = function() {

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
   
};


lgb.gui.controller.SimulationGraphController.prototype.onLayoutChange_ = function(event) {

  this.guiView.calculateLayout(event.payload);

};

lgb.gui.controller.SimulationGraphController.prototype.onSimulationEngineLoaded_ = function(event) {

  this.simMainController_ = event.payload;
  this.init_();

};


lgb.gui.controller.SimulationGraphController.prototype.init_ = function() {
  
  this.dataModel = this.simMainController_.getDataModel();
  this.guiView = new lgb.gui.view.SimulationGraphGUI (this.dataModel, this.TITLE_);

  this.bind2_();
  this.guiView.init();
  
  this.listen(e.LayoutChange, this.onLayoutChange_);
};


lgb.gui.controller.SimulationGraphController.prototype.onRequestAddToParentGUI_ = function(event) {
  this.guiView.add(event.payload);
};


