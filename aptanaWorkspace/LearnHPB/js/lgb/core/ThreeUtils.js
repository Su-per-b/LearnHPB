/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 * These are utilities that are specific to the Three.Js
 * library.
 */

goog.provide('lgb.core.ThreeUtils');

goog.require('goog.structs.Map');

/**@typedef {Object} */
lgb.core.ThreeUtils = {};




/**
 * This will take a group and just merge all the geometries of
 * the group members into one
 * @param {Object} groupHash This is nan object where the
 * property names are the name of groups defined in Blender
 * and the values are an Array of Three.Mesh objects.
 * @return {Object} The returned object has Meshes as properties.
 */
lgb.core.ThreeUtils.convertGroupHashToMeshHash = function(groupHash) {
  var meshHash = {};

  for (var theGroupName in groupHash) {
    var theGroup = groupHash[theGroupName];
    var mesh = lgb.core.ThreeUtils.convertGroupToOneMesh(theGroup, theGroupName);
    meshHash[theGroupName] = mesh;
    mesh.geometry.center();
  }

  return meshHash;
};


/**
 * //TODO (Raj) Convert this to a goog.map
 * @param {Object} theGroup Works like a hash map.
 * @param {string} theGroupName The name.
 * @return {THREE.Mesh} The mesh.
 */
lgb.core.ThreeUtils.convertGroupToOneMesh = function(theGroup, theGroupName) {


  var newMesh = theGroup[0];
  
  //var geom = new THREE.Geometry();

  var l = theGroup.length;
  for (var i = 1; i < l; i++) {
    
    var mesh = theGroup[i];
    
    THREE.GeometryUtils.merge(newMesh.geometry, mesh.geometry);
    
    var marterialsAry = mesh.material.materials;
    var len = marterialsAry.length;
    
    for (var j = 0; j < len; j++) {
      newMesh.material.materials.push(marterialsAry[j]);
    }
  }

 // var newMesh = new THREE.Mesh(geom, new THREE.MeshFaceMaterial());
 // newMesh.name = theGroupName;
 
  newMesh.geometry.mergeVertices();


  return newMesh;
};



/**
 * makes transparent materials opaque in Chrome to fix bug
 * where the material blinks.
 * @param {THREE.Mesh} mesh The mesh to fix.
 */
lgb.core.ThreeUtils.chromeBlinkingFix = function(mesh) {
  if (goog.userAgent.WEBKIT) {

    if (mesh.geometry && mesh.geometry.materials) {
      var l = mesh.geometry.materials.length;

      for (var i = 0; i < l; i++) {
        mesh.geometry.materials[i][0].opacity = 1;
      }


    }
  }

};




