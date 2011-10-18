goog.provide('lgb.BaseClass');

goog.require('goog.events');
goog.require('goog.events.EventTarget');




lgb.BaseClass = function() {
	goog.events.EventTarget.call(this);
};

goog.inherits(lgb.BaseClass, goog.events.EventTarget);

lgb.BaseClass.prototype.d = function(theFunction) {
	var delegate = jQuery.proxy(theFunction, this);

	return delegate;
};


lgb.BaseClass.prototype.dispatch = function(event) {
	
	//lgb.globalEventBus.dispatch(event);
	goog.events.dispatchEvent(lgb.globalEventBus, event);
};



lgb.BaseClass.prototype.dispatchLocal = function(event) {
	goog.events.dispatchEvent(this, event);
};

lgb.BaseClass.prototype.listenTo= function(eventTarget, event, handler ) {
	/*
	var eventType = event.TYPE;
	var delegate = jQuery.proxy( handler, this );

	
	goog.events.listen (
		this, 
		eventType, 
		delegate);	
		*/
		
	this.listenHelper_(eventTarget, event, this, handler );
	
};


lgb.BaseClass.prototype.listen = function(event, handler) {
/*
	var eventType = event.TYPE;
	var delegate = jQuery.proxy( handler, this );
	
	goog.events.listen (
		lgb.globalEventBus, 
		eventType, 
		delegate);	
	*/	
		this.listenHelper_(lgb.globalEventBus, event, this, handler );
		
};

lgb.BaseClass.prototype.listenHelper_ = function(eventTarget, event, handlerContext, handler ) {
	
	var eventType = event.TYPE;
	var delegate = jQuery.proxy( handler, handlerContext );

	
	goog.events.listen (
		eventTarget, 
		eventType, 
		delegate);	

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






