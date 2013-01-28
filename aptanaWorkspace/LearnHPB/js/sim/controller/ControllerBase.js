/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('sim.controller.ControllerBase');

goog.require('goog.events.Event');
goog.require('sim.BaseClass');


/**
 * @constructor
 * @extends lgb.BaseClass
 */
sim.controller.ControllerBase = function() {
  sim.BaseClass.call(this);
};
goog.inherits(sim.controller.ControllerBase, sim.BaseClass);


/**
 * fires an event on the lgb global event bus
 * lgb.globalEventBus is the event target
 * @param {goog.events.Event} event The event object to dispatch.
 */
sim.controller.ControllerBase.prototype.dispatch = function(event) {
  goog.events.dispatchEvent(sim.globalEventBus, event);
};


/**
 * @protected
 */
sim.controller.ControllerBase.prototype.makeAddToWorldRequestGlobal =
  function(viewObject) {
  
  
  if ( undefined === viewObject) {
    viewObject = this.view;
  }
  
  this.listenTo(
    viewObject,
    sim.events.Object3DLoaded.TYPE,
    this.onObject3DLoaded_);
};


/**
 * @private
 * @param {lgb.events.Object3DLoaded} event Fired from the v.
 */
sim.controller.ControllerBase.prototype.onObject3DLoaded_ = function(event) {
  this.dispatch(event);
};
