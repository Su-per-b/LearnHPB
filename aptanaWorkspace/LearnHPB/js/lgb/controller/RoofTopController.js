/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.RoofTopController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.model.RoofTopModel');
goog.require('lgb.view.RoofTopView');


/**
 * MVC controller for the RoofTopController
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.RoofTopController = function() {

  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.controller.RoofTopController, lgb.controller.BaseController);

/**
 * @private
 */
lgb.controller.RoofTopController.prototype.init_ = function() {

  this.dataModel = new lgb.model.RoofTopModel();
  this.view = new lgb.view.RoofTopView(this.dataModel);

  this.view.init();

  this.bind_();
};




/**
 * @param {lgb.model.BuildingModel.Group} group The group to make
 * visible.
 */
lgb.controller.RoofTopController.prototype.setVisiblityGroup =
  function(group) {

  this.dataModel.setVisiblityGroup(group);
};




lgb.controller.RoofTopController.prototype.bind_ = function() {


  this.relay(this.view, lgb.events.SelectableLoaded.TYPE);
  this.relay(this.view, e.AddToWorldRequest);
  this.relay(this.view,e.ViewPointCollectionLoaded);
  this.relay(this.view,e.VisibilityNodesLoaded);
  
  this.listen(e.BuildingHeightChanged,this.onBuildingHeightChanged_);

};




lgb.controller.RoofTopController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
  
};