/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgbMin3d.core.MainController');


goog.require('goog.debug.Logger');

goog.require('lgb');
goog.require('lgb.core.EventBus');
goog.require('lgb.core.Global');
goog.require('lgb.core.Config');
goog.require('lgb.core.BaseController');

goog.require('lgb.world.controller.TrackBallController');
goog.require('lgb.world.controller.RenderController');
goog.require('lgb.world.controller.UtilityController');

goog.require('lgbMin3d.gui.controller.LayoutController');
goog.require('lgbMin3d.gui.view.LayoutView');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgbMin3d.core.MainController = function() {
  
  lgb.core.BaseController.call(this);
  lgb.globalEventBus = new lgb.core.EventBus();

  console.log('lgbMin3d.core.MainController');
  
  var delegate = jQuery.proxy(this.init, this);
  jQuery(document).ready(delegate);
};
goog.inherits(lgbMin3d.core.MainController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgbMin3d.core.MainController.prototype.init = function() {

  console.log('lgbMin3d.core.MainController.init');
  

  this.layoutController_ = new lgbMin3d.gui.controller.LayoutController();
  
  var theTitle = lgb.core.Config.getTitle();
   $('title').html(theTitle);
   
  this.renderController_ = new lgb.world.controller.RenderController();
  this.renderController_.init();

  this.utilityController_ = new lgb.world.controller.UtilityController();
  
  
  var camera = this.renderController_.getCamera();
  
  /** @type {lgb.world.controller.TrackBallController} */
  this.trackController_ = new lgb.world.controller.TrackBallController(
    camera
  );
  
  
  $(window).resize(this.d(this.onNativeWindowResize_));
  
  

  this.logger_ = goog.debug.Logger.getLogger('lgbMin3d.core.MainController');
  
  lgb.logInfo(lgb.core.Config.getTitle());
  lgb.logInfo('jQuery version: ' + $('').jquery);

  return;
};



/**
 * Handles the browser resize event
 * then dispatches a lgb event
 * @private
 * @param {Event} event The browser's event.
 */
lgbMin3d.core.MainController.prototype.onNativeWindowResize_ =
  function(event) {

  var payload = {
    w:window.innerWidth,
    h:window.innerHeight
    };
  
  this.trigger(e.WindowResize, payload);  

};





lgbMin3d.core.MainController.start =
  function() {


  if (typeof window.LGB_WEBROOT != 'undefined') {
     lgb.core.Config.WEBROOT = window.LGB_WEBROOT;
  }
  
  lgb.init();
  
  window.mainController = new lgbMin3d.core.MainController();

};







