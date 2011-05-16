/*
 * Copyright (C) 2010 Jonathan Azoff <jon@azoffdesign.com>
 *
 * This script is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 */

/*
 * jQuery.proxy() - Enhanced with the ability to "curry" arguments.
 * 
 * @author	Jonathan Azoff
 * @version 1.0.0 (beta)
 * @jquery	1.4.0+
 * 
 * @usage 
 * 	Any of the following signatures will bind a function to a particular 
 *  context and return the bound function. For implementation details 
 *  and example usage, please go to http://azoffdesign.com/plugins/js/jquery-proxy
 *  
 * 		jQuery.proxy( function, scope )
 *  	jQuery.proxy( scope, name )
 *  	jQuery.proxy( function, scope, args... )
 *  	jQuery.proxy( scope, name, args... )
 */
;jQuery.extend({

		proxy: function( fn, proxy ) {		
	
			var context, args = Array.prototype.slice.call(arguments, 2);
	
			if ( arguments.length >= 2 ) {
				
				if ( typeof proxy === "string" ) {
					context = fn;
					fn = context[ proxy ];
					proxy = undefined;
	
				} else if ( proxy && !jQuery.isFunction( proxy ) ) {
					context = proxy;
					proxy = undefined;
					
				}
			}
	
			if ( !proxy && fn ) {
				proxy = function() {
					return fn.apply( context || this, jQuery.merge(args, arguments) );
				};
			}
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			if ( fn ) {
				proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
			}
	
			// So proxy can be declared as an argument
			return proxy;
		
		}
});