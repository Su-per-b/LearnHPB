/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.core.MainController');

goog.require('lgb');
goog.require('lgb.core.EventBus');
goog.require('lgb.core.Global');
goog.require('lgb.core.Config');
goog.require('lgb.core.BaseController');
goog.require('goog.debug.Logger');

goog.require('lgb.scenario.controller.ScenarioController');
goog.require('lgb.world.controller.RenderController');

goog.require('lgb.gui.controller.LayoutController');
goog.require('lgb.world.controller.BuildingController');
goog.require('lgb.world.controller.UtilityController');
// goog.require('lgb.world.controller.WorldSelectionController');





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

  //console.log('lgb.core.MainController.init');
  
  this.injectErrorWindow_();
  
  
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
  
  var theTitle = lgb.core.Config.getTitle();
   $('title').html(theTitle);
   

  this.scenarioController_ = new lgb.scenario.controller.ScenarioController();
   
  this.renderController_ = new lgb.world.controller.RenderController();
  this.renderController_.init();
  
  
  if (lgb.core.Config.SHOW_STATS) {
   // this.statsView_ = new lgb.gui.view.StatsView(this.view.containerDiv_);
  } else {
    this.statsView_ = null;
  }
  
  this.buildingController_ = new lgb.world.controller.BuildingController();
  

  
  this.utilityController_ = new lgb.world.controller.UtilityController();
  
  
  /**@type {lgb.world.controller.WorldSelectionController} */
  // this.selectionController_ =
    // new lgb.world.controller.WorldSelectionController(
      // this.renderController_.getCamera(),
      // this.renderController_.scene_,
      // this.renderController_.view.containerDiv_
  // );
  
  
  /** @type {lgb.world.controller.TrackBallController} */
  this.trackController_ = new lgb.world.controller.TrackBallController(
    this.renderController_.getCamera()
  );
  
  
  $(window).resize(this.d(this.onNativeWindowResize_));
  

  this.simulationMainController_ = new lgb.simulation.controller.MainController();
  this.simulationMainController_.init();
  
  
  this.trigger(e.RequestLoadScenario, "VerySimpleScenario");
  this.logger_ = goog.debug.Logger.getLogger('lgb.core.MainController');
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
lgb.core.MainController.prototype.onNativeWindowResize_ =
  function(event) {

  var payload = {
    w:window.innerWidth,
    h:window.innerHeight
    };
  
  this.trigger(e.WindowResize, payload);  

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


lgb.core.MainController.start =
  function() {


  if (typeof window.LGB_WEBROOT != 'undefined') {
     lgb.core.Config.WEBROOT = window.LGB_WEBROOT;
  }
  
  lgb.init();
  
  window.mainController = new lgb.core.MainController();

};







