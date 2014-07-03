goog.provide('lgb.gui.controller.BuildingController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BuildingGUI');
goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.gui.controller.BuildingSubController');




/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */
lgb.gui.controller.BuildingController = function() {

  lgb.core.BaseController.call(this);
  this.subControllerList_ = [];
};
goog.inherits(lgb.gui.controller.BuildingController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.BuildingController.prototype.init = function(systemListDataModel) {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.BuildingGUI(this.dataModel);
  this.guiView.init();
    
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  this.systemListDataModel_ = systemListDataModel;
  
  var children = this.systemListDataModel_.getChildren();
  this.each (children, this.makeBuildingSubController_);
  
};



lgb.gui.controller.BuildingController.prototype.makeBuildingSubController_ = function(system) {

  this.makeChildGUIcontroller_(lgb.gui.controller.BuildingSubController, system);
  
};



  
