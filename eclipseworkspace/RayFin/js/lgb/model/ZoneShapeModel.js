goog.provide('lgb.model.ZoneShapeModel');


/**
 * @constructor
 */
lgb.model.ZoneShapeModel = function(x,y,z,xx,yy,zz) {
  /**
   * @const
   * @type {string}
   */
  this._NAME = 'lgb.model.ZoneShapeModel';

  this.dimensions = new THREE.Vector3(x, y, z);
  this.position = new THREE.Vector3(xx, yy, zz);
  this.isVisible = false;
};



