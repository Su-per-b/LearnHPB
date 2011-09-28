goog.provide('hemi.curve.ParticleSystem');
goog.require('hemi.curve.Curve');
goog.require('hemi.curve');
goog.require('hemi.curve.Particle');


	/**
	 * @class A ParticleSystem manages a set of Particle objects, and fires
	 * them at the appropriate intervals.
	 * 
	 * @param {hemi.config} config Configuration object describing this system
	 */
	hemi.curve.ParticleSystem = function(config) {
		//var pack = hemi.curve.pack;
		//var view = hemi.view.viewInfo;
		
		//this.transform = pack.createObject('Transform');
		//this.transform.parent = config.parent || hemi.core.client.root;
		this.active = false;
		this.pLife = config.life || 5;
		this.boxes = config.boxes;
		this.maxParticles = config.particleCount || 25;
		this.maxRate = Math.ceil(this.maxParticles / this.pLife);
		this.particles = [];
		this.pRate = this.maxRate;
		this.pTimer = 0.0;
		this.pTimerMax = 1.0 / this.pRate;
		this.pIndex = 0;
			
		var shapeColor = [1,0,0,1];
		
		/*this.shapeMaterial = o3djs.material.createBasicMaterial(pack,view,shapeColor,true);
		
		var param = this.shapeMaterial.getParam('lightWorldPos'); 
		if(param) {
			param.bind(hemi.world.camera.light.position);
		}
		*/
		
		
		var type = config.particleShape || hemi.curve.ShapeType.CUBE,
			size = config.particleSize || 1;
		this.shapes = [];
		this.size = size;
		

		var geometry = new THREE.SphereGeometry(100, 14, 8);
		//this.material = this.material || hemi.curve.newMaterial();
		
		this.material = new THREE.MeshPhongMaterial
			( 
				{ 
					ambient: 0x030303, 
					color: 0x030303, 
					specular: 0x990000, 
					shininess: 30 } 
			);
		
		
		var sphere = new THREE.Mesh(
			geometry,
			this.material
		);
		
		
		this.shapes.push(sphere);
		
		//hemi.view.addRenderListener(this);
		//this.listen(lgb.event.RenderEvent, this.onRender)

		this.boxesOn = false;
		
		this.points = [];
		this.frames = config.frames || this.pLife * 30;
		
		for(j = 0; j < this.maxParticles; j++) {
			var curve = this.newCurve(config.tension || 0);
			this.points[j] = [];
			for(i=0; i < this.frames; i++) {
				
				var percentageDec = (i)/this.frames;
				var newPointAlongCurve = curve.interpolate(percentageDec);
				this.points[j][i] = newPointAlongCurve;
			}
		}
		
		var colorKeys = null,
			scaleKeys = null;
		
		if (config.colorKeys) {
			colorKeys = config.colorKeys;
		} else if (config.colors) {
			var len = config.colors.length,
				step = len === 1 ? 1 : 1 / (len - 1),
			
			colorKeys = [];
			
			for (var i = 0; i < len; i++) {
				colorKeys.push({
					key: i * step,
					value: config.colors[i]
				});
			}
		}
		if (config.scaleKeys) {
			scaleKeys = config.scaleKeys;
		} else if (config.scales) {
			var len = config.scales.length,
				step = len === 1 ? 1 : 1 / (len - 1),
			
			scaleKeys = [];
			
			for (var i = 0; i < len; i++) {
				scaleKeys.push({
					key: i * step,
					value: config.scales[i]
				});
			}
		}
		
		for (i = 0; i < this.maxParticles; i++) {
			this.particles[i] = new hemi.curve.Particle(
				this.transform,
				this.points[i],
				colorKeys,
				scaleKeys,
				config.aim);
			for (var j = 0; j < this.shapes.length; j++) {
				this.particles[i].addShape(this.shapes[j]);
			}
		}
		
		var eventType = lgb.event.RenderEvent.TYPE;
		var delegate = jQuery.proxy( this.onRender, this );
	
		
		goog.events.listen (
			lgb.globalEventBus, 
			eventType, 
			delegate);
		
	};
	
	hemi.curve.ParticleSystem.prototype = {
		
		/**
		 * Start the system.
		 */
		start : function() {
			this.active = true;
			
		},
		
		/**
		 * Stop the system.
		 *
		 * @param {boolean} opt_hard If true, remove all particles immediately. Otherwise,
		 *		stop emitting but let existing particles finish.
		 */
		stop : function(opt_hard) {
			this.active = false;
			if(opt_hard) {
				// Destroy All Particles
				for(i = 0; i < this.maxParticles; i++) {
					if(this.particles[i] != null) {
						this.particles[i].reset();
					}
				}
			}
		},
		
		/**
		 * Function performed on each render. Update all existing particles, and emit
		 * 		new ones if needed.
		 *
		 * @param {o3d.RenderEvent} event Event object describing details of the render loop
		 */
		onRender : function(event) {
			for(i = 0; i < this.maxParticles; i++) {
				if(this.particles[i] != null) {
					this.particles[i].update(event);
				}
			}
			
			if(!this.active) return;
			this.pTimer += event.elapsedTime;
			if(this.pTimer >= this.pTimerMax) {
				this.pTimer = 0;
				var p = this.particles[this.pIndex];
				if (p.ready) p.run(1);
				this.pIndex++;
				if(this.pIndex >= this.maxParticles) this.pIndex = 0;
			}
		},
		
		/**
		 * Generate a new curve running through the system's bounding boxes.
		 * 
		 * @param {number} tension tension parameter for the curve
		 * @return {hemi.curve.Curve} The randomly generated Curve object.
		 */
		newCurve : function(tension) {
			var points = [];
			var num = this.boxes.length;
			for (i = 0; i < num; i++) {
				var min = this.boxes[i][0];
				var max = this.boxes[i][1];
				points[i+1] = hemi.curve.randomPoint(min,max);
			}
			points[0] = points[1].slice(0,3);
			points[num+1] = points[num].slice(0,3);
			var curve = new hemi.curve.Curve(points,
				hemi.curve.curveType.Cardinal, {tension: tension});
			return curve;
		},
		
		/**
		 * Remove all shapes from all particles in the system.
		 */
		removeShapes : function() {
			for (var i = 0; i < this.maxParticles; i++) {
				this.particles[i].removeShapes();
			}
			this.shapes = [];
		},
		
		/**
		 * Add a shape which will be added to the transform of every particle.
		 *
		 * @param {number|o3d.shape} shape Either an enum for standard shapes, or a custom
		 * 		predefined shape to add
		 */
		addShape : function(shape) {
			var pack = hemi.curve.pack;
			var startndx = this.shapes.length;
			if (typeof shape == 'string') {
				var size = this.size;
				
				switch (shape) {
					case (hemi.curve.ShapeType.ARROW):
						var halfSize = size / 2;
						this.shapes.push(hemi.core.primitives.createPrism(pack, this.shapeMaterial,
							[[0, size], [-size, 0], [-halfSize, 0], [-halfSize, -size],
							[halfSize, -size], [halfSize, 0], [size, 0]], size));
						break;
					case (hemi.curve.ShapeType.SPHERE):
						this.shapes.push(hemi.core.primitives.createSphere(pack,
							this.shapeMaterial,size,24,12));
						break;
					case (hemi.curve.ShapeType.CUBE):
						this.shapes.push(hemi.core.primitives.createCube(pack,
							this.shapeMaterial,size));
						break;
				}
			} else {
				this.shapes.push(shape);
			}
			for (i = 0; i < this.maxParticles; i++) {
				for (var j = startndx; j < this.shapes.length; j++) {
					this.particles[i].addShape(this.shapes[j]);
				}
			}
		},
		
		/**
		 * Change the rate at which particles are emitted.
		 *
		 * @param {number} delta The delta by which to change the rate
		 * @return {number} The new rate
		 */
		changeRate : function(delta) {
			return this.setRate(this.pRate + delta);
		},
		
		/**
		 * Set the emit rate of the system.
		 *
		 * @param (number) rate The rate at which to emit particles
		 * @return (number) The new rate - may be different because of bounds
		 */
		setRate : function(rate) {
			var newRate = hemi.utils.clamp(rate, 0, this.maxRate);
			
			if (newRate === 0) {
				this.pTimerMax = 0;
				this.stop();
			} else {
				if (this.pRate === 0 && newRate > 0) {
					this.start();
				}
				this.pTimerMax = 1.0 / newRate;
			}
			
			this.pRate = newRate;
			return newRate;
		},
		
		/**
		 * Set the color gradient for this particle system.
		 * @param {key[]} colorKeys Array of color key pairs
		 * @return {hemi.curve.ParticleSystem} This system, for chaining
		 */
		setColors : function(colorKeys) {
			for (var i = 0; i < this.maxParticles; i++) {
				this.particles[i].setColors(colorKeys);
			}
			return this;
		},

		/**
		 * Set the scale gradient for this particle system.
		 * @param {key[]} scaleKeys Array of scale key pairs
		 * @return {hemi.curve.ParticleSystem} This system, for chaining
		 */		
		setScales : function(scaleKeys) {
			for (var i = 0; i < this.maxParticles; i++) {
				this.particles[i].setScales(scaleKeys);
			}
			return this;
		},
		
		/**
		 * Render the bounding boxes which the particle system's curves run
		 * through (helpful for debugging).
		 */
		showBoxes : function() {
			hemi.curve.showBoxes(this.boxes, this.transform);
		},
	
		/**
		 * Hide the particle system's bounding boxes from view.
		 */
		hideBoxes : function() {
			hemi.curve.hideBoxes(this.transform);
		},
		
		/**
		 * Translate the entire particle system by the given amounts
		 * @param {number} x amount to translate in the X direction
		 * @param {number} y amount to translate in the Y direction
		 * @param {number} z amount to translate in the Z direction
		 */
		translate: function(x, y, z) {
			this.transform.translate(x, y, z);
		}
	};