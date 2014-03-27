/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.LayoutSimpleController');

goog.require('lgb.core.BaseController');
goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');

goog.require('lgb.gui.view.LayoutSimpleView');
goog.require('lgb.gui.model.LayoutModel');

goog.require('lgb.gui.controller.LeftPanelSimpleController');
goog.require('lgb.gui.controller.ButtonsTopRightHUDController');

goog.require('lgb.gui.controller.BottomPanelIframeGUIController');

/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.LayoutSimpleController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.gui.controller.LayoutSimpleController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.LayoutSimpleController.prototype.init = function() {
    
    
    this.dataModel = new lgb.gui.model.LayoutModel();
    this.guiView  = new lgb.gui.view.LayoutSimpleView(this.dataModel);
    this.guiView.init();
    
    this.bind_();
    
    this.leftPanelSimpleController_ = this.makeChildGUIcontroller_(lgb.gui.controller.LeftPanelSimpleController);
    this.buttonsTopRightHUDController_ = this.makeChildGUIcontroller_(lgb.gui.controller.ButtonsTopRightHUDController);
    this.bottomPanelGUIController_ = this.makeChildGUIcontroller_(lgb.gui.controller.BottomPanelIframeGUIController);
    
};



lgb.gui.controller.LayoutSimpleController.prototype.bind_ = function() {
  
  this.relay(this.guiView, e.SplitterResize);
  
  //this.listen(e.WindowResize, this.onWindowResize_);
  
};



// lgb.gui.controller.LayoutSimpleController.prototype.onWindowResize_ = function(event) {
   // // this.guiView.calculateLayout(event.payload);
// };

// lgb.gui.controller.LayoutSimpleController.prototype.onLayoutChange_ = function(event) {
//     
   // // this.guiView.calculateLayout();
    // this.dispatch(event);
//     
// };
// 
// 



