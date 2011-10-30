goog.provide('lgb.controller.ControllerBase');

goog.require('lgb.BaseClass');
goog.require('goog.events.Event');

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
lgb.BaseClass.prototype.dispatch = function(event) {
  goog.events.dispatchEvent(lgb.globalEventBus, event);
};


/**
 * @protected
 */
lgb.controller.ControllerBase.prototype.bind = function() {
	
	this.listenTo (
		this.view, 
		lgb.events.MeshLoaded.TYPE,
		this.onMeshLoaded_);
	
	this.listenTo (
		this.view, 
		lgb.events.Object3DLoaded.TYPE,
		this.onObject3DLoaded_);
};

/**
 * @private
 */
lgb.controller.ControllerBase.prototype.onMeshLoaded_ = function(event) {
	this.dispatch(event);
};


/**
 * @private
 */
lgb.controller.ControllerBase.prototype.onObject3DLoaded_ = function(event) {
	this.dispatch(event);
};







