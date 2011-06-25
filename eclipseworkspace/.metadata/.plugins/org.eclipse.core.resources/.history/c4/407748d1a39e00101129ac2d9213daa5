

var lgb = (function(lgb) {



	lgb.Base = function() {

	};

	lgb.Base.prototype = {
		
		dispatch: function(eventName) {
			var newEvent = jQuery.Event(eventName);
			$('body').trigger(newEvent);
		},
		
		listen: function(eventName, func) {
			var delegate = jQuery.proxy( func, this );
			$('body').bind(eventName, delegate);
		},
		
		assertIsType: function(expectedType) {

			var msg = 'Error when calling assertIsType';
			
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


