
/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.Mesh = function(){
		hemi.model.Model.call(this);
		this.boundingBox = null;
		this.newParentTransform = null;
	};
	
	lgb.view.Mesh.prototype = {
	
		showBoundingBox: function(){
		
			
			this.createBox();
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
			
		},
		
		/*
		* Move the mesh to the default location and orientation
		*/
		position : function() {

		//	var trans = this.cloneToTransform();
			var newMesh = this.clone();
			newMesh.rotateX(90);
			
			//this.rotateX(270);
			//this.center();
			//var del = $.proxy(this.center, this);
			//window.setTimeout(del,4000);
			
		},
		
		/**
		* creates a new Mesh, 
		*/
		clone: function() {
			var core = hemi.core,
				pack = core.mainPack;
			
			var newMesh = new lgb.view.Mesh();
			newMesh.pack = hemi.core.client.createPack();
			
			var transform = newMesh.pack.createObject('Transform');  //o3d.Transform
			transform.parent = core.client.root;
			transform.shapes = transform.shapes.concat(this.getShapes());
			transform.recalculateBoundingBox();
			
			newMesh.root = transform; //newMesh.pack.createObject('Transform');

			var paramObject = this.pack.createObject('ParamObject');
			newMesh.animationTime = paramObject.createParam('animTime', 'ParamFloat');
		
			return newMesh;
			
		},
		
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
		
		/**
		* translates the root transform so that the lower left corner of the mesh
		* is at the origin 0,0,0
		* 
		*/
		moveToOrigin: function() {
			
			var bb = this.root.boundingBox;	
			
			var xDelta = -1 * bb.minExtent[0];
			var yDelta = -1 * bb.minExtent[1];
			var zDelta = -1 * bb.minExtent[2];
			
			this.root.translate(xDelta,yDelta,zDelta);
			
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
			
			var allTransforms = this.getTransforms();
			
			var config = {
				axis : axis,
				rad : radians,
				transforms : this.root
			};
			this.rotate(config);
			
			return;
			
			
			
			
			
			
			
			var update = this.getTransformUpdate(this.root);
			

			
			switch (axis) {
				case 'x' : {
					this.root.rotateX(radians);
					break;
				}
				case 'y' : {
					this.root.rotateY(radians);
					break;
				}
				case 'z' : {
					this.root.rotateZ(radians);
					break;
				}
				default: {
					throw new Error('lgb.view.Mesh.rotate(): axis unrecognized')
				}
			}
				
			update.localMatrix = hemi.utils.clone(this.root.localMatrix);
		}
		
		
		
	};

	lgb.view.Mesh.inheritsFrom(hemi.model.Model);

	return lgb;
	
})(lgb || {});











