

var lgb = (function(lgb) {

	/**
	 * @namespace A module for utilities
	 */
	lgb.utils = lgb.utils || {};


	lgb.utils.init = function(){
		
	};
	
	/** 
	 * used to preload images like for image roll-overs
	 *
	 * @param {images} array of image names
	 * @return {void}
	 */
	lgb.utils.preload = function(images){
	        var i = 0;
	        var imageArray = new Array();
	        imageArray = images.split(',');
	        
	        var imageObj = new Image();
	        for(i=0; i<=imageArray.length-1; i++) {
	        	var src = 'images/' + imageArray[i];
	        	
	           // document.write('<img src="' + src + '" />');// Write to page (uncomment to check images)
	            imageObj.src=src;
	        }
	};
	
	
	lgb.utils.delegate = function(that, thatMethod){
			return function() { return thatMethod.call(that); };
	};
	
	/**
	 * This method returns a delegate function closure that will call
	 * targetMethod on targetObject with specified arguments and with
	 * arguments specified by the caller of this delegate
	 * 
	 * @param {Object} targetObj - the object to call the method on
	 * @param {Object} targetMethod - the method to call on the object
	 * @param {Object} [arg1] - optional argument 1
	 * @param {Object} [arg2] - optional argument 2
	 * @param {Object} [arg3] - optional argument 3
	 */
	lgb.utils.delegate2 = function(targetObj, targetMethod, arg1, arg2, arg3){
		
	        // Create an array containing the arguments
	        var initArgs = new Array();
	
	        // Skip the first two arguments as they are the target object and method
	        for( var i = 2; i < arguments.length; ++i )
	        {
	                initArgs.push( arguments[i] );
	        }
	
	        // Return the closure
	        return function()
	        {
	                // Add the initial arguments of the delegate
	                var args = initArgs.slice(0);
	
	                // Add the actual arguments specified by the call to this list
	                for( var i = 0; i < arguments.length; ++i )
	                {
	                        args.push( arguments[i] );
	                }
	
	                return targetMethod.apply( targetObj, args );
	        };
			
	};
	

	String.prototype.format = function () {
	  var args = arguments;
	  return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
	    if (m == "{{") { return "{"; }
	    if (m == "}}") { return "}"; }
	    return args[n];
	  });
	};


	return lgb;
	
})(lgb || {});