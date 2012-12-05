/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.FurnitureController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.events.ViewInitialized');
goog.require('lgb.model.FurnitureModel');
goog.require('lgb.view.FurnitureView');


/**
 * MVC controller for the Ductwork
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.FurnitureController = function() {

  lgb.controller.ControllerBase.call(this);
  this.init_();
};
goog.inherits(lgb.controller.FurnitureController, lgb.controller.ControllerBase);

/**
 * initializes the controller
 * @private
 */
lgb.controller.FurnitureController.prototype.init_ = function() {
 
  
  this.dataModel = new lgb.model.FurnitureModel();
  this.view = new lgb.view.FurnitureView(this.dataModel);

  this.bind_();
  this.view.init();

};




/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.FurnitureController.prototype.bind_ = function() {
  
  this.makeAddToWorldRequestGlobal();

  this.listenTo(this.view,
    lgb.events.ViewInitialized.TYPE,
    this.onViewInitialized_);

};


/**
 * Event handler.
 * @private
 * @param {lgb.events.RequestDataModelChange} event Fired by the view.
 */
lgb.controller.FurnitureController.prototype.onViewInitialized_ =
  function(event) {

};

/**
 * @param {lgb.model.BuildingModel.Group} group The group.
 */
lgb.controller.FurnitureController.prototype.setVisiblityGroup =
  function(group) {
  this.dataModel.setVisiblityGroup(group);
};


/**
 * @private
 * @param {lgb.events.RequestDataModelChange} event The event.
 */
lgb.controller.FurnitureController.prototype.onRequestDataModelChange_ =
  function(event) {
  this.dataModel.change(event.payload);
};


