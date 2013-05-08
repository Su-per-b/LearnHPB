/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.ZoneController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.events.EnvelopeModelChanged');
goog.require('lgb.events.RequestGoToViewPoint');
goog.require('lgb.events.RequestZoneVisiblityChange');
goog.require('lgb.events.RequestShowViewPoint');

goog.require('lgb.model.EnvelopeModel');
goog.require('lgb.model.ZoneModel');
goog.require('lgb.view.ZoneView');
goog.require('lgb.events.BuildingHeightChanged');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.events.ViewPointCollectionLoaded');


/**
 * MVC controller for the Zones
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.ZoneController = function() {
  this._NAME = 'lgb.controller.ZoneController';
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
    lgb.events.EnvelopeModelChanged.TYPE,
    this.onEnvelopeModelChanged_
    );

  this.makeAddToWorldRequestGlobal();

  this.listen(
    lgb.events.RequestShowViewPoint.TYPE,
    this.onRequestShowViewPoint_
    );

  this.listen(
    lgb.events.BuildingHeightChanged.TYPE,
    this.onBuildingHeightChanged_
    );
    
  this.listenTo(
    this.view,
    lgb.events.ViewPointCollectionLoaded.TYPE,
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

  
  //this.view.setVisible(event.payload.idx, event.payload.isVisible);

  this.dataModel.setVisible(
    event.payload.idx,
    event.payload.isVisible
  );
  
};




/**
 * @private
 * @param {lgb.events.EnvelopeModelChanged} event The event telling
 * about a change in the Building Envelope.
 */
lgb.controller.ZoneController.prototype.onEnvelopeModelChanged_ =
  function(event) {

  this.dataModel.update(event.payload);
};
