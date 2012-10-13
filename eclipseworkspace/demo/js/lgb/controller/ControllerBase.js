/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.ControllerBase');

goog.require('goog.events.Event');
goog.require('lgb.BaseClass');

//TODO (Raj) change some of the listen() fucntions to 'bind'
/**
 * @constructor
 * @extends lgb.BaseClass
 */
lgb.controller.ControllerBase = function() {
  lgb.BaseClass.call(this);
};
goog.inherits(lgb.controller.ControllerBase, lgb.BaseClass);


/**
 * fires an event on the lgb global event bus
 * lgb.globalEventBus is the event target
 * @param {goog.events.Event} event The event object to dispatch.
 */
lgb.controller.ControllerBase.prototype.dispatch = function(event) {
  goog.events.dispatchEvent(lgb.globalEventBus, event);
};


/**
 * @protected
 */
lgb.controller.ControllerBase.prototype.makeAddToWorldRequestGlobal =
  function(viewObject) {
  
  
  if ( undefined === viewObject) {
    viewObject = this.view;
  }
  
  this.listenTo(
    viewObject,
    lgb.events.Object3DLoaded.TYPE,
    this.onObject3DLoaded_);
};


/**
 * @private
 * @param {lgb.events.Object3DLoaded} event Fired from the v.
 */
lgb.controller.ControllerBase.prototype.onObject3DLoaded_ = function(event) {
  this.dispatch(event);
};
