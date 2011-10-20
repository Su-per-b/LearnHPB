goog.provide('lgb.utils');



lgb.utils.notNull = function(value) {
	return !lgb.utils.isNull(value);
};

lgb.utils.isNull = function(value) {
	return (null === value || undefined === value)
};

/** 
 * used to preload images like for image roll-overs
 * @param {string}  images comma delimited list of image names
 */
lgb.utils.preload = function(images) {
    var i = 0;
	
    var imageArray = images.split(',');
    
    
    for(i=0; i<=imageArray.length-1; i++) {
    	var src = 'images/' + imageArray[i];
    	
		var imageObj = new Image(42,42);
        //document.write('<img src="' + src + '" />');// Write to page (uncomment to check images)
        imageObj.src=src;
    }
};

/*
* converts feet to meters
*/
lgb.utils.ftToM = function(ft) {
	
	return ft * 0.3048;
};
lgb.utils.convertPoint = function(point) {
	
	var convertedPoint = [point[0], point[2], (-1 * point[1])];
	return convertedPoint;
};



/**
* Used to verify the number and type of arguments passed to a function
* 
* @param {Array} arrayOfTypes An array of Strings which speicfy the type of each expected argument
* @param {number} expectedArgCount The number of arguments expected
*
*/
lgb.utils.validateArgs = function ( arrayOfTypes, expectedArgCount){
	//get the parameters of the function that is executing validArgs
	var args = lgb.utils.validateArgs.caller.arguments,
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
		    if(typeof(args[i]) !== arrayOfTypes[i]){
				
				jQuery.error('In parameter no. ' + (i+1)  + ' the type should be ' + arrayOfTypes[i] + ', received ' + typeof(args[i]));
				//throw new Error();
		    }           
		}
     }
};

	
