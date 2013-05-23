/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.DuctworkController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.events.SelectableLoaded');
goog.require('lgb.model.DuctworkModel');
goog.require('lgb.view.DuctworkView');
goog.require('lgb.events.BuildingHeightChanged');
goog.require('lgb.events.ViewPointCollectionLoaded');
goog.require('lgb.model.BuildingHeightModel');

goog.require('lgb.model.vo.VisibilityNode');
goog.require('lgb.events.VisibilityNodesLoaded');


/**
 * MVC controller for the Ductwork
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.DuctworkController = function() {
  lgb.controller.BaseController.call(this);
  this.init_();
};
goog.inherits(lgb.controller.DuctworkController, lgb.controller.BaseController);

/**
 * initializes the controller
 * @private
 */
lgb.controller.DuctworkController.prototype.init_ = function() {
  this.dataModel = new lgb.model.DuctworkModel();
  this.view = new lgb.view.DuctworkView(this.dataModel);
  this.bind_();
  this.view.init();
};




/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.DuctworkController.prototype.bind_ = function() {
  this.makeAddToWorldRequestGlobal();

  this.listenTo(this.view,
    lgb.events.SelectableLoaded.TYPE,
    this.onSelectableLoaded);
    
  this.listen(
    lgb.events.BuildingHeightChanged.TYPE,
    this.onBuildingHeightChanged_
    );
    
  this.listenTo(
    this.view,
    lgb.events.ViewPointCollectionLoaded.TYPE,
    this.viewPointCollectionLoaded_
    );
    
    
  this.listenTo(
    this.view,
    lgb.events.VisibilityNodesLoaded.TYPE,
    this.onVisibilityNodesLoaded_
    );
};


lgb.controller.DuctworkController.prototype.onVisibilityNodesLoaded_ =
  function(event) {

  this.dispatch(event);
  
};


lgb.controller.DuctworkController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
  
};


lgb.controller.DuctworkController.prototype.viewPointCollectionLoaded_ =
  function(event) {
  this.dispatch(event);
};



/**
 * @param {lgb.events.SelectableLoaded} event the event telling
 * about a new 3d Object which has loaded.
 */
lgb.controller.DuctworkController.prototype.onSelectableLoaded =
  function(event) {
  this.dispatch(event);
};

/**
 * @param {lgb.model.BuildingModel.Group} group The group
 * to make visible.
 */
lgb.controller.DuctworkController.prototype.setVisiblityGroup =
  function(group) {
  this.dataModel.setVisiblityGroup(group);
};
