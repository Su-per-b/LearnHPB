/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgbStandalone.core.MainController');

goog.require('lgb');
goog.require('lgb.core.EventBus');
goog.require('lgb.core.Global');

goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');
goog.require('lgb.core.BaseController');
goog.require('lgb.world.controller.RenderController');

goog.require('lgbStandAlone.gui.controller.LayoutController');
goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.world.controller.BuildingController');
goog.require('lgb.world.controller.UtilityController');
goog.require('lgb.world.controller.WorldSelectionController');






/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgbStandalone.core.MainController = function() {
  

  lgb.core.BaseController.call(this);
  lgb.globalEventBus = new lgb.core.EventBus();

  console.log('lgbStandalone.core.MainController');
  
  var delegate = jQuery.proxy(this.init, this);
  jQuery(document).ready(delegate);
};
goog.inherits(lgbStandalone.core.MainController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgbStandalone.core.MainController.prototype.init = function() {

  this.scenarioController_ = new lgb.scenario.controller.ScenarioController();

  this.layoutController_ = new lgbStandAlone.gui.controller.LayoutController();
  this.layoutController_.init();

  
  $(window).resize(this.d(this.onNativeWindowResize_));
  
  this.simulationMainController_ = new lgb.simulation.controller.MainController();
  this.simulationMainController_.init();
  
  this.logger_ = goog.debug.Logger.getLogger('lgbStandalone.core.MainController');

  lgb.logInfo(lgb.core.Config.getTitle());
  lgb.logInfo('jQuery version: ' + $('').jquery);


};



/**
 * Handles the browser resize event
 * then dispatches a lgb event
 * @private
 * @param {Event} event The browser's event.
 */
lgbStandalone.core.MainController.prototype.onNativeWindowResize_ =
  function(event) {

  var payload = {
    w:window.innerWidth,
    h:window.innerHeight
    };
  
  this.trigger(e.WindowResize, payload);  

};





lgbStandalone.core.MainController.start =
  function() {


  if (undefined != LGB_WEBROOT) {
     lgb.core.Config.WEBROOT = LGB_WEBROOT;
  }
  
  lgb.init();
  window.mainController = new lgbStandalone.core.MainController();


};


