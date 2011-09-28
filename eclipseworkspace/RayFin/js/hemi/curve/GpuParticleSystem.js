goog.provide('hemi.curve.GpuParticleSystem');


//goog.require('goog.events.EventTarget');
goog.require('hemi.utils');
goog.require('hemi.curve');

	
	/**
	 * A particle system that is GPU driven.
	 * 
	 * @param {Object} opt_cfg optional configuration object for the system
	 */
	hemi.curve.GpuParticleSystem = function(opt_cfg) {
		//hemi.world.Citizen.call(this);
		
		this.active = false;
		this.aim = false;
		this.boxes = [];
		this.colors = [];
		this.decParam = null;
		this.life = 0;
		this.material = null;
		this.materialSrc = null;
		this.maxTimeParam = null;
		this.particles = 0;
		this.ptcShape = 0;
		this.scales = [];
		this.size = 0;
		this.tension = 0;
		this.texNdx = -1;
		this.timeParam = null;
		this.transform = null;
		
		if (opt_cfg) {
			this.loadConfig(opt_cfg);
		}
	};
	
	/**
	 * Send a cleanup Message and remove all references in the GpuParticleSystem.
	 */
	hemi.curve.GpuParticleSystem.prototype.cleanup = function() {
			hemi.world.Citizen.prototype.cleanup.call(this);
	}
	
	/**
	 * Hide the particle system's bounding boxes from view.
	 */
	hemi.curve.GpuParticleSystem.prototype.hideBoxes = function() {
			hemi.curve.hideBoxes(this.transform);
	}
	
	hemi.curve.GpuParticleSystem.prototype.citizenType = 'hemi.curve.GpuParticleSystem';
	
		
	/**
	 * Load the given configuration object and set up the GpuParticleSystem.
	 * 
	 * @param {Object} cfg configuration object
	 */
	hemi.curve.GpuParticleSystem.prototype.loadConfig = function(cfg) {

			this.aim = cfg.aim == null ? false : cfg.aim;
			this.boxes = cfg.boxes ? hemi.utils.clone(cfg.boxes) : [];
			this.life = cfg.life || 5;
			this.particles = cfg.particleCount || 1;
			this.size = cfg.particleSize || 1;
			this.tension = cfg.tension || 0;
			
			if (cfg.colorKeys) {
				this.setColorKeys(cfg.colorKeys);
			} else if (cfg.colors) {
				this.setColors(cfg.colors);
			} else {
				this.colors = [];
			}
			
			if (cfg.scaleKeys) {
				this.setScaleKeys(cfg.scaleKeys);
			} else if (cfg.scales) {
				this.setScales(cfg.scales);
			} else {
				this.scales = [];
			}
			
			this.setMaterial(hemi.utils.newMaterial());
			this.setParticleShape(cfg.particleShape || hemi.curve.ShapeType.CUBE);
	}


	
	/**
	 * Update the particles on each render.
	 * 
	 * @param {o3d.RenderEvent} e the render event
	 */
	hemi.curve.GpuParticleSystem.prototype.onRender = function() {
			var delta = e.elapsedTime / this.life,
				newTime = this.timeParam.value + delta;
			
			while (newTime > 1.0) {
				--newTime;
			}
			
			this.timeParam.value = newTime;
	}
	
	/**
	 * Pause the particle system.
	 */
	hemi.curve.GpuParticleSystem.prototype.pause = function() {
			if (this.active) {
				hemi.view.removeRenderListener(this);
				this.active = false;
			}
	}
	
	/**
	 * Resume the particle system.
	 */
	hemi.curve.GpuParticleSystem.prototype.play = function() {
		if (!this.active) {
			if (this.maxTimeParam.value === 1.0) {
				hemi.view.addRenderListener(this);
				this.active = true;
			} else {
				this.start();
			}
		}
	}
	
	/**
	 * Set whether or not particles should orient themselves along the curve
	 * they are following.
	 * 
	 * @param {boolean} aim flag indicating if particles should aim
	 */
	hemi.curve.GpuParticleSystem.prototype.setAim = function() {
			if (this.aim !== aim) {
				this.aim = aim;
				this.setupShaders();
			}
	}
	
	/**
	 * Set the bounding boxes that define waypoints for the particle
	 * system's curves.
	 * 
	 * @param {number[3][2][]} boxes array of pairs of XYZ coordinates, the
	 *     first as minimum values and the second as maximum
	 */
	hemi.curve.GpuParticleSystem.prototype.setBoxes = function() {
		var oldLength = this.boxes.length;
		this.boxes = hemi.utils.clone(boxes);
		
		if (this.boxes.length === oldLength) {
			setupBounds(this.material, this.boxes);
		} else {
			this.setupShaders();
		}
	}
	
	/**
	 * Set the color ramp for the particles as they travel along the curve.
	 * 
	 * @param {number[4][]} colors array of RGBA color values
	 */
	hemi.curve.GpuParticleSystem.prototype.setColors = function(colors) {
			var len = colors.length,
				step = len === 1 ? 1 : 1 / (len - 1),
				colorKeys = [];
			
			for (var i = 0; i < len; i++) {
				colorKeys.push({
					key: i * step,
					value: colors[i]
				});
			}
			
			this.setColorKeys(colorKeys);
	}
	
	/**
	 * Set the color ramp for the particles as they travel along the curve,
	 * specifying the interpolation times for each color. Each entry in the
	 * given array should be of the form:
	 * {
	 *   key: number between 0 and 1 indicating time key for color
	 *   value: RGBA array indicating the color value
	 * }
	 * 
	 * @param {Object[]} colorKeys array of color key objects, sorted into
	 *     ascending key order
	 */
	hemi.curve.GpuParticleSystem.prototype.setColorKeys = function(colorKeys) {
			var len = colorKeys.length;
			
			if (len === 1) {
				// We need at least two to interpolate
				var clr = colorKeys[0].value;
				this.colors = [{
					key: 0,
					value: clr
				}, {
					key: 1,
					value: clr
				}];
			} else if (len > 1) {
				// Just make sure the keys run from 0 to 1
				colorKeys[0].key = 0;
				colorKeys[colorKeys.length - 1].key = 1;
				this.colors = colorKeys;
			} else {
				this.colors = [];
			}
			
			this.setupShaders();
	}
	
	/**
	 * Set the lifetime of the particle system.
	 * 
	 * @param {number} life the lifetime of the system in seconds
	 */
	hemi.curve.GpuParticleSystem.prototype.setLife = function() {
			if (life > 0) {
				this.life = life;
			}
	}
		
	/**
	 * Set the material to use for the particles. Note that the material's
	 * shader will be modified for the particle system.
	 * 
	 * @param {o3d.Material} material the material to use for particles
	 */
	hemi.curve.GpuParticleSystem.prototype.setMaterial = function(material) {
			var shads = hemi.utils.getShaders();
			
			this.material = material;
			
			this.materialSrc = {
				frag: shads.fragSrc,
				vert: shads.vertSrc
			};
			
			this.setupShaders();
			
			/*

			
			*/
	}
	
	
	
	/**
	 * Set the total number of particles for the system to create.
	 *  
	 * @param {number} numPtcs number of particles
	 */
	hemi.curve.GpuParticleSystem.prototype.setParticleCount = function() {
			this.particles = numPtcs;
			
			if (this.ptcShape) {
				// Recreate the custom vertex buffers
				this.setParticleShape(this.ptcShape);
			}
	}
	
	/**
	 * Set the size of each individual particle. For example, this would be
	 * the radius if the particles are spheres.
	 * 
	 * @param {number} size size of the particles
	 */
	hemi.curve.GpuParticleSystem.prototype.setParticleSize = function() {
			this.size = size;
			
			if (this.ptcShape) {
				// Recreate the custom vertex buffers
				this.setParticleShape(this.ptcShape);
			}
	}
	
	/**
	 * Set the shape of the particles to one of the predefined shapes. This
	 * may take some time as a new vertex buffer gets created.
	 * 
	 * @param {hemi.curve.ShapeType} type the type of shape to use
	 */
	hemi.curve.GpuParticleSystem.prototype.setParticleShape = function(type) {

			this.ptcShape = type;
			
			if (this.transform) {
				this.transform.parent = null;
				hemi.shape.pack.removeObject(this.transform.shapes[0]);
				hemi.shape.pack.removeObject(this.transform);
				this.transform = null;
			}
			
			this.material = this.material || hemi.curve.newMaterial();
			this.particles = this.particles || 1;
			
			switch (type) {

				case hemi.curve.ShapeType.SPHERE:
				
					this.transform = hemi.shape.create({
						shape: 'sphere',
						mat: this.material,
						radius: this.size });
						
				/*

					
						
						
					this.transform = o3djs.primitives.createSphere(
						{
							
						}
					)
					*/
					
					var geometry = new THREE.SphereGeometry(100, 14, 8);

					var sphere = new THREE.Mesh(
						geometry,
						this.material
					);
					
					//sphere.overdraw = false;
					sphere.doubleSided = true;


					break;

			}
			
			
			var shape = this.transform.shapes[0],
			elements = shape.elements;
			
			for (var i = 0, il = elements.length; i < il; i++) {
				var element = elements[i];
				
				if (element.className === 'Primitive') {
					this.texNdx = modifyPrimitive(sphere, this.particles);
				}
			}
			
			
			this.setupShaders();
	}
	
	/**
	 * Set the scale ramp for the particles as they travel along the curve.
	 * 
	 * @param {number[3][]} scales array of XYZ scale values
	 */
	hemi.curve.GpuParticleSystem.prototype.setScales = function(scales) {
			var len = scales.length,
				step = len === 1 ? 1 : 1 / (len - 1),
				scaleKeys = [];
			
			for (var i = 0; i < len; i++) {
				scaleKeys.push({
					key: i * step,
					value: scales[i]
				});
			}
			
			this.setScaleKeys(scaleKeys);
	}
	
	/**
	 * Set the scale ramp for the particles as they travel along the curve,
	 * specifying the interpolation times for each scale. Each entry in the
	 * given array should be of the form:
	 * {
	 *   key: number between 0 and 1 indicating time key for scale
	 *   value: XYZ array indicating the scale value
	 * }
	 * 
	 * @param {Object[]} scaleKeys array of scale key objects, sorted into
	 *     ascending key order
	 */
	hemi.curve.GpuParticleSystem.prototype.setScaleKeys = function(scaleKeys) {
			var len = scaleKeys.length;
			
			if (len === 1) {
				// We need at least two to interpolate
				var scl = scaleKeys[0].value;
				this.scales = [{
					key: 0,
					value: scl
				}, {
					key: 1,
					value: scl
				}];
			} else if (len > 1) {
				// Just make sure the keys run from 0 to 1
				scaleKeys[0].key = 0;
				scaleKeys[len - 1].key = 1;
				this.scales = scaleKeys;
			} else {
				this.scales = [];
			}
			
			this.setupShaders();
	}
	
	/**
	 * Set the tension parameter for the curve. This controls how round or
	 * straight the curve sections are.
	 * 
	 * @param {number} tension tension value (typically from -1 to 1)
	 */
	hemi.curve.GpuParticleSystem.prototype.setTension = function(tension) {
			this.tension = tension;
			
			if (this.material) {
				this.material.getParam('tension').value = (1 - this.tension) / 2;
			}
	}
	
	/**
	 * Modify the particle material's shaders so that the particle system
	 * can be rendered using its current configuration. At a minimum, the
	 * material, custom texture index, and curve boxes need to be defined.
	 */
	hemi.curve.GpuParticleSystem.prototype.setupShaders = function() {
if (!this.material || !this.materialSrc || this.texNdx === -1 || this.boxes.length < 2) {
				return;
			}
			
			var material = this.material,
				fragSrc = this.materialSrc.frag,
				vertSrc = this.materialSrc.vert,
				numBoxes = this.boxes.length,
				numColors = this.colors.length,
				numScales = this.scales.length,
				texNdx = this.texNdx,
				addColors = numColors > 1,
				addScale = numScales > 1,
				shads = hemi.utils.getShaders(material),
				fragShd = shads.fragShd,
				vertShd = shads.vertShd,
				dec = 1.0,
				maxTime = 3.0,
				time = 1.1,
				uniforms = ['sysTime', 'ptcMaxTime', 'ptcDec', 'numPtcs',
					'tension', 'ptcScales', 'ptcScaleKeys', 'minXYZ', 'maxXYZ',
					'ptcColors', 'ptcColorKeys'];
			
			// Remove any previously existing uniforms that we created
			for (var i = 0, il = uniforms.length; i < il; i++) {
				var name = uniforms[i],
					param = material.getParam(name);
				
				if (param) {
					if (name === 'ptcDec') {
						dec = param.value;
					} else if (name === 'ptcMaxTime') {
						maxTime = param.value;
					} else if (name === 'sysTime') {
						time = param.value;
					}
					
					material.removeParam(param);
				}
			}
			
			// modify the vertex shader
			if (vertSrc.search('ptcInterp') < 0) {
				var vertHdr = hemi.curve.vertHeader.replace(/NUM_BOXES/g, numBoxes),
					vertSprt = hemi.curve.vertSupport,
					vertPreBody = hemi.curve.vertBodySetup.replace(/NUM_BOXES/g, numBoxes);
				
				vertHdr = vertHdr.replace(/TEXCOORD/g, 'texCoord' + texNdx);
				vertPreBody = vertPreBody.replace(/TEXCOORD/g, 'texCoord' + texNdx);
				
				if (addColors) {
					vertHdr += hemi.curve.vertHeaderColors.replace(/NUM_COLORS/g, numColors);
					vertSprt += hemi.curve.vertSupportColors.replace(/NUM_COLORS/g, numColors);
				} else {
					vertSprt += hemi.curve.vertSupportNoColors;
				}
				
				if (this.aim) {
					vertSprt += hemi.curve.vertSupportAim;
					vertPreBody += hemi.curve.vertBodyAim;
				} else {
					vertPreBody += hemi.curve.vertBodyNoAim;
				}
				
				if (addScale) {
					vertHdr += hemi.curve.vertHeaderScales.replace(/NUM_SCALES/g, numScales);
					vertSprt += hemi.curve.vertSupportScale.replace(/NUM_SCALES/g, numScales);
					vertPreBody += hemi.curve.vertBodyScale;
				} else {
					vertPreBody += hemi.curve.vertBodyNoScale;
				}
				
				vertPreBody += hemi.curve.vertBodyEnd;
				var parsedVert = hemi.utils.parseSrc(vertSrc, 'gl_Position'),
					vertBody = parsedVert.body.replace(/world/g, 'ptcWorld')
						.replace(/ViewProjection/g, 'VP')
						.replace(/InverseTranspose/g, 'IT');
				
				parsedVert.postHdr = vertHdr;
				parsedVert.postSprt = vertSprt;
				parsedVert.postHdr = vertHdr;
				parsedVert.preBody = vertPreBody;
				parsedVert.body = vertBody;
				vertSrc = hemi.utils.buildSrc(parsedVert);
				
				material.gl.detachShader(material.effect.program_, vertShd);
				material.effect.loadVertexShaderFromString(vertSrc);
			}
			
			// modify the fragment shader
			if (fragSrc.search('ptcColor') < 0) {
				var parsedFrag = hemi.utils.parseSrc(fragSrc, 'gl_FragColor'),
					fragGlob = parsedFrag.glob;
				
				parsedFrag.postHdr = hemi.curve.fragHeader;
				parsedFrag.preBody = hemi.curve.fragPreBody;
				
				if (addColors) {
					if (fragGlob.indexOf('diffuse') !== -1) {
						parsedFrag.glob = fragGlob.replace(/diffuse/g, 'ptcColor');
					} else {
						parsedFrag.glob = fragGlob.replace(/emissive/g, 'ptcColor');
					}
				} else {
					parsedFrag.postGlob = hemi.curve.fragGlobNoColors;
				}
				
				fragSrc = hemi.utils.buildSrc(parsedFrag);
				material.gl.detachShader(material.effect.program_, fragShd);
				material.effect.loadPixelShaderFromString(fragSrc);
			}
			
			material.effect.createUniformParameters(material);
			
			// Setup params
			material.getParam('numPtcs').value = this.particles;
			material.getParam('tension').value = (1 - this.tension) / 2;
			this.decParam = material.getParam('ptcDec');
			this.maxTimeParam = material.getParam('ptcMaxTime');
			this.timeParam = material.getParam('sysTime');
			this.decParam.value = dec;
			this.maxTimeParam.value = maxTime;
			this.timeParam.value = time;
			setupBounds(material, this.boxes);
			
			var needsZ = false,
				hvv = hemi.view.viewInfo;
			
			for (var i = 0; i < numColors && !needsZ; i++) {
				needsZ = this.colors[i].value[3] < 1;
			}
			
			material.drawList = needsZ ? hvv.zOrderedDrawList : hvv.performanceDrawList;
			
			if (addColors) {
				setupColors(material, this.colors);
			}
			if (addScale) {
				setupScales(material, this.scales);
			}
	}
	

	
	/**
	 * Start the particle system.
	 */
	hemi.curve.GpuParticleSystem.prototype.start = function() {
			if (!this.active) {
				this.active = true;
				this.timeParam.value = 1.0;
				this.maxTimeParam.value = 1.0;
				hemi.view.addRenderListener(this);
			}
	}
	
	/**
	 * Stop the particle system.
	 */
	hemi.curve.GpuParticleSystem.prototype.stop = function() {
			if (this.active) {
				this.active = false;
				this.timeParam.value = 1.1;
				this.maxTimeParam.value = 3.0;
				hemi.view.removeRenderListener(this);
			}
	}
	
	hemi.curve.GpuParticleSystem.prototype.toOctane = function() {
		//not implemented
	}
	
	/**
	 * Translate the entire particle system by the given amounts
	 * @param {number} x amount to translate in the X direction
	 * @param {number} y amount to translate in the Y direction
	 * @param {number} z amount to translate in the Z direction
	 */
	hemi.curve.GpuParticleSystem.prototype.translate = function(x, y, z) {
			for (var i = 0, il = this.boxes.length; i < il; i++) {
				var box = this.boxes[i],
					min = box[0],
					max = box[1];
				
				min[0] += x;
				max[0] += x;
				min[1] += y;
				max[1] += y;
				min[2] += z;
				max[2] += z;
			}
			setupBounds(this.material, this.boxes);
	}
	
