/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.ViewPointController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.model.ViewPointCollectionNode');
goog.require('lgb.model.BuildingHeightModel');

goog.require('lgb.view.ViewPointView');
goog.require('lgb.model.ViewPointModel2');
goog.require('lgb.view.ViewPointGUI2');

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
  
  this.dataModel2 = new lgb.model.ViewPointModel2();
  
  this.view = new lgb.view.ViewPointView(this.dataModel);

  this.guiView2 = new lgb.view.ViewPointGUI2 (this.dataModel2);
  this.guiView2._TITLE = "Viewpoints";
  
  this.bind_();
  
  this.guiView2.init();
  this.view.init();
  
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
    e.BuildingHeightChanged,
    this.onBuildingHeightChanged_
    );
    
  this.listen(
    e.ViewPointNodesLoaded,
    this.onViewPointNodesLoaded_);
    
    
  this.relay(
    this.guiView2,
    [
      e.RequestAddToBasicInput,
      e.RequestShowViewPoint,
      e.RequestGoToViewPointNode
    ]
    );
    
  this.relay(
    this.view,
    e.ViewPointCollectionLoaded
    );


  this.relay(
    this.view,
    e.VisibilityNodesLoaded
    );


};


lgb.controller.ViewPointController.prototype.onViewPointNodesLoaded_ =
  function(event) {
    
  var viewPointNode = event.payload;

  this.dataModel2.addNode(viewPointNode);
  
};




lgb.controller.ViewPointController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
  
};



