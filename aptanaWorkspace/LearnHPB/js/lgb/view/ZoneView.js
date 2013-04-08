/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
 	 /**
 * @author Raj Dye - raj@rajdye.com
*/
goog.provide('lgb.view.ZoneView');

goog.require('lgb.view.ViewBase');
goog.require('lgb.model.BuildingHeightModel');

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
  
  this.buildingHeightModel_ = null;
  this.sceneY_ = null;
};
goog.inherits(lgb.view.ZoneView, lgb.view.ViewBase);



lgb.view.ZoneView.prototype.setBuildingHeight = function(buildingHeightModel) {
   
  this.buildingHeightModel_ = buildingHeightModel;
  this.setY_();
};


lgb.view.ZoneView.prototype.setY_ = function() {
    
  if (this.buildingHeightModel_ && this.sceneY_ != null) {
      this.masterGroup_.position.y = this.buildingHeightModel_.topFloorMinY + this.sceneY_;
  }
  
};


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

  //this.masterGroup_ = new THREE.Object3D();
  //this.masterGroup_.name = this._NAME;
  this.masterGroup_.add(this.cubeMesh);

  this.requestAddToWorld(this.masterGroup_);
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

    var cubeMesh = new THREE.Mesh(cubeGeom, this.material);
    cubeMesh.name = this._NAME + '-zone-' + zoneNumber.toString();
    cubeMesh.visible = false;

    var x = -1 * floorWidth / 2;
    x += posx + (width / 2);

    var z = -1 * floorDepth / 2;
    z += lgb.convertFeetToMeters(position.z) + (depth / 2);

    cubeMesh.position = new THREE.Vector3(
      x,
            (floorHeight / 2) ,
      z);

    //this.masterGroup_.position.x = 0.5;
    //this.masterGroup_.position.y = -0.9;
    this.masterGroup_.add(cubeMesh);
};


/**
 * event handler.
 * @param {lgb.events.DataModelChanged} event The event.
 */
lgb.view.ZoneView.prototype.onChange = function(event) {

 if (event.payload.config) {
   
  this.masterGroup_.removeAllChildren();
  
  var len = this.dataModel.z.length;
  for (var i = 0; i < len; i++) {
    var geom = this.dataModel.z[i].dimensions;
    var position = this.dataModel.z[i].position;

    this.addCube_(i + 1, geom, position);
  }
  
    //this.sceneY_ = this.masterGroup_.position.y;
    this.sceneY_ = 0;
    this.setY_();
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

  var zoneCube = this.masterGroup_.children[zoneIdx];

  if (zoneCube.visible != makeVisible) {
    zoneCube.visible = makeVisible;

  }

};










