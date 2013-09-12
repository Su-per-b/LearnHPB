goog.provide('lgb.controller.input.MainInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.input.TestingInputController');
goog.require('lgb.controller.input.ScenarioInputController');
goog.require('lgb.controller.input.BuildingInputController');
goog.require('lgb.controller.input.SimulationInputController');

goog.require('lgb.view.input.MainInputGUI');
goog.require('lgb.model.input.BaseInputModel');
goog.require('lgb.controller.input.ResultsController');


lgb.controller.input.MainInputController = function() {

  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.controller.input.MainInputController, lgb.controller.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.input.MainInputController.prototype.init_ = function() {

  this.dataModel = new lgb.model.input.BaseInputModel();
  this.guiView = new lgb.view.input.MainInputGUI(this.dataModel);
  
  
  this.scenarioInputController_ = new lgb.controller.input.ScenarioInputController();
  this.buildingInputController_ = new lgb.controller.input.BuildingInputController();
  this.simulationInputController_ = new lgb.controller.input.SimulationInputController();
  
  this.testingInputController_ = new lgb.controller.input.TestingInputController();
  
  this.resultsController_ = new lgb.controller.input.ResultsController();
    

  
  this.bind_();
  
  this.guiView.init();
  this.trigger(e.RequestAddToLayout, this.guiView);
  
  this.scenarioInputController_.init();
  // this.simulationInputController_.init();
  this.buildingInputController_.init();
  this.testingInputController_.init();
  this.resultsController_.init();

  
};


lgb.controller.input.MainInputController.prototype.bind_ = function() {

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
    
  this.listenTo(this.resultsController_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);

};


lgb.controller.input.MainInputController.prototype.onRequestAddToParentGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.controller.input.MainInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

