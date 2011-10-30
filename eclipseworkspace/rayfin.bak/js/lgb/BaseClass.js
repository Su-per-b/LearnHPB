goog.provide('lgb.BaseClass');

goog.require('goog.events');
goog.require('goog.events.EventTarget');


/**
 * MVC base class
 * @constructor
 * @extends {goog.events.EventTarget}
 */
lgb.BaseClass = function() {
  goog.events.EventTarget.call(this);
  
  this.delegateIdx = {};
};
goog.inherits(lgb.BaseClass, goog.events.EventTarget);


/**
 * creates a proxy function ( also known as a delaget ) using jQuery which
 * maintains the context of "this"
 * @param {!Function} theFunction The function used to create the delegate.
 * @return {!Function} The delagate.
 */
lgb.BaseClass.prototype.d = function(theFunction) {
  var delegate = jQuery.proxy(theFunction, this);
  return delegate;
};


/**
 * fires an event on the lgb global event bus
 * lgb.globalEventBus is the event target
 * @param {goog.events.Event} event The event object to dispatch.
 */
lgb.BaseClass.prototype.dispatch = function(event) {
  goog.events.dispatchEvent(lgb.globalEventBus, event);
};

/**
 * fires an event
 * "this" is the event target
 * @param {goog.events.Event} event The event object to dispatch.
 */
lgb.BaseClass.prototype.dispatchLocal = function(event) {
  goog.events.dispatchEvent(this, event);
};


/**
 * binds a listener to an event
 * listens to the lgb global event bus
 * @param {!string} eventType Unique identifier for the event.
 * @param {!Function} handler Function that will be called when the event fires.
 */
lgb.BaseClass.prototype.listen = function(eventType, handler) {
  this.listenHelper_(lgb.globalEventBus, eventType, this, handler);
};

/**
 * binds a listener to an event
 * listens only to the specified event target
 * @param {!goog.events.EventTarget} eventTarget The object to listen to.
 * @param {!string} eventType Unique identifier for the event.
 * @param {!Function} handler Function that will be called when the event fires.
 */
lgb.BaseClass.prototype.listenTo = function(eventTarget, eventType, handler) {
  this.listenHelper_(eventTarget, eventType, this, handler);
};


/**
 * binds a listener to an event
 * @param {!goog.events.EventTarget} eventTarget Object to listen to.
 * @param {!string} eventType Unique identifier for the event.
 * @param {!Object} handlerContext The JS context to use when
 * calling the function usually "this".
 * @param {!Function} handler The function that will be called
 * when the event fires.
 * @private
 */
lgb.BaseClass.prototype.listenHelper_ = function(
  eventTarget, eventType, handlerContext, handler) {

	if (this.delegateIdx[handlerContext] == null) {
		this.delegateIdx[handlerContext] = {};
	};
	
	
	
	//var handlerName = arguments.callee.name.toString();
	//var callee = arguments.callee.name;
	//var ar = arguments;
	
	//var prop = this.delegateIdx[handlerContext];
	
	if (this.delegateIdx[handlerContext][eventType]) {
		throw ('You are setting the same Event listener twice');
	}
	

  /**@type {Function} */
  var delegate = jQuery.proxy(handler, handlerContext);
  this.delegateIdx[handlerContext][eventType] = delegate;

  goog.events.listen(
    eventTarget,
    eventType,
    delegate);
};


/**
 * binds a listener to an event
 * listens to the lgb global event bus
 * After the event has fired, the event listener is removed 
 * from the target
 * @param {!string} eventType Unique identifier for the event.
 * @param {!Function} handler Function that will be called when the event fires.
 */
lgb.BaseClass.prototype.listenOnce = function(eventType, handler) {
  this.listenOnceHelper_(lgb.globalEventBus, eventType, this, handler);
};

/**
 * binds a listener to an event
 * listens only to the specified event target
 * After the event has fired, the event listener is removed 
 * from the target
 * @param {!goog.events.EventTarget} eventTarget The object to listen to.
 * @param {!string} eventType Unique identifier for the event.
 * @param {!Function} handler Function that will be called when the event fires.
 */
lgb.BaseClass.prototype.listenToOnce = function(eventTarget, eventType, handler) {
  this.listenOnceHelper_(eventTarget, eventType, this, handler);
};


/**
 * binds a listener to an event
 * After the event has fired, the event listener is removed 
 * from the target
 * @param {!goog.events.EventTarget} eventTarget Object to listen to.
 * @param {!string} eventType Unique identifier for the event.
 * @param {!Object} handlerContext The JS context to use when
 * calling the function usually "this".
 * @param {!Function} handler The function that will be called
 * when the event fires.
 * @private
 */
lgb.BaseClass.prototype.listenOnceHelper_ = function(
  eventTarget, eventType, handlerContext, handler) {

  /**@type {Function} */
  var delegate = jQuery.proxy(handler, handlerContext);

  goog.events.listenOnce(
    eventTarget,
    eventType,
    delegate);
};


/**
 * loop though the array and
 * supply each element as an argument
 *  to the handler
 * @param {Array} ary The array to loop though.
 * @param {Function} handler The handler to call.
 * @protected
 */
lgb.BaseClass.prototype.each = function(ary, handler) {
  var l = ary.length;
  for (var i = 0; i < l; i++) {
    var arg = ary[i];
    handler.apply(this, [arg]);
  }
};


/**
 * removed an event binding
 * from the lgb global event bus
 * @param {!string} eventType The name of the event.
 * @param {!Function} handler The function to remove.
 */
lgb.BaseClass.prototype.unlisten = function(eventType, handler) {
  this.unlistenHelper_(lgb.globalEventBus, eventType, this, handler);  
};

/**
 * removed an event binding
 * removes only to the specified event target
 * @param {!goog.events.EventTarget} eventTarget The object to listen to.
 * @param {!string} eventType The name of the event.
 * @param {!Function} handler The function to remove.
 */
lgb.BaseClass.prototype.unlistenTo = function(eventTarget, eventType, handler) {
  this.unlistenHelper_(eventTarget, eventType, this, handler); 
};

/**
 * removes a listener from an event
 * @param {!goog.events.EventTarget} eventTarget Object to listen to.
 * @param {!string} eventType Unique identifier for the event.
 * @param {!Object} handlerContext The JS context to use when
 * calling the function usually "this".
 * @param {!Function} handler The function that will be called
 * when the event fires.
 * @private
 */
lgb.BaseClass.prototype.unlistenHelper_ = function(
  eventTarget, eventType, handlerContext, handler) {

  /**@type {Function} */
var delegate = this.delegateIdx[handlerContext][eventType];
	
 var key = goog.events.unlisten(
    eventTarget,
    eventType,
    delegate);
    
 this.delegateIdx[handlerContext][eventType] = null;
 
};

