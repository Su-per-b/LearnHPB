/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.controller.LayoutController');

goog.require('lgb.core.BaseController');
goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');
goog.require('lgb.chart.view.LayoutView');
goog.require('lgb.gui.model.LayoutModel');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.LayoutController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.chart.controller.LayoutController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.chart.controller.LayoutController.prototype.init = function() {
    
    this.dataModel = new lgb.gui.model.LayoutModel();
    this.view  = new lgb.chart.view.LayoutView(this.dataModel);
    this.bind_();
    this.view.init();
};



lgb.chart.controller.LayoutController.prototype.bind_ = function() {
    
  this.listenTo(this.view, e.LayoutChange, this.onLayoutChange_);
  this.listen(e.WindowResize, this.onWindowResize_);
  this.listen(e.RequestAddToLayout, this.onRequestAddToLayout_);
   
};

lgb.chart.controller.LayoutController.prototype.onRequestAddToLayout_ = function(event) {

    this.dataModel.add(event.payload);
};


lgb.chart.controller.LayoutController.prototype.onRequestLayoutVisibilityChange_ = function(event) {
  
    this.view.toggleVisibility(event.payload);
    
};


/**
 * Event handler for browser resize
 * @param {goog.events.Event} event The Event.
 */
lgb.chart.controller.LayoutController.prototype.onWindowResize_ = function(event) {
    this.view.calculateLayout(event.payload);
};

lgb.chart.controller.LayoutController.prototype.onLayoutChange_ = function(event) {
    
    this.view.calculateLayout();
    this.dispatch(event);
    
};





