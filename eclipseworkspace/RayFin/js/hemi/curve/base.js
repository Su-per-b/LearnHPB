goog.provide('hemi.curve');
//goog.require('o3d.Client');

	
/**
	 * Enum for different curve types, described below.
	 * <ul><pre>
	 * <li>hemi.curve.curveType.Linear
	 * <li>hemi.curve.curveType.Bezier
	 * <li>hemi.curve.curveType.CubicHermite
	 * <li>hemi.curve.curveType.LinearNorm
	 * <li>hemi.curve.curveType.Cardinal
	 * <li>hemi.curve.curveType.Custom
	 * </ul></pre>
	 */
	hemi.curve.curveType = {
		Linear : 0,
		Bezier : 1,
		CubicHermite : 2,
		LinearNorm : 3,
		Cardinal : 4,
		Custom : 5
	};
	
	/**
	 * Predefined values for common shapes.
	 * <ul><pre>
	 * <li>hemi.curve.ShapeType.CUBE
	 * <li>hemi.curve.ShapeType.SPHERE
	 * <li>hemi.curve.ShapeType.ARROW
	 * </ul></pre>
	 */
	hemi.curve.ShapeType = {
		CUBE : 'cube',
		SPHERE : 'sphere',
		ARROW : 'arrow'
	};

	/**
	 * Render a 3D representation of a curve.
	 *
	 * @param {number[][]} points Array of points (not waypoints)
	 * @param {Object} config Configuration describing how the curve should look
	 */
	hemi.curve.drawCurve = function(points, config) {
		if (!this.dbgLineMat) {
			this.dbgLineMat = this.newMaterial(false);
			this.dbgLineMat.getParam('lightWorldPos').bind(hemi.world.camera.light.position);
		}
		
		var eShow = (config.edges == null) ? true : config.edges,
			eSize = config.edgeSize || 1,
			eColor = config.edgeColor || [0.5,0,0,1],
			jShow = (config.joints == null) ? true : config.joints,
			jSize = config.jointSize || 1,
			jColor = config.jointColor,
			crvTransform = this.pack.createObject('Transform');
		
		for (var i = 0; i < points.length; i++) {
			if(jShow) {
				var transform = this.pack.createObject('Transform'),
					joint = hemi.core.primitives.createSphere(this.pack,
						this.dbgLineMat, jSize, 20, 20);
				
				transform.parent = crvTransform;
				transform.addShape(joint);
				transform.translate(points[i]);
				
				if (jColor) {
					var param = transform.createParam('diffuse', 'o3d.ParamFloat4');
					param.value = jColor;
				}
			}
			if (eShow && i < (points.length - 1)) {
				var edgeTran = this.drawLine(points[i], points[i+1], eSize, eColor);
				edgeTran.parent = crvTransform;
			}
		}
		
		crvTransform.parent = hemi.core.client.root;
		this.dbgLineTransforms.push(crvTransform);
	};
	
	/**
	 * Draw a line connecting two points.
	 *
	 * @param {number[]} p0 The first point
	 * @param {number[]} p1 The second point
	 * @param {number} opt_size Thickness of the line
	 * @param {number[]} opt_color Color of the line
	 * @return {o3d.Transform} the Transform containing the line shape
	 */
	hemi.curve.drawLine = function(p0, p1, opt_size, opt_color) {
		if (!this.dbgLineMat) {
			this.dbgLineMat = this.newMaterial(false);
			this.dbgLineMat.getParam('lightWorldPos').bind(hemi.world.camera.light.position);
		}
		
		var size = opt_size || 1,
			dist = hemi.core.math.distance(p0,p1),
			midpoint = [ (p0[0]+p1[0])/2, (p0[1]+p1[1])/2, (p0[2]+p1[2])/2 ],
			line = hemi.core.primitives.createCylinder(this.pack,
				this.dbgLineMat, size, dist, 3, 1),
			transform = this.pack.createObject('Transform');
		
		transform.addShape(line);
		transform.translate(midpoint);
		transform = hemi.utils.pointYAt(transform,midpoint,p0);
		
		if (opt_color) {
			var param = transform.createParam('diffuse', 'o3d.ParamFloat4');
			param.value = opt_color;
		}
		
		return transform;
	};
	
	/**
	 * Remove the given curve line Transform, its shapes, and its children.
	 * 
	 * @param {o3d.Transform} opt_trans optional Transform to clean up
	 */
	hemi.curve.hideCurves = function(opt_trans) {
		if (opt_trans) {
			var children = opt_trans.children,
				shapes = opt_trans.shapes;
			
			for (var i = 0; i < children.length; i++) {
				this.hideCurves(children[i]);
			}
			for (var i = 0; i < shapes.length; i++) {
				var shape = shapes[i];
				opt_trans.removeShape(shape);
				this.pack.removeObject(shape);
			}
			
			opt_trans.parent = null;
			this.pack.removeObject(opt_trans);
		} else {
			for (var i = 0; i < this.dbgLineTransforms.length; i++) {
				this.hideCurves(this.dbgLineTransforms[i]);
			}
			
			this.dbgLineTransforms = [];
		}
	};
	
	/**
	 * Generate a random point within a bounding box
	 *
	 * @param {number[]} min Minimum point of the bounding box
	 * @param {number[]} max Maximum point of the bounding box
	 * @return {number[]} Randomly generated point
	 */
	hemi.curve.randomPoint = function(min,max) {
		var xi = Math.random();
		var yi = Math.random();
		var zi = Math.random();
		var x = xi*min[0] + (1-xi)*max[0];
		var y = yi*min[1] + (1-yi)*max[1];
		var z = zi*min[2] + (1-zi)*max[2];
		return [x,y,z];
	};
		
	/**
	 * Render the bounding boxes which the curves run through, mostly for
	 * debugging purposes.
	 * 
	 * @param {number[3][2][]} boxes array of pairs of XYZ coordinates, the
	 *     first as minimum values and the second as maximum
	 * @param {o3d.Transform} opt_trans optional parent transform for the boxes
	 */
	hemi.curve.showBoxes = function(boxes, opt_trans) {
		var pack = hemi.curve.pack,
			opt_trans = opt_trans || hemi.picking.pickRoot,
			trans = this.dbgBoxTransforms[opt_trans.clientId] || [];
		
		for (var i = 0; i < boxes.length; i++) {
			var transform = pack.createObject('Transform'),
				b = boxes[i],
				w = b[1][0] - b[0][0],
				h = b[1][1] - b[0][1],
				d = b[1][2] - b[0][2],
				x = b[0][0] + w/2,
				y = b[0][1] + h/2,
				z = b[0][2] + d/2,
				box = o3djs.primitives.createBox(pack, this.dbgBoxMat, w, h, d);
			
			transform.addShape(box);
			transform.translate(x,y,z);
			transform.parent = opt_trans;
			trans.push(transform);
		}
		
		this.dbgBoxTransforms[opt_trans.clientId] = trans;
	};
	
	/**
	 * Remove the bounding boxes from view. If a parent transform is given, only
	 * the bounding boxes under it will be removed. Otherwise all boxes will be
	 * removed.
	 * 
	 * @param {o3d.Transform} opt_trans optional parent transform for the boxes
	 */
	hemi.curve.hideBoxes = function(opt_trans) {
		var pack = hemi.curve.pack;
		
		if (opt_trans) {
			var trans = this.dbgBoxTransforms[opt_trans.clientId] || [];
			
			for (var i = 0; i < trans.length; i++) {
				var tran = trans[i],
					shape = tran.shapes[0];
				
				tran.parent = null;
				tran.removeShape(shape);
				pack.removeObject(shape);
				pack.removeObject(tran);
			}
			
			delete this.dbgBoxTransforms[opt_trans.clientId];
		} else {
			// Create fake transforms and clear all the boxes out
			for (var id in this.dbgBoxTransforms) {
				this.hideBoxes({clientId: id});
			}
		}
	};
	
	/**
	 * Create a curve particle system with the given configuration.
	 * 
	 * @param {Object} cfg configuration options:
	 *     aim: flag to indicate particles should orient with curve
	 *     boxes: array of bounding boxes for particle curves to pass through
	 *     colors: array of values for particle color ramp (use this or colorKeys)
	 *     colorKeys: array of time keys and values for particle color ramp
	 *     fast: flag to indicate GPU-driven particle system should be used
	 *     life: lifetime of particle system (in seconds)
	 *     particleCount: number of particles to allocate for system
	 *     particleShape: enumerator for type of shape to use for particles
	 *     particleSize: size of the particles
	 *     scales: array of values for particle scale ramp (use this or scaleKeys)
	 *     scaleKeys: array of time keys and values for particle size ramp
	 *     tension: tension parameter for the curve (typically from -1 to 1)
	 *     // JS particle system only
	 *     parent: transform to parent the particle system under
	 *     // GPU particle system only
	 *     trail: flag to indicate system should have trailing start and stop
	 * @return {Object} the created particle system
	 */
	hemi.curve.createSystem = function(cfg) {
		var system;
		
		if (cfg.fast) {
			if (cfg.trail) {
				system = new hemi.curve.GpuParticleTrail(cfg);
			} else {
				system = new hemi.curve.GpuParticleSystem(cfg);
			}
		} else {
			system = new hemi.curve.ParticleSystem(cfg);
		}
		
		return system;
	};
	
	hemi.curve.newMaterial = function(opt_trans) {
		var trans = opt_trans == null ? true : opt_trans;
		return hemi.core.material.createBasicMaterial(
			this.pack,
			hemi.view.viewInfo,
			[0,0,0,1],
			trans);
	};
	
	hemi.curve.init = function(canvas) {
		
		hemi.core = {};
		
		var gl = mainController.getGL();
		
	  	var client = new o3d.Client;
		  client.gl = gl;
		  client.renderGraphRoot.gl = gl;
		  client.root.gl = gl;
		
		  gl.client = this;
	
	
		//if (!client.initWithCanvas(canvas)) {
		//	throw ("could not init o3d client");
		//}
	
		//client.gl = gl;
		
		/*
		 * type: o3d.Client
		 */
		hemi.core.client = client;
		
		/*
		 * type: o3d.Client
		 */
		this.pack = new o3d.Pack(); //hemi.core.client.createPack();
		this.gl = gl;
		this.client = client;
		
		
		/*
		this.dbgBoxMat = hemi.core.material.createConstantMaterial(
			this.pack,
			hemi.view.viewInfo,
			[0, 0, 0.5, 1]);
		this.dbgLineMat = null;
		
		var state = this.pack.createObject('State');
		state.getStateParam('PolygonOffset2').value = -1.0;
		state.getStateParam('FillMode').value = hemi.core.o3d.State.WIREFRAME;
		this.dbgBoxMat.state = state;
		this.dbgBoxTransforms = {};
		this.dbgLineTransforms = [];
		
		*/
		
	};

