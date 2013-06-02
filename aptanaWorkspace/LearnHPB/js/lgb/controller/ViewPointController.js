/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.ViewPointController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.model.ViewPointNode');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.model.ViewPointModel');

goog.require('lgb.view.ViewPointView');
goog.require('lgb.view.ViewPointGUI');
goog.require('lgb.model.ViewPointCollection');


goog.require('lgb.events.BuildingHeightChanged');



/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.ViewPointController = function( ) {

  lgb.controller.BaseController.call(this);
  
  this.viewpointGroupsLoaded_ = 0;
  
};
goog.inherits(lgb.controller.ViewPointController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.ViewPointController.prototype.init = function() {
  
  this.dataModel = new lgb.model.ViewPointModel();
  
  this.view = new lgb.view.ViewPointView(this.dataModel);

  this.guiView = new lgb.view.ViewPointGUI (this.dataModel);
  this.bind_();
  
  this.guiView.init();
  
};



/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.ViewPointController.prototype.bind_ = function() {
  
  this.relay(this.view, e.AddToWorldRequest);
  

  this.listen(
    e.ViewPointCollectionLoaded,
    this.onViewPointCollectionLoaded_);
    
    
  this.listen(
    lgb.events.BuildingHeightChanged.TYPE,
    this.onBuildingHeightChanged_
    );
    

  this.relay(
    this.guiView,
    [
      e.RequestAddToGUI, 
      e.RequestShowViewPoint,
      e.RequestGoToViewPoint
    ]
    );


};



lgb.controller.ViewPointController.prototype.onViewPointCollectionLoaded_ =
  function(event) {
 
      this.dataModel.addViewPointCollection(event.payload);
      
};




lgb.controller.ViewPointController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
  
};



