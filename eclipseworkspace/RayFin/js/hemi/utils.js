goog.provide('hemi.utils');
	
	/**
	 * Get the vertex and pixel shaders (as well as their source) for the given
	 * Material.
	 * 
	 * @return {Object} object containing shaders and source strings
	 */
	hemi.utils.getShaders = function() {
		

		//var gl = mainController.worldController_.renderer_.context;
		
		var gl = mainController.getGL();
		
		var version = gl.getParameter( gl.VERSION );
		var obj;
		
		
		//var shader = THREE.ShaderLib.particle_basic;
		/*
		 * type: Object ()
		 */	
		var shader = THREE.ShaderLib.basic
					
		/*
		 * type: string
		 */			
		var fragSrc = shader.fragmentShader; 
		
		
		// Create a fragment shader object
		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		
		// Load the shader with the source strings from the script element
		gl.shaderSource(fragmentShader, fragSrc);

		
		var verifyFragmentShaderSource = gl.getShaderSource(fragmentShader);
		var isEqualFrag = (verifyFragmentShaderSource == fragSrc);
		
		
		/*
		 * type: string
		 */			
		var vertSrc = shader.vertexShader; 
		
		// Create a vertex shader object
		var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		
		// Load the shader with the source strings from the script element
		gl.shaderSource(vertexShader, vertSrc);
		
		var verifyVertexShaderSource = gl.getShaderSource(vertexShader);
		var isEqualVert = (verifyVertexShaderSource == fragSrc);
		
		
		obj = {
			fragShd: fragmentShader,
			fragSrc: fragSrc,
			vertShd: vertexShader,
			vertSrc: vertSrc
		};
			
			
		
		//var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		//gl.shaderSource(vertexShader, vertexShaderScript.text)
		//
		
		
		//var vertShd = shader.fragmentShader;
	//	var vertSrc = gl.getShaderSource(vertShd);
		
		
		/*
			program = material.effect.program_,
			shaders = gl.getAttachedShaders(program),
			source1 = gl.getShaderSource(shaders[0]),
			source2 = gl.getShaderSource(shaders[1]),
			obj;
		
		if (source1.search('gl_FragColor') > 0) {
			obj = {
				fragShd: shaders[0],
				fragSrc: source1,
				vertShd: shaders[1],
				vertSrc: source2
			};
		} else {
			obj = {
				fragShd: shaders[1],
				fragSrc: source2,
				vertShd: shaders[0],
				vertSrc: source1
			};
		}
		*/
		
		return obj;
	};
	
	hemi.utils.newMaterial = function() {
		/*
		var trans = opt_trans == null ? true : opt_trans;
		return hemi.core.material.createBasicMaterial(
			this.pack,
			hemi.view.viewInfo,
			[0,0,0,1],
			trans);
			*/
		var material = new THREE.MeshPhongMaterial( 
			{ ambient: 0x030303, color: 0x030303, specular: 0x990000, shininess: 30 }
		);
		
		return material;
			
	};
	
