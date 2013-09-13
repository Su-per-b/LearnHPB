goog.provide('lgb.gui.controller.TestController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.TestGUI');
goog.require('lgb.gui.model.BaseInputModel');


lgb.gui.controller.TestController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.gui.controller.TestController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.TestController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseInputModel();

  this.guiView = new lgb.gui.view.TestGUI(this.dataModel);
  this.bind_();
  this.guiView.init();
  
};


lgb.gui.controller.TestController.prototype.bind_ = function() {

  this.listen(
    e.RequestAddToTestingInput, 
    this.onRequestAddToGUI_);
    
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);

};


lgb.gui.controller.TestController.prototype.onRequestAddToGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.gui.controller.TestController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

