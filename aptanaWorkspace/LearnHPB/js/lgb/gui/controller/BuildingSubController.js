/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.BuildingSubController');

goog.require('lgb.core.BaseController');

goog.require('lgb.gui.model.BaseGuiModel');
goog.require('lgb.gui.view.BuildingSubControllerGUI');


goog.require('lgb.integrated.view.System');
goog.require('lgb.integrated.model.System');


/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.BuildingSubController = function(  ) {
  
  // this.TITLE_ = title;
  lgb.core.BaseController.call(this);
  
};
goog.inherits(lgb.gui.controller.BuildingSubController, lgb.core.BaseController);


/**
 * Initialized the controller.
 */
lgb.gui.controller.BuildingSubController.prototype.init = function( system ) {
  
  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.BuildingSubControllerGUI (this.dataModel, system.name);
  
  //this.systemView = new lgb.scenario.view.System (systemDataModel);
  this.systemView = new lgb.integrated.view.System (system);

  // this.listenTo(systemView, se.RequestModelicaVariableChange, this.onRequestModelicaVariableChange_);
  
  this.relay(this.systemView, se.RequestModelicaVariableChange);
  this.guiView.add(this.systemView);
  
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  this.bind_();
  this.guiView.calculateLayout();
};





lgb.gui.controller.BuildingSubController.prototype.bind_ = function() {
  
  this.listen(e.WindowResize, this.onWindowResize_);
  
    this.listen (
        e.DisplayUnitSystemChangeNotify,
        this.onDisplayUnitSystemChangeNotify_
    );
    
};


lgb.gui.controller.BuildingSubController.prototype.onDisplayUnitSystemChangeNotify_ = function(event) {

    this.systemView.changeDisplayUnitSystem(event.payload);
};



lgb.gui.controller.BuildingSubController.prototype.onWindowResize_ = function(event) {

    this.guiView.calculateLayout();
};


