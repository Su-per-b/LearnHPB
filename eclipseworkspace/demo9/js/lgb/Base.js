

var lgb = (function(lgb) {



	lgb.Base = function() {

	};

	lgb.Base.prototype = {
		
		d: function(theFunction) {
			
			var delegate = $.proxy(theFunction, this);
			return delegate;
			
		},
		
		dispatch: function(eventName, value) {
			

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
			
			
			
			lgb.Base.eventBus.trigger(newEvent);
		},
		dispatchLocal: function(eventName, value) {
			
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
			
			$(this).trigger(newEvent);
		},
		
		listen: function(eventName, handler) {
			
			var delegate = jQuery.proxy( handler, this );
			lgb.Base.eventBus.bind(eventName, delegate);
		},
		each: function(ary, handler) {
			//loop though the array and 
			//supply each element as an argument 
			// to the handler
			
			var len = ary.length;
			for (var i = 0; i < len; i++ ) {
				var arg = ary[i];
				handler.apply( this, [arg] );
			}
			
		},
		eachArg: function(handler) {
			var args =  this.eachArg.caller.arguments;
			
			var len = args.length;
			for (var i = 0; i < len; i++ ) {
				var oneArg = args[i];
				
				handler.apply( this, [oneArg] );
			}
		},
					

		
		unlisten: function(eventName, handler) {
			var delegate = jQuery.proxy( handler, this );
			lgb.Base.eventBus.unbind(eventName, delegate);
		},
		
		assertType: function(expectedType) {

			var msg = 'Error when calling assertType';
			
			if(null === expectedType || undefined === expectedType) {
				jQuery.error(msg + " expectedType is null or undefined");
			} else {
				if (!this instanceof expectedType) {
					jQuery.error(msg + " object is not of the expected type");
				}
			}
		}
		
		
	};

	lgb.Base.eventBus = $(new lgb.event.EventBus());
	
	return lgb;
	
})(lgb || {});


