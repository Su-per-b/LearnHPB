goog.provide('lgb.gui.controller.TestingInputController');

goog.require('lgb.core.BaseController');
goog.require('lgb.world.view.input.TestingInputGUI');
goog.require('lgb.gui.model.BaseInputModel');


lgb.gui.controller.TestingInputController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.gui.controller.TestingInputController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.TestingInputController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseInputModel();

  this.guiView = new lgb.world.view.input.TestingInputGUI(this.dataModel);
  this.bind_();
  this.guiView.init();
  
};


lgb.gui.controller.TestingInputController.prototype.bind_ = function() {

  this.listen(
    e.RequestAddToTestingInput, 
    this.onRequestAddToGUI_);
    
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);

};


lgb.gui.controller.TestingInputController.prototype.onRequestAddToGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.gui.controller.TestingInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

