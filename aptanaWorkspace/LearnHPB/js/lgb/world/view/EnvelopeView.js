/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.view.EnvelopeView');

goog.require('goog.userAgent');
goog.require('lgb.core.ThreeUtils');
goog.require('lgb.world.view.BaseWorldView');

goog.require('lgb.world.model.BuildingHeightModel');


/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.world.model.EnvelopeModel} dataModel The model to display.
 */
lgb.world.view.EnvelopeView = function(dataModel) {
    

  this._ASSETS_FOLDER = 'envelope';
  this._TITLE = 'Envelope';
  
  lgb.world.view.BaseWorldView.call(this, dataModel);

  this.floorMeshHash_ = [];
  this.floorOffset_= [];  
  
  this.floorDimensions_ = null;
  
  this.topFloorContainer_ = new THREE.Object3D();
  this.topFloorContainer_.name = this._ASSETS_FOLDER + "-topFloorContainer";
  
  this.lowerFloorContainer_ = new THREE.Object3D();
  this.lowerFloorContainer_.name = this._ASSETS_FOLDER + "-lowerFloorContainer";
  
  this.topFloorMesh_ = null;
  

};
goog.inherits(lgb.world.view.EnvelopeView,lgb.world.view.BaseWorldView);


lgb.world.view.EnvelopeView.prototype.bind_ = function() {
  this.listenForChange_('floorHeight');
  this.listenForChange_('floorCount');
};


lgb.world.view.EnvelopeView.prototype.onChange_floorHeight_ = function(floorHeight) {
  this.makeFloors_();
};
lgb.world.view.EnvelopeView.prototype.onChange_floorCount_ = function(floorCount) {
  this.makeFloors_();
};


lgb.world.view.EnvelopeView.prototype.getTopFloorContainer = function() {
  return this.topFloorContainer_;
};



/**
 * Event handler called when the the scene is loaded.
 * @private
 * @param {Object} result From the THREE.js lib.
 */
lgb.world.view.EnvelopeView.prototype.onSceneLoaded_ = function() {

  
  this.floorMeshHash_ = lgb.core.ThreeUtils.convertGroupHashToMeshHash(this.groups_);

  var hashKeyArray = [];
  var optionsAry = this.dataModel.floorHeightOptions;
  var len = optionsAry.length;
  
  for (var i = 0; i < len; i++) {
    var hashKey = optionsAry[i] + 'ft';
    hashKeyArray.push(hashKey);
    
   var mesh = this.floorMeshHash_[hashKey];
   
   
   if (mesh === undefined) {
     var x = 1;
   }
   
  if (goog.userAgent.WEBKIT) {
    this.chromeBlinkingFix_(mesh);
  }
        

   
   var dim = mesh.geometry.getDimensions();
   
   this.floorMeshHash_[hashKey].position.setY(dim.y/2);
  }

  this.masterGroup_.add(this.topFloorContainer_);
  this.masterGroup_.add(this.lowerFloorContainer_);
  
  this.requestAddToWorld(this.masterGroup_);
  this.makeFloors_();
  this.dispatchVisibilityNodes_();
  
  this.bind_();
};


lgb.world.view.EnvelopeView.prototype.dispatchVisibilityNodes_ = function() {

  var lowClone = this.lowerFloorContainer_.children.slice(0);
  var topClone = this.topFloorContainer_.children.slice(0);
  
  var allFloors = lowClone.concat(topClone); 
  allFloors.reverse();
  
  var visibilityNode = new lgb.world.model.vo.VisibilityNode('Envelope', this.masterGroup_, 1 );
  this.triggerLocal(e.VisibilityNodesLoaded, visibilityNode);

};



/**
 * @private
 */
lgb.world.view.EnvelopeView.prototype.makeFloors_ = function() {
  
  var hashKey = this.dataModel.floorHeight + 'ft';
  
  var mesh = this.floorMeshHash_[hashKey];
  var geometry = mesh.geometry;
  
  this.floorDimensions_ = geometry.getDimensions();
 
  this.lowerFloorContainer_.removeAllChildren();
  var floorCount = this.dataModel.floorCount;

  for (var j = 0; j < floorCount-1; j++) {
    var newFloor = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
    newFloor.name = this._ASSETS_FOLDER + "-floor-" + (j + 1);
    newFloor.position.y += j * this.floorDimensions_.y + mesh.position.y;
    this.lowerFloorContainer_.add(newFloor);
  }
  
  //make top floor
  var topFloorY = j * this.floorDimensions_.y + mesh.position.y;
  
  if (this.topFloorMesh_) {
      this.topFloorContainer_.remove(this.topFloorMesh_);
  }
  
  this.topFloorMesh_ = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
  this.topFloorMesh_.name = this._ASSETS_FOLDER + "-floor-" + (j + 1);
  this.topFloorContainer_.position.y = topFloorY;
  this.topFloorContainer_.add(this.topFloorMesh_);
  
  this.topFloorMesh_.geometry.computeBoundingBox();
  
  var bb = this.topFloorMesh_.geometry.boundingBox;
  
  var topFloorMaxY = topFloorY + bb.max.y;
  var topFloorMinY = topFloorY + bb.min.y;
  
  var payload = new lgb.world.model.BuildingHeightModel(topFloorMaxY,topFloorMinY);
  this.triggerLocal(e.BuildingHeightChanged, payload);
  
  
};







