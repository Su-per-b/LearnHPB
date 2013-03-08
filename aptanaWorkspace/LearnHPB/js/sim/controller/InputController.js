goog.provide('sim.controller.InputController');

goog.require('sim.controller.ControllerBase');
goog.require('goog.debug.Logger');
goog.require('sim.view.TabStripView');
goog.require('sim.model.TabStripModel');
goog.require('sim.model.TabModel');
goog.require('sim.Config');
goog.require('sim.view.InputView');


sim.controller.InputController = function() {
  sim.controller.ControllerBase.call(this);
};
goog.inherits(sim.controller.InputController, sim.controller.ControllerBase);


/**
 * Initializes the Main Controller after the document is ready
 */
sim.controller.InputController.prototype.init = function() {


    this.view = new sim.view.InputView();
    this.view.init();
    this.view.injectHtml();
    this.view.injectCss();
    
    return;
};


/**
 * @private
 */
sim.controller.InputController.prototype.injectCss_ = function() {
    
  var cssInner = '';
  
  cssInner += this.view.getCss();
  var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);

  $('head').append(cssStr);
    
    
};



