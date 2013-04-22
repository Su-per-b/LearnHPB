goog.provide('lgb.controller.InputController');

goog.require('lgb.controller.ControllerBase');
goog.require('goog.debug.Logger');
goog.require('lgb.model.TabStripModel');
goog.require('lgb.model.TabModel');
goog.require('lgb.Config');
goog.require('lgb.view.InputView');
goog.require('lgb.model.InputModel');

lgb.controller.InputController = function() {
  this._NAME = 'lgb.controller.InputController';
  lgb.controller.ControllerBase.call(this);
  
  this.init_();
};
goog.inherits(lgb.controller.InputController, lgb.controller.ControllerBase);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.InputController.prototype.init_ = function() {


    this.dataModel = new lgb.model.InputModel();
    
    this.view = new lgb.view.InputView(this.dataModel, 'InputView', 'leftPanel');
    this.view.init();

    
    return;
};


/**
 * @private
 */
lgb.controller.InputController.prototype.injectCss_ = function() {
    
  var cssInner = '';
  
  cssInner += this.view.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);
    
    
};



