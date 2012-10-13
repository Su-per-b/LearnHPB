/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.PsController');

goog.require('lgb.controller.ControllerBase');

goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.RequestDataModelChange');
goog.require('lgb.model.PsModel');
goog.require('lgb.view.PsView');


/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 * @param {lgb.model.PsModel} dataModel The model.
 */
lgb.controller.PsController = function(dataModel) {
  lgb.controller.ControllerBase.call(this);
  this.dataModel = dataModel;
  this.init_();
};
goog.inherits(lgb.controller.PsController, lgb.controller.ControllerBase);

/**
 * @private
 */
lgb.controller.PsController.prototype.init_ = function() {

  this.view = new lgb.view.PsView(this.dataModel);
  this.adminView = new
    lgb.view.ParticleSystemAdminView(this.dataModel, 'adminView');

  this.bind_();

  this.view.init();
  this.adminView.init();
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.PsController.prototype.bind_ = function() {
  
  this.makeAddToWorldRequestGlobal();

  this.listenTo(this.adminView,
    lgb.events.RequestDataModelChange.TYPE,
    this.onRequestDataModelChange_);

};




/**
 * @private
 * @param {lgb.events.RequestDataModelChange} event Fired by a view.
 */
lgb.controller.PsController.prototype.onRequestDataModelChange_ =
  function(event) {

  var stateObject = event.payload;
  this.dataModel.change(stateObject);
};
