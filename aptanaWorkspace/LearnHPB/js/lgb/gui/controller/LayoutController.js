/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.LayoutController');

goog.require('lgb.core.BaseController');
goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');
goog.require('lgb.gui.view.LayoutView');
goog.require('lgb.gui.model.LayoutModel');


goog.require('lgb.gui.controller.PropertiesController');
goog.require('lgb.gui.controller.LeftPanelGUIController');
goog.require('lgb.gui.controller.ButtonsTopRightHUDController');
goog.require('lgb.gui.controller.TopMenuController');
goog.require('lgb.world.controller.VisibilityController');
goog.require('lgb.gui.controller.BottomPanelGUIController');
goog.require('lgb.gui.view.TitleBarGUI');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.LayoutController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.gui.controller.LayoutController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.LayoutController.prototype.init = function() {
    
    
    
    this.dataModel = new lgb.gui.model.LayoutModel();
    this.view  = new lgb.gui.view.LayoutView(this.dataModel);
    this.bind_();
    this.view.init();
    
    this.topMenuController_ = this.makeChildController_(lgb.gui.controller.TopMenuController);
    this.propertiesController_ = this.makeChildController_(lgb.gui.controller.PropertiesController);
    this.leftPanelGUIController_ = this.makeChildController_(lgb.gui.controller.LeftPanelGUIController);
    this.rightTopInputController_ = this.makeChildController_(lgb.gui.controller.ButtonsTopRightHUDController);
    this.visibilityController_ = this.makeChildController_(lgb.world.controller.VisibilityController);
    this.bottomPanelGUIController_ = this.makeChildController_(lgb.gui.controller.BottomPanelGUIController);
    
    this.titleBarView = new lgb.gui.view.TitleBarGUI();
    this.trigger(e.RequestAddToLayout, this.titleBarView);
};



lgb.gui.controller.LayoutController.prototype.bind_ = function() {
    
  this.listenTo(this.view, e.LayoutChange, this.onLayoutChange_);
  this.listen(e.WindowResize, this.onWindowResize_);
  this.listen(e.RequestAddToLayout, this.onRequestAddToLayout_);
  this.listen(e.RequestLayoutVisibilityChange, this.onRequestLayoutVisibilityChange_);
   
};

lgb.gui.controller.LayoutController.prototype.onRequestAddToLayout_ = function(event) {

   // this.dataModel.add(event.payload);
    this.view.add(event.payload);
};


lgb.gui.controller.LayoutController.prototype.onRequestLayoutVisibilityChange_ = function(event) {
  
    this.view.toggleVisibility(event.payload);
    
};


/**
 * Event handler for browser resize
 * @param {goog.events.Event} event The Event.
 */
lgb.gui.controller.LayoutController.prototype.onWindowResize_ = function(event) {
    this.view.calculateLayout(event.payload);
};

lgb.gui.controller.LayoutController.prototype.onLayoutChange_ = function(event) {
    
    this.view.calculateLayout();
    this.dispatch(event);
    
};





