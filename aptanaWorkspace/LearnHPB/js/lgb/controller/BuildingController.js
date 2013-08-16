/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.BuildingController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.HvacController');
goog.require('lgb.controller.input.TestLightingController');
goog.require('lgb.controller.EnvelopeController');
goog.require('lgb.controller.RoofTopController');
goog.require('lgb.controller.FurnitureController');
goog.require('lgb.controller.ZoneController');
goog.require('lgb.controller.PsMasterController');
goog.require('lgb.controller.input.ViewPointController');

goog.require('lgb.model.BuildingModel');
goog.require('lgb.view.BuildingView');


/**
 * MVC controller for the BuildingController
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.BuildingController = function() {
  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.controller.BuildingController, lgb.controller.BaseController);


/**
 * initializes the controller
 * @private
 */
lgb.controller.BuildingController.prototype.init_ = function() {
    
  this.dataModel = new lgb.model.BuildingModel();
  this.view = new lgb.view.BuildingView(this.dataModel);
  
  this.bind1_();
  
  this.view.init();
  
  this.zoneController_ = new lgb.controller.ZoneController();
  this.roofTopController_ = new lgb.controller.RoofTopController();
  this.hvacController_ = new lgb.controller.HvacController();
  this.lightingController_ = new lgb.controller.input.TestLightingController();
  this.furnitureController_ = new lgb.controller.FurnitureController();
  this.envelopeController_ = new lgb.controller.EnvelopeController();
  this.psMasterController_ = new lgb.controller.PsMasterController();
  
  this.viewPointController_ = new lgb.controller.input.ViewPointController();
  this.viewPointController_.setAnchors(this.view.anchors);
  
  this.bind2_();
  
  this.viewPointController_.init();
  this.zoneController_.init();
  this.roofTopController_.init();
  this.hvacController_.init();
  this.lightingController_.init();
  this.furnitureController_.init();
  this.envelopeController_.init();
  this.psMasterController_.init();

  
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.BuildingController.prototype.bind1_ = function() {

  this.listen(
    e.BuildingHeightChanged,
    this.onBuildingHeightChanged_);

  this.relay(
    this.view,
    e.AddToWorldRequest);
  
};


lgb.controller.BuildingController.prototype.bind2_ = function() {


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
    this.furnitureController_,
    e.AddToWorldRequest,
    this.onAddToFloor_
    );
    

    
  this.listenTo(
    this.envelopeController_,
    e.AddToWorldRequest,
    this.onAddToGround_
    );
    

  this.listenTo(
    this.psMasterController_,
    e.AddToWorldRequest,
    this.onAddToCeiling_
    );
    
  
  //var controllers =     [this.furnitureController_,this.roofTopController_];

  this.listen(
    e.ViewPointNodesLoaded,
    this.onViewPointNodesLoaded_
    );
    
    
};




lgb.controller.BuildingController.prototype.onViewPointNodesLoaded_ =
  function(event) {


    this.viewPointController_.loadViewpoint(event.payload);
    
    
};




lgb.controller.BuildingController.prototype.onAddToAnchor_ =
  function(event) {
  
   var node = event.payload;
   
   if (node.anchor && node.anchor == "ceiling") {
      this.view.addToCeiling(node);
   } else {
      this.view.addToFloor(node);
   }



};




lgb.controller.BuildingController.prototype.onAddToCeiling_ =
  function(event) {

   this.view.addToCeiling(event.payload);
};



lgb.controller.BuildingController.prototype.onAddToFloor_ =
  function(event) {

   this.view.addToFloor(event.payload);
};


lgb.controller.BuildingController.prototype.onAddToRoof_ =
  function(event) {

   this.view.addToRoof(event.payload);
};


lgb.controller.BuildingController.prototype.onAddToGround_ =
  function(event) {

   this.view.addToGround_(event.payload);
};





lgb.controller.BuildingController.prototype.onBuildingHeightChanged_ =
  function(event) {

   this.view.setBuildingHeight(event.payload);
  
};


