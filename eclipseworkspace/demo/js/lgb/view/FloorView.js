/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.FloorView');

goog.require('lgb.view.ViewBase');



/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.FloorView = function() {
  lgb.view.ViewBase.call(this);

  this.init();
  this._NAME = 'lgb.view.FloorView';
};
goog.inherits(lgb.view.FloorView, lgb.view.ViewBase);



/**
 * Initializes the View
 */
lgb.view.FloorView.prototype.init = function() {

  var line_material = new THREE.LineBasicMaterial(
    { color: 0xcccccc, opacity: 0.2 }
   );

  var geometry = new THREE.Geometry();
  var floor = -0.04, step = 1, size = 14;

  for (var i = 0; i <= size / step * 2; i++) {
    geometry.vertices.push(
      new THREE.Vertex(new THREE.Vector3(- size, floor, i * step - size))
    );
    geometry.vertices.push(
      new THREE.Vertex(new THREE.Vector3(size, floor, i * step - size))
    );
    geometry.vertices.push(new THREE.Vertex(
      new THREE.Vector3(i * step - size, floor, -size))
    );
    geometry.vertices.push(
      new THREE.Vertex(new THREE.Vector3(i * step - size, floor, size))
    );
  }

  var plane = new THREE.Line(geometry, line_material, THREE.LinePieces);
  var event = new lgb.events.Object3DLoaded(plane);
  this.dispatchLocal(event);
};












