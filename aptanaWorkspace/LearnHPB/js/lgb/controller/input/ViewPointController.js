/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.input.ViewPointController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.model.BuildingHeightModel');

goog.require('lgb.view.ViewPointView');
goog.require('lgb.model.ViewPointModel');
goog.require('lgb.view.input.ViewPointGUI');

/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.input.ViewPointController = function( ) {

  lgb.controller.BaseController.call(this);
  
  this.viewpointGroupsLoaded_ = 0;
  
};
goog.inherits(lgb.controller.input.ViewPointController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.input.ViewPointController.prototype.init = function() {
  
  this.dataModel = new lgb.model.ViewPointModel();
  
  this.view = new lgb.view.ViewPointView(this.dataModel);

  this.guiView = new lgb.view.input.ViewPointGUI (this.dataModel);
  this.guiView._TITLE = "Viewpoints";
  
  this.bind_();
  
  this.guiView.init();
  this.view.init();
  
};



/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.input.ViewPointController.prototype.bind_ = function() {
  
  this.relayLocal(this.view, e.AddToWorldRequest);
  
  this.listen(
    e.ViewPointNodesLoaded,
    this.onViewPointNodesLoaded_);
    
    
  this.relay(
    this.guiView,
    [
      e.RequestAddToTestingInput,
      e.RequestShowViewPoint,
      e.RequestGoToViewPointNode
    ]
    );
    
  this.relay(
    this.view,
    e.ViewPointNodesLoaded
    );


};


lgb.controller.input.ViewPointController.prototype.onViewPointNodesLoaded_ =
  function(event) {
    
  var viewPointNode = event.payload;

  this.dataModel.addNode(viewPointNode);
  
};




