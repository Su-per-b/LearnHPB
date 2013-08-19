/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.ZoneController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.model.EnvelopeModel');
goog.require('lgb.model.ZoneModel');
goog.require('lgb.view.ZoneView');

goog.require('lgb.model.BuildingHeightModel');



/**
 * MVC controller for the Zones
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.ZoneController = function() {
  lgb.controller.BaseController.call(this);
};
goog.inherits(lgb.controller.ZoneController, lgb.controller.BaseController);


/**
 * @private
 */
lgb.controller.ZoneController.prototype.init = function() {
    
  this.dataModel = new lgb.model.ZoneModel();
  this.view = new lgb.view.ZoneView(this.dataModel);
  
  this.bind_();
  this.view.init();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.ZoneController.prototype.bind_ = function() {


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

lgb.controller.ZoneController.prototype.onViewpointNodesLoaded_ =
  function(event) {

  //this.dataModel.setViewpointNode(event.payload);
  this.dispatch(event);

};

*/



lgb.controller.ZoneController.prototype.onRequestShowViewpoint_ =
  function(event) {

  var viewpointNode = event.payload;
  var idx = viewpointNode.idx - viewpointNode.parent.idx;

  this.dataModel.setVisible(
    idx,
    event.payload.isVisible
  );
  

  
};



lgb.controller.ZoneController.prototype.onEnvelopeModelChanged_ =
  function(event) {

  this.dataModel.setEnvelopeModel(event.payload);
  
};



