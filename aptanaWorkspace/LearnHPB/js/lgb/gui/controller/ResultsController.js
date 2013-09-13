/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.gui.controller.ResultsController');

goog.require('lgb.controller.BaseController');

goog.require('goog.debug.Logger');
goog.require('lgb.Config');

goog.require('lgb.gui.view.ResultsGUI');
goog.require('lgb.gui.model.ResultsModel');
goog.require('lgb.gui.controller.ResultsSubController');

/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.gui.controller.ResultsController = function() {

  lgb.controller.BaseController.call(this);
  this.init_();

};
goog.inherits(lgb.gui.controller.ResultsController, lgb.controller.BaseController);



lgb.gui.controller.ResultsController.prototype.init_ = function() {

  this.dataModel = new lgb.gui.model.ResultsModel();
  this.guiView  = new lgb.gui.view.ResultsGUI(this.dataModel);
  
  this.subControllerList_ = [];
  this.subControllerMap_ = {};
  
  this.bind_();
  this.guiView.init();
  
  this.makeSubController_('Output');
  this.makeSubController_('Console');
 

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
  
  
  var subController = new lgb.gui.controller.ResultsSubController(title);

    this.listenTo(
      subController,
      e.RequestAddToParentGUI, 
      this.onRequestAddToParentGUI_);
        
  this.subControllerList_.push(subController);
  this.subControllerMap_[title] = subController;
    
  subController.init();

};


lgb.gui.controller.ResultsController.prototype.onRequestAddToParentGUI_ = function(event) {
  this.guiView.add(event.payload);
};


lgb.gui.controller.ResultsController.prototype.onMessageEvent_ = function(event) {
  
  this.subControllerMap_['Console']
  
};








lgb.gui.controller.ResultsController.prototype.onResultEvent_ = function(event) {
  
  return;
};
