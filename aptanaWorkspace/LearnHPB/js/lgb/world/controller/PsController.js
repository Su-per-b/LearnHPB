/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.PsController');

goog.require('lgb.core.BaseController');



goog.require('lgb.world.model.ParticleSystemModel');
goog.require('lgb.world.view.ParticleSystemView');



/**
 * @constructor
 * @extends lgb.core.BaseController
 * @param {lgb.world.model.ParticleSystemModel} dataModel The model.
 */
lgb.world.controller.PsController = function(dataModel) {
  lgb.core.BaseController.call(this);

  this.dataModel = dataModel;

};
goog.inherits(lgb.world.controller.PsController, lgb.core.BaseController);


/**
 * @private
 */
lgb.world.controller.PsController.prototype.init = function() {

  this.view = new lgb.world.view.ParticleSystemView( this.dataModel );
  this.bind_();
  this.view.init();

};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.world.controller.PsController.prototype.bind_ = function() {

  this.listenTo(
    this.view,
    e.RequestDataModelChange,
    this.onRequestDataModelChange_
   );
    
    
    
   this.relayLocal(this.view, e.AddToWorldRequest); 
    
};




lgb.world.controller.PsController.prototype.onRequestDataModelChange_ =
  function(event) {

  this.dataModel.changePropertyEx(event.payload.property, event.payload.newValue);
};
