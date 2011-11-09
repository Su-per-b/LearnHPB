/**
 * @author Raj Dye - raj.dye@gmail.com
 * These are utilities that are specific to the Three.Js
 * library.
 */

goog.provide('lgb.ThreeUtils');

goog.require('goog.structs.Map');

/**@typedef {Object} */
lgb.ThreeUtils = {};


/**
 * This will take a group and just merge all the geometries of 
 * the group members into one
 * @param {Object} groupHash This is nan object where the 
 * property names are the name of groups defined in Blender
 * and the values are an Array of Three.Mesh objects.
 * @return {Object} The returned object has Meshes as properties.
 */
lgb.ThreeUtils.convertGroupHashToMeshHash = function(groupHash) {
  var meshHash = {};

  for (var theGroupName in groupHash) {
  	var theGroup = groupHash[theGroupName];
  	var mesh = lgb.ThreeUtils.convertGroupToOneMesh(theGroup, theGroupName);
  	meshHash[theGroupName] = mesh;
  	mesh.geometry.computeBoundingBox();
  }

  return meshHash;
};


lgb.ThreeUtils.convertGroupToOneMesh = function(theGroup, theGroupName) {

  var geom = new THREE.Geometry();

  var l = theGroup.length;
  for (var i = 0; i < l; i++) {
  	THREE.GeometryUtils.merge(geom, theGroup[i]);
  }

  var newMesh = new THREE.Mesh(geom, new THREE.MeshFaceMaterial());
  newMesh.name = theGroupName;
  
  return newMesh;
};



/**
 * makes transparent materials opaque in Chrome to fix bug
 * where the material blinks.
 * @param {THREE.Mesh} mesh The mesh to fix.
 */
lgb.ThreeUtils.chromeBlinkingFix = function(mesh) {
	if (goog.userAgent.WEBKIT) {
		
		if (mesh.geometry && mesh.geometry.materials) {
			var l = mesh.geometry.materials.length;
			
			for (var i=0; i < l; i++) {
				mesh.geometry.materials[i][0].opacity = 1;
			};
			
			
		};
	};

};




lgb.ThreeUtils.convertGroupContainer = function(group) {

  var container = new THREE.Object3D();

  var l = group.length;
  for (var i = 0; i < l; i++) {
  	container.add(group[i]);
  }

  return container;


};







