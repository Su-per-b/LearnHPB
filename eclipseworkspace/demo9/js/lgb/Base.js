

var lgb = (function(lgb) {



	lgb.Base = function() {

	};

	lgb.Base.prototype = {
		
		d: function(theFunction) {
			
			var delegate = $.proxy(theFunction, this);
			return delegate;
			
		},
		
		dispatch: function(eventName, value) {
			

			console.log ('Base.dispatch(): {0}:{1}'.format(eventName,value));
			var newEvent = jQuery.Event(eventName);
			
			if (null !== value && undefined !== value) {
				newEvent.value = value;
			}
			
			mainController.eventBus.trigger(newEvent);
		},
		
		listen: function(eventName, func) {
			var delegate = jQuery.proxy( func, this );
			mainController.eventBus.bind(eventName, delegate);
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

	return lgb;
	
})(lgb || {});


