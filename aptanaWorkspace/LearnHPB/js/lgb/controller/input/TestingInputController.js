goog.provide('lgb.controller.input.TestingInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.input.TestingInputGUI');
goog.require('lgb.model.input.BaseInputModel');


lgb.controller.input.TestingInputController = function() {

  lgb.controller.BaseController.call(this);
};
goog.inherits(lgb.controller.input.TestingInputController, lgb.controller.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.input.TestingInputController.prototype.init = function() {

  this.dataModel = new lgb.model.input.BaseInputModel();

  this.guiView = new lgb.view.input.TestingInputGUI(this.dataModel);
  this.bind_();
  this.guiView.init();
  
};


lgb.controller.input.TestingInputController.prototype.bind_ = function() {

  this.listen(
    e.RequestAddToTestingInput, 
    this.onRequestAddToGUI_);
    
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);

};


lgb.controller.input.TestingInputController.prototype.onRequestAddToGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.controller.input.TestingInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

