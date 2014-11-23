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
lgb.gui.controller.BuildingController.prototype.init = function(integratedMainModel) {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.BuildingGUI(this.dataModel);
  this.guiView.init();
    
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  //this.integratedMainModel_ = integratedMainModel;

  
  this.each (integratedMainModel.systemListInput, this.makeBuildingSubController_);
  this.guiView.init2();
    
};






lgb.gui.controller.BuildingController.prototype.loadNew = function(integratedMainModel) {


  this.guiView.clear();
  //this.integratedMainModel_ = integratedMainModel;
  
  // this.systemListDataModel_ = systemListDataModel;
  
  this.eachIdx (integratedMainModel.systemListInput, this.updateBuildingSubController_);
  
  //var children = this.integratedMainModel_.getChildren();
  //this.eachIdx (children, this.updateBuildingSubController_);
  
  
  this.guiView.init2();
};


lgb.gui.controller.BuildingController.prototype.updateBuildingSubController_ = function(system, idx) {
  

  var controller = this.childGUIcontrollers_[idx];
  
  if (undefined == controller) {
      debugger;
  }
  
  controller.init(system);
  
  // /controller.loadNew(system);
  
};

lgb.gui.controller.BuildingController.prototype.makeBuildingSubController_ = function(system) {

  this.makeChildGUIcontroller_(lgb.gui.controller.BuildingSubController, system);
  
};

