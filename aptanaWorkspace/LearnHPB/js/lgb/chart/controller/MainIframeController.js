/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.controller.MainIframeController');

goog.require('lgb');
goog.require('lgb.core.EventBus');
goog.require('lgb.core.Global');
goog.require('lgb.core.Config');
goog.require('lgb.core.BaseController');
goog.require('goog.debug.Logger');

goog.require('lgb.chart.controller.GraphController');

goog.require('lgb.chart.controller.LayoutController');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.MainIframeController = function() {
  
  lgb.core.BaseController.call(this);


  var delegate = jQuery.proxy(this.init, this);
  jQuery(document).ready(delegate);
};
goog.inherits(lgb.chart.controller.MainIframeController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.chart.controller.MainIframeController.prototype.init = function() {

  lgb.globalEventBus = new lgb.core.EventBus();
  
  var theTitle = lgb.core.Config.getTitle();
   $('title').html(theTitle);
   
  $(window).resize(this.d(this.onNativeWindowResize_));
  
      
  //this.graphController_ = new lgb.chart.controller.GraphController();


  this.layoutController_ = new lgb.chart.controller.LayoutController();
  this.layoutController_.init();
  
      
  var url = $.url(); // parse the current page URL
  var sessionID = url.param('sessionID');
    
      
   this.simMainIframeController_ = new lgb.simulation.controller.MainIframeController();
   this.simMainIframeController_.init();
 
   this.simMainIframeController_.connect(true);
   this.simMainIframeController_.attachToSession(sessionID);
   this.simMainIframeController_.getInfo();
  
  
  
};



/**
 * Handles the browser resize event
 * then dispatches a lgb event
 * @private
 * @param {Event} event The browser's event.
 */
lgb.chart.controller.MainIframeController.prototype.onNativeWindowResize_ =
  function(event) {


  var payload = {
    w:window.innerWidth,
    h:window.innerHeight
    };
  
  this.trigger(e.WindowResize, payload);
  

};






lgb.chart.controller.MainIframeController.start=
  function() {

  if (typeof LGB_WEBROOT != 'undefined') {
     lgb.core.Config.WEBROOT = LGB_WEBROOT;
  }
  
  lgb.init();
  
  window.mainController = new lgb.chart.controller.MainIframeController();
  

};




