var lgb = (function(lgb) {

	lgb.notNull = function(value) {
		return !lgb.isNull(value);
	};
	
	lgb.isNull = function(value) {
		return (null === value || undefined === value)
	};
	
	/** 
	 * used to preload images like for image roll-overs
	 *
	 * @param {images} array of image names
	 * @return {void}
	 */
	lgb.preload = function(images) {
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
	lgb.ftToM = function(ft) {
		
		return ft * 0.3048;
	};
	lgb.convertPoint = function(point) {
		
		var convertedPoint = [point[0], point[2], (-1 * point[1])];
		return convertedPoint;
	};
	
	
	
	/**
	* Used to verify the number and type of arguments passed to a function
	* 
	* @param {arrayOfTypes} An array of Strings which speicfy the type of each expected argument
	* @param {expectedArgCount} The number of arguments expected
	*
	*/
	lgb.validateArgs = function ( arrayOfTypes, expectedArgCount){
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

	
	return lgb;
	
})(lgb || {});