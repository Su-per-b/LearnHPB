/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.ViewPointController');

goog.require('lgb.controller.ControllerBase');

goog.require('lgb.model.ViewPointNode');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.model.ViewPointModel');

goog.require('lgb.view.ViewPointAdminView');
goog.require('lgb.view.ViewPointView');
goog.require('lgb.view.ViewPointGUIView');
goog.require('lgb.model.ViewPointCollection');

goog.require('lgb.events.CamerasLoaded');
goog.require('lgb.events.RequestGoToViewPoint');
goog.require('lgb.events.RequestGoToViewPointName');
goog.require('lgb.events.ViewInitialized');
goog.require('lgb.events.ViewPointCollectionLoaded');
goog.require('lgb.events.BuildingHeightChanged');



/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.ViewPointController = function( ) {
    
  lgb.controller.ControllerBase.call(this);
  
  this.viewpointGroupsLoaded_ = 0;
  this.init_();
  
};
goog.inherits(lgb.controller.ViewPointController, lgb.controller.ControllerBase);


/**
 * Initialized the controller.
 */
lgb.controller.ViewPointController.prototype.init_ = function() {
  
  this.dataModel = new lgb.model.ViewPointModel();
  
  this.view = new lgb.view.ViewPointView(this.dataModel);
  this.view.init();
  
  //this.adminView = new lgb.view.ViewPointAdminView (this.dataModel, 'adminView');

  this.guiView = new lgb.view.ViewPointGUIView (this.dataModel, 'tabStrip-viewpoints-1');
  this.guiView.init();
  
  this.bind_();
  
};



lgb.controller.ViewPointController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
  
};



/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.ViewPointController.prototype.bind_ = function() {
  
  this.makeAddToWorldRequestGlobal();
  
  this.listenTo(this.view,
    lgb.events.CamerasLoaded.TYPE,
    this.onCamerasLoaded_);

  this.listenTo(this.view,
    lgb.events.ViewInitialized.TYPE,
    this.onViewInitialized_);
    
  this.listenTo(
    this.guiView,
    lgb.events.RequestGoToViewPoint.TYPE,
    this.onRequestGoToViewPoint_
  );

  this.listen(
    lgb.events.RequestGoToViewPointName.TYPE,
    this.onRequestGoToViewPointName_
    );
    
  this.listen(
    lgb.events.ViewPointCollectionLoaded.TYPE,
    this.onViewPointCollectionLoaded_); 
    
  this.listen(
    lgb.events.BuildingHeightChanged.TYPE,
    this.onBuildingHeightChanged_
    );
      
};



lgb.controller.ViewPointController.prototype.onViewPointCollectionLoaded_ =
  function(event) {
    
      this.dataModel.addViewPointCollection(event.payload);
      
      // this.viewpointGroupsLoaded_++;
      
/*
      if (this.viewpointGroupsLoaded_ > 1) {
        this.adminView.init();
      }     */

};




/**
 * Event handler.
 * @private
 * @param {lgb.events.ViewInitialized} event Fired by the view.
 */
lgb.controller.ViewPointController.prototype.onViewInitialized_ =
  function(event) {
      
 // this.dataModel.addViewPoint(event.payload);
      
};


/**
 * @private
 * @param {lgb.events.CamerasLoaded} event Fired by the view.
 */
lgb.controller.ViewPointController.prototype.onRequestGoToViewPoint_ =
  function(event) {
  
  this.dispatch(event);

};

/**
 * @private
 * @param {lgb.events.RequestGoToViewPointName} event Fired by one of
 * the views.
 */
lgb.controller.ViewPointController.prototype.onRequestGoToViewPointName_ =
  function(event) {

  var camera = this.dataModel.getCameraByName(event.payload);
  
  this.dispatch(new lgb.events.RequestGoToViewPoint(camera));

};

/**
 * @private
 * @param {lgb.events.CamerasLoaded} event Fired by the view.
 */
lgb.controller.ViewPointController.prototype.onCamerasLoaded_ =
  function(event) {
  
  this.dataModel.addCameras(event.payload);

  
};

