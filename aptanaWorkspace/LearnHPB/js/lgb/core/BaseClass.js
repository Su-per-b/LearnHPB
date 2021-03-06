/**
 * @author Raj Dye - raj@rajdye.com
 * Almost all classes in the 'lgb' namespace inherit
 * from this class. It is primarily concerned with Event listening
 * and dispatching.
 */
goog.provide('lgb.core.BaseClass');

goog.require('goog.events');
goog.require('goog.events.EventTarget');

goog.require('lgb.core.Event');

/**
 * MVC base class
 * @constructor
 * @extends {goog.events.EventTarget}
 */
lgb.core.BaseClass = function() {
    
  goog.events.EventTarget.call(this);
  
  this.delegateIdx = {};
  this.listenKeys = {};

};
goog.inherits(lgb.core.BaseClass, goog.events.EventTarget);


/**
 * creates a proxy function ( also known as a delegate ) using jQuery which
 * maintains the context of "this"
 * @param {!Function} theFunction The function used to create the delegate.
 * @param {*=} arg The optional argument baked into the call.
 * @return {!Function} The delagate.
 */
lgb.core.BaseClass.prototype.d = function(theFunction, arg) {
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
lgb.core.BaseClass.prototype.dispatchLocal = function(event) {
  goog.events.dispatchEvent(this, event);
};


lgb.core.BaseClass.prototype.triggerLocal = function(type, payload) {
  
  if (null == payload) {
    payload = this;
  }
  
  
  
  var event = new lgb.core.Event(type, payload);
 // goog.events.dispatchEvent(this, event);
  
  this.dispatchEvent(event);
  
};


/**
 * binds a listener to an event
 * listens to the lgb global event bus
 * @param {!string} eventType Unique identifier for the event.
 * @param {!Function} handler Function that will be called when the event fires.
 * @return {?number} the event handler key.
 */
lgb.core.BaseClass.prototype.listen = function(eventType, handler) {
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
lgb.core.BaseClass.prototype.listenTo = function(eventTarget, eventType, handler) {
  
  if (isArray (eventTarget)) {
    this.each(eventTarget, this.listenHelper_, eventType, this, handler);
  } else {
    return this.listenHelper_(eventTarget, eventType, this, handler);
  }
  

};


lgb.core.BaseClass.prototype.hasListener = function(eventTarget, eventType, handler) {
  
  
 var result = goog.events.hasListener(
    eventTarget,
    eventType,
    handler);

  return result;
  
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
lgb.core.BaseClass.prototype.listenHelper_ = function(
  eventTarget, eventType, handlerContext, handler) {

  ///**@type {Function} */
  //var delegate = jQuery.proxy(handler, handlerContext);

 // var key = goog.events.listen(
    // eventTarget,
    // eventType,
    // delegate);

  //var key = goog.events.listen_(eventTarget, eventType, handler, false, handlerContext);
    
  if (undefined == eventTarget) {
      lgb.logSevere ('eventTarget is null');
  }
  
  var key = eventTarget.addEventListener (eventType, handler, false, handlerContext);


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
lgb.core.BaseClass.prototype.listenOnce = function(eventType, handler) {
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
lgb.core.BaseClass.prototype.listenToOnce = function(
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
lgb.core.BaseClass.prototype.listenOnceHelper_ = function(
  eventTarget, eventType, handlerContext, handler) {

  /**@type {Function} */
  var delegate = jQuery.proxy(handler, handlerContext);

  goog.events.listenOnce(
    eventTarget,
    eventType,
    delegate);
    
    
 
};


lgb.core.BaseClass.prototype.getAdditionalArguments = function(theArguments, count) {
  
  var additionalArgs = null;
  var allArguments = Array.prototype.slice.call(theArguments);
  var len = allArguments.length;
  if (len > count) {
    additionalArgs = allArguments.slice(count, len);
  }
  
  return additionalArgs;
};


/**
 * loop though the array and
 * supply each element as an argument
 *  to the handler
 * @param {Array} ary The array to loop though.
 * @param {String} handler name The handler to call.
 * additional argument to pass along for all function calls
 * additional argument to pass along for all function calls
 * additional argument to pass along for all function calls
 * @protected
 */
lgb.core.BaseClass.prototype.eachHandlerName = function(ary, handlerName) {

  var additionalArgs = this.getAdditionalArguments(arguments,2);
  
  var l = ary.length;
  for (var i = 0; i < l; i++) {
    var arrayElement = ary[i];
    
    var argList = [];
    
    if(null != additionalArgs) {
      argList = argList.concat(additionalArgs);
    }
    
    var theHander = arrayElement[handlerName];
    
    if (undefined == theHander) {
        debugger;
    }
    
    theHander.apply(arrayElement, argList);
  }
};




/**
 * loop though the array and
 * supply each element as an argument
 *  to the handler
 * @param {Array} ary The array to loop though.
 * @param {Function} handler The handler to call.
 * additional argument to pass along for all function calls
 * additional argument to pass along for all function calls
 * additional argument to pass along for all function calls
 * @protected
 */
lgb.core.BaseClass.prototype.each = function(ary, handler) {
  // var additionalArgs = null;
  // var allArguments = Array.prototype.slice.call(arguments);
  // var len = allArguments.length;
  // if (len > 2) {
    // additionalArgs = allArguments.slice(2, len);
  // }
  
  var additionalArgs = this.getAdditionalArguments(arguments,2);
  
  var l = ary.length;
  for (var i = 0; i < l; i++) {
    var arrayElement = ary[i];
    
    var argList = [arrayElement];
    
    if(additionalArgs) {
      argList = argList.concat(additionalArgs);
    }
    
    if (undefined == handler) {
        debugger;
    }
    
    handler.apply(this, argList);
  }
};




lgb.core.BaseClass.prototype.eachProperty = function(object, handler) {
  
  // var additionalArgs = null;
  // var allArguments = Array.prototype.slice.call(arguments);
  // var len = allArguments.length;
  // if (len > 2) {
    // additionalArgs = allArguments.slice(2, len);
  // }
  
  var additionalArgs = this.getAdditionalArguments(arguments,2);
  
  for(var propertyName in object) {

    var propertyValue = object[propertyName];
    var argList = [propertyValue];
    
    if(additionalArgs) {
      argList = argList.concat(additionalArgs);
    }
    
    handler.apply(this, argList);
  }

};

lgb.core.BaseClass.prototype.eachPropertyName = function(object, handler) {
  
  // var additionalArgs = null;
  // var allArguments = Array.prototype.slice.call(arguments);
  // var len = allArguments.length;
  // if (len > 2) {
    // additionalArgs = allArguments.slice(2, len);
  // }
  
  var additionalArgs = this.getAdditionalArguments(arguments,2);
  
  for(var propertyName in object) {

    var propertyValue = object[propertyName];
    var argList = [propertyValue, propertyName];
    
    if(additionalArgs) {
      argList = argList.concat(additionalArgs);
    }
    
    handler.apply(this, argList);
  }
  
  

};

// lgb.core.BaseClass.prototype.eachPropertyNameCall = function(object, handlerName) {
//   
// 
  // var additionalArgs = null;
  // var allArguments = Array.prototype.slice.call(arguments);
  // var len = allArguments.length;
  // if (len > 2) {
    // additionalArgs = allArguments.slice(2, len);
  // }
//   
  // for(var propertyName in object) {
// 
    // var propertyValue = object[propertyName];
    // var argList = [propertyValue, propertyName];
//     
    // if(additionalArgs) {
      // argList = argList.concat(additionalArgs);
    // }
//     
    // var handler = propertyValue[handlerName];
//     
    // handler.apply(propertyValue, argList);
  // }
// 
// };


/**
 * loop though the array and
 * supply each element as an argument
 *  to the handler
 * @param {Array} ary The array to loop though.
 * @param {Function} handler The handler to call.
 * additional argument to pass along for all function calls
 * additional argument to pass along for all function calls
 * additional argument to pass along for all function calls
 * @protected
 */
lgb.core.BaseClass.prototype.eachIdx = function(ary, handler) {
  // var additionalArgs = null;
  // var allArguments = Array.prototype.slice.call(arguments);
  // var len = allArguments.length;
  // if (len > 2) {
    // additionalArgs = allArguments.slice(2, len);
  // }
  
  var additionalArgs = this.getAdditionalArguments(arguments,2);
  
  var l = ary.length;
  for (var i = 0; i < l; i++) {
    var arrayElement = ary[i];
    
    var argList = [arrayElement];
    

    argList.push(i);
    
    
    if(additionalArgs) {
      argList = argList.concat(additionalArgs);
    }
    
    handler.apply(this, argList);
  }
};



/**
 * removed an event binding
 * @param {!number} key The key for the event handler.
 */
lgb.core.BaseClass.prototype.unlisten = function(key) {
  
  if(key) {
    goog.events.unlistenByKey(key);
  }

};


lgb.core.BaseClass.prototype.getClassName = function() {
  
  var fullClassName = this.getFullClassName();
  var ary = fullClassName.split('.');
  
  var len = ary.length;
  var className = ary[len-1];
  
  return className;
};


lgb.core.BaseClass.prototype.getClassConstructor = function() {
  
  var fullClassName = this.getFullClassName();
  var classConstructor = eval(fullClassName);
  goog.asserts.assertFunction(classConstructor);
  
  return classConstructor;
};


lgb.core.BaseClass.prototype.translateObject_ = function(srcObj, map) {
    
    if (undefined == map) {
        var ownClass = this.getClassConstructor();
        map = ownClass.classTranslationMap;
    }
    
    
    var newObject = lgb.core.BaseClass.translateObjectWithMap(srcObj, map);
    
    if (null == newObject) {
        debugger;
    }
    
    return newObject; 
    

};


lgb.core.BaseClass.translateObjectWithMap = function(srcObj, map) {
    
    if (undefined === srcObj) {
        debugger;
    }
    
    var fullClassName = srcObj.getFullClassName();
    
    return this.translateWithMap(fullClassName, map);
    
    // var classReference = null;
//     
    // if ( map.hasOwnProperty(fullClassName)  ) {
        // classReference = map[fullClassName];
//         
        // if (null == classReference) {
            // debugger;
            // return null;
        // } else {
            // goog.asserts.assertFunction(classReference);
//             
            // var destObj = new classReference();
            // return destObj;
        // }
// 
    // } else {
        // return null;
    // }
//  

};


lgb.core.BaseClass.translateWithMap = function(fullClassName, map) {
    

    var classReference = null;
    
    if ( map.hasOwnProperty(fullClassName)  ) {
        classReference = map[fullClassName];
        
        if (null == classReference) {
            debugger;
            return null;
        } else {
            goog.asserts.assertFunction(classReference);
            
            var destObj = new classReference();
            return destObj;
        }

    } else {
        return null;
    }
    
};





