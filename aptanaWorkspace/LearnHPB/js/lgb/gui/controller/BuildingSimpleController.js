goog.provide('lgb.gui.controller.BuildingSimpleController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BuildingSimpleGUI');
goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.gui.controller.BuildingSubController');




lgb.gui.controller.BuildingSimpleController = function() {

  lgb.core.BaseController.call(this);
  this.subControllerList_ = [];
};
goog.inherits(lgb.gui.controller.BuildingSimpleController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.BuildingSimpleController.prototype.init = function(systemListDataModel) {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.BuildingSimpleGUI(this.dataModel);
  this.guiView.init();
    
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  this.systemListDataModel_ = systemListDataModel;
  
  var children = this.systemListDataModel_.getChildren();
  this.each (children, this.makeBuildingSubController_);
  
 // this.guiView.calculateLayout();
    

  this.bind_();
  
};


lgb.gui.controller.BuildingSimpleController.prototype.bind_ = function() {

  //this.listen(e.WindowResize, this.onWindowResize_);
  
};



lgb.gui.controller.BuildingSimpleController.prototype.makeBuildingSubController_ = function(system) {

  this.makeChildGUIcontroller_(lgb.gui.controller.BuildingSubController, system);
  
};



  
// lgb.gui.controller.BuildingSimpleController.prototype.onWindowResize_ = function(event) {
//   
    // this.guiView.calculateLayout();
// };