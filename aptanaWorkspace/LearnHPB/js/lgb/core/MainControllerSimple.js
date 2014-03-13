/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.core.MainControllerSimple');

goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');
goog.require('lgb.core.BaseController');
goog.require('lgb.scenario.controller.ScenarioController');
goog.require('lgb.world.controller.RenderController');

goog.require('lgb.gui.controller.LayoutControllerSimple');
goog.require('lgb.world.controller.BuildingController');
goog.require('lgb.world.controller.UtilityController');
goog.require('lgb.world.controller.WorldSelectionController');
goog.require('lgb.gui.controller.LayoutControllerSimple');

goog.require('lgb');



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


  this.layoutControllerSimple_ = new lgb.gui.controller.LayoutControllerSimple();
  
  var theTitle = lgb.core.Config.getTitle();
   $('title').html(theTitle);
   

  this.scenarioController = new lgb.scenario.controller.ScenarioController();
  
  $(window).resize(this.d(this.onNativeWindowResize_));
  
   
  this.simMainControllerSimple_ = new lgb.simulation.controller.MainController();
  this.simMainControllerSimple_.init();
  
  this.logger_ = goog.debug.Logger.getLogger('lgb.core.MainControllerSimple');

  lgb.logInfo(lgb.core.Config.getTitle());
  lgb.logInfo('jQuery version: ' + $('').jquery);
  lgb.logInfo('jQuery.ui version: ' + $.ui.version);


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




