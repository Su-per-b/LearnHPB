/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.MainController');

goog.require('goog.debug.Logger');
goog.require('lgb.Config');
goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.GuiController');
goog.require('lgb.controller.ScenarioController');
goog.require('lgb.controller.WorldController');
goog.require('lgb.controller.SimulationController');
goog.require('lgb.controller.LayoutController');

goog.require('lgb.simulation.model.voNative.SimStateNative');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.MainController = function() {
  
  lgb.controller.BaseController.call(this);
  lgb.globalEventBus = new lgb.events.EventBus();

  console.log('lgb.controller.MainController');
  
  var delegate = jQuery.proxy(this.init, this);
  jQuery(document).ready(delegate);
};
goog.inherits(lgb.controller.MainController, lgb.controller.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.MainController.prototype.init = function() {


  console.log('lgb.controller.MainController.init');
  this.injectErrorWindow_();
  this.injectSimulationWindow_();
  
  
/*
  window.onerror = function(errorMsg, url, lineNumber) {
    var w = $('#errorWindow').data('kendoWindow');
     w.content(errorMsg + '<br />url:' + url + '<br />line:' + lineNumber);
       w.open();
     debugger;
  };*/

  
/*


*/

  this.layoutController_ = new lgb.controller.LayoutController();
  this.layoutController_.init();
  
  var theTitle = lgb.Config.getTitle();
   $('title').html(theTitle);
   
  this.guiController = new lgb.controller.GuiController();
  this.scenarioController = new lgb.controller.ScenarioController();
   
  this.worldController_ = new
    lgb.controller.WorldController();

  this.worldController_.init();
    
  
  $(window).resize(this.d(this.onNativeWindowResize_));
  
   
  this.simulationController_ = new lgb.controller.SimulationController();

 

  /**
  * The logger used by this object.
  * @type {goog.debug.Logger}
  * @private
  */
  this.logger_ = goog.debug.Logger.getLogger('lgb.controller.MainController');

  lgb.logInfo(lgb.Config.getTitle());
  lgb.logInfo('jQuery version: ' + $('').jquery);
  lgb.logInfo('jQuery.ui version: ' + $.ui.version);


};



/**
 * Handles the browser resize event
 * then dispatches a lgb event
 * @private
 * @param {Event} event The browser's event.
 */
lgb.controller.MainController.prototype.onNativeWindowResize_ =
  function(event) {


  
  var payload = {
    w:window.innerWidth,
    h:window.innerHeight
    };
  
  this.trigger(e.WindowResize, payload)
  

};

/**
 * Injects the HTML needed for the modal
 * dialog that apears if an exception occurs
 * @private
 */
lgb.controller.MainController.prototype.injectSimulationWindow_ = function() {
  var container = $('<p>')
    .attr('id', 'simulationWindow')
    .appendTo('body');

   var w = $('#simulationWindow').kendoWindow({
       draggable: false,
       resizable: false,
       width: '500px',
       height: '300px',
       title: 'Simulation Output',
       modal: true,
       visible: false,
       actions: ['Refresh', 'Maximize', 'Close']
   }).data('kendoWindow');

   w.center();
   
   
   container.attr('unselectable','on').css('UserSelect','none').css('MozUserSelect','none');
   
};



/**
 * Injects the HTML needed for the modal
 * dialog that apears if an exception occurs
 * @private
 */
lgb.controller.MainController.prototype.injectErrorWindow_ = function() {
  var container = $('<p>')
    .attr('id', 'errorWindow')
    .appendTo('body');

   var w = $('#errorWindow').kendoWindow({
       draggable: false,
       resizable: false,
       width: '500px',
       height: '300px',
       title: 'Exception Ocurred',
       modal: true,
       visible: false,
       actions: ['Refresh', 'Maximize', 'Close']
   }).data('kendoWindow');

   w.center();
   
   container.attr('unselectable','on').css('UserSelect','none').css('MozUserSelect','none');
   
};


