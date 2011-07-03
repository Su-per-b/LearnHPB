/**
 * The 'debug' module is used to assist the developer in debugging the library.
 * It adds the following property to each namespace and class prototype:
 * 
 * 			theObject._NAME = namespaceAndClassName;
 *				
 * This can be left out of a production build. To use this module, include this
 * javascript file and call hext.utils.debug.init();
 * you can optionally add namespaces.  This may be necessary due to the namespace search heuristic 
 * cannot identify all namespaces.  So you can do like this:
 * 
 * 
 * hext.utils.debug.init(['lgb', 'lgb.model', 'lgb.view']);
 * 
 * @author Raj Dye
 */
var hext = (function(hext) {
	
	hext.utils = hext.utils || {};
	hext.utils._NAME = 'hext.utils';
	
	/**
	 * @namespace A module to assist the developer in debugging the o3d and kuda
	 * libraries.
	 */
	hext.utils.debug = hext.utils.debug || {};
	hext.utils.debug._NAME = 'hext.utils.debug';
	
	hext.utils.debug.init = function(nameSpaceAry) {
		
		this.namespaces = {};
		
		//some namespaces can not be found through the 
		//introspection heuristic and are added explicitly here:
		this.namespaces['hemi.core'] = true;
		this.namespaces['o3d'] = true;
		
		if (null !== nameSpaceAry && undefined !== nameSpaceAry) {
			
			for (var i=0, i_len = nameSpaceAry.length; i < i_len; i++) {
				var theNameSpace = nameSpaceAry[i];
				this.namespaces[theNameSpace] = true;
			}
		}
		
		this.classes = {}; 
		this.regExpFileExtension = new RegExp("\.[^.]*$");
		this.regExpSlashes = new RegExp("/", "gm");
		
		this.eachProperty(o3djs.included_, this.findNamespaces);
		this.eachProperty(this.namespaces, this.findClasses);
		this.eachProperty(this.namespaces, this.annotateObject);
		this.eachProperty(this.classes, this.annotateClass);
	};
	
	/*
	* given a file path, generate a namespace
	* add the namespace to the this.namespaces associative array
	* @param filePath
	*/
	hext.utils.debug.findNamespaces = function(filePath){
		var fullClassName = filePath.replace(this.regExpFileExtension, "");
		fullClassName = fullClassName.replace(this.regExpSlashes, ".");
		
		var theNamespace;
		
		try {
			theNamespace = eval (fullClassName);
		}
		catch(err) {
			hemi.console.log('hext.utils.debug.findNamespaces failed to access object: ' + filePath);
			return;
		}
		
		var theType = typeof(theNamespace);
		
		if (theType == 'object') {		
			var namespaceAry = fullClassName.split('.');
			this.traverseNamespaceTree(namespaceAry);
		} else {
			hemi.console.log('hext.utils.debug.findNamespaces: namespace is not an object: ' + filePath);
		}
	};
	
	/*
	* accepts an array of namespace strings like ['topLevel', 'secondLevel', 'thirdLevel']
	* then generates all the namespace strings from this array
	* generating ['toplevel', 'toplevel.secondLevel', toplevel.secondLevel.thirdLevel]
	* the generated values are added to the this.namespaces associative array
	* @param namespaceAry (array of namespace strings)
	*/
	hext.utils.debug.traverseNamespaceTree = function (namespaceAry) {
		this.namespaces[namespaceAry.join('.')] = true;
		namespaceAry.pop();
		
		if(namespaceAry.length > 0){
			this.traverseNamespaceTree(namespaceAry);
		}
	};
	
	/*
	 * given the namespace string finds all the classes with in that namespace
	 * then adds the class name to this.classes associative array
	 * @param theNameSpace (String)
	*/
	hext.utils.debug.findClasses = function(theNameSpace){
		//we are passed the string representation of the namespace
		//attempt to convert it to the singleton object
		
		var theSingleton = eval(theNameSpace);
		
		if (theSingleton != null && typeof(theSingleton) == 'object') {
			// theSingleton is indeed an object, now lets look look at 
			// all the properties of the object and pick out the classes
			this.theCurrentNameSpace = theNameSpace;
			
			var delegate = jQuery.proxy(this.inspectSingletonProperties, this);
			jQuery.each(theSingleton, delegate);
			
		}
	};

	
	/*
	 * given an object property name and value
	 * determines if it is a class, if so, add it to the 'this.classes' associative array
	 * @param propName (String), propReference (Object)
	*/
	hext.utils.debug.inspectSingletonProperties = function( propName, propReference){
		
		if (null !== propReference && undefined != propReference) {
			
			if (propReference.prototype != null) {
				if (!jQuery.isEmptyObject(propReference.prototype)) {
					var fullClassName = this.theCurrentNameSpace + '.' + propName;
					this.classes[fullClassName] = true;
				}
			} 
		}
	};
	

	/*
	 * given a namespace name like 'hemi.model'
	 * it determines if this is indeed a singleton type object
	 * then adds the property '_NAME' and sets the value to the string 'hemi.model';
	 * @param theNameSpace (String)
	*/
	hext.utils.debug.annotateObject = function(theNameSpace) {
		var theObject = eval(theNameSpace);
		if (theObject == null) return;
		
		var theType = typeof(theObject);
		
		if (theType == 'object') {
			theObject._NAME = theNameSpace;
		} else {
			hemi.console.log('in hext.utils.debug: error processing namespace: ' + theNameSpace);
		}
	};
	/*
	 * given an full class name like 'hemi.model.Model'
	 * it determines if this is indeed a class and then
	 * alters the prototype of the class.
	 * so then whenever you instantiate the class, the object you create
	 * will have the property _NAME set to the string 'hemi.model.Model'
	 * @param theFullClassName (String)
	*/
	hext.utils.debug.annotateClass = function(theFullClassName) {
		var theObject = eval(theFullClassName);
		if (theObject == null) return;
		
		var theType = typeof(theObject);
		
		if (theType == 'function') {
			
			if (null === theObject.prototype || undefined === theObject.prototype) {
				theObject._NAME = theFullClassName;
			} else {
				theObject.prototype._NAME = theFullClassName;
			}
			
		} else {
			hemi.console.log('hext.utils.debug.annotateClass() - namespace ignored: ' + theFullClassName);
		}
	};
	
	
	/*
	* utility function for iterating though the properties of an object
	* for each property, the function is called with the property name
	* as the argument
	* @param obj (Object) //  the object which we iterate though
	* @param handler (Function) the function that we call
	*/
	hext.utils.debug.eachProperty = function(obj, handler) {
	
		for(var prop in obj) {
		    if(obj.hasOwnProperty(prop)) {
				
				var thePropValue = obj[prop];
				handler.apply( this, [prop] );
			}
		}

	};
	
	return hext;
})(hext || {});