/*
	 * Set the parameters for the given Material so that it supports a curve
	 * through the given bounding boxes.
	 * 
	 * @param {o3d.Material} material material to set parameters for
	 * @param {number[3][2][]} boxes array of min and max XYZ coordinates
	 */
	var setupBounds = function(material, boxes) {
		/*
		var minParam = material.getParam('minXYZ'),
			maxParam = material.getParam('maxXYZ'),
			minArr = hemi.curve.pack.createObject('ParamArray'),
			maxArr = hemi.curve.pack.createObject('ParamArray');
		
		minArr.resize(boxes.length, 'ParamFloat3');
		maxArr.resize(boxes.length, 'ParamFloat3');
		
		for (var i = 0, il = boxes.length; i < il; ++i) {
			var box = boxes[i];
			minArr.getParam(i).value = box[0];
			maxArr.getParam(i).value = box[1];
		}
		
		minParam.value = minArr;
		maxParam.value = maxArr;
		*/
	};
	
	/*
	 * Set the parameters for the given Material so that it adds a color ramp to
	 * the particles using it.
	 * 
	 * @param {o3d.Material} material material to set parameters for
	 * @param {Object[]} colors array of RGBA color values and keys
	 */
	var setupColors = function(material, colors) {
		var clrParam = material.getParam('ptcColors'),
			keyParam = material.getParam('ptcColorKeys'),
			clrArr = hemi.curve.pack.createObject('ParamArray'),
			keyArr = hemi.curve.pack.createObject('ParamArray');
		
		clrArr.resize(colors.length, 'ParamFloat4');
		keyArr.resize(colors.length, 'ParamFloat');
		
		for (var i = 0, il = colors.length; i < il; ++i) {
			clrArr.getParam(i).value = colors[i].value;
			keyArr.getParam(i).value = colors[i].key;
		}
		
		clrParam.value = clrArr;
		keyParam.value = keyArr;
	};
	
	/*
	 * Set the parameters for the given Material so that it adds a scale ramp to
	 * the particles using it.
	 * 
	 * @param {o3d.Material} material material to set parameters for
	 * @param {Object[]} scales array of XYZ scale values and keys
	 */
	var setupScales = function(material, scales) {
		var sclParam = material.getParam('ptcScales'),
			keyParam = material.getParam('ptcScaleKeys'),
			sclArr = hemi.curve.pack.createObject('ParamArray'),
			keyArr = hemi.curve.pack.createObject('ParamArray');
		
		sclArr.resize(scales.length, 'ParamFloat3');
		keyArr.resize(scales.length, 'ParamFloat');
		
		for (var i = 0, il = scales.length; i < il; ++i) {
			sclArr.getParam(i).value = scales[i].value;
			keyArr.getParam(i).value = scales[i].key;
		}
		
		sclParam.value = sclArr;
		keyParam.value = keyArr;
	};

	/*
	 * Take the existing vertex buffer in the given primitive and copy the data
	 * once for each of the desired number of particles. Add a texture
	 * coordinate stream to feed particle id/offset data through.
	 * 
	 * @param {o3d.Primitive} primitive the primitive to modify
	 * @param {number} numParticles the number of particles to create vertex
	 *     data for
	 * @return {number} the id of the created texture coordinate stream
	 */
	var modifyPrimitive = function(mesh, numParticles) {
		
		
		var TEXCOORD = hemi.core.o3d.Stream.TEXCOORD,
			indexBuffer = primitive.indexBuffer,
			streamBank = primitive.streamBank,
			streams = streamBank.vertexStreams,
			numVerts = streams[0].getMaxVertices_(),
			vertexBuffer = streams[0].field.buffer,
			origStreams = [],
			idOffNdx = -1,
			idOffStream;
		
		// Create progress task for this
		var taskName = 'GpuParticles',
			taskDiv = numParticles / 3,
			taskInc = 0,
			taskProg = 10;
		
		hemi.loader.createTask(taskName, vertexBuffer);
		
		// Find the first unused texture coordinate stream and create it
		do {
			idOffStream = streamBank.getVertexStream(TEXCOORD, ++idOffNdx);
		} while (idOffStream !== null);
		
		var idOffsetField = vertexBuffer.createField('FloatField', 2);
		streamBank.setVertexStream(TEXCOORD, idOffNdx, idOffsetField, 0);
		
		// Copy the contents of all of the existing vertex streams
		for (var i = 0, il = streams.length; i < il; i++) {
			var stream = streams[i];
			
			origStreams.push({
				stream: stream,
				vals: stream.field.getAt(0, numVerts)
			});
		}
		
		vertexBuffer.allocateElements(numVerts * numParticles);
		hemi.loader.updateTask(taskName, taskProg);
		
		// Create a copy of each stream's contents for each particle
		var indexArr = indexBuffer.array_,
			newIndexArr = [];
		
		for (var i = 0; i < numParticles; i++) {
			// Index buffer entry
			var vertOffset = i * numVerts,
				timeOffset = i / numParticles;
			
			for (var j = 0, jl = indexArr.length; j < jl; j++) {
				newIndexArr.push(indexArr[j] + vertOffset);
			}
			// Original vertex data
			for (var j = 0, jl = origStreams.length; j < jl; j++) {
				var obj = origStreams[j],
					vals = obj.vals,
					field = obj.stream.field;
				
				field.setAt(vertOffset, vals);
			}
			// New "particle system" vertex data
			for (var j = 0; j < numVerts; j++) {
				idOffsetField.setAt(vertOffset + j, [i, timeOffset]);
			}
			
			if (++taskInc >= taskDiv) {
				taskInc = 0;
				taskProg += 30;
				hemi.loader.updateTask(taskName, taskProg);
			}
		}
		
		indexBuffer.set(newIndexArr);
		// Update the primitive and vertex counts
		primitive.numberPrimitives *= numParticles;
  		primitive.numberVertices *= numParticles;
		hemi.loader.updateTask(taskName, 100);
		return idOffNdx;
	};
	
	
	/*
	 * Take the existing vertex buffer in the given primitive and copy the data
	 * once for each of the desired number of particles. Add a texture
	 * coordinate stream to feed particle id/offset data through.
	 * 
	 * @param {o3d.Primitive} primitive the primitive to modify
	 * @param {number} numParticles the number of particles to create vertex
	 *     data for
	 * @return {number} the id of the created texture coordinate stream
	 */
	var modifyPrimitiveBak = function(primitive, numParticles) {
		var TEXCOORD = hemi.core.o3d.Stream.TEXCOORD,
			indexBuffer = primitive.indexBuffer,
			streamBank = primitive.streamBank,
			streams = streamBank.vertexStreams,
			numVerts = streams[0].getMaxVertices_(),
			vertexBuffer = streams[0].field.buffer,
			origStreams = [],
			idOffNdx = -1,
			idOffStream;
		
		// Create progress task for this
		var taskName = 'GpuParticles',
			taskDiv = numParticles / 3,
			taskInc = 0,
			taskProg = 10;
		
		hemi.loader.createTask(taskName, vertexBuffer);
		
		// Find the first unused texture coordinate stream and create it
		do {
			idOffStream = streamBank.getVertexStream(TEXCOORD, ++idOffNdx);
		} while (idOffStream !== null);
		
		var idOffsetField = vertexBuffer.createField('FloatField', 2);
		streamBank.setVertexStream(TEXCOORD, idOffNdx, idOffsetField, 0);
		
		// Copy the contents of all of the existing vertex streams
		for (var i = 0, il = streams.length; i < il; i++) {
			var stream = streams[i];
			
			origStreams.push({
				stream: stream,
				vals: stream.field.getAt(0, numVerts)
			});
		}
		
		vertexBuffer.allocateElements(numVerts * numParticles);
		hemi.loader.updateTask(taskName, taskProg);
		
		// Create a copy of each stream's contents for each particle
		var indexArr = indexBuffer.array_,
			newIndexArr = [];
		
		for (var i = 0; i < numParticles; i++) {
			// Index buffer entry
			var vertOffset = i * numVerts,
				timeOffset = i / numParticles;
			
			for (var j = 0, jl = indexArr.length; j < jl; j++) {
				newIndexArr.push(indexArr[j] + vertOffset);
			}
			// Original vertex data
			for (var j = 0, jl = origStreams.length; j < jl; j++) {
				var obj = origStreams[j],
					vals = obj.vals,
					field = obj.stream.field;
				
				field.setAt(vertOffset, vals);
			}
			// New "particle system" vertex data
			for (var j = 0; j < numVerts; j++) {
				idOffsetField.setAt(vertOffset + j, [i, timeOffset]);
			}
			
			if (++taskInc >= taskDiv) {
				taskInc = 0;
				taskProg += 30;
				hemi.loader.updateTask(taskName, taskProg);
			}
		}
		
		indexBuffer.set(newIndexArr);
		// Update the primitive and vertex counts
		primitive.numberPrimitives *= numParticles;
  		primitive.numberVertices *= numParticles;
		hemi.loader.updateTask(taskName, 100);
		return idOffNdx;
	};
	