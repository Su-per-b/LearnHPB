goog.provide('hemi.curve.Particle');
goog.require('hemi.curve');
goog.require('o3djs.math');

/**
	 * @class A Particle allows for the movement of a transform along a set of
	 * points.
	 * 
	 * @param {o3d.transform} trans The transform to move along the curve
	 * @param {number[][]} points The array of points to travel through
	 * @param {hemi.curve.colorKey[]} colorKeys Array of key-values for the 
	 *		color of the default material
	 * @param {hemi.curve.scaleKey[]} scaleKeys Array of key-values for the 
	 *		scale of the transform
	 * @param {boolean} rotate flag indicating if the transform should rotate as
	 *      it travels along the points
	 */
	hemi.curve.Particle = function(trans,points,colorKeys,scaleKeys,rotate) {
		//var pack = hemi.curve.pack,
		//var m4 = hemi.core.math.matrix4;
		var m4 = o3djs.math.matrix4;
		//var m4goog = o3djs.math.matrix4;
		
		this.shapeList = [];
		
		//this.transform = pack.createObject('Transform');
		//this.transform.parent = trans;
		this.frame = 1;
		this.lastFrame = points.length - 2;
		this.destroyed = false;
      //  this.transform.createParam('diffuse', 'ParamFloat4').value = [0,0,0,0];		
		this.lt = [];
		this.matrices = [];
		this.setColors(colorKeys);
		
		for (var i = this.frame; i <= this.lastFrame; i++) {
			var L = m4.translation(points[i]);
			
			if (rotate) {
				hemi.utils.pointYAt(L, points[i-1], points[i+1]);
			}
			
			this.lt[i] = L;
		}
		this.setScales(scaleKeys);
		this.ready = true;
		this.active = false;
	};
	
	hemi.curve.Particle.prototype = {
	
		/**
		 * Start this particle along the curve.
		 *
		 * @param {number} loops The number of loops to do
		 */
		run : function(loops) {
			this.loops = loops;
			this.ready = false;
			this.active = true;
		},
	
		/**
		 * Add a shape to the particle transform.
		 *
		 * @param {o3d.shape} shape The shape to add
		 */
		addShape : function(shape) {
			this.shapeList.push(shape);
			//this.transform.addShape(shape);
		},
		
		/**
		 * Remove all shapes from the particle transform.
		 */
		removeShapes : function() {
			for (var i = this.transform.shapes.length - 1; i >=0; i--) {
				this.transform.removeShape(this.transform.shapes[i]);
			}
		},
		
		/**
		 * Set the color gradient of this particle.
		 * @param {key[]} colorKeys Array of color key pairs
		 */
		setColors : function(colorKeys) {
			this.colors = [];
			if(colorKeys) {
				this.colorKeys = [];
				for (var i = 0; i < colorKeys.length; i++) {
					var p = {};
					var c = colorKeys[i];
					p.key = c.key;
					if (c.range) {
						p.value = [];
						if (typeof c.range == 'number') {
							var offset = (Math.random()-0.5)*2*c.range;
							for (var j = 0; j < c.value.length; j++) {
								p.value[j] = c.value[j] + offset;
							}
						} else {
							for (var j = 0; j < c.value.length; j++) {
								p.value[j] = c.value[j] + (Math.random()-0.5)*2*c.range[j];
							}
						}
					} else {
						p.value = c.value;
					}
					this.colorKeys[i] = p;
				}
			} else {
				this.colorKeys = [
					{key:0,value:[0,0,0,1]},
					{key:1,value:[0,0,0,1]}
					];
			}
			for (var i = 1; i <= this.lastFrame; i++) {		
				var time = (i-1)/(this.lastFrame-2);				
				this.colors[i] = this.lerpValue(time,this.colorKeys);			
			}
			return this;
		},
		
		/**
		 * Set the scale gradient of this particle.
		 * @param {key[]} scaleKeys Array of scale key pairs
		 */
		setScales : function(scaleKeys) {
			//var m4 = hemi.core.math.matrix4;
			var m4 = o3djs.math.matrix4;
			
			this.scales = [];
			if(scaleKeys) {
				var sKeys = [];
				for (i = 0; i < scaleKeys.length; i++) {
					var p = {};
					var c = scaleKeys[i];
					p.key = c.key;
					if (c.range) {
						p.value = [];
						if (typeof c.range == 'number') {
							var offset = (Math.random()-0.5)*2*c.range;
							for (var j = 0; j < c.value.length; j++) {
								p.value[j] = c.value[j] + offset;
							}
						} else {
							for (var j = 0; j < c.value.length; j++) {
								p.value[j] = c.value[j] + (Math.random()-0.5)*2*c.range[j];
							}
						}
					} else {
						p.value = c.value;
					}
					sKeys[i] = p;
				}
			} else {
				sKeys = [
					{key:0,value:[1,1,1]},
					{key:1,value:[1,1,1]}
				];
			}
			for (var i = 1; i <= this.lastFrame; i++) {
				var time = (i-1)/(this.lastFrame-2);
				this.scales[i] = this.lerpValue(time,sKeys);
				this.matrices[i] = m4.scale(hemi.utils.clone(this.lt[i]),
					this.scales[i]);
			}
			return this;
		},
	
		/**
		 * Translate the particle transform in local space.
		 *
		 * @param {number} x X translation
		 * @param {number} y Y translation
		 * @param {number} z Z translation
		 */
		translate : function(x,y,z) {
			this.transform.translate(x,y,z);
		},
		
		/**
		 * Given a set of key-values, return the interpolated value
		 *
		 * @param {number} time Time, from 0 to 1
		 * @param {hemi.curve.Key[]} keySet Array of key-value pairs
		 * @return {number[]} The interpolated value
		 */
		lerpValue : function(time,keySet) {
			var ndx = keySet.length - 2;
			while(keySet[ndx].key > time) {
				ndx--;
			}
			var t = (time - keySet[ndx].key)/(keySet[ndx+1].key - keySet[ndx].key);
			return o3djs.math.lerpVector(keySet[ndx].value,keySet[ndx+1].value,t);
		},
		
		/**
		 * Update the particle (called on each render).
		 */
		update : function() {
			if (!this.active) return;
			
			var f = this.frame;
			this.transform.getParam('diffuse').value = this.colors[f];
			this.transform.localMatrix = this.matrices[f];
			this.frame++;
			this.transform.visible = true;
			
			if (this.frame >= this.lastFrame) {
				this.frame = 1;
				this.loops--;
				if (this.loops === 0) this.reset();
			}
		},
		
		/**
		 * Destroy this particle and all references to it.
		 */
		destroy : function() {
			if(this.destroyed) return;
			var t = this.transform;
			for(var i = (t.shapes.length-1); i >= 0; i--) {
				t.removeShape(t.shapes[i]);
			}
			hemi.curve.pack.removeObject(t);
			this.transform = null;
			this.curve = null;
			this.destroyed = true;
		},
		
		/**
		 * Reset this particle.
		 */
		reset : function() {
			this.transform.visible = false;
			this.loops = this.totalLoops;
			this.destroyed = false;
			this.active = false;
			this.ready = true;
		}
	
	};