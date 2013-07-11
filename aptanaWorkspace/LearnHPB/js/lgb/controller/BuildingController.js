/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.BuildingController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.DuctworkController');
goog.require('lgb.controller.input.LightingController');
goog.require('lgb.controller.EnvelopeController');
goog.require('lgb.controller.RoofTopController');
goog.require('lgb.controller.FurnitureController');
goog.require('lgb.controller.ZoneController');


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
  this.roofTopController_ = new lgb.controller.RoofTopController();
  this.ductworkController_ = new lgb.controller.DuctworkController();
  this.lightingController = new lgb.controller.input.LightingController();
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

  this.listen(e.BuildingHeightChanged,this.onBuildingHeightChanged_);
    
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


