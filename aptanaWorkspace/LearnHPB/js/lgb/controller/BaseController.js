/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.BaseController');

goog.require('goog.events.Event');
goog.require('lgb.BaseClass');

//TODO (Raj) change some of the listen() fucntions to 'bind'
/**
 * @constructor
 * @extends lgb.BaseClass
 */
lgb.controller.BaseController = function() {
  lgb.BaseClass.call(this);
};
goog.inherits(lgb.controller.BaseController, lgb.BaseClass);


/**
 * fires an event on the lgb global event bus
 * lgb.globalEventBus is the event target
 * @param {goog.events.Event} event The event object to dispatch.
 */
lgb.controller.BaseController.prototype.dispatch = function(event) {
  goog.events.dispatchEvent(lgb.globalEventBus, event);
};


lgb.controller.BaseController.prototype.trigger = function(type, payload) {
  var event = new lgb.events.Event(type, payload);
  goog.events.dispatchEvent(lgb.globalEventBus, event);
};


lgb.BaseClass.prototype.relayLocal = function(eventTarget, eventType) {
  this.listenTo(eventTarget, eventType, this.onRelayLocal_);
};

lgb.BaseClass.prototype.onRelayLocal_ = function(event) {
  this.dispatchLocal(event);
};

lgb.BaseClass.prototype.relay = function(eventTarget, eventType, handler) {
  this.listenTo(eventTarget, eventType, this.onRelay_);
};

lgb.BaseClass.prototype.onRelay_ = function(event) {
  this.dispatch(event);
};


/**
 * @protected
 */
lgb.controller.BaseController.prototype.makeAddToWorldRequestGlobal =
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
lgb.controller.BaseController.prototype.onObject3DLoaded_ = function(event) {
  this.dispatch(event);
};
