/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.controller.GuiController');

goog.require('lgb.core.BaseController');

goog.require('lgb.gui.controller.SimulationStateControlController');


/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.GuiController = function() {
  lgb.core.BaseController.call(this);
  
  this.init_();
};
goog.inherits(lgb.chart.controller.GuiController, lgb.core.BaseController);


/**
 * @private
 */
lgb.chart.controller.GuiController.prototype.init_ = function() {

  //this.topMenuController_ = this.makeChildController_(lgb.gui.controller.TopMenuController);
  //this.titleBarView = new lgb.gui.view.TitleBarGUI();
  //this.trigger(e.RequestAddToLayout, this.titleBarView);
  
    this.simulationStateControlController_ = 
        this.makeChildController_(lgb.gui.controller.SimulationStateControlController);
        
    
    
    this.bind_();
};



lgb.chart.controller.GuiController.prototype.bind_ = function() {


  this.listenTo(
    this.childControllers_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
    
};


lgb.chart.controller.GuiController.prototype.onRequestAddToParentGUI_ = function(event) {

  
  return;

};