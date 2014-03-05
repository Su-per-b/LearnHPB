/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.controller.MainController2');

goog.require('goog.debug.Logger');

goog.require('lgb');
goog.require('lgb.core.Config');
goog.require('lgb.core.BaseController');

goog.require('lgb.chart.controller.LayoutController');
goog.require('lgb.simulation.controller.MainController');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.MainController2 = function() {
  
  lgb.core.BaseController.call(this);
  lgb.globalEventBus = new lgb.core.EventBus();

};
goog.inherits(lgb.chart.controller.MainController2, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.chart.controller.MainController2.prototype.init = function() {

  var theTitle = lgb.core.Config.getTitle();
   $('title').html(theTitle);
   
  $(window).resize(this.d(this.onNativeWindowResize_));
  
  var url = $.url(); // parse the current page URL
  var sessionID = url.param('sessionID');
  
  this.layoutController = new lgb.chart.controller.LayoutController();
  
  this.simMainController_ = new lgb.simulation.controller.MainController();
  this.simMainController_.init();
  

   
};






/**
 * Handles the browser resize event
 * then dispatches a lgb event
 * @private
 * @param {Event} event The browser's event.
 */
lgb.chart.controller.MainController2.prototype.onNativeWindowResize_ =
  function(event) {


  var payload = {
    w:window.innerWidth,
    h:window.innerHeight
    };
  
  this.trigger(e.WindowResize, payload);
  

};




