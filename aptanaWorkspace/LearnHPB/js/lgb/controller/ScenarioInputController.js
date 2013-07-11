goog.provide('lgb.controller.ScenarioInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.ScenarioInputGUI');
goog.require('lgb.model.BaseInputModel');


lgb.controller.ScenarioInputController = function() {

  lgb.controller.BaseController.call(this);
};
goog.inherits(lgb.controller.ScenarioInputController, lgb.controller.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.ScenarioInputController.prototype.init = function() {

  this.dataModel = new lgb.model.BaseInputModel();

  this.guiView = new lgb.view.ScenarioInputGUI(this.dataModel);
  this.bind_();
  this.guiView.init();
  

  
};


lgb.controller.ScenarioInputController.prototype.bind_ = function() {

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);

};


lgb.controller.ScenarioInputController.prototype.onRequestAddToGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.controller.ScenarioInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

