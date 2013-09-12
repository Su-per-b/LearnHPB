/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.controller.input.ResultsController');

goog.require('lgb.controller.BaseController');

goog.require('goog.debug.Logger');
goog.require('lgb.Config');

goog.require('lgb.view.input.ResultsGUI');
goog.require('lgb.model.input.ResultsModel');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.input.ResultsController = function() {

  lgb.controller.BaseController.call(this);

};
goog.inherits(lgb.controller.input.ResultsController, lgb.controller.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.input.ResultsController.prototype.init = function() {
    
    this.dataModel = new lgb.model.input.ResultsModel();
    this.guiView  = new lgb.view.input.ResultsGUI(this.dataModel);
    this.bind_();
    this.guiView.init();
};





lgb.controller.input.ResultsController.prototype.bind_ = function() {

    this.listen (
        lgb.simulation.events.ResultEvent.TYPE,
        this.onResultEvent_
    );
    
    
};




lgb.controller.input.ResultsController.prototype.onResultEvent_ = function(event) {
  
  return;
};
