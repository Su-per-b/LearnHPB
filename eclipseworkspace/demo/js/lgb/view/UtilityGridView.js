/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.view.UtilityGridView');

goog.require('lgb.view.ViewBase');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.UtilityGridView = function() {
  lgb.view.ViewBase.call(this);

  this._NAME = 'lgb.view.FloorView';
};
goog.inherits(lgb.view.UtilityGridView, lgb.view.ViewBase);

/**
 * Initializes the View
 */
lgb.view.UtilityGridView.prototype.init = function() {

  var line_material = new THREE.LineBasicMaterial({
    linewidth : 1,
    color : 0xffffff,
    opacity : 0.4,
    transparent : true
  });


  var geometry = new THREE.Geometry();
  var floor = 0.00, step = 1, size = 28;

  for (var i = 0; i <= size / step * 2; i++) {

    var vec3 = new THREE.Vector3(-size, floor, i * step - size);
    geometry.vertices.push(vec3);

    geometry.vertices.push(new THREE.Vector3(size, floor, i * step - size));
    geometry.vertices.push(new THREE.Vector3(i * step - size, floor, -size));
    geometry.vertices.push(new THREE.Vector3(i * step - size, floor, size));
  }

  this.plane_ = new THREE.Line(geometry, line_material, THREE.LinePieces);

  this.requestAddToWorld(this.plane_);

};

