/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.PsController');

goog.require('lgb.controller.BaseController');

goog.require('lgb.events.DataModelChanged');
goog.require('lgb.events.RequestDataModelChange');
goog.require('lgb.model.PsModel');
goog.require('lgb.view.PsView');



/**
 * @constructor
 * @extends lgb.controller.BaseController
 * @param {lgb.model.PsModel} dataModel The model.
 */
lgb.controller.PsController = function(dataModel) {
  this._NAME = 'lgb.controller.PsController';
  lgb.controller.BaseController.call(this);

  this.dataModel = dataModel;

};
goog.inherits(lgb.controller.PsController, lgb.controller.BaseController);


/**
 * @private
 */
lgb.controller.PsController.prototype.init = function() {

  this.view = new lgb.view.PsView( this.dataModel );
  this.bind_();
  this.view.init();

};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.PsController.prototype.bind_ = function() {

  this.listenTo(
    this.view,
    lgb.events.RequestDataModelChange.TYPE,
    this.onRequestDataModelChange_
   );
    
  this.listenToOnce(
    this.view,
    lgb.events.Object3DLoaded.TYPE,
    this.onObject3DLoaded_
   );
    
};


lgb.controller.PsController.prototype.onObject3DLoaded_ =
  function(event) {

  this.dispatchLocal(event);

};


/**
 * @private
 * @param {lgb.events.RequestDataModelChange} event Fired by a view.
 */
lgb.controller.PsController.prototype.onRequestDataModelChange_ =
  function(event) {

  this.dataModel.changeProperty(event.payload.name, event.payload.value);
};
