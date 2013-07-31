/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.LayoutController');

goog.require('lgb.controller.BaseController');
goog.require('goog.debug.Logger');
goog.require('lgb.Config');
goog.require('lgb.view.LayoutView');
goog.require('lgb.model.LayoutModel');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.LayoutController = function() {

  lgb.controller.BaseController.call(this);

};
goog.inherits(lgb.controller.LayoutController, lgb.controller.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.controller.LayoutController.prototype.init = function() {
    
    this.dataModel = new lgb.model.LayoutModel();
    this.view  = new lgb.view.LayoutView(this.dataModel);
    this.bind_();
    this.view.init();
};





lgb.controller.LayoutController.prototype.bind_ = function() {
    
  this.listenTo(this.view, e.LayoutChange, this.onLayoutChange_);
  
  this.listen(e.WindowResize, this.onWindowResize_);
  this.listen(e.RequestAddToLayout, this.onRequestAddToLayout_);
  this.listen(e.RequestLayoutVisibilityChange, this.onRequestLayoutVisibilityChange_);
   
};

lgb.controller.LayoutController.prototype.onRequestAddToLayout_ = function(event) {

    this.dataModel.add(event.payload);
};


lgb.controller.LayoutController.prototype.onRequestLayoutVisibilityChange_ = function(event) {
  
    this.view.toggleVisibility(event.payload);
    
};


/**
 * Event handler for browser resize
 * @param {goog.events.Event} event The Event.
 */
lgb.controller.LayoutController.prototype.onWindowResize_ = function(event) {
    this.view.calculateLayout(event.payload);
};

lgb.controller.LayoutController.prototype.onLayoutChange_ = function(event) {
    
    this.view.calculateLayout();
    this.dispatch(event);
    
};





