goog.provide('lgb.controller.BuildingInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.BuildingInputGUI');
goog.require('lgb.model.BaseInputModel');


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
  this.bind_();
  this.guiView.init();
  
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
};


lgb.controller.BuildingInputController.prototype.bind_ = function() {



};


lgb.controller.BuildingInputController.prototype.onRequestAddToGUI_ = function(event) {

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

