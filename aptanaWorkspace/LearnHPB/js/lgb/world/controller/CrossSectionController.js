/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.CrossSectionController');

goog.require('lgb.core.BaseController');

goog.require('lgb.world.model.CrossSectionModel');
goog.require('lgb.world.view.CrossSectionView');
goog.require('lgb.gui.view.CrossSectionGUI');

goog.require('lgb.world.model.BuildingHeightModel');


/**
 * MVC controller for the Ductwork
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.CrossSectionController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.world.controller.CrossSectionController, lgb.core.BaseController);

/**
 * initializes the controller
 * @private
 */
lgb.world.controller.CrossSectionController.prototype.init = function() {
 
  
  this.dataModel = new lgb.world.model.CrossSectionModel();
  this.view = new lgb.world.view.CrossSectionView(this.dataModel);
  this.guiView = new lgb.gui.view.CrossSectionGUI (this.dataModel);
  
  this.bind_();
  
  this.view.init();

  
};




/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.world.controller.CrossSectionController.prototype.bind_ = function() {

  this.relayLocal(this.view, e.AddToWorldRequest);
  
  this.relay(
    this.guiView,
    [e.RequestAddToTestingInput, e.RequestGoToViewpointNode]
    );

  this.relay(
    this.view,
    e.ViewpointNodesLoaded
    );
    
   
  this.listenTo(
    this.guiView,
    e.RequestDataModelChange,
    this.onRequestDataModelChange_
    );
    
    
  this.listenTo(
    this.view,
    e.ViewInitialized,
    this.onViewInitialized_
    );
    
    

};



lgb.world.controller.CrossSectionController.prototype.onViewInitialized_ = function(event) {
  
  this.guiView.init();
  
};




lgb.world.controller.CrossSectionController.prototype.onRequestDataModelChange_ =
  function(event) {
    
  this.dataModel.changePropertyEx(event.payload.property, event.payload.newValue);
};



