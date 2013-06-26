/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.DuctworkController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.events.SelectableLoaded');
goog.require('lgb.model.DuctworkModel');
goog.require('lgb.view.DuctworkView');


goog.require('lgb.model.BuildingHeightModel');

goog.require('lgb.model.vo.VisibilityNode');



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
  
  
  this.relay(
    this.view, 
      [
        e.AddToWorldRequest,
        e.ViewPointCollectionLoaded,
        e.VisibilityNodesLoaded,
        lgb.events.SelectableLoaded.TYPE
      ]
    );
  

  this.listen(
    e.BuildingHeightChanged,
    this.onBuildingHeightChanged_
    );

};





lgb.controller.DuctworkController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
  
};




