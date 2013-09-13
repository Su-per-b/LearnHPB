goog.provide('lgb.gui.controller.MainController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.gui.controller.TestingInputController');
goog.require('lgb.gui.controller.ScenarioInputController');
goog.require('lgb.gui.controller.BuildingInputController');
goog.require('lgb.gui.controller.SimulationInputController');

goog.require('lgb.gui.view.MainInputGUI');
goog.require('lgb.gui.model.BaseInputModel');
//goog.require('lgb.gui.controller.ResultsController');


lgb.gui.controller.MainController = function() {

  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.gui.controller.MainController, lgb.controller.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.MainController.prototype.init_ = function() {

  this.dataModel = new lgb.gui.model.BaseInputModel();
  this.guiView = new lgb.gui.view.MainInputGUI(this.dataModel);
  
  
  this.scenarioInputController_ = new lgb.gui.controller.ScenarioInputController();
  this.buildingInputController_ = new lgb.gui.controller.BuildingInputController();
  this.simulationInputController_ = new lgb.gui.controller.SimulationInputController();
  
  this.testingInputController_ = new lgb.gui.controller.TestingInputController();
  
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


lgb.gui.controller.MainController.prototype.bind_ = function() {

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


lgb.gui.controller.MainController.prototype.onRequestAddToParentGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.gui.controller.MainController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

