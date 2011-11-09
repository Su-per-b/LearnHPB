/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 */

THREE.Mesh = function ( geometry, materials ) {

	THREE.Object3D.call( this );

	this.geometry = geometry;
	this.materials = materials && materials.length ? materials : [ materials ];

	this.overdraw = false; // TODO: Move to material?


	if ( this.geometry ) {

		// calc bound radius

		if( !this.geometry.boundingSphere ) {

			this.geometry.computeBoundingSphere();

		}

		this.boundRadius = geometry.boundingSphere.radius;


		// setup morph targets

		if( this.geometry.morphTargets.length ) {

			this.morphTargetBase = -1;
			this.morphTargetForcedOrder = [];
			this.morphTargetInfluences = [];
			this.morphTargetDictionary = {};

			for( var m = 0; m < this.geometry.morphTargets.length; m ++ ) {

				this.morphTargetInfluences.push( 0 );
				this.morphTargetDictionary[ this.geometry.morphTargets[ m ].name ] = m;

			}

		}

	}

}

THREE.Mesh.prototype = new THREE.Object3D();
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;


/*
 * Get Morph Target Index by Name
 */

THREE.Mesh.prototype.getMorphTargetIndexByName = function( name ) {

	if ( this.morphTargetDictionary[ name ] !== undefined ) {

		return this.morphTargetDictionary[ name ];
	}

	console.log( "THREE.Mesh.getMorphTargetIndexByName: morph target " + name + " does not exist. Returning 0." );
	return 0;

}

//@author Raj Dye raj@pcdigi.com
THREE.Mesh.prototype.bakeTransformsIntoGeometry = function ( ) {

	this.updateMatrix();
  	
  	var newGeom = THREE.GeometryUtils.clone(this.geometry);
	newGeom.applyMatrix(this.matrix);
	
	this.geometry = newGeom;
	this.geometry.computeBoundingSphere();
	
	this.position = new THREE.Vector3();
	this.rotation = new THREE.Vector3();
	this.scale = new THREE.Vector3( 1, 1, 1 );
	this.quaternion = new THREE.Quaternion();
};

/**
 *  "Master Obi-Wan, not victory. The shroud of the dark side has fallen. 
 * Begun, the Clone War has!" 
 *	―Yoda (http://starwars.wikia.com/wiki/Star_Wars_Episode_II:_Attack_of_the_Clones)
 * @author Raj Dye raj@pcdigi.com
 * @public
 */
THREE.Mesh.prototype.clone = function ( ) {

	
  	var newGeom = THREE.GeometryUtils.clone(this.geometry);
  	
  	var theClone = new THREE.Mesh(newGeom, this.materials);
  	
  	theClone.parent = this.parent;
  	theClone.up = this.up;
  	theClone.position = this.position;
  	theClone.rotation = this.rotation;
  	theClone.eulerOrder = this.eulerOrder;
  	theClone.dynamic = this.dynamic;
  	theClone.doubleSided = this.doubleSided;
  	theClone.flipSided = this.flipSided;
  	theClone.renderDepth = this.renderDepth;
  	theClone.rotationAutoUpdate = this.rotationAutoUpdate;
  	//theClone.matrix = this.matrix;
 // 	theClone.matrixWorld = this.matrixWorld;
  //	theClone.matrixRotationWorld = this.matrixRotationWorld;
  	theClone.matrixAutoUpdate = this.matrixAutoUpdate;
  	theClone.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
  //	theClone.quaternion = this.quaternion;
  	theClone.useQuaternion = this.useQuaternion;
  	theClone.boundRadius = this.boundRadius;
  	theClone.boundRadiusScale = this.boundRadiusScale;
  	theClone.visible = this.visible;
  	theClone.castShadow = this.castShadow;
  	theClone.receiveShadow = this.receiveShadow;
  	theClone.frustumCulled = this.frustumCulled;
  	//theClone._vector = this.useQuaternion;
  	
	return theClone;

};

