
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is a subclass of the hemi.model.Model
	 */
	lgb.view.Mesh = function(fileName){
		hemi.model.Model.call(this);
			
		this.fadeEffect = new lgb.view.FadeEffect();
		
		if (null !== fileName && undefined !== fileName) {
			this.setFileName(fileName);
		} else {
			debugger;
		}
	};
	
	lgb.view.Mesh.prototype = {
	
	
		/**
		 * Set the file name and model name for the Model
		 * Overrides the Base class function
		 * @param {string} fileName name of the file
		 */
		setFileName: function(fileName) {
			
			this.fileName = lgb.Config.ASSETS_PATH + fileName;
			this.name = this.getModelName(fileName);
		},
		
		showBoundingBox: function(){
			this.createBox();
		},
		
		setVisible: function(visibleFlag){
			this.setTransformVisible(this.root, visibleFlag);
		},
		fadeIn: function(){
			
		
			if (null === this.fadeEffect.transform || undefined === this.fadeEffect.transform) {
				this.fadeEffect.transform = this.root;
			}
			this.fadeEffect.fadeIn();
			
		},
		fadeOut: function(){
			if (null === this.fadeEffect.transform || undefined === this.fadeEffect.transform) {
				this.fadeEffect.transform = this.root;
			}
			this.fadeEffect.fadeOut();

				
		},
		
	
		createBox : function() {
			
			var pack = hemi.curve.pack;
		

			var bb = this.root.boundingBox;
			var b = [bb.minExtent, bb.maxExtent];
		
			var transform = pack.createObject('Transform'), 
				w = b[1][0] - b[0][0], 
				h = b[1][1] - b[0][1], 
				d = b[1][2] - b[0][2], 
				x = b[0][0] + w / 2, 
				y = b[0][1] + h / 2, 
				z = b[0][2] + d / 2, 
				box = o3djs.primitives.createBox(pack, hemi.curve.dbgBoxMat, w, h, d);
			
			
			transform.addShape(box);
			transform.name = 'BoundingBox';
			transform.translate(x, y, z);
			transform.parent = this.root;
			
			return box;
			
		},
		

		translate : function(x,y,z) {
			hemi.utils.worldTranslate([x,y,z], this.root);
		},
		
		
		resetPosition : function() {
			this.root.identity();
		},
		
		/**
		* creates a new Mesh, 
		*/
		clone: function() {
			var core = hemi.core,
				pack = core.mainPack;
			
			var newMesh = new lgb.view.Mesh(this.fileName);
			newMesh.pack = hemi.core.client.createPack();
			
			var transform = newMesh.pack.createObject('Transform');  //o3d.Transform
			transform.parent = core.client.root;

			
			transform.shapes = transform.shapes.concat(this.getShapes());
			transform.recalculateBoundingBox();
			
			newMesh.root = transform; //newMesh.pack.createObject('Transform');

			var paramObject = this.pack.createObject('ParamObject');
			newMesh.animationTime = paramObject.createParam('animTime', 'ParamFloat');
			newMesh.animParam = this.animParam;

			return newMesh;
			
		},
		
		getModelName : function(fileName) {

			// Currently, file names are of the form:
			// [path to directory]/[model name]/scene.json
			var end = fileName.lastIndexOf('/');
			
			if (end < 1) {
				end = fileName.length;
			}
			
			var start = fileName.lastIndexOf('/', end - 1) + 1;
			
			if (start >= end) {
				start = 0;
			}
			
			return fileName.substring(start, end);

		},
			

		
/*
		clone2: function() {
			var core = hemi.core,
				pack = core.mainPack;
			

			//var newPack = hemi.core.client.createPack();
			//newPack.objects_.concat(this.pack.objects_);
			
			var config = new hemi.model.ModelConfig();
			//config.pack.objects_ = hemi.utils.clone(this.pack.objects_);
			
			
			var materials = this.getMaterials();
			var shapes = this.getShapes();
			var transforms = this.getTransforms();
			
			
			var len = transforms.length;
			
			//loop through all transforms
			for (var i=0; i<len; i++) {

				var p = transforms[i].getParam('ownerId');
				
				if (null != p) {
					transforms[i].removeParam(p);
				}
			}
			
			config.pack.objects_ = config.pack.objects_.concat( shapes);
			

			
			var newMesh = new lgb.view.Mesh();
			newMesh.fileName = this.fileName;
			newMesh.name = this.name;
			newMesh.loadConfig2(config);
			
			return newMesh;
			
		},

		

		loadConfig2: function(config) {
			var id = this.getId();
			

			this.root = config.rootTransform;
			this.root.name = this.name;
			// The deserialization process sets bad values for bounding boxes of
			// transforms, so force them to be recalculated.
			this.root.recalculateBoundingBox(true);
			this.animParam = config.animationTime;
			this.materials = config.getMaterials();
			this.shapes = config.getShapes();
			this.transforms = config.getTransforms();
			this.pack = config.pack;
			
			for (var t = 0, len = this.transforms.length; t < len; ++t) {
				var transform = this.transforms[t],
					oid = transform.createParam('ownerId', 'o3d.ParamInteger');

						oid.value = id;
					

			}

			

			for (var t = 0, len = this.transformUpdates.length; t < len; t++) {
				var update = this.transformUpdates[t];
				update.apply(this);
			}

			hemi.world.tranReg.distribute(this);
			
			this.send(hemi.msg.load, {});

		},
		
		

		merge: function(mesh) {
			
			//var len = meshAry.length;
			
		//for (var i=0; i<len; i++) {
				//var theMesh = meshAry[i];
				
				//
				//var transform = newMesh.pack.createObject('Transform');
				//this.pack.objects_.push(mesh.root);		
			//}
			
		//var t = mesh.cloneToTransform();
		
/*
			var core = hemi.core,
				pack = core.mainPack;
					
			var transform = pack.createObject('Transform');  //o3d.Transform
			
			//var transform = this.pack.createObject('Transform');
			transform.shapes = transform.shapes.concat(mesh.getShapes());
			transform.recalculateBoundingBox();
			
			//transform.localMatrix = hemi.utils.clone(mesh.root.localMatrix);

			transform.parent = this.root;
			transform.translate(20,0,0);

			
			// this.root.addChild(transform);
			 
			//transform.recalculateBoundingBox();
			//this.root.recalculateBoundingBox();
			
			//return newMesh;
			
			var t = this.cloneToTransform();
			t.translate(20,0,0);
			
			
			mesh.cleanup();
		},
		
		*/
		
		/**
		* creates a new transform, reference the shapes
		* from the mesh
		*/
		cloneToTransform: function() {

			var core = hemi.core,
				pack = core.mainPack;
					
			var transform = pack.createObject('Transform');  //o3d.Transform
			transform.parent = core.client.root;
			
			transform.shapes = transform.shapes.concat(this.getShapes());
			transform.recalculateBoundingBox();
			
			return transform;
		},
		
		/**
		* translates the root transform so that the 
		* center of the mesh bounding box 
		* is at the origin 0,0,0
		* 
		*/
		center: function() {
			
			var bb = this.root.boundingBox;	
			
			var xExt = bb.maxExtent[0] - bb.minExtent[0];
			var yExt = bb.maxExtent[1] - bb.minExtent[1];
			var zExt = bb.maxExtent[2] - bb.minExtent[2];
			
			var xDelta = (-1 * xExt / 2) - bb.minExtent[0];
			var yDelta = (-1 * yExt / 2) - bb.minExtent[1];
			var zDelta = (-1 * zExt / 2) - bb.minExtent[2];

			
			this.root.translate(xDelta,yDelta,zDelta);
			
		},
		

		moveToOrigin: function() {
			
			var bb = this.root.boundingBox;	
			
			//var minPoint = this.root.boundingBox.minExtent;
			var worldPoint = hemi.utils.pointAsWorld(this.root, bb.minExtent);
				

			var xDelta = -1 * worldPoint[0];
			var yDelta = -1 * worldPoint[1];
			var zDelta = -1 * worldPoint[2];
			
			hemi.utils.worldTranslate([xDelta,yDelta,zDelta], this.root);
			
			//this.root.translate(xDelta,yDelta,zDelta);
			
		},
				
		/**
		* Rotate the root transform around the X axis
		* 
		* @param {number} the amount to rotate (in degrees)
		*/
		rotateX: function(degrees) {
			this.rotateHelper('x', degrees);
		},
		
		/**
		* Rotate the root transform around the X axis
		* 
		* @param {number} the amount to rotate (in degrees)
		*/
		rotateY: function(degrees) {
			this.rotateHelper('y', degrees);
		},
		
		/**
		* Rotate the root transform around the X axis
		* 
		* @param {number} the amount to rotate (in degrees)
		*/
		rotateZ: function(degrees) {
			this.rotateHelper('z', degrees);
		},
		
		/*
		* Rotate the root transform around the specified axis
		* @param {string} 'x', 'y', or 'x' - the axis to rotate around
		* @param {number} the amount to rotate (in degrees)
		*/
		rotateHelper: function(axis, degrees) {
		//	axis =  axis.toLowerCase();
			var radians = hemi.core.math.degToRad(degrees);
			
/*
			var allTransforms = this.getTransforms();
			
			var config = {
				axis : axis,
				rad : radians,
				transforms : this.root
			};
			this.rotate(config);
			
			return;
*/

			var update = this.getTransformUpdate(this.root);
			
			axisAry = [];
			
			switch (axis) {
				case 'x' : {
					axisAry = [1,0,0];
					break;
				}
				case 'y' : {
					axisAry = [0,1,0];
					break;
				}
				case 'z' : {
					axisAry = [0,0,1];
					break;
				}
				default: {
					throw new Error('lgb.view.Mesh.rotate(): axis unrecognized')
				}
			}
			
			hemi.utils.worldRotate(axisAry,radians ,this.root);
			
			update.localMatrix = hemi.utils.clone(this.root.localMatrix);
		}

	};

	lgb.view.Mesh.inheritsFrom(hemi.model.Model);


	lgb.view.Mesh.prototype.__defineGetter__('spanX',
	    function(p) {
			
			if (this.root == null) {
				return 0;
			} else {
				var boundingBox = this.root.boundingBox;
				var span = boundingBox.maxExtent[0] - boundingBox.minExtent[0];
				
				return span;
			}

	    }
	);
	lgb.view.Mesh.prototype.__defineGetter__('spanY',
	    function(p) {
			
			if (this.root == null) {
				return 0;
			}
			else {
				var boundingBox = this.root.boundingBox;
				var span = boundingBox.maxExtent[1] - boundingBox.minExtent[1];
				
				return span;
			}
			

	    }
	);
	lgb.view.Mesh.prototype.__defineGetter__('spanZ',
	    function(p) {
			
			if (this.root == null) {
				return 0;
			}
			else {
				var boundingBox = this.root.boundingBox;
				var span = boundingBox.maxExtent[2] - boundingBox.minExtent[2];
				
				return span;
			}
			
			

	    }
	);

	return lgb;
	
})(lgb || {});











