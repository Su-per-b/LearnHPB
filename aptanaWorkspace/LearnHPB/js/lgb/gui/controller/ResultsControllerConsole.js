/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.gui.controller.ResultsControllerConsole');

goog.require('lgb.core.BaseController');

goog.require('lgb.gui.view.ResultsGUIConsole');
goog.require('lgb.gui.model.ResultsModelConsole');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.ResultsControllerConsole = function() {

  this.TITLE_ = 'Console';
  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.gui.controller.ResultsControllerConsole, lgb.core.BaseController);



lgb.gui.controller.ResultsControllerConsole.prototype.init = function() {
  
  this.dataModel = new lgb.gui.model.ResultsModelConsole();
  this.guiView = new lgb.gui.view.ResultsGUIConsole (this.dataModel, this.TITLE_);
  this.bind_();
  this.guiView.init();
  
};




lgb.gui.controller.ResultsControllerConsole.prototype.onRequestAddToParentGUI_ = function(event) {
  this.guiView.add(event.payload);
};



lgb.gui.controller.ResultsControllerConsole.prototype.bind_ = function() {

    this.listen (
        lgb.simulation.events.ResultEvent.TYPE,
        this.onResultEvent_
    );
    
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    

};



lgb.gui.controller.ResultsControllerConsole.prototype.onResultEvent_ = function(event) {
  
  return;
};
