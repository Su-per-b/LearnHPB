/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.ZoneShapeModel');


/**
 * @constructor
 * @param {number} x The x dimension.
 * @param {number} y The y dimension.
 * @param {number} z The z dimension.
 * @param {number} xx The x position.
 * @param {number} yy The y position.
 * @param {number} zz The z position.
 */
lgb.world.model.ZoneShapeModel = function(x, y, z) {

  this.dimensions = new THREE.Vector3(x, y, z);
  this.position = null;
  this.isVisible = false;
};



