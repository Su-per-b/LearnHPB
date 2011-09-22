goog.provide('lgb.BaseClass');

goog.require('goog.events');
goog.require('goog.events.EventTarget');

lgb.BaseClass = function() {

};


lgb.BaseClass.prototype.d = function(theFunction) {
	var delegate = $.proxy(theFunction, this);
	return delegate;
};

//goog.inherits(lgb.BaseClass, goog.events.EventTarget);

lgb.BaseClass.prototype.d = function(theFunction) {
	var delegate = $.proxy(theFunction, this);
	return delegate;
};

lgb.BaseClass.prototype.dispatch = function(event) {
	
	lgb.EventBusObj.dispatch(event);
	
	
	/*
	var newEvent = jQuery.Event(eventName);
	
	if (null !== value && undefined !== value) {
		newEvent.value = value;
		msg += " : " + value.toString();
	}
	
	if (lgb.Config.DEBUG_EVENTS) {
		var msg =  ('EventBus - dispatch: {0}'.format(eventName));
		
		if (null !== value && undefined !== value) {
			msg += " : " + value.toString();
		}
	
		console.log(msg);
	}
	*/
	
	
	//lgb.BaseClass.eventBus.trigger(newEvent);
};



lgb.BaseClass.prototype.dispatchLocal = function(eventName, value) {
		

};


lgb.BaseClass.prototype.listen = function(eventName, handler) {
		//var delegate = jQuery.proxy( handler, this );
		//lgb.Base.eventBus.bind(eventName, delegate);
		//lgb.EventBusObj.listen
	
	var delegate = jQuery.proxy( handler, this );
	
	goog.events.listen (
		lgb.EventBusObj, 
		eventName, 
		delegate);	
		
	var x = 0;
};

lgb.BaseClass.prototype.each = function(ary, handler) {
	//loop though the array and 
	//supply each element as an argument 
	// to the handler
	
	var len = ary.length;
	for (var i = 0; i < len; i++ ) {
		var arg = ary[i];
		handler.apply( this, [arg] );
	}
};

lgb.BaseClass.prototype.eachArg = function(handler) {
	var args =  this.eachArg.caller.arguments;
	
	var len = args.length;
	for (var i = 0; i < len; i++ ) {
		var oneArg = args[i];
		
		handler.apply( this, [oneArg] );
	}
};

lgb.BaseClass.prototype.unlisten = function(eventName, handler) {
		//var delegate = jQuery.proxy( handler, this );
	//	lgb.Base.eventBus.unbind(eventName, delegate);
};

lgb.BaseClass.prototype.assertType = function(expectedType) {
	var msg = 'Error when calling assertType';
	
	if(null === expectedType || undefined === expectedType) {
		jQuery.error(msg + " expectedType is null or undefined");
	} else {
		if (!this instanceof expectedType) {
			jQuery.error(msg + " object is not of the expected type");
		}
	}
};






