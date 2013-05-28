goog.provide('lgb.controller.InputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.VisibilityController');

goog.require('goog.debug.Logger');
goog.require('lgb.model.TabStripModel');
goog.require('lgb.model.TabModel');
goog.require('lgb.Config');
goog.require('lgb.view.InputGUI');
goog.require('lgb.model.InputModel');

lgb.controller.InputController = function() {

  lgb.controller.BaseController.call(this);

  this.init_();
};
goog.inherits(lgb.controller.InputController, lgb.controller.BaseController);

/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.InputController.prototype.init_ = function() {

  this.dataModel = new lgb.model.InputModel();

  this.view = new lgb.view.InputGUI(this.dataModel, 'InputGUI', 'leftPanel');
  this.view.init();

  this.visibilityController_ = new lgb.controller.VisibilityController();
  this.viewpointController_ = new lgb.controller.ViewPointController();
  this.psMasterController_ = new lgb.controller.PsMasterController();

  this.bind_();

  this.visibilityController_.init();
  this.viewpointController_.init();
  this.psMasterController_.init();

  return;
};

lgb.controller.InputController.prototype.bind_ = function() {

  this.listenTo(
    [this.visibilityController_, this.viewpointController_, this.psMasterController_], 
    e.RequestAddToGUI, 
    this.onRequestAddToGUI_);

};

lgb.controller.InputController.prototype.onRequestAddToGUI_ = function(event) {

  this.view.addGUIview(event.payload);

  return;
}
/**
 * @private
 */
lgb.controller.InputController.prototype.injectCss_ = function() {

  var cssInner = '';

  cssInner += this.view.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);

};

