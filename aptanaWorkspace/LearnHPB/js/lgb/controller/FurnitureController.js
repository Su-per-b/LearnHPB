/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.FurnitureController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.model.FurnitureModel');
goog.require('lgb.view.FurnitureView');


goog.require('lgb.model.BuildingHeightModel');


/**
 * MVC controller for the Ductwork
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.FurnitureController = function() {

  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.controller.FurnitureController, lgb.controller.BaseController);

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

  this.relay(this.view, e.AddToWorldRequest);
  this.relay(this.view,e.ViewPointCollectionLoaded);
  this.relay(this.view,e.VisibilityNodesLoaded);
  
  this.listen(
    e.BuildingHeightChanged,
    this.onBuildingHeightChanged_
    );


};




lgb.controller.FurnitureController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
  
};



