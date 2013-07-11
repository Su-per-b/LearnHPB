goog.provide('lgb.controller.TestingInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.TestingInputGUI');
goog.require('lgb.model.BaseInputModel');


lgb.controller.TestingInputController = function() {

  lgb.controller.BaseController.call(this);
};
goog.inherits(lgb.controller.TestingInputController, lgb.controller.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.TestingInputController.prototype.init = function() {

  this.dataModel = new lgb.model.BaseInputModel();

  this.guiView = new lgb.view.TestingInputGUI(this.dataModel);
  this.bind_();
  this.guiView.init();
  
};


lgb.controller.TestingInputController.prototype.bind_ = function() {

  this.listen(
    e.RequestAddToTestingInput, 
    this.onRequestAddToGUI_);
    
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);

};


lgb.controller.TestingInputController.prototype.onRequestAddToGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.controller.TestingInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

