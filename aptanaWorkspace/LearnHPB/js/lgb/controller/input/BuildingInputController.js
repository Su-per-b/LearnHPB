goog.provide('lgb.controller.input.BuildingInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.input.BuildingInputGUI');
goog.require('lgb.model.input.BaseInputModel');

goog.require('lgb.controller.input.BuildingGeneralInputController');
goog.require('lgb.controller.input.LightingInputController');
goog.require('lgb.controller.input.DayLightingInputController');
goog.require('lgb.controller.input.EnvelopeInputController');
goog.require('lgb.controller.input.HvacInputController');


lgb.controller.input.BuildingInputController = function() {

  lgb.controller.BaseController.call(this);
};
goog.inherits(lgb.controller.input.BuildingInputController, lgb.controller.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.input.BuildingInputController.prototype.init = function() {

  this.dataModel = new lgb.model.input.BaseInputModel();

  this.guiView = new lgb.view.input.BuildingInputGUI(this.dataModel);
  
  this.buildingGeneralInputController_ = new lgb.controller.input.BuildingGeneralInputController();
  this.lightingInputController_ = new lgb.controller.input.LightingInputController();
  this.dayLightingInputController_ = new lgb.controller.input.DayLightingInputController();
  this.envelopeInputController_ = new lgb.controller.input.EnvelopeInputController();
  this.hvacInputController_ = new lgb.controller.input.HvacInputController();
    
  this.bind_();
  this.guiView.init();

  this.buildingGeneralInputController_.init();
  this.lightingInputController_.init();
  this.dayLightingInputController_.init();
  this.envelopeInputController_.init();
  this.hvacInputController_.init();
   

};


lgb.controller.input.BuildingInputController.prototype.bind_ = function() {

    this.listenTo(
      this.buildingGeneralInputController_,
      e.RequestAddToParentGUI, 
      this.onRequestAddToParentGUI_);

    this.listenTo(
      this.lightingInputController_,
      e.RequestAddToParentGUI, 
      this.onRequestAddToParentGUI_);
      
    this.listenTo(
      this.dayLightingInputController_,
      e.RequestAddToParentGUI, 
      this.onRequestAddToParentGUI_);
      
    this.listenTo(
      this.envelopeInputController_,
      e.RequestAddToParentGUI, 
      this.onRequestAddToParentGUI_);
      
    this.listenTo(
      this.hvacInputController_,
      e.RequestAddToParentGUI, 
      this.onRequestAddToParentGUI_);
    
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    
};



lgb.controller.input.BuildingInputController.prototype.onRequestAddToParentGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.controller.input.BuildingInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

