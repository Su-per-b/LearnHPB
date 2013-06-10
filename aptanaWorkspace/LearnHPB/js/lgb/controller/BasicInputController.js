goog.provide('lgb.controller.BasicInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.BasicInputGUI');
goog.require('lgb.model.BasicInputModel');


lgb.controller.BasicInputController = function() {

  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.controller.BasicInputController, lgb.controller.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.BasicInputController.prototype.init_ = function() {

  this.dataModel = new lgb.model.BasicInputModel();

  this.guiView = new lgb.view.BasicInputGUI(this.dataModel);
  this.bind_();
  
  this.guiView.init();
  this.trigger(e.RequestAddToLayout, this.guiView);
};


lgb.controller.BasicInputController.prototype.bind_ = function() {

  this.listen(
    e.RequestAddToBasicInput, 
    this.onRequestAddToGUI_);

};


lgb.controller.BasicInputController.prototype.onRequestAddToGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.controller.BasicInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

