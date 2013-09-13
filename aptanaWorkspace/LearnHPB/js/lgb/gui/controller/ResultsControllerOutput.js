/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.gui.controller.ResultsControllerOutput');

goog.require('lgb.core.BaseController');

goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');

goog.require('lgb.gui.view.ResultsGUI');
goog.require('lgb.gui.model.ResultsModel');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.ResultsControllerOutput = function() {

  this.TITLE_ = 'Output !';
  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.gui.controller.ResultsControllerOutput, lgb.core.BaseController);



lgb.gui.controller.ResultsControllerOutput.prototype.init = function() {
  
  this.dataModel = new lgb.gui.model.BaseInputModel();
  this.guiView = new lgb.gui.view.GUI (this.dataModel, this.TITLE_);
  this.bind_();
  this.guiView.init();
  
};




lgb.gui.controller.ResultsControllerOutput.prototype.onRequestAddToParentGUI_ = function(event) {
  this.guiView.add(event.payload);
};



lgb.gui.controller.ResultsControllerOutput.prototype.bind_ = function() {

    this.listen (
        lgb.simulation.events.ResultEvent.TYPE,
        this.onResultEvent_
    );
    
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    

};



lgb.gui.controller.ResultsControllerOutput.prototype.onResultEvent_ = function(event) {
  
  return;
};
