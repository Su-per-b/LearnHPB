/**
 * @author Raj Dye - raj@rajdye.com
 * Almost all classes in the 'lgb' namespace inherit
 * from this class. It is primarily concerned with Event listening
 * and dispatching.
 */
goog.provide('lgb.BaseClass');

goog.require('goog.events');
goog.require('goog.events.EventTarget');


/**
 * MVC base class
 * @constructor
 * @extends {goog.events.EventTarget}
 */
lgb.BaseClass = function() {
    
  lgb.assert (this._NAME);
  goog.events.EventTarget.call(this);
  
  this.delegateIdx = {};
  this.listenKeys = {};

};
goog.inherits(lgb.BaseClass, goog.events.EventTarget);


/**
 * creates a proxy function ( also known as a delegate ) using jQuery which
 * maintains the context of "this"
 * @param {!Function} theFunction The function used to create the delegate.
 * @param {*=} arg The optional argument baked into the call.
 * @return {!Function} The delagate.
 */
lgb.BaseClass.prototype.d = function(theFunction, arg) {
  var delegate;

  if (arg === undefined) {
    delegate = jQuery.proxy(theFunction, this);
  } else {
    delegate = jQuery.proxy(theFunction, this, arg);
  }

  return delegate;
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
 * @return {?number} the event handler key.
 */
lgb.BaseClass.prototype.listen = function(eventType, handler) {
  return this.listenHelper_(lgb.globalEventBus, eventType, this, handler);
};

/**
 * binds a listener to an event
 * listens only to the specified event target
 * @param {goog.events.EventTarget} eventTarget The object to listen to.
 * @param {!string} eventType Unique identifier for the event.
 * @param {!Function} handler Function that will be called when the event fires.
 * @return {?number} the event handler key.
 */
lgb.BaseClass.prototype.listenTo = function(eventTarget, eventType, handler) {
  return this.listenHelper_(eventTarget, eventType, this, handler);
};


/**
 * binds a listener to an event
 * @private
 * @param {goog.events.EventTarget} eventTarget Object to listen to.
 * @param {!string} eventType Unique identifier for the event.
 * @param {!Object} handlerContext The JS context to use when
 * calling the function usually "this".
 * @param {!Function} handler The function that will be called
 * when the event fires.
 * @return {?number} the event handler key.
 */
lgb.BaseClass.prototype.listenHelper_ = function(
  eventTarget, eventType, handlerContext, handler) {

  /**@type {Function} */
  var delegate = jQuery.proxy(handler, handlerContext);

 var key = goog.events.listen(
    eventTarget,
    eventType,
    delegate);

  return key;

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
lgb.BaseClass.prototype.listenToOnce = function(
    eventTarget, eventType, handler) {

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
 * @param {!number} key The key for the event handler.
 */
lgb.BaseClass.prototype.unlisten = function(key) {
  goog.events.unlistenByKey(key);
};



