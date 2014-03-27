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


goog.require('lgb.gui.controller.LeftPanelController');
goog.require('lgb.gui.controller.LeftPanelSimpleController');


goog.require('lgb.gui.controller.ButtonsTopRightHUDController');
goog.require('lgb.gui.controller.TopMenuController');
goog.require('lgb.world.controller.VisibilityController');
goog.require('lgb.gui.controller.BottomPanelIframeGUIController');


goog.require('lgb.gui.view.TitleBarGUI');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.LayoutController = function() {

  lgb.core.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.gui.controller.LayoutController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.LayoutController.prototype.init_ = function() {
    
    
    this.dataModel = new lgb.gui.model.LayoutModel();
    this.guiView  = new lgb.gui.view.LayoutView(this.dataModel);
    this.guiView.init();
    
    this.bind_();
    
    this.leftPanelSimpleController_ = this.makeChildGUIcontroller_(lgb.gui.controller.LeftPanelSimpleController);
    this.buttonsTopRightHUDController_ = this.makeChildGUIcontroller_(lgb.gui.controller.ButtonsTopRightHUDController);
    this.bottomPanelGUIController_ = this.makeChildGUIcontroller_(lgb.gui.controller.BottomPanelIframeGUIController);
    
};



lgb.gui.controller.LayoutController.prototype.bind_ = function() {
  
  this.listenTo(this.guiView, e.LayoutChange, this.onLayoutChange_);
  this.listen(e.WindowResize, this.onWindowResize_);
  this.listen(e.RequestLayoutVisibilityChange, this.onRequestLayoutVisibilityChange_);
  

    
};




lgb.gui.controller.LayoutController.prototype.onRequestAddToParentGUI_ = function(event) {
    this.guiView.add(event.payload);
};


lgb.gui.controller.LayoutController.prototype.onRequestLayoutVisibilityChange_ = function(event) {
    this.guiView.toggleVisibility(event.payload);
};



lgb.gui.controller.LayoutController.prototype.onWindowResize_ = function(event) {
    this.guiView.calculateLayout(event.payload);
};

lgb.gui.controller.LayoutController.prototype.onLayoutChange_ = function(event) {
    
    this.guiView.calculateLayout();
    this.dispatch(event);
    
};





