/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgbStandAlone.gui.controller.LayoutController');

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
lgbStandAlone.gui.controller.LayoutController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgbStandAlone.gui.controller.LayoutController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgbStandAlone.gui.controller.LayoutController.prototype.init = function() {
    
    
    this.dataModel = new lgb.gui.model.LayoutModel();
    this.guiView  = new lgb.gui.view.LayoutSimpleView(this.dataModel);
    this.guiView.init();
    
    this.bind_();
    
    this.leftPanelSimpleController_ = this.makeChildGUIcontroller_(lgb.gui.controller.LeftPanelSimpleController);
    this.buttonsTopRightHUDController_ = this.makeChildGUIcontroller_(lgb.gui.controller.ButtonsTopRightHUDController);
    this.bottomPanelGUIController_ = this.makeChildGUIcontroller_(lgb.gui.controller.BottomPanelIframeGUIController);
    
};



lgbStandAlone.gui.controller.LayoutController.prototype.bind_ = function() {
  
  this.relay(this.guiView, e.SplitterResize);
  
  //this.listen(e.WindowResize, this.onWindowResize_);
  
};



// lgbStandAlone.gui.controller.LayoutController.prototype.onWindowResize_ = function(event) {
   // // this.guiView.calculateLayout(event.payload);
// };

// lgbStandAlone.gui.controller.LayoutController.prototype.onLayoutChange_ = function(event) {
//     
   // // this.guiView.calculateLayout();
    // this.dispatch(event);
//     
// };
// 
// 



