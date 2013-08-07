/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
 	 /**
 * @author Raj Dye - raj@rajdye.com
*/
goog.provide('lgb.view.ZoneView');

goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.BuildingHeightModel');
goog.require('lgb.model.ZoneShapeModel');
goog.require('lgb.model.vo.ViewPointNode');


/**
 * MVC View
 * @constructor
 * @extendslgb.view.BaseView3dScene
 * @param {lgb.model.ZoneModel} dataModel The Data Model.
 */
lgb.view.ZoneView = function(dataModel) {
    
  this._TITLE = 'Zones';
  lgb.view.BaseView3dScene.call(this, dataModel);

  this.zoneVisibleIdx = -1;
  this.buildingHeightModel_ = null;
  this.isInitialized_ = false;
};
goog.inherits(lgb.view.ZoneView,lgb.view.BaseView3dScene);





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

  this.masterGroup_.viewpoint = "ZonesScene";
  this.requestAddToWorld(this.masterGroup_);
};


/**
 * @private
 * @param {number} zoneNumber The idx used to locate the zone in the array.
 * @param {THREE.Vector3} geom The dimensions of the cube.
 * @param {THREE.Vector3} position The position of the cube.
 */
lgb.view.ZoneView.prototype.addCube_ = function(zoneNumber, zoneShapeModel) {

    var floorWidth = this.dataModel.envelopeModel.floorWidthMeters;
    var floorHeight = this.dataModel.envelopeModel.floorHeightMeters;
    var floorDepth = this.dataModel.envelopeModel.floorDepthMeters;

    var width = zoneShapeModel.dimensions.x;
    var height = floorHeight;
    var depth = zoneShapeModel.dimensions.z;

    var posx = zoneShapeModel.position.x;
    var posz = zoneShapeModel.position.z;


  var cubeGeom = new THREE.CubeGeometry(
    width,
    height,
    depth,
    1, 1, 1);

    var cubeMesh = new THREE.Mesh(cubeGeom, this.material);
    cubeMesh.name = 'Zone ' + zoneNumber.toString();
    cubeMesh.visible = false;
    cubeMesh.viewpoint = "defaultZone";
    
    var x = -1 * floorWidth / 2;
    x += posx + (width / 2);

    var z = -1 * floorDepth / 2;
    z += posz + (depth / 2);

    cubeMesh.position = new THREE.Vector3(
      x,
            (floorHeight / 2) ,
      z);

    this.masterGroup_.add(cubeMesh);
};


/**
 * event handler.
 * @param {lgb.events.Event} event The event.
 */
lgb.view.ZoneView.prototype.onChange = function(event) {

 if (event.payload.config) {
   
  this.masterGroup_.removeAllChildren();
  
  var len = this.dataModel.z.length;
  for (var i = 0; i < len; i++) {
      
    var zoneShapeModel = this.dataModel.z[i];
    
    this.addCube_(i + 1, zoneShapeModel);
  }
  

 }

  if (event.payload.isVisible) {
    var idx = event.payload.zoneIdx;
    var isVisible = this.dataModel.z[idx-1].isVisible;
    this.setVisible(idx, isVisible);
  }

    if (!this.isInitialized_) {
        var node = new lgb.model.vo.ViewPointNode(this._TITLE, this.masterGroup_, 2 );
        this.triggerLocal(e.ViewPointNodesLoaded, node);
    }

    this.isInitialized_ = true;

};


/**
 * @param {number} zoneIdx The idx used to locate the zone in the array.
 * @param {boolean} makeVisible If true show the zone.
 */
lgb.view.ZoneView.prototype.setVisible = function(zoneIdx, makeVisible) {

  if (null == makeVisible) {
    makeVisible = true;
  }

  var zoneCube = this.masterGroup_.children[zoneIdx-1];

  if (zoneCube.visible != makeVisible) {
    zoneCube.visible = makeVisible;
  }

};










