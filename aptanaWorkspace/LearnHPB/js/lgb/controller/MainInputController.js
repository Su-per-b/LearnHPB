goog.provide('lgb.controller.MainInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.TestingInputController');
goog.require('lgb.controller.ScenarioInputController');
goog.require('lgb.controller.BuildingInputController');

goog.require('lgb.view.TestingInputGUI');
goog.require('lgb.model.BaseInputModel');


lgb.controller.MainInputController = function() {

  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.controller.MainInputController, lgb.controller.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.MainInputController.prototype.init_ = function() {

  this.dataModel = new lgb.model.BaseInputModel();
  this.guiView = new lgb.view.TestingInputGUI(this.dataModel);
  
  this.basicInputController_ = new lgb.controller.TestingInputController();
  this.scenarioInputController_ = new lgb.controller.ScenarioInputController();
  this.buildingInputController_ = new lgb.controller.BuildingInputController();
    
  this.bind_();
  
  this.guiView.init();
  this.trigger(e.RequestAddToLayout, this.guiView);
  
  this.basicInputController_.init();
  this.scenarioInputController_.init();
  this.buildingInputController_.init();
  
};


lgb.controller.MainInputController.prototype.bind_ = function() {

  this.listenTo(this.basicInputController_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
    
  this.listenTo(this.scenarioInputController_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
    
  this.listenTo(this.buildingInputController_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);
    
    

};


lgb.controller.MainInputController.prototype.onRequestAddToParentGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.controller.MainInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

