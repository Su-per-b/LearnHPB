/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.PsController');

goog.require('lgb.controller.BaseController');



goog.require('lgb.model.PsModel');
goog.require('lgb.view.PsView');



/**
 * @constructor
 * @extends lgb.controller.BaseController
 * @param {lgb.model.PsModel} dataModel The model.
 */
lgb.controller.PsController = function(dataModel) {
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
    e.RequestDataModelChange,
    this.onRequestDataModelChange_
   );
    
   this.relayLocal(this.view, e.AddToWorldRequest); 
    
};




lgb.controller.PsController.prototype.onRequestDataModelChange_ =
  function(event) {

  this.dataModel.changeProperty(event.payload.name, event.payload.value);
};
