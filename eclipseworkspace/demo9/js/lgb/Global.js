
	/**
	* Inspects the contents of the array to verify that all the elements are 
	* of the specified data type. Throws and exception if not
	*
	* @param {type} The type that each element should be
	*/
	Array.prototype.assertContainsType = function(expectedType){
		
		var ary = this;
		var msg = 'Error in lgb.utils.validateTypeInArray';
		
		if(null === ary || undefined === ary) {
			jQuery.error(msg + " array is null or undefined");
		} else if (!ary.constructor == Array ) {
			jQuery.error(msg + " ary not actually instanceof array");
		} else if (ary.length < 1) {
			jQuery.error(msg + " array length is less than one");
		} else if (null === expectedType || undefined === expectedType) {
			jQuery.error(msg + " expectedType is null or undefined");
		} else {
			var len = ary.length;
			for (var i=0; i<len; i++) {
				var value = ary[i];
				if (!value instanceof expectedType) {
					jQuery.error(msg + " expectedType is not the expected type");
				}
			}
		}
	};
	
	String.prototype.format = function () {
	  var args = arguments;
	  return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
	    if (m == "{{") { return "{"; }
	    if (m == "}}") { return "}"; }
	    return args[n];
	  });
	};