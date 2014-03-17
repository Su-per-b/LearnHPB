/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.LayoutControllerSimple');

goog.require('lgb.core.BaseController');
goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');

goog.require('lgb.gui.view.LayoutViewSimple');
goog.require('lgb.gui.model.LayoutModel');

goog.require('lgb.gui.controller.LeftPanelSimpleGUIController');
goog.require('lgb.gui.controller.BottomPanelGUIController');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.LayoutControllerSimple = function() {

  lgb.core.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.gui.controller.LayoutControllerSimple, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.LayoutControllerSimple.prototype.init_ = function() {
    
    
    this.dataModel = new lgb.gui.model.LayoutModel();
    this.guiView  = new lgb.gui.view.LayoutViewSimple(this.dataModel);
    this.guiView.init();
    
    this.bind_();
    
     this.leftPanelGUIController_ = this.makeChildGUIcontroller_(lgb.gui.controller.LeftPanelSimpleGUIController);
     
    // this.bottomPanelGUIController_ = this.makeChildGUIcontroller_(lgb.gui.controller.BottomPanelGUIController);
    
};



lgb.gui.controller.LayoutControllerSimple.prototype.bind_ = function() {
  
  this.listenTo(this.guiView, e.LayoutChange, this.onLayoutChange_);
  this.listen(e.WindowResize, this.onWindowResize_);
  
};



lgb.gui.controller.LayoutControllerSimple.prototype.onWindowResize_ = function(event) {
    this.guiView.calculateLayout(event.payload);
};

lgb.gui.controller.LayoutControllerSimple.prototype.onLayoutChange_ = function(event) {
    
    this.guiView.calculateLayout();
    this.dispatch(event);
    
};





