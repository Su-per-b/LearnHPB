/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.ZoneController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.events.EnvelopeModelChanged');
goog.require('lgb.events.RequestGoToViewPointName');
goog.require('lgb.events.RequestZoneVisiblityChange');
goog.require('lgb.model.EnvelopeModel');
goog.require('lgb.model.ZoneModel');
goog.require('lgb.view.ZoneAdminView');
goog.require('lgb.view.ZoneView');
goog.require('lgb.events.BuildingHeightChanged');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.events.ViewPointCollectionLoaded');


/**
 * MVC controller for the Zones
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.ZoneController = function() {

  lgb.controller.ControllerBase.call(this);
  this.init_();
};
goog.inherits(lgb.controller.ZoneController, lgb.controller.ControllerBase);


/**
 * @private
 */
lgb.controller.ZoneController.prototype.init_ = function() {
    
  this.dataModel = new lgb.model.ZoneModel();
  this.view = new lgb.view.ZoneView(this.dataModel);
  this.adminview = new lgb.view.ZoneAdminView(this.dataModel, 'adminView');
  this.bind_();

  this.view.init();
  this.adminview.init();
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

  this.listenTo(
    this.adminview,
    lgb.events.RequestZoneVisiblityChange.TYPE,
    this.onRequestZoneVisiblityChange_
    );

  this.listenTo(
    this.adminview,
    lgb.events.RequestGoToViewPointName.TYPE,
    this.onRequestGoToViewPointName_
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

  this.dispatch(event);

};


lgb.controller.ZoneController.prototype.onBuildingHeightChanged_ =
  function(event) {

  this.view.setBuildingHeight(event.payload);
  
};


/**
 * @private
 * @param {lgb.events.RequestZoneVisiblityChange} event Fired by one of
 * the views.
 */
lgb.controller.ZoneController.prototype.onRequestZoneVisiblityChange_ =
  function(event) {

  this.dataModel.setVisible(
    event.payload.zoneNumber,
    event.payload.makeVisible
  );

};


/**
 * @private
 * @param {lgb.events.RequestGoToViewPointName} event Fired by one of
 * the views.
 */
lgb.controller.ZoneController.prototype.onRequestGoToViewPointName_ =
  function(event) {

  this.dispatch(event);

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
