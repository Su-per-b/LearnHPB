/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.ZoneController');

goog.require('lgb.core.BaseController');

goog.require('lgb.world.model.EnvelopeModel');
goog.require('lgb.world.model.ZoneModel');
goog.require('lgb.world.view.ZoneView');

goog.require('lgb.world.model.BuildingHeightModel');



/**
 * MVC controller for the Zones
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.ZoneController = function() {
  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.world.controller.ZoneController, lgb.core.BaseController);


/**
 * @private
 */
lgb.world.controller.ZoneController.prototype.init = function() {
    
  this.dataModel = new lgb.world.model.ZoneModel();
  this.view = new lgb.world.view.ZoneView(this.dataModel);
  
  this.bind_();
  this.view.init();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.world.controller.ZoneController.prototype.bind_ = function() {


  this.relayLocal(this.view, e.AddToWorldRequest);

  this.listen(
    e.RequestShowViewpoint,
    this.onRequestShowViewpoint_
    );


  this.relay(
    this.view,
    e.ViewpointNodesLoaded
  );
  
  this.listen(
    e.EnvelopeModelChanged,
    this.onEnvelopeModelChanged_
    );

};

/*

lgb.world.controller.ZoneController.prototype.onViewpointNodesLoaded_ =
  function(event) {

  //this.dataModel.setViewpointNode(event.payload);
  this.dispatch(event);

};

*/



lgb.world.controller.ZoneController.prototype.onRequestShowViewpoint_ =
  function(event) {

  var viewpointNode = event.payload;
  var idx = viewpointNode.idx - viewpointNode.parent.idx;

  this.dataModel.setVisible(
    idx,
    event.payload.isVisible
  );
  

  
};



lgb.world.controller.ZoneController.prototype.onEnvelopeModelChanged_ =
  function(event) {

  this.dataModel.setEnvelopeModel(event.payload);
  
};



