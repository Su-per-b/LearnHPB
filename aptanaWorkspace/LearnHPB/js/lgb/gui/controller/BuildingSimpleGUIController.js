goog.provide('lgb.gui.controller.BuildingSimpleGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BuildingSimpleGUI');
goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.gui.controller.BuildingGUISubController');




lgb.gui.controller.BuildingSimpleGUIController = function() {

  lgb.core.BaseController.call(this);
  this.subControllerList_ = [];
};
goog.inherits(lgb.gui.controller.BuildingSimpleGUIController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.BuildingSimpleGUIController.prototype.init = function(systemListDataModel) {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.BuildingSimpleGUI(this.dataModel);
  this.guiView.init();
    
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  this.systemListDataModel_ = systemListDataModel;
  
  var children = this.systemListDataModel_.getChildren();
  this.each (children, this.makeBuildingGUISubController_);
  
  this.guiView.calculateLayout();
    
  this.listen(e.LayoutChange, this.onLayoutChange_);
    
};



lgb.gui.controller.BuildingSimpleGUIController.prototype.makeBuildingGUISubController_ = function(system) {

  this.makeChildGUIcontroller_(lgb.gui.controller.BuildingGUISubController, system);
  
};



  
lgb.gui.controller.BuildingSimpleGUIController.prototype.onLayoutChange_ = function(event) {
  
    this.guiView.calculateLayout();
};