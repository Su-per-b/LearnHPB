/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
 	 /**
 * @author Raj Dye - raj@rajdye.com
*/
goog.provide('lgb.world.view.ZoneView');

goog.require('lgb.world.view.BaseWorldView');
goog.require('lgb.world.model.BuildingHeightModel');
goog.require('lgb.world.model.ZoneShapeModel');
goog.require('lgb.world.model.vo.ViewpointNode');


/**
 * MVC View
 * @constructor
 * @extends lgb.world.view.BaseWorldView
 * @param {lgb.world.model.ZoneModel} dataModel The Data Model.
 */
lgb.world.view.ZoneView = function(dataModel) {
    
  this._TITLE = 'Zones';
  lgb.world.view.BaseWorldView.call(this, dataModel);

  this.zoneVisibleIdx = -1;
  this.buildingHeightModel_ = null;
  this.isInitialized_ = false;
  
  this.listenForChange_('isVisible');
  this.listenForChange_('envelopeModel');
};
goog.inherits(lgb.world.view.ZoneView,lgb.world.view.BaseWorldView);




lgb.world.view.ZoneView.prototype.onChange_isVisible_ = function(statusObject) {
    this.setVisible(statusObject.zoneIdx, statusObject.isVisible);
};

lgb.world.view.ZoneView.prototype.onChange_envelopeModel_ = function(envelopeModel) {
  
  this.masterGroup_.removeAllChildren();
  
  var len = this.dataModel.z.length;
  for (var i = 0; i < len; i++) {
      
    var zoneShapeModel = this.dataModel.z[i];
    
    this.addCube_(i + 1, zoneShapeModel);
  }
  
    if (!this.isInitialized_) {
        var node = lgb.world.model.vo.ViewpointNode.makeFromObject3D( this.masterGroup_, 2 );
        
        var len2 = node.children.length;
        for (var i=0; i < len2; i++) {
          node.children[i].focusEvent = true;
        };
        this.triggerLocal(e.ViewpointNodesLoaded, node);
    }

    this.isInitialized_ = true;
    
};



/**
 * @param {number} zoneIdx The idx used to locate the zone in the array.
 * @param {boolean} makeVisible If true show the zone.
 */
lgb.world.view.ZoneView.prototype.setVisible = function(zoneIdx, makeVisible) {

  if (null == makeVisible) {
    makeVisible = true;
  }

  var zoneCube = this.masterGroup_.children[zoneIdx-1];

  if (zoneCube.visible != makeVisible) {
    zoneCube.visible = makeVisible;
  }

};



/**
 * Initializes the View
 */
lgb.world.view.ZoneView.prototype.init = function() {

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
 */
lgb.world.view.ZoneView.prototype.addCube_ = function(zoneNumber, zoneShapeModel) {

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











