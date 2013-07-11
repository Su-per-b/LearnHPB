goog.provide('lgb.controller.BuildingInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.BuildingInputGUI');
goog.require('lgb.model.BaseInputModel');
goog.require('lgb.controller.input.BuildingGeneralInputController');

lgb.controller.BuildingInputController = function() {

  lgb.controller.BaseController.call(this);
};
goog.inherits(lgb.controller.BuildingInputController, lgb.controller.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.BuildingInputController.prototype.init = function() {

  this.dataModel = new lgb.model.BaseInputModel();

  this.guiView = new lgb.view.BuildingInputGUI(this.dataModel);
  this.buildingGeneralInputController_ = new lgb.controller.input.BuildingGeneralInputController();
  
  this.bind_();
  
  this.guiView.init();
  this.buildingGeneralInputController_.init();
   

};


lgb.controller.BuildingInputController.prototype.bind_ = function() {

    this.listenTo(
      this.buildingGeneralInputController_,
      e.RequestAddToParentGUI, 
      this.onRequestAddToParentGUI_);
    
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    
};



lgb.controller.BuildingInputController.prototype.onRequestAddToParentGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.controller.BuildingInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

