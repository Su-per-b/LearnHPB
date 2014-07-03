/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.BuildingController');

goog.require('lgb.core.BaseController');
goog.require('lgb.world.controller.HvacController');
goog.require('lgb.gui.controller.TestLightingController');
goog.require('lgb.world.controller.EnvelopeController');
goog.require('lgb.world.controller.RoofTopController');
goog.require('lgb.world.controller.FurnitureController');
goog.require('lgb.world.controller.CrossSectionController');
goog.require('lgb.world.controller.ZoneController');
goog.require('lgb.world.controller.PsMasterController');
goog.require('lgb.gui.controller.ViewpointController');

goog.require('lgb.world.model.BuildingModel');
goog.require('lgb.world.view.BuildingView');


/**
 * MVC controller for the BuildingController
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.BuildingController = function() {
  lgb.core.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.world.controller.BuildingController, lgb.core.BaseController);


/**
 * initializes the controller
 * @private
 */
lgb.world.controller.BuildingController.prototype.init_ = function() {
    
  this.dataModel = new lgb.world.model.BuildingModel();
  this.view = new lgb.world.view.BuildingView(this.dataModel);
  
  this.bind1_();
  
  this.view.init();
  
  this.zoneController_ = new lgb.world.controller.ZoneController();
  this.roofTopController_ = new lgb.world.controller.RoofTopController();
  this.hvacController_ = new lgb.world.controller.HvacController();
  
  this.lightingController_ = new lgb.gui.controller.TestLightingController();
  this.furnitureController_ = new lgb.world.controller.FurnitureController();
  this.crossSectionController_ = new lgb.world.controller.CrossSectionController();
  
  this.envelopeController_ = new lgb.world.controller.EnvelopeController();
  this.psMasterController_ = new lgb.world.controller.PsMasterController();
  
  this.viewpointController_ = new lgb.gui.controller.ViewpointController();
  this.viewpointController_.setAnchors(this.view.anchors);
  
  this.bind2_();
  
  this.viewpointController_.init();
  this.zoneController_.init();
  this.roofTopController_.init();
  this.hvacController_.init();
  
  this.lightingController_.init();
  this.furnitureController_.init();
  this.crossSectionController_.init();

  this.psMasterController_.init();
  this.envelopeController_.init();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.world.controller.BuildingController.prototype.bind1_ = function() {

  this.listen(
    e.BuildingHeightChanged,
    this.onBuildingHeightChanged_);

  this.relay(
    this.view,
    e.AddToWorldRequest);
  
};


lgb.world.controller.BuildingController.prototype.bind2_ = function() {


  this.listenTo(
    this.envelopeController_,
    e.AddToWorldRequest,
    this.onAddToGround_
    );
    
  this.listenTo(
    this.furnitureController_,
    e.AddToWorldRequest,
    this.onAddToFloor_
    );
    
    
  this.listenTo(
    this.zoneController_,
    e.AddToWorldRequest,
    this.onAddToFloor_
    );
    

  this.listenTo(
    this.roofTopController_,
    e.AddToWorldRequest,
    this.onAddToRoof_
    );
    
    
  this.listenTo(
    this.hvacController_,
    e.AddToWorldRequest,
    this.onAddToCeiling_
    );
    
  this.listenTo(
    this.lightingController_,
    e.AddToWorldRequest,
    this.onAddToCeiling_
    );


  this.listenTo(
    this.crossSectionController_,
    e.AddToWorldRequest,
    this.onAddToFloor_
    );
    
    
  this.listenTo(
    this.psMasterController_,
    e.AddToWorldRequest,
    this.onAddToCeiling_
    );
    

  this.listen(
    e.ViewpointNodesLoaded,
    this.onViewpointNodesLoaded_
    );
    
    
};




lgb.world.controller.BuildingController.prototype.onViewpointNodesLoaded_ =
  function(event) {
    
    this.viewpointController_.loadViewpoint(event.payload);

};



lgb.world.controller.BuildingController.prototype.onAddToAnchor_ =
  function(event) {
  
   var node = event.payload;
   
   if (node.anchor && node.anchor == "ceiling") {
      this.view.addToCeiling(node);
   } else {
      this.view.addToFloor(node);
   }

};



lgb.world.controller.BuildingController.prototype.onAddToCeiling_ =
  function(event) {
   this.view.addToCeiling(event.payload);
};



lgb.world.controller.BuildingController.prototype.onAddToFloor_ =
  function(event) {
   this.view.addToFloor(event.payload);
};


lgb.world.controller.BuildingController.prototype.onAddToRoof_ =
  function(event) {
   this.view.addToRoof(event.payload);
};


lgb.world.controller.BuildingController.prototype.onAddToGround_ =
  function(event) {
   this.view.addToGround_(event.payload);
};


lgb.world.controller.BuildingController.prototype.onBuildingHeightChanged_ =
  function(event) {
    
   this.view.setBuildingHeight(event.payload);
   
};