/**
	 * Create a copy of the given Object (or array).
	 * 
	 * @param {Object} src an Object (or array) to clone
	 * @param {boolean} opt_deep optional flag to indicate if deep copying
	 *     should be performed (default is deep copying)
	 * @return {Object} the created Object (or array)
	 */
	hemi.utils.clone = function(src, opt_deep) {
		var dest = hemi.utils.isArray(src) ? [] : {},
			opt_deep = opt_deep == null ? true : opt_deep;
		
		hemi.utils.join(dest, src, opt_deep);
		return dest;
	};
	
	/**
	 * Compare the two given arrays of numbers. The arrays should be the same
	 * length.
	 * 
	 * @param {number[]} a the first array
	 * @param {number[]} b the second array
	 * @return {boolean} true if the arrays are equal
	 */
	hemi.utils.compareArrays = function(a, b) {
		var eq = a.length === b.length;
		
		for (var i = 0; eq && i < a.length; i++) {
			if (a[i] instanceof Array) { 
				eq = hemi.utils.compareArrays(a[i], b[i]);
			} else {
				eq = Math.abs(a[i] - b[i]) <= 0.001;
			}
		}
		
		return eq;
	};
	
	/**
	 * Perform an asynchronous AJAX GET for the resource at the given URL.
	 * 
	 * @param {string} url url of the resource to get
	 * @param {function(string, string):void)} callback function to pass the
	 *     data retrieved from the URL as well as the status text of the request
	 */
	hemi.utils.get = function(url, callback) {
		var xhr = new window.XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			if (this.readyState === 4) {
				this.onreadystatechange = hemi.utils.noop;
				var data = null;
				
				if (this.status === 200 || window.location.href.indexOf('http') === -1) {
					var ct = this.getResponseHeader('content-type');
					
					if (ct && ct.indexOf('xml') >= 0) {
						data = this.responseXML;
					} else {
						data = this.responseText;
					}
				}
				
				callback(data, this.statusText);
			}
		};
		xhr.open('GET', url, true);
		
		try {
			xhr.send(null);
		} catch (err) {
			callback(null, err.name + ': ' + err.message);
		}
	};
	
	/** 
	 * The "best" way to test if a value is an array or not.
	 *
	 * @param {Object} val value to test
	 * @return {boolean} true if the value is an array
	 */
	hemi.utils.isArray = Array.isArray || function(val) {
		return Object.prototype.toString.call(val) === '[object Array]';
	};
	
	/**
	 * Merge all of the properties of the given objects into the first object.
	 * If any of the objects have properties with the same name, the later
	 * properties will overwrite earlier ones. The exception to this is if both
	 * properties are objects or arrays and the merge is doing a deep copy. In
	 * that case, the properties will be merged recursively.
	 * 
	 * @param {Object} obj1 the first object which will receive all properties
	 * @param {Object} objN any number of objects to copy properties from
	 * @param {boolean} opt_deep optional flag to indicate if deep copying
	 *     should be performed (default is deep copying)
	 * @return {Object} the first object now merged with all other objects
	 */
	hemi.utils.join = function() {
		var target = arguments[0],
			il = arguments.length,
			lastArg = arguments[il - 1],
			deep = true;
		
		if (typeof lastArg === 'boolean') {
			deep = lastArg;
			--il;
		}
		
		for (var i = 1; i < il; i++) {
			var obj = arguments[i];
			
			for (var j in obj) {
				var src = obj[j];
				
				if (deep && src != null && typeof src === 'object') {
					var dest = target[j],
						srcArr = hemi.utils.isArray(src);
					
					if (dest == null || typeof dest !== 'object' || hemi.utils.isArray(dest) !== srcArr) {
						dest = srcArr ? [] : {};
					}
					
					target[j] = hemi.utils.join(dest, src);
				} else {
					target[j] = src;
				}
			}
		}
		
		return target;
	};
	
	/**
	 * A no-operation function for utility use.
	 */
	hemi.utils.noop = function() {};
	

	/**
	 * Calculate the cubic hermite interpolation between two points with
	 * associated tangents.
	 *
	 * @param {float} t time (between 0 and 1)
	 * @param {float[3]} p0 the first waypoint
	 * @param {float[3]} m0 the tangent through the first waypoint
	 * @param {float[3]} p1 the second waypoint
	 * @param {float[3]} m1 the tangent through the second waypoint
	 * @return {float[3]} the interpolated point
	 */
	hemi.utils.cubicHermite = function(t,p0,m0,p1,m1) {;
		var t2 = t*t,
			t3 = t2*t,
			tp0 = 2*t3 - 3*t2 + 1,
			tm0 = t3 - 2*t2 + t,
			tp1 = -2*t3 + 3*t2,
			tm1 = t3 - t2;
		
		return tp0*p0 + tm0*m0 + tp1*p1 + tm1*m1;
	};