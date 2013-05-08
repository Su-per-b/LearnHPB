/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.ViewPointController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.model.ViewPointNode');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.model.ViewPointModel');

goog.require('lgb.view.ViewPointAdminView');
goog.require('lgb.view.ViewPointView');
goog.require('lgb.view.ViewPointGUI');
goog.require('lgb.model.ViewPointCollection');

goog.require('lgb.events.CamerasLoaded');
goog.require('lgb.events.RequestGoToViewPoint');
goog.require('lgb.events.RequestShowViewPoint');
goog.require('lgb.events.ViewInitialized');
goog.require('lgb.events.ViewPointCollectionLoaded');
goog.require('lgb.events.BuildingHeightChanged');



/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.ViewPointController = function( ) {
  this._NAME = 'lgb.controller.ViewPointController';
  lgb.controller.BaseController.call(this);
  
  this.viewpointGroupsLoaded_ = 0;
  this.init_();
  
};
goog.inherits(lgb.controller.ViewPointController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.ViewPointController.prototype.init_ = function() {
  
  this.dataModel = new lgb.model.ViewPointModel();
  
  this.view = new lgb.view.ViewPointView(this.dataModel);
  this.view.init();

  this.guiView = new lgb.view.ViewPointGUI (this.dataModel);
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
  
  this.listenTo(
    this.guiView,
    lgb.events.RequestShowViewPoint.TYPE,
    this.onRequestShowViewPoint_
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
 * @param {lgb.events.RequestGoToViewPoint} event Fired by the view.
 */
lgb.controller.ViewPointController.prototype.onRequestGoToViewPoint_ =
  function(event) {
  
  this.dispatch(event);

};

/**
 * @private
 * @param {lgb.events.RequestShowViewPoint event Fired by the view.
 */
lgb.controller.ViewPointController.prototype.onRequestShowViewPoint_ =
  function(event) {
    
  this.dispatch(event);

};


/**
 * @private
 * @param {lgb.events.CamerasLoaded} event Fired by the view.
 */
lgb.controller.ViewPointController.prototype.onCamerasLoaded_ =
  function(event) {
  
  this.dataModel.addCameras(event.payload);

  
};

