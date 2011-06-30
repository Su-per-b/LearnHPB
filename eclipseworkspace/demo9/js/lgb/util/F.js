
/**
 * @namespace
 */
var lgb = (function(lgb){



    lgb.util = lgb.util || {};
    
    /**
     * @class
     */
    lgb.util.F = function(){
        lgb.Base.call(this);
        
    };
    
    
    lgb.util.F.prototype = {
    

    };
	
	
	/** 
	 * used to preload images like for image roll-overs
	 *
	 * @param {images} array of image names
	 * @return {void}
	 */
	lgb.util.F.preload = function(images) {
        var i = 0;
		
        var imageArray = images.split(',');
        
        var imageObj = new Image();
        for(i=0; i<=imageArray.length-1; i++) {
        	var src = 'images/' + imageArray[i];
        	
           // document.write('<img src="' + src + '" />');// Write to page (uncomment to check images)
            imageObj.src=src;
        }
	};
	/*
	* converts feet to meters
	*/
	lgb.util.F.ftToM = function(ft) {
		
		return ft * 0.3048;
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
	lgb.util.F.delegate2 = function(targetObj, targetMethod, arg1, arg2, arg3){
		
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
	
	/**
	* Used to verify the number and type of arguments passed to a function
	* 
	* @param {arrayOfTypes} An array of Strings which speicfy the type of each expected argument
	* @param {expectedArgCount} The number of arguments expected
	*
	*/
	lgb.util.F.validateArgs = function ( arrayOfTypes, expectedArgCount){
		//get the parameters of the function that is executing validArgs
		var args = lgb.utils.validArgs.caller.arguments,
			len = args.length;

	//Check if the function get the number of parameter you are expecting. If not throw an error.
	//If the parameter declared is 0 then do not perform this check
	    if(expectedArgCount){
	         if(expectedArgCount !== len){
			 	var msg = 'The amount of paramers allowed it is ' + expectedArgCount + ', received '+ len;
			 	jQuery.error(msg);
	         }
	     }
		 
	    //Verify the type of each of the parameters. If one is wrong throw an error.
	    if(arrayOfTypes){
		 	for(var i = 0; i < len; i++){
			    if(typeOf(args[i]) !== arrayOfTypes[i]){
					
					jQuery.error('In parameter no. ' + (i+1)  + ' the type should be ' + arrayOfTypes[i] + ', received ' + typeOf(args[i]));
					//throw new Error();
			    }           
			}
	     }
	};
	
	
	
    
    lgb.util.F.inheritsFrom(lgb.Base);
    
    
    return lgb;
    
})(lgb || {});












