goog.provide('lgb.gui.controller.BottomPanelGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BottomPanelGUI');
goog.require('lgb.gui.model.BaseInputModel');

goog.require('lgb.gui.controller.SimulationConsoleController');
goog.require('lgb.gui.controller.SimulationOutputController');
goog.require('lgb.gui.controller.SimulationTestController');
goog.require('lgb.gui.controller.SimulationInputController');

goog.require('lgb.gui.controller.SimulationResultsController');
goog.require('lgb.gui.controller.SimulationGraphController');


lgb.gui.controller.BottomPanelGUIController = function() {

  lgb.core.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.gui.controller.BottomPanelGUIController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.BottomPanelGUIController.prototype.init_ = function() {

  this.dataModel = new lgb.gui.model.BaseInputModel();
  
  this.bottomPanelGUI_ = new lgb.gui.view.BottomPanelGUI(this.dataModel);
  this.bottomPanelGUI_.init();
  this.trigger(e.RequestAddToLayout, this.bottomPanelGUI_);


  this.simulationConsoleController_ = this.makeChildController_
  (lgb.gui.controller.SimulationConsoleController);
  
  this.simulationInputController_ = this.makeChildController_
  (lgb.gui.controller.SimulationInputController);
  
  this.simulationOutputController_ = this.makeChildController_
  (lgb.gui.controller.SimulationOutputController);
  
 
  //this.simulationTestController_ = this.makeChildController_
  //(lgb.gui.controller.SimulationTestController);
  
  
   this.simulationResultsController_ = this.makeChildController_
   (lgb.gui.controller.SimulationResultsController);
   
   
   this.simulationResultsController_ = this.makeChildController_
   (lgb.gui.controller.SimulationGraphController);
   
   
  
  this.bind_();

};


lgb.gui.controller.BottomPanelGUIController.prototype.bind_ = function() {
  
  this.listenTo(
    this.childControllers_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
    
};



lgb.gui.controller.BottomPanelGUIController.prototype.onRequestAddToParentGUI_ = function(event) {

  this.bottomPanelGUI_.add(event.payload);

};



/**
 * @private
 */
lgb.gui.controller.BottomPanelGUIController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.leftPanelGUI_.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

