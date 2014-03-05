/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.controller.StandAloneController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BottomPanelGUI');
goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.gui.controller.SimulationConsoleController');
goog.require('lgb.gui.controller.SimulationOutputController');
goog.require('lgb.gui.controller.SimulationTestController');
goog.require('lgb.gui.controller.SimulationInputController');

goog.require('lgb.gui.controller.SimulationResultsController');
goog.require('lgb.gui.controller.SimulationGraphController');
goog.require('lgb.gui.controller.SimulationIframeGraphController');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.StandAloneController = function() {
  
  
  lgb.core.BaseController.call(this);
  lgb.globalEventBus = new lgb.core.EventBus();
  
  this.init_();

};
goog.inherits(lgb.chart.controller.StandAloneController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.chart.controller.StandAloneController.prototype.init_ = function() {

  $(window).resize(this.d(this.onNativeWindowResize_));

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  
  this.bottomPanelGUI_ = new lgb.gui.view.BottomPanelGUI(this.dataModel);
  this.bottomPanelGUI_.init();
  

  this.simulationConsoleController_ = this.makeChildController_
  (lgb.gui.controller.SimulationConsoleController);
  
  this.simulationInputController_ = this.makeChildController_
  (lgb.gui.controller.SimulationInputController);
  
  this.simulationOutputController_ = this.makeChildController_
  (lgb.gui.controller.SimulationOutputController);
  
  
  this.bind_();
};



/**
 * Handles the browser resize event
 * then dispatches a lgb event
 * @private
 * @param {Event} event The browser's event.
 */
lgb.chart.controller.StandAloneController.prototype.onNativeWindowResize_ =
  function(event) {

  var payload = {
    w:window.innerWidth,
    h:window.innerHeight
    };
  
  this.trigger(e.WindowResize, payload);
  
};




lgb.chart.controller.StandAloneController.prototype.bind_ = function() {
  
  this.listenTo(
    this.standAloneLayoutView_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
    
    
    
    window.addEventListener('message', function(e) {
      //inside frame
      var message = e.data;
    });



    
};



lgb.chart.controller.StandAloneController.prototype.onRequestAddToParentGUI_ = function(event) {

  this.bottomPanelGUI_.add(event.payload);

};

