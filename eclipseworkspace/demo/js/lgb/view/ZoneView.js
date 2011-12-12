/**
 * @author Raj Dye - raj@rajdye.com
*/
goog.provide('lgb.view.ZoneView');

goog.require('lgb.view.ViewBase');


/**
 * MVC View
 * @constructor
 * @extends lgb.view.ViewBase
 * @param {lgb.model.ZoneModel} dataModel The Data Model.
 */
lgb.view.ZoneView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);


  this._NAME = 'lgb.view.ZoneView';
  this.zoneVisibleIdx = -1;
};
goog.inherits(lgb.view.ZoneView, lgb.view.ViewBase);


/**
 * Initializes the View
 */
lgb.view.ZoneView.prototype.init = function() {

  var parameters = {
    color: 0x6660000
  };

  this.material = new THREE.MeshPhongMaterial(parameters);

  var cubeGeom = new THREE.CubeGeometry(5, 5, 5, 1, 1, 1);
  this.cubeMesh = new THREE.Mesh(cubeGeom, this.material);

  this.masterGroup = new THREE.Object3D();
  this.masterGroup.name = this._NAME;
  this.masterGroup.add(this.cubeMesh);

  this.requestAddToWorld(this.masterGroup);
};


/**
 * @private
 * @param {number} zoneNumber The idx used to locate the zone in the array.
 * @param {THREE.Vector3} geom The dimensions of the cube.
 * @param {THREE.Vector3} position The position of the cube.
 */
lgb.view.ZoneView.prototype.addCube_ = function(zoneNumber, geom, position) {

    var floorWidth = lgb.convertFeetToMeters(
      this.dataModel.envelopeModel.floorWidth
    );
    var floorHeight = lgb.convertFeetToMeters(
      this.dataModel.envelopeModel.floorHeight
    );
    var floorDepth = lgb.convertFeetToMeters(
      this.dataModel.envelopeModel.floorDepth
    );

    var width = lgb.convertFeetToMeters(geom.x);
    var height = lgb.convertFeetToMeters(this.dataModel.floorHeight);
    var depth = lgb.convertFeetToMeters(geom.z);

    var posx = lgb.convertFeetToMeters(position.x);
    var posz = lgb.convertFeetToMeters(position.z);


  var cubeGeom = new THREE.CubeGeometry(
    width,
    height,
    depth,
    1, 1, 1);

    this.cubeMesh = new THREE.Mesh(cubeGeom, this.material);
    this.cubeMesh.name = this._NAME + '-zone-' + zoneNumber.toString();
    this.cubeMesh.visible = false;

    var x = -1 * floorWidth / 2;
    x += posx + (width / 2);

    var z = -1 * floorDepth / 2;
    z += lgb.convertFeetToMeters(position.z) + (depth / 2);

    this.cubeMesh.position = new THREE.Vector3(
      x,
      -1 * floorHeight / 2 + 1,
      z);

    this.masterGroup.position.x = 0.5;
    this.masterGroup.position.y = -0.9;
    this.masterGroup.add(this.cubeMesh);
};


/**
 * event handler.
 * @param {lgb.events.DataModelChanged} event The event.
 */
lgb.view.ZoneView.prototype.onChange = function(event) {

 if (event.payload.config) {
  this.masterGroup.removeAll();
  var len = this.dataModel.z.length;
  for (var i = 0; i < len; i++) {
    var geom = this.dataModel.z[i].dimensions;
    var position = this.dataModel.z[i].position;

    this.addCube_(i + 1, geom, position);
  }
 }

  if (event.payload.isVisible) {
    var idx = event.payload.zoneIdx;
    var isVisible = this.dataModel.z[idx].isVisible;
    this.setVisible(idx, isVisible);
  }

};


/**
 * @param {number} zoneIdx The idx used to locate the zone in the array.
 * @param {boolean} makeVisible If true show the zone.
 */
lgb.view.ZoneView.prototype.setVisible = function(zoneIdx, makeVisible) {

  if (null == makeVisible) {
    makeVisible = true;
  }

  var zoneCube = this.masterGroup.children[zoneIdx];

  if (zoneCube.visible != makeVisible) {
    zoneCube.visible = makeVisible;

  }

};










