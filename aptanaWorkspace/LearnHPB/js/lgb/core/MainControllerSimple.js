/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.core.MainControllerSimple');

goog.require('lgb');
goog.require('lgb.core.EventBus');
goog.require('lgb.core.Global');

goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');
goog.require('lgb.core.BaseController');
goog.require('lgb.world.controller.RenderController');

goog.require('lgb.gui.controller.LayoutSimpleController');
goog.require('lgb.world.controller.BuildingController');
goog.require('lgb.world.controller.UtilityController');
goog.require('lgb.world.controller.WorldSelectionController');
goog.require('lgb.gui.controller.LayoutSimpleController');
goog.require('lgb.simulation.controller.MainController');





/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.core.MainControllerSimple = function() {
  

  lgb.core.BaseController.call(this);
  lgb.globalEventBus = new lgb.core.EventBus();

  console.log('lgb.core.MainControllerSimple');
  
  var delegate = jQuery.proxy(this.init, this);
  jQuery(document).ready(delegate);
};
goog.inherits(lgb.core.MainControllerSimple, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.core.MainControllerSimple.prototype.init = function() {

  this.scenarioController_ = new lgb.scenario.controller.ScenarioController();

  this.layoutSimpleController_ = new lgb.gui.controller.LayoutSimpleController();
  this.layoutSimpleController_.init();

  
  $(window).resize(this.d(this.onNativeWindowResize_));
  
   
  this.simMainController_ = new lgb.simulation.controller.MainController();
  this.simMainController_.init();
  
  
  
    
  this.logger_ = goog.debug.Logger.getLogger('lgb.core.MainControllerSimple');

  lgb.logInfo(lgb.core.Config.getTitle());
  lgb.logInfo('jQuery version: ' + $('').jquery);


};








/**
 * Handles the browser resize event
 * then dispatches a lgb event
 * @private
 * @param {Event} event The browser's event.
 */
lgb.core.MainControllerSimple.prototype.onNativeWindowResize_ =
  function(event) {

  var payload = {
    w:window.innerWidth,
    h:window.innerHeight
    };
  
  this.trigger(e.WindowResize, payload);  

};





lgb.core.MainControllerSimple.start =
  function() {


  if (undefined != LGB_WEBROOT) {
     lgb.core.Config.WEBROOT = LGB_WEBROOT;
  }
  
  lgb.init();
  lgb.core.MainControllerSimple.instance = new lgb.core.MainControllerSimple();


};


