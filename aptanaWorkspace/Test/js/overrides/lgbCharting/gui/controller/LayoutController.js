/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgbCharting.gui.controller.LayoutController');

goog.require('lgb.core.BaseController');
goog.require('goog.debug.Logger');
goog.require('lgb.core.Config');

goog.require('lgbCharting.gui.view.LayoutSimpleView');
goog.require('lgb.gui.model.LayoutModel');


goog.require('lgbCharting.chart.controller.SimulationGraphController');
goog.require('lgbCharting.gui.controller.BottomPanelGUIController');
goog.require('lgbCharting.gui.controller.ButtonsTopRightHUDController');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgbCharting.gui.controller.LayoutController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgbCharting.gui.controller.LayoutController, lgb.core.BaseController);



/**
 * Initializes the Main Controller after the document is ready
 */
lgbCharting.gui.controller.LayoutController.prototype.init = function() {
    
    
    this.dataModel = new lgb.gui.model.LayoutModel();
    this.guiView = new lgbCharting.gui.view.LayoutSimpleView(this.dataModel);
    this.guiView.init();
    
    this.bind_();
    
    this.bottomPanelGUIController_ = this.makeChildGUIcontroller_(lgbCharting.gui.controller.BottomPanelGUIController);
    this.buttonsTopRightHUDController_ = this.makeChildGUIcontroller_(lgbCharting.gui.controller.ButtonsTopRightHUDController);
};



lgbCharting.gui.controller.LayoutController.prototype.bind_ = function() {
  
  this.relay(this.guiView, e.SplitterResize);

};



