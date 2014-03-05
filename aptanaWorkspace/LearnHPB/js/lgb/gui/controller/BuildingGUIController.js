goog.provide('lgb.gui.controller.BuildingGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BuildingGUI');
goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.gui.controller.BuildingGUISubController');




lgb.gui.controller.BuildingGUIController = function() {

  lgb.core.BaseController.call(this);
  this.subControllerList_ = [];
};
goog.inherits(lgb.gui.controller.BuildingGUIController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.BuildingGUIController.prototype.init = function(systemListDataModel) {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.BuildingGUI(this.dataModel);
  this.guiView.init();
    
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  this.systemListDataModel_ = systemListDataModel;
  
  var children = this.systemListDataModel_.getChildren();
  this.each (children, this.makeBuildingGUISubController_);
  
};



lgb.gui.controller.BuildingGUIController.prototype.makeBuildingGUISubController_ = function(system) {

  this.makeChildGUIcontroller_(lgb.gui.controller.BuildingGUISubController, system);
  
};



  
