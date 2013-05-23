/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.BuildingController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.DuctworkController');
goog.require('lgb.controller.LightingController');
goog.require('lgb.controller.EnvelopeController');
goog.require('lgb.controller.RoofTopController');
goog.require('lgb.controller.FurnitureController');
goog.require('lgb.controller.ZoneController');
goog.require('lgb.events.VisibilityChanged');
goog.require('lgb.events.BuildingHeightChanged');


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
    


  this.zoneController_ = new lgb.controller.ZoneController();
 // this.roofTopController_ = new lgb.controller.RoofTopController();
  this.ductworkController_ = new lgb.controller.DuctworkController();
  this.lightingController = new lgb.controller.LightingController();
  this.furnitureController = new lgb.controller.FurnitureController();
  this.envelopeController_ = new lgb.controller.EnvelopeController();
  
  this.bind_();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.BuildingController.prototype.bind_ = function() {

  this.listen(lgb.events.RequestVisibilityChange.TYPE,
    this.onRequestVisibilityChange_);
    
  this.listen(
    lgb.events.BuildingHeightChanged.TYPE,
    this.onBuildingHeightChanged_
    );
    
    
};



/**
 * @private
 * @param {lgb.events.EnvelopeModelChanged} event The event telling
 * about a change in the Building Envelope.
 */
lgb.controller.BuildingController.prototype.onBuildingHeightChanged_ =
  function(event) {


   var model = event.payload;
   
  //this.dataModel.update(event.payload);
};



/**
 * Global event handler
 * @private
 * @param {lgb.events.RequestVisibilityChange} event The event.
 */
lgb.controller.BuildingController.prototype.onRequestVisibilityChange_ =
  function(event) {

  var group = event.payload;

  this.envelopeController_.setVisiblityGroup(group);
  
  if (this.roofTopController_) {
    this.roofTopController_.setVisiblityGroup(group);
  }
  
  if (this.ductworkController_) {
    this.ductworkController_.setVisiblityGroup(group);
  }
  
  if (this.lightingController) {
    this.lightingController.setVisiblityGroup(group);
  }

  

  this.dispatch(new lgb.events.VisibilityChanged(group));
};
