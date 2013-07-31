goog.provide('lgb.controller.input.SimulationInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.input.SimulationInputGUI');
goog.require('lgb.model.input.BaseInputModel');


lgb.controller.input.SimulationInputController = function() {

  lgb.controller.BaseController.call(this);
};
goog.inherits(lgb.controller.input.SimulationInputController, lgb.controller.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.input.SimulationInputController.prototype.init = function() {

  this.dataModel = new lgb.model.input.BaseInputModel();

  this.guiView = new lgb.view.input.SimulationInputGUI(this.dataModel);
  

  
  this.bind_();
  this.guiView.init();
  

  
};


lgb.controller.input.SimulationInputController.prototype.bind_ = function() {

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);

};


lgb.controller.input.SimulationInputController.prototype.onRequestAddToGUI_ = function(event) {

  this.guiView.add(event.payload);

};


/**
 * @private
 */
lgb.controller.input.SimulationInputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.guiView.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

