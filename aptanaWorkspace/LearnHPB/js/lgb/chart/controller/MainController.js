/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.controller.MainController');

goog.require('goog.debug.Logger');

goog.require('lgb');
goog.require('lgb.core.Config');
goog.require('lgb.core.BaseController');
goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.chart.controller.GraphController');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.MainController = function() {
  
  lgb.core.BaseController.call(this);
  lgb.globalEventBus = new lgb.core.EventBus();

  
  var delegate = jQuery.proxy(this.init, this);
  jQuery(document).ready(delegate);
};
goog.inherits(lgb.chart.controller.MainController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.chart.controller.MainController.prototype.init = function() {

  
  var theTitle = lgb.core.Config.getTitle();
   $('title').html(theTitle);
   
  $(window).resize(this.d(this.onNativeWindowResize_));
  
      
  this.graphController_ = new lgb.chart.controller.GraphController();

      
  var url = $.url(); // parse the current page URL
  var sessionID = url.param('sessionID');
    
      
   this.simMainController_ = new lgb.simulation.controller.MainController();
   this.simMainController_.init();
//   
   this.simMainController_.connect(true);
   this.simMainController_.attachToSession(sessionID);
  
  
};





/**
 * Handles the browser resize event
 * then dispatches a lgb event
 * @private
 * @param {Event} event The browser's event.
 */
lgb.chart.controller.MainController.prototype.onNativeWindowResize_ =
  function(event) {


  var payload = {
    w:window.innerWidth,
    h:window.innerHeight
    };
  
  this.trigger(e.WindowResize, payload);
  

};




