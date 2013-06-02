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
  this.init_();
};
goog.inherits(lgb.controller.ZoneController, lgb.controller.BaseController);


/**
 * @private
 */
lgb.controller.ZoneController.prototype.init_ = function() {
    
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

  this.listen(
    e.EnvelopeModelChanged,
    this.onEnvelopeModelChanged_
    );

  this.relay(this.view, e.AddToWorldRequest);

  this.listen(
    e.RequestShowViewPoint,
    this.onRequestShowViewPoint_
    );

  this.listen(
    e.BuildingHeightChanged,
    this.onBuildingHeightChanged_
    );
    
  this.listenTo(
    this.view,
    e.ViewPointCollectionLoaded,
    this.onViewPointCollectionLoaded_
    );
     
     
     

};

lgb.controller.ZoneController.prototype.onViewPointCollectionLoaded_ =
  function(event) {

  this.dataModel.setViewPointCollection(event.payload);
  this.dispatch(event);

};


lgb.controller.ZoneController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
  
};



lgb.controller.ZoneController.prototype.onRequestShowViewPoint_ =
  function(event) {

  this.dataModel.setVisible(
    event.payload.idx,
    event.payload.isVisible
  );
  
};




/**
 * @private
 * @param {lgb.events.Event} event The event telling
 * about a change in the Building Envelope.
 */
lgb.controller.ZoneController.prototype.onEnvelopeModelChanged_ =
  function(event) {

  this.dataModel.update(event.payload);
};
