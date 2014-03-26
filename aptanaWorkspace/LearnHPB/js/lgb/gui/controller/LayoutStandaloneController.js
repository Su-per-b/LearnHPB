/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.LayoutStandaloneController');

goog.require('lgb.core.BaseController');
goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');

goog.require('lgb.gui.view.LayoutStandaloneView');
goog.require('lgb.gui.model.LayoutModel');

goog.require('lgb.gui.controller.LeftPanelSimpleController');
goog.require('lgb.gui.controller.BottomPanelGUIController');
goog.require('lgb.gui.controller.ButtonsTopRightHUDController');

/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.LayoutStandaloneController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.gui.controller.LayoutStandaloneController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.LayoutStandaloneController.prototype.init = function() {
    
    
    this.dataModel = new lgb.gui.model.LayoutModel();
    this.guiView  = new lgb.gui.view.LayoutStandaloneView(this.dataModel);
    this.guiView.init();
    
    this.bind_();
    
    this.leftPanelSimpleController_ = this.makeChildGUIcontroller_(lgb.gui.controller.LeftPanelSimpleController);
    this.buttonsTopRightHUDController_ = this.makeChildGUIcontroller_(lgb.gui.controller.ButtonsTopRightHUDController);
    this.bottomPanelGUIController_ = this.makeChildGUIcontroller_(lgb.gui.controller.BottomPanelGUIController);
    
};



lgb.gui.controller.LayoutStandaloneController.prototype.bind_ = function() {
  
  this.relay(this.guiView, e.SplitterResize);
  

};




