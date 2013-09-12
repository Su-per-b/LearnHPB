goog.provide('lgb.controller.input.BuildingInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.input.BuildingInputGUI');
goog.require('lgb.model.input.BaseInputModel');

goog.require('lgb.controller.input.BuildingInputSubController');




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
  
  this.subControllerList_ = [];
  
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    
      
  this.guiView.init();
  
  this.makeSubController_('General');
  this.makeSubController_('Lighting');
  this.makeSubController_('Daylighting');
  this.makeSubController_('Enclosure');
  this.makeSubController_('HVAC');

};

lgb.controller.input.BuildingInputController.prototype.makeSubControllerHelper_ = function(subController) {
  
  
    this.listenTo(
      subController,
      e.RequestAddToParentGUI, 
      this.onRequestAddToParentGUI_);
        
  this.subControllerList_.push(subController);
  
  subController.init();

};

lgb.controller.input.BuildingInputController.prototype.makeSubController_ = function(title) {
  
  var subController = new lgb.controller.input.BuildingInputSubController(title);
  this.makeSubControllerHelper_(subController);

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



lgb.controller.input.BuildingInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

