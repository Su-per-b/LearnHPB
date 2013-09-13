goog.provide('lgb.gui.controller.GreenGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.controller.TestController');
goog.require('lgb.gui.controller.ScenarioController');
goog.require('lgb.gui.controller.BuildingGUIController');
goog.require('lgb.gui.controller.SimulationInputController');

goog.require('lgb.gui.view.LeftPanelGUI');
goog.require('lgb.gui.model.BaseInputModel');
//goog.require('lgb.gui.controller.ResultsController');


lgb.gui.controller.GreenGUIController = function() {

  lgb.core.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.gui.controller.GreenGUIController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.GreenGUIController.prototype.init_ = function() {

  this.dataModel = new lgb.gui.model.BaseInputModel();
  this.guiView = new lgb.gui.view.LeftPanelGUI(this.dataModel);
  
  
  this.scenarioInputController_ = new lgb.gui.controller.ScenarioController();
  this.buildingInputController_ = new lgb.gui.controller.BuildingGUIController();
  this.simulationInputController_ = new lgb.gui.controller.SimulationInputController();
  
  this.testingInputController_ = new lgb.gui.controller.TestController();
  
  // this.resultsController_ = new lgb.gui.controller.ResultsController();
    

  
  this.bind_();
  
  this.guiView.init();
  this.trigger(e.RequestAddToLayout, this.guiView);
  
  this.scenarioInputController_.init();
  // this.simulationInputController_.init();
  this.buildingInputController_.init();
  this.testingInputController_.init();
  // this.resultsController_.init();

  
};


lgb.gui.controller.GreenGUIController.prototype.bind_ = function() {

  this.listenTo(this.testingInputController_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
    
  this.listenTo(this.scenarioInputController_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
    
  this.listenTo(this.buildingInputController_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
    
  this.listenTo(this.simulationInputController_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
    
/*
  this.listenTo(this.resultsController_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
*/

};


lgb.gui.controller.GreenGUIController.prototype.onRequestAddToParentGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.gui.controller.GreenGUIController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

