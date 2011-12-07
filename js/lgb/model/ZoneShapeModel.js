goog.provide('lgb.model.ZoneShapeModel');


/**
 * @constructor
 * @param {number} x The x dimension.
 * @param {number} y The y dimension.
 * @param {number} z The z dimension.
 * @param {number} xx The x position.
 * @param {number} yy The y position.
 * @param {number} zz The z position.
 */
lgb.model.ZoneShapeModel = function(x, y, z, xx, yy, zz) {
  /**
   * @const
   * @type {string}
   */
  this._NAME = 'lgb.model.ZoneShapeModel';

  this.dimensions = new THREE.Vector3(x, y, z);
  this.position = new THREE.Vector3(xx, yy, zz);
  this.isVisible = false;
};



