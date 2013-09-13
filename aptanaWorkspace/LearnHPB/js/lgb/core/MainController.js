/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.core.MainController');

goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');
goog.require('lgb.core.BaseController');
goog.require('lgb.scenario.controller.ScenarioController');
goog.require('lgb.world.controller.WorldController');

goog.require('lgb.gui.controller.GuiController');
goog.require('lgb.gui.controller.SimulationGUIController');
goog.require('lgb.gui.controller.LayoutController');
goog.require('lgb.gui.controller.GuiController');

goog.require('lgb.simulation.model.voNative.SimStateNative');
goog.require('lgb');

/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.core.MainController = function() {
  
  lgb.core.BaseController.call(this);
  lgb.globalEventBus = new lgb.core.EventBus();

  console.log('lgb.core.MainController');
  
  var delegate = jQuery.proxy(this.init, this);
  jQuery(document).ready(delegate);
};
goog.inherits(lgb.core.MainController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.core.MainController.prototype.init = function() {


  console.log('lgb.core.MainController.init');
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

  this.layoutController_ = new lgb.gui.controller.LayoutController();
  this.layoutController_.init();
  
  var theTitle = lgb.core.Config.getTitle();
   $('title').html(theTitle);
   
  this.guiController = new lgb.gui.controller.GuiController();
  this.scenarioController = new lgb.scenario.controller.ScenarioController();
   
  this.worldController_ = new lgb.world.controller.WorldController();
  this.worldController_.init();
    
  $(window).resize(this.d(this.onNativeWindowResize_));
  
   
  this.simulationController_ = new lgb.gui.controller.SimulationGUIController();


  this.simMainController_ = new lgb.simulation.controller.MainController();
  this.trigger(e.SimulationEngineLoaded, this.simMainController_);
  
  
  
  /**
  * The logger used by this object.
  * @type {goog.debug.Logger}
  * @private
  */
  this.logger_ = goog.debug.Logger.getLogger('lgb.core.MainController');

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
lgb.core.MainController.prototype.onNativeWindowResize_ =
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
lgb.core.MainController.prototype.injectSimulationWindow_ = function() {
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
lgb.core.MainController.prototype.injectErrorWindow_ = function() {
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


