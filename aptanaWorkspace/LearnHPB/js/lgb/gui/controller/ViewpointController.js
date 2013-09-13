/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.ViewpointController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.view.ViewpointView');
goog.require('lgb.model.ViewpointModel');
goog.require('lgb.gui.view.ViewpointGUI');

/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.gui.controller.ViewpointController = function( ) {

  lgb.controller.BaseController.call(this);
  
  this.viewpointGroupsLoaded_ = 0;
  this.dataModel = new lgb.model.ViewpointModel();
  
};
goog.inherits(lgb.gui.controller.ViewpointController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.gui.controller.ViewpointController.prototype.init = function() {
  

  this.view = new lgb.view.ViewpointView(this.dataModel);

  this.guiView = new lgb.gui.view.ViewpointGUI (this.dataModel);
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
lgb.gui.controller.ViewpointController.prototype.bind_ = function() {
  

  this.relay(
    this.guiView,
    [
      e.RequestAddToTestingInput,
      e.RequestShowViewpoint,
      e.RequestGoToViewpointNode
    ]
    );
    
  this.relay(
    this.view,
    [e.ViewpointNodesLoaded, e.RequestGoToViewpointNode]
    );


};


lgb.gui.controller.ViewpointController.prototype.setAnchors =
  function(anchors) {
    
  this.dataModel.setAnchors(anchors);
  
};

lgb.gui.controller.ViewpointController.prototype.loadViewpoint =
  function(viewpointNode) {
    
  this.dataModel.addNode(viewpointNode);
  
};


lgb.gui.controller.ViewpointController.prototype.onViewpointNodesLoaded_ =
  function(event) {
    
  var viewpointNode = event.payload;
  this.dataModel.addNode(viewpointNode);
  
  
};





