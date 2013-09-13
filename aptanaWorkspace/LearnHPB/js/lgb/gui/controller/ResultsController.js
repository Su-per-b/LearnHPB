/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.gui.controller.ResultsController');

goog.require('lgb.core.BaseController');

goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');

goog.require('lgb.gui.view.ResultsGUI');
goog.require('lgb.gui.model.ResultsModel');

goog.require('lgb.gui.controller.ResultsControllerConsole');
goog.require('lgb.gui.controller.ResultsControllerOutput');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.ResultsController = function() {

  lgb.core.BaseController.call(this);
  this.init_();

};
goog.inherits(lgb.gui.controller.ResultsController, lgb.core.BaseController);



lgb.gui.controller.ResultsController.prototype.init_ = function() {

  this.dataModel = new lgb.gui.model.ResultsModel();
  this.guiView  = new lgb.gui.view.ResultsGUI(this.dataModel);
  
  
  this.bind_();
  this.guiView.init();
  
 // this.makeSubController_('Output');
  
  
  this.resultsControllerOutput_ = new lgb.gui.controller.ResultsControllerOutput();

    this.listenTo(
      this.resultsControllerOutput_,
      e.RequestAddToParentGUI, 
      this.onRequestAddToParentGUI_);
        
  this.resultsControllerOutput_.init();
  
  
  
  
  this.resultsControllerConsole_ = new lgb.gui.controller.ResultsControllerConsole();
  
  this.listenTo(
    this.resultsControllerConsole_,
    e.RequestAddToParentGUI, 
    this.onRequestAddToParentGUI_);

  this.resultsControllerConsole_.init();

};




lgb.gui.controller.ResultsController.prototype.bind_ = function() {
  
  this.relay (
    this.guiView,
    e.RequestAddToLayout);
  
    this.listen (
        lgb.simulation.events.MessageEvent.TYPE,
        this.onMessageEvent_
    );
    
};



lgb.gui.controller.ResultsController.prototype.makeSubController_ = function(title) {
  
  
  var subController = new lgb.gui.controller.ResultsControllerOutput(title);

    this.listenTo(
      subController,
      e.RequestAddToParentGUI, 
      this.onRequestAddToParentGUI_);
        
  subController.init();

};


lgb.gui.controller.ResultsController.prototype.onRequestAddToParentGUI_ = function(event) {
  this.guiView.add(event.payload);
};


lgb.gui.controller.ResultsController.prototype.onMessageEvent_ = function(event) {
  
  
  return;
  
};








lgb.gui.controller.ResultsController.prototype.onResultEvent_ = function(event) {
  
  return;
};
