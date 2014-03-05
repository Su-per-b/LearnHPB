/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.BuildingGUISubController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.scenario.view.System');
goog.require('lgb.scenario.model.Bs2');
goog.require('lgb.gui.view.GUI');


/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.BuildingGUISubController = function(  ) {
  
  // this.TITLE_ = title;
  lgb.core.BaseController.call(this);
  
};
goog.inherits(lgb.gui.controller.BuildingGUISubController, lgb.core.BaseController);


/**
 * Initialized the controller.
 */
lgb.gui.controller.BuildingGUISubController.prototype.init = function( system ) {
  
  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.GUI (this.dataModel, system.name);
  
  var systemView = new lgb.scenario.view.System (system);
  this.guiView.add(systemView);
  
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);

};


